import { describe, expect, it } from 'vitest'

import {
  MAX_MESSAGE_LENGTH,
  MIN_MESSAGE_LENGTH,
  MIN_NAME_LENGTH,
  validateChoice,
  validateConsent,
  validateContactForm,
  validateEmail,
  validateField,
  validateMessage,
  validateName,
  type ContactFormValues,
} from './validation'

const validValues: ContactFormValues = {
  name: 'Jan Kowalski',
  email: 'jan@example.com',
  carType: 'Sportowy',
  topic: 'Tuning mechaniczny',
  message: 'Proszę o wycenę tuningu silnika.',
  consent: true,
}

describe('validateName', () => {
  it('zwraca błąd dla pustego pola', () => {
    expect(validateName('')).toBe('Podaj swoje imię i nazwisko.')
  })

  it('zwraca błąd dla samych białych znaków', () => {
    expect(validateName('   ')).toBe('Podaj swoje imię i nazwisko.')
  })

  it('zwraca błąd dla zbyt krótkiej wartości', () => {
    expect(validateName('Ja')).toBe(`Imię i nazwisko musi mieć co najmniej ${MIN_NAME_LENGTH} znaki.`)
  })

  it('akceptuje poprawne imię i nazwisko', () => {
    expect(validateName('Jan Kowalski')).toBeNull()
  })

  it('ignoruje białe znaki na brzegach', () => {
    expect(validateName('  Jan Kowalski  ')).toBeNull()
  })
})

describe('validateEmail', () => {
  it('zwraca błąd dla pustego pola', () => {
    expect(validateEmail('')).toBe('Podaj swój adres e-mail.')
  })

  it('zwraca błąd dla adresu bez domeny', () => {
    expect(validateEmail('jan@example')).toBeTypeOf('string')
  })

  it('zwraca błąd dla adresu bez znaku małpy', () => {
    expect(validateEmail('jan.example.com')).toBeTypeOf('string')
  })

  it('zwraca błąd dla adresu ze spacją', () => {
    expect(validateEmail('jan kowalski@example.com')).toBeTypeOf('string')
  })

  it('akceptuje poprawny adres e-mail', () => {
    expect(validateEmail('jan.kowalski@example.com')).toBeNull()
  })

  it('akceptuje adres z wielkimi literami po usunięciu białych znaków', () => {
    expect(validateEmail('  Jan@Example.com ')).toBeNull()
  })
})

describe('validateChoice', () => {
  it('zwraca błąd dla pustego wyboru', () => {
    expect(validateChoice('')).toBe('Wybierz jedną z opcji z listy.')
  })

  it('akceptuje dowolną wybraną opcję', () => {
    expect(validateChoice('Sportowy')).toBeNull()
  })
})

describe('validateMessage', () => {
  it('zwraca błąd dla pustej wiadomości', () => {
    expect(validateMessage('')).toBeTypeOf('string')
  })

  it('zwraca błąd dla zbyt krótkiej wiadomości', () => {
    const message = 'a'.repeat(MIN_MESSAGE_LENGTH - 1)
    expect(validateMessage(message)).toBe(`Wiadomość musi mieć co najmniej ${MIN_MESSAGE_LENGTH} znaków.`)
  })

  it('akceptuje wiadomość o minimalnej długości', () => {
    const message = 'a'.repeat(MIN_MESSAGE_LENGTH)
    expect(validateMessage(message)).toBeNull()
  })

  it('akceptuje wiadomość o maksymalnej długości', () => {
    const message = 'a'.repeat(MAX_MESSAGE_LENGTH)
    expect(validateMessage(message)).toBeNull()
  })

  it('zwraca błąd dla wiadomości powyżej maksymalnej długości', () => {
    const message = 'a'.repeat(MAX_MESSAGE_LENGTH + 1)
    expect(validateMessage(message)).toBe(`Wiadomość może mieć najwyżej ${MAX_MESSAGE_LENGTH} znaków.`)
  })
})

describe('validateConsent', () => {
  it('zwraca błąd dla braku zgody', () => {
    expect(validateConsent(false)).toBeTypeOf('string')
  })

  it('akceptuje zaznaczoną zgodę', () => {
    expect(validateConsent(true)).toBeNull()
  })
})

describe('validateContactForm', () => {
  it('nie zwraca błędów dla poprawnych danych', () => {
    expect(validateContactForm(validValues)).toEqual({})
  })

  it('zwraca błąd dla każdego pola przy pustym formularzu', () => {
    const errors = validateContactForm({
      name: '',
      email: '',
      carType: '',
      topic: '',
      message: '',
      consent: false,
    })
    expect(Object.keys(errors)).toHaveLength(6)
  })

  it('zwraca błąd tylko dla wadliwych pól', () => {
    const errors = validateContactForm({ ...validValues, email: 'jan@' })
    expect(Object.keys(errors)).toEqual(['email'])
  })
})

describe('validateField', () => {
  it('waliduje pojedyncze pole formularza', () => {
    expect(validateField('name', validValues)).toBeNull()
    expect(validateField('name', { ...validValues, name: '' })).toBeTypeOf('string')
  })

  it('waliduje zgodę na podstawie wartości logicznej', () => {
    expect(validateField('consent', { ...validValues, consent: false })).toBeTypeOf('string')
  })
})
