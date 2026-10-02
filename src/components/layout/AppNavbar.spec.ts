import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { afterEach, describe, expect, it } from 'vitest'

import AppNavbar from './AppNavbar.vue'
import { navigationItems } from '@/data/navigation'

async function mountNavbar(initialPath = '/') {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: navigationItems.map((item) => ({ path: item.to, name: item.name, component: { render: () => null } })),
  })
  await router.push(initialPath)
  await router.isReady()
  const wrapper = mount(AppNavbar, { global: { plugins: [router] }, attachTo: document.body })
  return { wrapper, router }
}

describe('AppNavbar', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renderuje link do strony głównej oraz wszystkie podstrony', async () => {
    const { wrapper } = await mountNavbar()
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(navigationItems.length * 2 + 1)
    for (const item of navigationItems) {
      expect(links.filter((link) => link.text()).some((link) => link.text() === item.label)).toBe(true)
    }
  })

  it('oznacza aktywną podstronę atrybutem aria-current', async () => {
    const { wrapper } = await mountNavbar('/uslugi')
    const activeLinks = wrapper.findAll('[aria-current="page"]')
    expect(activeLinks).toHaveLength(2)
    expect(activeLinks.every((link) => link.text() === 'Usługi')).toBe(true)
  })

  it('przełącza menu mobilne przyciskiem hamburgera', async () => {
    const { wrapper } = await mountNavbar()
    const toggle = wrapper.find('button[aria-controls="mobile-menu"]')
    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(toggle.attributes('aria-label')).toBe('Otwórz menu')

    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(toggle.attributes('aria-label')).toBe('Zamknij menu')

    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('false')
  })

  it('zamyka menu mobilne klawiszem Escape i wraca fokusem na przycisk', async () => {
    const { wrapper } = await mountNavbar()
    const toggle = wrapper.find('button[aria-controls="mobile-menu"]')
    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')

    await wrapper.find('header').trigger('keydown', { key: 'Escape' })
    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(toggle.element)
  })

  it('zamyka menu mobilne po przejściu do innej podstrony', async () => {
    const { wrapper, router } = await mountNavbar('/')
    const toggle = wrapper.find('button[aria-controls="mobile-menu"]')
    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')

    await router.push('/kontakt')
    await nextTick()
    expect(toggle.attributes('aria-expanded')).toBe('false')
  })

  it('zawiera nawigację z etykietą dostępną dla czytników ekranu', async () => {
    const { wrapper } = await mountNavbar()
    const navigations = wrapper.findAll('nav')
    expect(navigations.length).toBeGreaterThanOrEqual(2)
    expect(navigations.some((nav) => nav.attributes('aria-label') === 'Nawigacja główna')).toBe(true)
    expect(navigations.some((nav) => nav.attributes('aria-label') === 'Nawigacja mobilna')).toBe(true)
  })
})
