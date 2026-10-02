<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, Snowflake, X } from 'lucide-vue-next'
import { navigationItems } from '@/data/navigation'

const isOpen = ref(false)
const toggleButton = ref<HTMLButtonElement | null>(null)

const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  },
)

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeOnEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false
    toggleButton.value?.focus()
  }
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-zinc-950 text-zinc-100" @keydown="closeOnEscape">
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
      <RouterLink
        to="/"
        class="flex min-h-11 items-center gap-2 rounded-md text-xl font-bold tracking-wide"
        aria-label="Amaze Customs, strona główna"
      >
        <Snowflake class="h-6 w-6 text-sky-400" aria-hidden="true" />
        <span>Ama<span class="text-sky-400">ze</span> Customs</span>
      </RouterLink>

      <nav aria-label="Nawigacja główna" class="hidden lg:block">
        <ul class="flex items-center gap-1">
          <li v-for="item in navigationItems" :key="item.name">
            <RouterLink
              :to="item.to"
              class="flex min-h-11 items-center rounded-md px-3 text-sm font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white [.router-link-exact-active]:bg-zinc-800 [.router-link-exact-active]:text-sky-400"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <button
        ref="toggleButton"
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-md text-zinc-100 transition-colors hover:bg-zinc-800 lg:hidden"
        :aria-expanded="isOpen"
        aria-controls="mobile-menu"
        :aria-label="isOpen ? 'Zamknij menu' : 'Otwórz menu'"
        @click="toggleMenu"
      >
        <X v-if="isOpen" class="h-6 w-6" aria-hidden="true" />
        <Menu v-else class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>

    <nav v-show="isOpen" id="mobile-menu" aria-label="Nawigacja mobilna" class="border-t border-zinc-800 lg:hidden">
      <ul class="mx-auto flex w-full max-w-6xl flex-col px-4 pb-4 pt-2 sm:px-6">
        <li v-for="item in navigationItems" :key="item.name">
          <RouterLink
            :to="item.to"
            class="flex min-h-11 items-center rounded-md px-3 text-base font-semibold uppercase tracking-wider text-zinc-200 transition-colors hover:bg-zinc-800 hover:text-white [.router-link-exact-active]:bg-zinc-800 [.router-link-exact-active]:text-sky-400"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
