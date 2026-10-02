import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AboutView from './AboutView.vue'
import ContactView from './ContactView.vue'
import HomeView from './HomeView.vue'
import ProjectsView from './ProjectsView.vue'
import ServicesView from './ServicesView.vue'
import router from '@/router'
import { createMemoryTestRouter } from '@/test/router'
import { navigationItems } from '@/data/navigation'
import { projects } from '@/data/projects'
import { services } from '@/data/services'

async function mountView(path: string, view: typeof HomeView) {
  const router = createMemoryTestRouter()
  await router.push(path)
  await router.isReady()
  const wrapper = mount(view, { global: { plugins: [router] } })
  await flushPromises()
  return wrapper
}

describe('widoki', () => {
  it('HomeView pokazuje nagłówek strony i karuzelę', async () => {
    const wrapper = await mountView('/', HomeView)
    expect(wrapper.find('h1').classes()).toContain('sr-only')
    expect(wrapper.find('h1').text()).toContain('Amaze Customs')
    expect(wrapper.find('[aria-roledescription="karuzela"]').exists()).toBe(true)
    expect(wrapper.findAll('img[src="/img/home-brand.png"]')).toHaveLength(1)
  })

  it('AboutView pokazuje nagłówek O nas i wszystkie karty', async () => {
    const wrapper = await mountView('/o-nas', AboutView)
    expect(wrapper.find('h1').text()).toBe('O nas')
    expect(wrapper.findAll('h3')).toHaveLength(8)
    expect(wrapper.text()).toContain('Nasza pasja')
    expect(wrapper.text()).toContain('Nasze cele')
    expect(wrapper.text()).toContain('Co nas wyróżnia')
  })

  it('ServicesView pokazuje nagłówek Usługi i cztery karty usług', async () => {
    const wrapper = await mountView('/uslugi', ServicesView)
    expect(wrapper.find('h1').text()).toBe('Usługi')
    const cards = wrapper.findAll('article')
    expect(cards).toHaveLength(services.length)
    expect(cards.every((card) => card.find('h3').text().length > 0)).toBe(true)
  })

  it('ProjectsView pokazuje nagłówek Projekty i wszystkie realizacje ze zdjęciami', async () => {
    const wrapper = await mountView('/projekty', ProjectsView)
    expect(wrapper.find('h1').text()).toBe('Projekty')
    const cards = wrapper.findAll('article')
    expect(cards).toHaveLength(projects.length)
    for (const image of wrapper.findAll('img')) {
      expect((image.attributes('alt') ?? '').length).toBeGreaterThan(0)
    }
  })

  it('ProjectsView otwiera zdjęcie w oknie i zamyka je po kliknięciu', async () => {
    const wrapper = await mountView('/projekty', ProjectsView)
    expect(wrapper.find('dialog').exists()).toBe(false)

    await wrapper.find('article button').trigger('click')
    await flushPromises()
    const dialog = wrapper.find('dialog')
    expect((dialog.element as HTMLDialogElement).open).toBe(true)
    expect(wrapper.find('#project-dialog-title').text()).toContain(projects[0].title)

    await wrapper.find('button[aria-label="Zamknij okno"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('dialog').exists()).toBe(false)
  })

  it('ContactView pokazuje nagłówek Kontakt, formularz i mapę z tytułem', async () => {
    const wrapper = await mountView('/kontakt', ContactView)
    expect(wrapper.find('h1').text()).toBe('Kontakt')
    expect(wrapper.find('form').exists()).toBe(true)
    const map = wrapper.find('iframe')
    expect(map.exists()).toBe(true)
    expect(map.attributes('title')).toBe('Mapa z dojazdem do siedziby Amaze Customs w Krakowie')
  })

  it('każdy widok używa tylko jednego nagłówka h1', async () => {
    const views = [
      ['/', HomeView],
      ['/o-nas', AboutView],
      ['/uslugi', ServicesView],
      ['/projekty', ProjectsView],
      ['/kontakt', ContactView],
    ] as const
    for (const [path, view] of views) {
      const wrapper = await mountView(path, view)
      expect(wrapper.findAll('h1')).toHaveLength(1)
    }
  })
})

describe('router', () => {
  it('ustawia tytuł dokumentu dla każdej podstrony', async () => {
    await router.push('/')
    await router.isReady()
    expect(document.title).toBe('Warsztat, serwis i tuning samochodowy | Amaze Customs')

    await router.push('/o-nas')
    expect(document.title).toBe('O nas | Amaze Customs')

    await router.push('/uslugi')
    expect(document.title).toBe('Usługi | Amaze Customs')

    await router.push('/projekty')
    expect(document.title).toBe('Projekty | Amaze Customs')

    await router.push('/kontakt')
    expect(document.title).toBe('Kontakt | Amaze Customs')
  })

  it('przekierowuje nieznane adresy na stronę główną', async () => {
    await router.push('/nie-istnieje')
    expect(router.currentRoute.value.redirectedFrom?.path).toBe('/nie-istnieje')
    expect(router.currentRoute.value.name).toBe('home')
  })

  it('zawiera trasę dla każdej pozycji menu', () => {
    for (const item of navigationItems) {
      expect(router.hasRoute(item.name)).toBe(true)
    }
  })
})
