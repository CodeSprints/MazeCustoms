import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import HeroCarousel from './HeroCarousel.vue'
import { carouselSlides } from '@/data/home'

function mountCarousel() {
  return mount(HeroCarousel)
}

function liveRegionText(wrapper: ReturnType<typeof mountCarousel>) {
  return wrapper.find('[aria-live="polite"]').text()
}

describe('HeroCarousel', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renderuje sekcję z opisem roli karuzeli', () => {
    const wrapper = mountCarousel()
    expect(wrapper.attributes('aria-roledescription')).toBe('karuzela')
    expect(wrapper.attributes('aria-label')).toBe('Wyróżnione hasła Amaze Customs')
  })

  it('renderuje wszystkie slajdy z opisami ról', () => {
    const wrapper = mountCarousel()
    const slides = wrapper.findAll('[role="group"]')
    expect(slides).toHaveLength(carouselSlides.length)
    expect(slides[0].attributes('aria-roledescription')).toBe('slajd')
    expect(slides[0].attributes('aria-label')).toBe('1 z 3')
  })

  it('pokazuje pierwszy slajd i ukrywa pozostałe', () => {
    const wrapper = mountCarousel()
    const slides = wrapper.findAll('[role="group"]')
    expect(slides[0].attributes('aria-hidden')).toBe('false')
    expect(slides[1].attributes('aria-hidden')).toBe('true')
    expect(slides[2].attributes('aria-hidden')).toBe('true')
  })

  it('zapowiada zmianę slajdu w regionie aria-live', async () => {
    const wrapper = mountCarousel()
    await wrapper.find('button[aria-label="Następny slajd"]').trigger('click')
    expect(liveRegionText(wrapper)).toBe('Slajd 2 z 3: Moc, którą czujesz za kierownicą')

    await wrapper.find('button[aria-label="Poprzedni slajd"]').trigger('click')
    expect(liveRegionText(wrapper)).toBe('Slajd 1 z 3: Samochody to nasza pasja')
  })

  it('przechodzi do slajdu po kliknięciu przycisku wskaźnika', async () => {
    const wrapper = mountCarousel()
    const thirdIndicator = wrapper.find('button[aria-label="Pokaż slajd 3"]')
    await thirdIndicator.trigger('click')
    expect(liveRegionText(wrapper)).toContain('Slajd 3 z 3')
    expect(thirdIndicator.attributes('aria-current')).toBe('true')
    expect(wrapper.find('button[aria-label="Pokaż slajd 1"]').attributes('aria-current')).toBeUndefined()
  })

  it('przełącza tryb automatycznej zmiany przyciskiem pauzy', async () => {
    const wrapper = mountCarousel()
    const toggle = wrapper.find('button[aria-pressed]')
    expect(toggle.attributes('aria-pressed')).toBe('true')
    expect(toggle.attributes('aria-label')).toBe('Wstrzymaj automatyczną zmianę slajdów')

    await toggle.trigger('click')
    expect(toggle.attributes('aria-pressed')).toBe('false')
    expect(toggle.attributes('aria-label')).toBe('Wznów automatyczną zmianę slajdów')
  })

  it('zmienia slajdy automatycznie po upływie interwału', async () => {
    vi.useFakeTimers()
    const wrapper = mountCarousel()
    vi.advanceTimersByTime(6000)
    await nextTick()
    expect(liveRegionText(wrapper)).toContain('Slajd 2 z 3')
    vi.advanceTimersByTime(12000)
    await nextTick()
    expect(liveRegionText(wrapper)).toContain('Slajd 1 z 3')
  })

  it('wstrzymuje automatyczną zmianę po najechaniu kursorem i wznawia po odejściu', async () => {
    vi.useFakeTimers()
    const wrapper = mountCarousel()
    await wrapper.trigger('mouseenter')
    vi.advanceTimersByTime(18000)
    await nextTick()
    expect(liveRegionText(wrapper)).toContain('Slajd 1 z 3')

    await wrapper.trigger('mouseleave')
    vi.advanceTimersByTime(6000)
    await nextTick()
    expect(liveRegionText(wrapper)).toContain('Slajd 2 z 3')
  })

  it('wstrzymuje automatyczną zmianę, gdy kontrolki mają fokus', async () => {
    vi.useFakeTimers()
    const wrapper = mountCarousel()
    await wrapper.trigger('focusin')
    vi.advanceTimersByTime(18000)
    await nextTick()
    expect(liveRegionText(wrapper)).toContain('Slajd 1 z 3')

    await wrapper.trigger('focusout')
    vi.advanceTimersByTime(6000)
    await nextTick()
    expect(liveRegionText(wrapper)).toContain('Slajd 2 z 3')
  })
})
