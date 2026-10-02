<script setup lang="ts">
defineProps<{
  title: string
  imageClass: string
}>()
</script>

<template>
  <section class="relative flex h-56 items-center justify-center bg-cover bg-center md:h-72" :class="imageClass">
    <div class="absolute inset-0 bg-zinc-950/60" aria-hidden="true"></div>
    <h1
      class="relative px-4 text-center text-3xl font-bold uppercase tracking-[0.2em] text-white md:text-5xl md:tracking-[0.3em]"
    >
      {{ title }}
    </h1>
  </section>
</template>
