export interface ContactFormValues {
  name: string
  email: string
  carType: string
  topic: string
  message: string
  consent: boolean
}

export type ContactFormField = keyof ContactFormValues

export type ContactFormErrors = Partial<Record<ContactFormField, string>>

export const MIN_NAME_LENGTH = 3
export const MIN_MESSAGE_LENGTH = 10
export const MAX_MESSAGE_LENGTH = 1000

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateName(value: string): string | null {
  const trimmed = value.trim()
  if (trimmed.length === 0) return 'Podaj swoje imię i nazwisko.'
  if (trimmed.length < MIN_NAME_LENGTH) return `Imię i nazwisko musi mieć co najmniej ${MIN_NAME_LENGTH} znaki.`
  return null
}

export function validateEmail(value: string): string | null {
  const trimmed = value.trim()
  if (trimmed.length === 0) return 'Podaj swój adres e-mail.'
  if (!EMAIL_PATTERN.test(trimmed)) return 'Podaj poprawny adres e-mail, na przykład jan@example.com.'
  return null
}

export function validateChoice(value: string): string | null {
  return value.length === 0 ? 'Wybierz jedną z opcji z listy.' : null
}

export function validateMessage(value: string): string | null {
  const trimmed = value.trim()
  if (trimmed.length === 0) return 'Napisz kilka słów o swoim samochodzie i oczekiwaniach.'
  if (trimmed.length < MIN_MESSAGE_LENGTH) return `Wiadomość musi mieć co najmniej ${MIN_MESSAGE_LENGTH} znaków.`
  if (trimmed.length > MAX_MESSAGE_LENGTH) return `Wiadomość może mieć najwyżej ${MAX_MESSAGE_LENGTH} znaków.`
  return null
}

export function validateConsent(value: boolean): string | null {
  return value ? null : 'Zaznacz zgodę na przetwarzanie danych, aby wysłać formularz.'
}

const fieldValidators: Record<ContactFormField, (values: ContactFormValues) => string | null> = {
  name: (values) => validateName(values.name),
  email: (values) => validateEmail(values.email),
  carType: (values) => validateChoice(values.carType),
  topic: (values) => validateChoice(values.topic),
  message: (values) => validateMessage(values.message),
  consent: (values) => validateConsent(values.consent),
}

export function validateField(field: ContactFormField, values: ContactFormValues): string | null {
  return fieldValidators[field](values)
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}
  for (const field of Object.keys(fieldValidators) as ContactFormField[]) {
    const error = fieldValidators[field](values)
    if (error !== null) errors[field] = error
  }
  return errors
}
