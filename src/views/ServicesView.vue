<script setup lang="ts">
import PageHero from '@/components/shared/PageHero.vue'
import { services } from '@/data/services'
</script>

<template>
  <PageHero title="Usługi" image-class="hero-services" />

  <section class="py-16 md:py-24" aria-labelledby="services-title">
    <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h2 id="services-title" class="text-3xl font-bold text-zinc-900 md:text-4xl">Nasze usługi</h2>
        <p class="mt-6">
          Usługi wykonuje doświadczona załoga. Korzystamy z materiałów najwyższej jakości, a zakres prac dopasowujemy do
          Twojego budżetu.
        </p>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2">
        <article
          v-for="service in services"
          :key="service.title"
          class="relative flex min-h-72 flex-col justify-end overflow-hidden rounded-lg bg-zinc-950 bg-cover bg-center md:min-h-80"
          :class="service.imageClass"
        >
          <div
            class="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-zinc-950/10"
            aria-hidden="true"
          ></div>
          <div class="relative p-6">
            <h3 class="text-2xl font-bold uppercase tracking-wider text-white">{{ service.title }}</h3>
            <p class="mt-2 text-zinc-300">{{ service.description }}</p>
          </div>
        </article>
      </div>

      <p class="mt-12 rounded-lg border border-zinc-200 bg-zinc-50 p-5 text-center text-sm text-zinc-600">
        Nie widzisz swojej kategorii?
        <RouterLink to="/kontakt" class="font-semibold text-sky-700 underline hover:text-sky-800">
          Napisz do nas</RouterLink
        >
        — powiemy wprost, czy damy radę pomóc.
      </p>
    </div>
  </section>
</template>
