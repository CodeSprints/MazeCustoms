export interface NavigationItem {
  label: string
  to: string
  name: string
}

export const navigationItems: NavigationItem[] = [
  { label: 'Start', to: '/', name: 'home' },
  { label: 'O nas', to: '/o-nas', name: 'about' },
  { label: 'Usługi', to: '/uslugi', name: 'services' },
  { label: 'Projekty', to: '/projekty', name: 'projects' },
  { label: 'Kontakt', to: '/kontakt', name: 'contact' },
]
