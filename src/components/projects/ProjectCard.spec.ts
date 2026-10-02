import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ProjectCard from './ProjectCard.vue'
import { projects } from '@/data/projects'

describe('ProjectCard', () => {
  it('renderuje zdjęcie z sensownym tekstem alternatywnym', () => {
    const wrapper = mount(ProjectCard, { props: { project: projects[0] } })
    const image = wrapper.find('img')
    expect(image.attributes('alt')).toBe(projects[0].alt)
    expect(image.attributes('loading')).toBe('lazy')
  })

  it('pokazuje tytuł, opis i numer realizacji', () => {
    const wrapper = mount(ProjectCard, { props: { project: projects[0] } })
    expect(wrapper.find('h3').text()).toBe(projects[0].title)
    expect(wrapper.text()).toContain(projects[0].description)
    expect(wrapper.text()).toContain(projects[0].id)
  })

  it('emituje zdarzenie show po kliknięciu przycisku', async () => {
    const wrapper = mount(ProjectCard, { props: { project: projects[0] } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('show')).toHaveLength(1)
    expect(wrapper.emitted('show')?.[0]).toEqual([projects[0]])
  })
})
