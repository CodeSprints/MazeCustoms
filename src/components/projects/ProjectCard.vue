<script setup lang="ts">
import type { Project } from '@/data/projects'

defineProps<{
  project: Project
}>()

defineEmits<{
  show: [project: Project]
}>()
</script>

<template>
  <article class="flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
    <img
      :src="project.image"
      :alt="project.alt"
      class="aspect-3/2 w-full object-cover"
      width="600"
      height="400"
      loading="lazy"
      decoding="async"
    />
    <div class="flex flex-1 flex-col gap-3 p-5">
      <h3 class="text-lg font-bold text-zinc-900">{{ project.title }}</h3>
      <p class="flex-1 text-sm text-zinc-600">{{ project.description }}</p>
      <div class="flex items-center justify-between gap-3">
        <span class="text-xs font-semibold uppercase tracking-wider text-zinc-500">{{ project.id }}</span>
        <button
          type="button"
          class="min-h-11 rounded-md border border-zinc-300 px-4 text-sm font-semibold uppercase tracking-wider text-zinc-800 transition-colors hover:bg-zinc-100"
          @click="$emit('show', project)"
        >
          Powiększ zdjęcie
        </button>
      </div>
    </div>
  </article>
</template>
