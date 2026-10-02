import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { useContactForm, type ContactFormSubmitter } from './useContactForm'
import type { ContactFormValues } from '@/utils/validation'

type ContactFormApi = ReturnType<typeof useContactForm>

const validValues: ContactFormValues = {
  name: 'Jan Kowalski',
  email: 'jan@example.com',
  carType: 'Sportowy',
  topic: 'Tuning mechaniczny',
  message: 'Proszę o wycenę tuningu silnika.',
  consent: true,
}

function mountContactForm(send?: ContactFormSubmitter): { api: ContactFormApi; send: ContactFormSubmitter } {
  const submitter = send ?? vi.fn().mockResolvedValue(undefined)
  let api!: ContactFormApi
  const host = defineComponent({
    setup() {
      api = useContactForm(submitter)
      return () => h('div')
    },
  })
  mount(host)
  return { api, send: submitter }
}

describe('useContactForm', () => {
  it('odrzuca pusty formularz i zwraca błędy dla wszystkich pól', async () => {
    const { api, send } = mountContactForm()
    const result = await api.submitForm()
    expect(result).toBe(false)
    expect(send).not.toHaveBeenCalled()
    expect(Object.keys(api.errors.value)).toHaveLength(6)
    expect(api.submitRejected.value).toBe(true)
    expect(api.submitted.value).toBe(false)
  })

  it('wysyła poprawny formularz i czyści pola', async () => {
    const { api, send } = mountContactForm()
    Object.assign(api.values, validValues)
    const result = await api.submitForm()
    expect(result).toBe(true)
    expect(send).toHaveBeenCalledTimes(1)
    expect(send).toHaveBeenCalledWith(validValues)
    expect(api.values.name).toBe('')
    expect(api.values.consent).toBe(false)
    expect(api.submitted.value).toBe(true)
    expect(api.submitRejected.value).toBe(false)
  })

  it('nie wysyła formularza ponownie w trakcie wysyłania', async () => {
    let resolveSend: (() => void) | undefined
    const send = vi.fn().mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveSend = resolve
        }),
    )
    const { api } = mountContactForm(send)
    Object.assign(api.values, validValues)
    const firstSubmit = api.submitForm()
    const secondSubmit = await api.submitForm()
    expect(secondSubmit).toBe(false)
    expect(api.submitting.value).toBe(true)
    resolveSend?.()
    await firstSubmit
    expect(api.submitting.value).toBe(false)
    expect(api.submitted.value).toBe(true)
  })

  it('pokazuje błąd pojedynczego pola po utracie fokusu', () => {
    const { api } = mountContactForm()
    api.validateOnBlur('email')
    expect(api.errors.value.email).toBeTypeOf('string')
  })

  it('nie waliduje pola przed jego pierwszym błędem', () => {
    const { api } = mountContactForm()
    api.values.email = 'niepoprawny'
    api.validateOnInput('email')
    expect(api.errors.value.email).toBeUndefined()
  })

  it('usuwa błąd pola po poprawieniu wartości', () => {
    const { api } = mountContactForm()
    api.validateOnBlur('email')
    expect(api.errors.value.email).toBeTypeOf('string')
    api.values.email = 'jan@example.com'
    api.validateOnInput('email')
    expect(api.errors.value.email).toBeUndefined()
  })

  it('resetStatus ukrywa komunikat o wysłaniu', async () => {
    const { api } = mountContactForm()
    Object.assign(api.values, validValues)
    await api.submitForm()
    expect(api.submitted.value).toBe(true)
    api.resetStatus()
    expect(api.submitted.value).toBe(false)
  })
})
