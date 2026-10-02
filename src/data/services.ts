export interface Service {
  title: string
  description: string
  imageClass: string
}

export const services: Service[] = [
  {
    title: 'Tuning mechaniczny',
    description:
      'Chip tuning, modyfikacje silnika, hamulców i zawieszenia. Zwiększamy moc i poprawiamy prowadzenie auta.',
    imageClass: 'service-mechanical',
  },
  {
    title: 'Tuning wizualny',
    description:
      'Oklejanie folią, lakierowanie, karbon i usportowienie nadwozia. Projekt wyglądu przygotowujemy razem z Tobą.',
    imageClass: 'service-visual',
  },
  {
    title: 'Car audio',
    description: 'Nagłośnienie na wymiar: głośniki, wzmacniacze i subwoofery oraz dobra izolacja akustyczna.',
    imageClass: 'service-audio',
  },
  {
    title: 'Pakiet All-in-One',
    description: 'Kompleksowa przebudowa auta: mechanika, wygląd i audio w jednym projekcie i jednym terminie.',
    imageClass: 'service-allinone',
  },
]
