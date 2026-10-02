import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const APP_NAME = 'Amaze Customs'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Warsztat, serwis i tuning samochodowy' },
    },
    {
      path: '/o-nas',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { title: 'O nas' },
    },
    {
      path: '/uslugi',
      name: 'services',
      component: () => import('@/views/ServicesView.vue'),
      meta: { title: 'Usługi' },
    },
    {
      path: '/projekty',
      name: 'projects',
      component: () => import('@/views/ProjectsView.vue'),
      meta: { title: 'Projekty' },
    },
    {
      path: '/kontakt',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: { title: 'Kontakt' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/',
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

router.afterEach(async (to) => {
  const pageTitle = to.meta.title
  document.title = pageTitle ? `${pageTitle} | ${APP_NAME}` : APP_NAME
  await nextTick()
  const main = document.getElementById('main-content')
  main?.setAttribute('tabindex', '-1')
  main?.focus({ preventScroll: true })
})

export default router
