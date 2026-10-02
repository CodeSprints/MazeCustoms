import { createMemoryHistory, createRouter } from 'vue-router'
import type { Router } from 'vue-router'

import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import HomeView from '@/views/HomeView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ServicesView from '@/views/ServicesView.vue'

export const viewRoutes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/o-nas', name: 'about', component: AboutView },
  { path: '/uslugi', name: 'services', component: ServicesView },
  { path: '/projekty', name: 'projects', component: ProjectsView },
  { path: '/kontakt', name: 'contact', component: ContactView },
]

export function createMemoryTestRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: viewRoutes.map((route) => ({ ...route })),
  })
}
