<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#main-content"
      class="sr-only z-50 rounded-md bg-sky-700 px-4 py-3 font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
    >
      Przejdź do głównej treści
    </a>
    <AppNavbar />
    <main id="main-content" class="flex-1">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
