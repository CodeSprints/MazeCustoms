<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import type { Project } from '@/data/projects'

const props = defineProps<{
  project: Project | null
}>()

const emit = defineEmits<{
  close: []
}>()

const dialog = ref<HTMLDialogElement | null>(null)
let lastFocused: HTMLElement | null = null

watch(
  () => props.project,
  async (project) => {
    if (project === null) return
    lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    await nextTick()
    dialog.value?.showModal()
  },
)

function requestClose() {
  dialog.value?.close()
}

function handleClosed() {
  lastFocused?.focus()
  lastFocused = null
  emit('close')
}
</script>

<template>
  <dialog
    v-if="project"
    ref="dialog"
    class="w-full max-w-3xl rounded-lg p-0 text-zinc-700"
    aria-labelledby="project-dialog-title"
    @close="handleClosed"
    @click.self="requestClose"
  >
    <div class="flex flex-col">
      <div class="flex items-center justify-between gap-4 border-b border-zinc-200 px-5 py-4">
        <h2 id="project-dialog-title" class="text-lg font-bold text-zinc-900">
          {{ project.title }} <span class="font-normal text-zinc-500">({{ project.id }})</span>
        </h2>
        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          aria-label="Zamknij okno"
          @click="requestClose"
        >
          <X class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <img
        :src="project.image"
        :alt="project.alt"
        class="aspect-3/2 w-full object-cover"
        width="600"
        height="400"
        decoding="async"
      />
      <p class="px-5 py-4 text-sm text-zinc-600">{{ project.description }}</p>
    </div>
  </dialog>
</template>
