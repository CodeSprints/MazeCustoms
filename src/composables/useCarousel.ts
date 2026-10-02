import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useCarousel(count: number, intervalMs = 6000) {
  const current = ref(0)
  const playing = ref(true)
  let timer: ReturnType<typeof setInterval> | null = null

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const canAutoplay = count > 1 && !prefersReducedMotion

  function normalizeIndex(index: number): number {
    if (count < 1) return 0
    return ((index % count) + count) % count
  }

  function next() {
    current.value = normalizeIndex(current.value + 1)
  }

  function prev() {
    current.value = normalizeIndex(current.value - 1)
  }

  function goTo(index: number) {
    current.value = normalizeIndex(index)
  }

  function start() {
    if (timer !== null || !canAutoplay || !playing.value) return
    timer = setInterval(next, intervalMs)
  }

  function stop() {
    if (timer === null) return
    clearInterval(timer)
    timer = null
  }

  function pauseAutoplay() {
    stop()
  }

  function resumeAutoplay() {
    if (playing.value) start()
  }

  function toggleAutoplay() {
    playing.value = !playing.value
    if (playing.value) start()
    else stop()
  }

  onMounted(start)
  onBeforeUnmount(stop)

  return {
    current,
    playing,
    next,
    prev,
    goTo,
    start,
    stop,
    pauseAutoplay,
    resumeAutoplay,
    toggleAutoplay,
  }
}
