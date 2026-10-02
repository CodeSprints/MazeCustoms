<script setup lang="ts">
import type { Component } from 'vue'
import { Building2, CreditCard, Gem, Tag, ThumbsUp, Trophy } from 'lucide-vue-next'
import PageHero from '@/components/shared/PageHero.vue'
import { aboutCards, type AboutIcon } from '@/data/about'

const cardIcons: Record<AboutIcon, Component> = {
  building: Building2,
  trophy: Trophy,
  tag: Tag,
  gem: Gem,
  'credit-card': CreditCard,
  'thumbs-up': ThumbsUp,
}
</script>

<template>
  <PageHero title="O nas" image-class="hero-about" />

  <section class="py-16 md:py-24" aria-labelledby="about-intro-title">
    <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 id="about-intro-title" class="text-3xl font-bold text-zinc-900 md:text-4xl">
        Jesteśmy pasjonatami motoryzacji
      </h2>
      <p class="mt-6 max-w-3xl">
        Specjalizujemy się w tuningu samochodowym. Firma powstała z miłości do szybkości, mocy i stylu, który wyróżnia
        każde auto na drodze.
      </p>
      <p class="mt-4 max-w-3xl">
        Od lat dostarczamy rozwiązania, które łączą nowe technologie z najwyższą jakością wykonania. Zwykłe samochody
        zamieniamy w auta szyte na miarę ich właścicieli.
      </p>
    </div>
  </section>

  <section class="overflow-hidden bg-zinc-50 py-16 md:py-20" aria-labelledby="about-values-title">
    <h2 id="about-values-title" class="sr-only">Nasze wartości</h2>
    <div class="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:gap-0 lg:px-8">
      <div class="lg:-skew-x-[15deg]">
        <div class="lg:skew-x-[15deg] lg:px-6">
          <h3 class="border-b-2 border-sky-700 pb-2 text-xl font-bold uppercase tracking-wider text-zinc-900">
            Nasza pasja
          </h3>
          <p class="mt-4">
            Doświadczenie i wiedza pozwalają nam sprostać najbardziej wymagającym wyzwaniom. Podniesienie mocy silnika,
            poprawa aerodynamiki czy unikalny design — dla nas to codzienność.
          </p>
        </div>
      </div>
      <img
        src="/img/about/about-info.jpg"
        alt="Silnik samochodowy podczas prac tuningu mechanicznego"
        class="h-64 w-full rounded-lg object-cover lg:h-80 lg:rounded-none lg:-skew-x-[15deg]"
        width="640"
        height="326"
        loading="lazy"
        decoding="async"
      />
      <div class="lg:-skew-x-[15deg]">
        <div class="lg:skew-x-[15deg] lg:px-6">
          <h3 class="border-b-2 border-sky-700 pb-2 text-xl font-bold uppercase tracking-wider text-zinc-900">
            Nasze cele
          </h3>
          <p class="mt-4">
            Do każdego projektu podchodzimy z pełnym zaangażowaniem i dbamy o najmniejszy detal. Wierzymy, że samochód
            to coś więcej niż środek transportu — to wyraz indywidualności i wolności.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-zinc-950 py-16 md:py-24" aria-labelledby="about-cards-title">
    <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 id="about-cards-title" class="text-center text-3xl font-bold text-white md:text-4xl">Co nas wyróżnia</h2>
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="card in aboutCards"
          :key="card.heading"
          class="flex min-h-24 items-center gap-4 rounded-lg p-5"
          :class="
            card.icon === 'trophy' || card.icon === 'gem' || card.icon === 'thumbs-up' ? 'bg-sky-700' : 'bg-zinc-900'
          "
        >
          <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
            <component :is="cardIcons[card.icon]" class="h-6 w-6 text-white" aria-hidden="true" />
          </span>
          <h3 class="text-lg font-bold text-white">{{ card.heading }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>
