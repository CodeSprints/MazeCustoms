import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import ContactForm from './ContactForm.vue'

async function fillValidForm(wrapper: ReturnType<typeof mountContactForm>) {
  await wrapper.find('#contact-name').setValue('Jan Kowalski')
  await wrapper.find('#contact-email').setValue('jan@example.com')
  await wrapper.find('#contact-car-type').setValue('Sportowy')
  await wrapper.find('#contact-topic').setValue('Tuning mechaniczny')
  await wrapper.find('#contact-message').setValue('Proszę o wycenę tuningu silnika.')
  await wrapper.find('#contact-consent').setValue(true)
}

function mountContactForm() {
  return mount(ContactForm, { attachTo: document.body })
}

describe('ContactForm', () => {
  afterEach(() => {
    vi.useRealTimers()
    document.body.innerHTML = ''
  })

  it('łączy każdą etykietę z polem przez atrybuty for i id', () => {
    const wrapper = mountContactForm()
    const labels = wrapper.findAll('label')
    expect(labels.length).toBeGreaterThanOrEqual(6)
    for (const label of labels) {
      const forAttribute = label.attributes('for')
      expect(forAttribute).toBeTruthy()
      expect(wrapper.find(`#${forAttribute}`).exists()).toBe(true)
    }
  })

  it('nie wysyła pustego formularza i pokazuje podsumowanie błędów', async () => {
    const wrapper = mountContactForm()
    await wrapper.find('form').trigger('submit')
    await nextTick()

    const summary = wrapper.find('[role="alert"]')
    expect(summary.exists()).toBe(true)
    expect(summary.text()).toContain('Nie udało się wysłać wiadomości')
    expect(wrapper.findAll('[role="alert"] a')).toHaveLength(6)
    expect(wrapper.find('#contact-name').attributes('aria-invalid')).toBe('true')
    expect(wrapper.find('#contact-consent').attributes('aria-invalid')).toBe('true')
  })

  it('łączy komunikaty błędów z polami przez aria-describedby', async () => {
    const wrapper = mountContactForm()
    await wrapper.find('#contact-email').trigger('blur')
    expect(wrapper.find('#contact-email-error').exists()).toBe(true)
    expect(wrapper.find('#contact-email').attributes('aria-describedby')).toBe('contact-email-error')
  })

  it('przenosi fokus do pola po kliknięciu linku w podsumowaniu błędów', async () => {
    const wrapper = mountContactForm()
    await wrapper.find('form').trigger('submit')
    await nextTick()
    await wrapper.find('[role="alert"] a').trigger('click')
    expect(document.activeElement?.id).toBe('contact-name')
  })

  it('wysyła poprawny formularz i pokazuje komunikat sukcesu', async () => {
    vi.useFakeTimers()
    const wrapper = mountContactForm()
    await fillValidForm(wrapper)

    await wrapper.find('form').trigger('submit')
    await nextTick()
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined()

    await vi.runAllTimersAsync()
    await nextTick()

    const success = wrapper.find('[role="status"]')
    expect(success.exists()).toBe(true)
    expect(success.text()).toContain('Dziękujemy za wiadomość')
    expect((wrapper.find('#contact-name').element as HTMLInputElement).value).toBe('')
  })

  it('po sukcesie pozwala wysłać kolejną wiadomość', async () => {
    vi.useFakeTimers()
    const wrapper = mountContactForm()
    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await vi.runAllTimersAsync()
    await nextTick()

    expect(wrapper.find('[role="status"]').exists()).toBe(true)
    await wrapper.find('[role="status"] button').trigger('click')
    expect(wrapper.find('[role="status"]').exists()).toBe(false)
  })
})
