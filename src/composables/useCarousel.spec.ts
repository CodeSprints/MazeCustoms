import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useCarousel } from './useCarousel'

type CarouselApi = ReturnType<typeof useCarousel>

function mountCarousel(count: number, intervalMs = 6000): CarouselApi {
  let api!: CarouselApi
  const host = defineComponent({
    setup() {
      api = useCarousel(count, intervalMs)
      return () => h('div')
    },
  })
  mount(host)
  return api
}

describe('useCarousel', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('przechodzi do następnego slajdu z zawijaniem', () => {
    const carousel = mountCarousel(3)
    expect(carousel.current.value).toBe(0)
    carousel.next()
    expect(carousel.current.value).toBe(1)
    carousel.next()
    carousel.next()
    expect(carousel.current.value).toBe(0)
  })

  it('przechodzi do poprzedniego slajdu z zawijaniem', () => {
    const carousel = mountCarousel(3)
    carousel.prev()
    expect(carousel.current.value).toBe(2)
    carousel.prev()
    expect(carousel.current.value).toBe(1)
  })

  it('normalizuje indeksy w goTo', () => {
    const carousel = mountCarousel(3)
    carousel.goTo(-1)
    expect(carousel.current.value).toBe(2)
    carousel.goTo(7)
    expect(carousel.current.value).toBe(1)
  })

  it('nie zmienia indeksu przy pojedynczym slajdzie', () => {
    const carousel = mountCarousel(1)
    carousel.next()
    carousel.prev()
    carousel.goTo(10)
    expect(carousel.current.value).toBe(0)
  })

  it('automatycznie zmienia slajdy po upływie interwału', () => {
    vi.useFakeTimers()
    const carousel = mountCarousel(3, 5000)
    vi.advanceTimersByTime(5000)
    expect(carousel.current.value).toBe(1)
    vi.advanceTimersByTime(5000)
    expect(carousel.current.value).toBe(2)
    vi.advanceTimersByTime(5000)
    expect(carousel.current.value).toBe(0)
  })

  it('toggleAutoplay zatrzymuje i wznawia automatyczną zmianę', () => {
    vi.useFakeTimers()
    const carousel = mountCarousel(3, 5000)
    carousel.toggleAutoplay()
    expect(carousel.playing.value).toBe(false)
    vi.advanceTimersByTime(30000)
    expect(carousel.current.value).toBe(0)
    carousel.toggleAutoplay()
    expect(carousel.playing.value).toBe(true)
    vi.advanceTimersByTime(5000)
    expect(carousel.current.value).toBe(1)
  })

  it('pauseAutoplay wstrzymuje zmianę slajdów do wywołania resumeAutoplay', () => {
    vi.useFakeTimers()
    const carousel = mountCarousel(3, 5000)
    carousel.pauseAutoplay()
    vi.advanceTimersByTime(30000)
    expect(carousel.current.value).toBe(0)
    carousel.resumeAutoplay()
    vi.advanceTimersByTime(5000)
    expect(carousel.current.value).toBe(1)
  })

  it('nie uruchamia automatycznej zmiany przy preferencji ograniczonego ruchu', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))
    vi.useFakeTimers()
    const carousel = mountCarousel(3, 5000)
    vi.advanceTimersByTime(60000)
    expect(carousel.current.value).toBe(0)
  })
})
