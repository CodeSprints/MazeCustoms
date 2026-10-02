import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'

import AppFooter from './AppFooter.vue'
import { navigationItems } from '@/data/navigation'

async function mountFooter() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: navigationItems.map((item) => ({ path: item.to, name: item.name, component: { render: () => null } })),
  })
  await router.push('/')
  await router.isReady()
  return mount(AppFooter, { global: { plugins: [router] } })
}

describe('AppFooter', () => {
  it('pokazuje nazwę firmy i aktualny rok w stopce praw autorskich', async () => {
    const wrapper = await mountFooter()
    expect(wrapper.text()).toContain('Amaze Customs')
    expect(wrapper.text()).toContain(`© ${new Date().getFullYear()}`)
  })

  it('zawiera linki do wszystkich podstron', async () => {
    const wrapper = await mountFooter()
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(navigationItems.length)
    for (const item of navigationItems) {
      expect(links.some((link) => link.text() === item.label)).toBe(true)
    }
  })

  it('oznacza nawigację etykietą dla czytników ekranu', async () => {
    const wrapper = await mountFooter()
    expect(wrapper.find('nav[aria-label="Nawigacja w stopce"]').exists()).toBe(true)
  })
})
