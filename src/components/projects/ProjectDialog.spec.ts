import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import ProjectDialog from './ProjectDialog.vue'
import { projects } from '@/data/projects'

function mountDialog() {
  return mount(ProjectDialog, { props: { project: null }, attachTo: document.body })
}

describe('ProjectDialog', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('nie renderuje okna, gdy projekt nie jest wybrany', () => {
    const wrapper = mountDialog()
    expect(wrapper.find('dialog').exists()).toBe(false)
  })

  it('otwiera okno modalne po wybraniu projektu', async () => {
    const wrapper = mountDialog()
    await wrapper.setProps({ project: projects[0] })
    await flushPromises()

    const dialog = wrapper.find('dialog')
    expect(dialog.exists()).toBe(true)
    expect((dialog.element as HTMLDialogElement).open).toBe(true)
    expect(dialog.attributes('aria-labelledby')).toBe('project-dialog-title')
    expect(wrapper.find('#project-dialog-title').text()).toContain(projects[0].title)
  })

  it('zamyka okno przyciskiem i emituje zdarzenie close', async () => {
    const wrapper = mountDialog()
    await wrapper.setProps({ project: projects[0] })
    await flushPromises()

    await wrapper.find('button[aria-label="Zamknij okno"]').trigger('click')
    expect((wrapper.find('dialog').element as HTMLDialogElement).open).toBe(false)
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('zamyka okno klawiszem Escape i zwraca fokus do wywołującego', async () => {
    const opener = document.createElement('button')
    opener.textContent = 'Powiększ zdjęcie'
    document.body.appendChild(opener)
    opener.focus()

    const wrapper = mountDialog()
    await wrapper.setProps({ project: projects[1] })
    await flushPromises()
    expect((wrapper.find('dialog').element as HTMLDialogElement).open).toBe(true)

    const dialogElement = wrapper.find('dialog').element as HTMLDialogElement
    dialogElement.dispatchEvent(new Event('cancel', { bubbles: false, cancelable: true }))
    dialogElement.dispatchEvent(new Event('close'))
    await nextTick()

    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(document.activeElement).toBe(opener)
    opener.remove()
  })
})
