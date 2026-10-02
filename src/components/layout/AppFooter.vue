<script setup lang="ts">
import { Snowflake } from 'lucide-vue-next'
import { navigationItems } from '@/data/navigation'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-zinc-950 text-zinc-300">
    <div class="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-10 text-center sm:px-6 lg:px-8">
      <p class="flex items-center gap-2 text-lg font-bold text-white">
        <Snowflake class="h-5 w-5 text-sky-400" aria-hidden="true" />
        <span>Ama<span class="text-sky-400">ze</span> Customs</span>
      </p>
      <nav aria-label="Nawigacja w stopce">
        <ul class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <li v-for="item in navigationItems" :key="item.name">
            <RouterLink
              :to="item.to"
              class="flex min-h-11 items-center text-sm font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:text-white [.router-link-exact-active]:text-sky-400"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
      <p class="text-sm text-zinc-400">© {{ year }} Amaze Customs. Wszelkie prawa zastrzeżone.</p>
    </div>
  </footer>
</template>
