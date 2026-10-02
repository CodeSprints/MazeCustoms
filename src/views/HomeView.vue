<script setup lang="ts">
import type { Component } from 'vue'
import { ArrowRight, Cog, Flame, Wrench } from 'lucide-vue-next'
import HeroCarousel from '@/components/home/HeroCarousel.vue'
import { homeFeatures, type FeatureIcon } from '@/data/home'
import { companyInfo } from '@/data/contact'

const featureIcons: Record<FeatureIcon, Component> = {
  wrench: Wrench,
  flame: Flame,
  cog: Cog,
}
</script>

<template>
  <h1 class="sr-only">Amaze Customs — warsztat, serwis i tuning samochodowy w Krakowie</h1>

  <HeroCarousel />

  <section class="py-16 md:py-24" aria-labelledby="home-features-title">
    <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 id="home-features-title" class="text-center text-3xl font-bold text-zinc-900 md:text-4xl">
        Nasze specjalności
      </h2>
      <div class="mt-12 grid gap-10 text-center md:grid-cols-3 md:gap-8">
        <div v-for="feature in homeFeatures" :key="feature.heading" class="flex flex-col items-center gap-3">
          <component :is="featureIcons[feature.icon]" class="h-12 w-12 text-sky-700" aria-hidden="true" />
          <h3 class="text-xl font-bold text-zinc-900">{{ feature.heading }}</h3>
          <p class="max-w-xs text-sm text-zinc-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <section
    class="relative bg-cover bg-center py-20 md:py-28"
    :class="'hero-passion'"
    aria-labelledby="home-passion-title"
  >
    <div class="absolute inset-0 bg-zinc-950/60" aria-hidden="true"></div>
    <div
      class="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 text-center text-white sm:px-6 lg:px-8"
    >
      <h2 id="home-passion-title" class="text-3xl font-bold md:text-4xl">Samochody to nasza pasja</h2>
      <p class="max-w-xl text-lg text-zinc-200">O samochody dbamy lepiej niż o rodzinę.</p>
      <RouterLink
        to="/projekty"
        class="mt-2 flex min-h-11 items-center gap-2 rounded-md bg-sky-700 px-6 text-base font-semibold uppercase tracking-wider text-white transition-colors hover:bg-sky-800"
      >
        Zobacz nasze projekty
        <ArrowRight class="h-5 w-5" aria-hidden="true" />
      </RouterLink>
    </div>
  </section>

  <section class="py-16 md:py-24" aria-labelledby="home-history-title">
    <div class="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
      <div>
        <h2 id="home-history-title" class="text-3xl font-bold text-zinc-900 md:text-4xl">Historia naszej firmy</h2>
        <p class="mt-6">
          Firma została założona w {{ companyInfo.foundedYear }} roku w {{ companyInfo.city }}. To rodzinny warsztat,
          który od początku zajmuje się customowymi przeróbkami, serwisem i przeglądami aut.
        </p>
        <p class="mt-4">
          Przez te lata zaufało nam wielu kierowców. Wrzuć nam kluczyki, a oddamy Ci auto, które zrobi wrażenie na
          drodze.
        </p>
      </div>
      <img
        src="/img/home-brand.png"
        alt="Sportowy samochód należący do klienta warsztatu Amaze Customs"
        class="w-full rounded-lg object-cover shadow-md"
        width="1280"
        height="720"
        loading="lazy"
        decoding="async"
      />
    </div>
  </section>

  <section class="bg-zinc-950 py-16 text-white md:py-20" aria-labelledby="home-cta-title">
    <div class="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8">
      <h2 id="home-cta-title" class="text-2xl font-bold md:text-3xl">Masz pomysł na swoje auto? Porozmawiajmy.</h2>
      <p class="max-w-xl text-zinc-300">Napisz, co chcesz zmienić, a przygotujemy wycenę bez zobowiązań.</p>
      <RouterLink
        to="/kontakt"
        class="mt-2 flex min-h-11 items-center gap-2 rounded-md bg-sky-700 px-6 text-base font-semibold uppercase tracking-wider text-white transition-colors hover:bg-sky-800"
      >
        Napisz do nas
        <ArrowRight class="h-5 w-5" aria-hidden="true" />
      </RouterLink>
    </div>
  </section>
</template>
