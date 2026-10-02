export type AboutIcon = 'building' | 'trophy' | 'tag' | 'gem' | 'credit-card' | 'thumbs-up'

export interface AboutCard {
  icon: AboutIcon
  heading: string
}

export const aboutCards: AboutCard[] = [
  { icon: 'building', heading: 'Dobra lokalizacja' },
  { icon: 'trophy', heading: 'Wiele osiągnięć' },
  { icon: 'tag', heading: 'Niskie ceny' },
  { icon: 'gem', heading: 'Wysoka jakość' },
  { icon: 'credit-card', heading: 'Wiele metod płatności' },
  { icon: 'thumbs-up', heading: 'Wysokie oceny klientów' },
]
