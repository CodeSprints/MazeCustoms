<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-vue-next'
import { useCarousel } from '@/composables/useCarousel'
import { carouselSlides } from '@/data/home'

const AUTOPLAY_INTERVAL_MS = 6000

const { current, playing, next, prev, goTo, toggleAutoplay, pauseAutoplay, resumeAutoplay } = useCarousel(
  carouselSlides.length,
  AUTOPLAY_INTERVAL_MS,
)

const liveStatus = computed(
  () => `Slajd ${current.value + 1} z ${carouselSlides.length}: ${carouselSlides[current.value].heading}`,
)

const autoplayButtonLabel = computed(() =>
  playing.value ? 'Wstrzymaj automatyczną zmianę slajdów' : 'Wznów automatyczną zmianę slajdów',
)
</script>

<template>
  <section
    class="relative overflow-hidden bg-zinc-950"
    aria-roledescription="karuzela"
    aria-label="Wyróżnione hasła Amaze Customs"
    @mouseenter="pauseAutoplay"
    @mouseleave="resumeAutoplay"
    @focusin="pauseAutoplay"
    @focusout="resumeAutoplay"
    @keydown.arrow-left.prevent="prev"
    @keydown.arrow-right.prevent="next"
  >
    <p class="sr-only" aria-live="polite">{{ liveStatus }}</p>

    <ul class="relative h-[420px] list-none sm:h-[480px] lg:h-[560px] xl:h-[620px]">
      <li
        v-for="(slide, index) in carouselSlides"
        :key="slide.heading"
        class="absolute inset-0 bg-cover bg-center transition-opacity duration-700 motion-reduce:transition-none"
        :class="[slide.imageClass, index === current ? 'opacity-100' : 'opacity-0']"
        :aria-hidden="index !== current"
        role="group"
        aria-roledescription="slajd"
        :aria-label="`${index + 1} z ${carouselSlides.length}`"
      >
        <div
          class="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/45 to-zinc-950/25"
          aria-hidden="true"
        ></div>
        <div
          class="relative flex h-full flex-col items-center justify-center gap-3 px-6 pb-28 pt-16 text-center sm:pb-24"
        >
          <h2 class="max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {{ slide.heading }}
          </h2>
          <p class="max-w-2xl text-base text-zinc-200 sm:text-lg">{{ slide.description }}</p>
        </div>
      </li>
    </ul>

    <button
      type="button"
      class="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-950/60 text-white transition-colors hover:bg-zinc-900"
      aria-label="Poprzedni slajd"
      @click="prev"
    >
      <ChevronLeft class="h-6 w-6" aria-hidden="true" />
    </button>

    <button
      type="button"
      class="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-950/60 text-white transition-colors hover:bg-zinc-900"
      aria-label="Następny slajd"
      @click="next"
    >
      <ChevronRight class="h-6 w-6" aria-hidden="true" />
    </button>

    <button
      type="button"
      class="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950/60 text-white transition-colors hover:bg-zinc-900"
      :aria-pressed="playing"
      :aria-label="autoplayButtonLabel"
      :title="autoplayButtonLabel"
      @click="toggleAutoplay"
    >
      <Pause v-if="playing" class="h-5 w-5" aria-hidden="true" />
      <Play v-else class="h-5 w-5" aria-hidden="true" />
    </button>

    <div class="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1">
      <button
        v-for="(slide, index) in carouselSlides"
        :key="slide.heading"
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10"
        :aria-label="`Pokaż slajd ${index + 1}`"
        :aria-current="index === current ? 'true' : undefined"
        @click="goTo(index)"
      >
        <span
          class="block h-2.5 w-2.5 rounded-full transition-transform motion-reduce:transition-none"
          :class="index === current ? 'scale-125 bg-white' : 'bg-white/40'"
          aria-hidden="true"
        ></span>
      </button>
    </div>
  </section>
</template>
