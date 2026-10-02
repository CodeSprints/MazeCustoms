export type FeatureIcon = 'wrench' | 'flame' | 'cog'

export interface CarouselSlide {
  heading: string
  description: string
  imageClass: string
}

export interface HomeFeature {
  icon: FeatureIcon
  heading: string
  description: string
}

export const carouselSlides: CarouselSlide[] = [
  {
    heading: 'Samochody to nasza pasja',
    description: 'Tuning, serwis i dbałość o każdy detal. Opiekujemy się autami od 1999 roku.',
    imageClass: 'hero-slide-1',
  },
  {
    heading: 'Moc, którą czujesz za kierownicą',
    description: 'Tuning mechaniczny silnika, hamulców i zawieszenia według Twoich potrzeb.',
    imageClass: 'hero-slide-2',
  },
  {
    heading: 'Styl, który wyróżnia na drodze',
    description: 'Projekty wizualne szyte na miarę Twojego samochodu i budżetu.',
    imageClass: 'hero-slide-3',
  },
]

export const homeFeatures: HomeFeature[] = [
  {
    icon: 'wrench',
    heading: 'Serwis',
    description: 'Serwis to nasza specjalność. Diagnozujemy usterki i naprawiamy na miejscu.',
  },
  {
    icon: 'flame',
    heading: 'Wymiana oleju?',
    description: 'U nas to żaden problem. Umów wizytę telefonicznie albo przez formularz.',
  },
  {
    icon: 'cog',
    heading: 'Customowy tuning?',
    description: 'Zrobimy go od ręki. Mechanika, wygląd i car audio w jednym warsztacie.',
  },
]
