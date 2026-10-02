import { computed, reactive, ref } from 'vue'

import {
  validateContactForm,
  validateField,
  type ContactFormErrors,
  type ContactFormField,
  type ContactFormValues,
} from '@/utils/validation'

export type ContactFormSubmitter = (values: ContactFormValues) => Promise<void>

function createEmptyValues(): ContactFormValues {
  return { name: '', email: '', carType: '', topic: '', message: '', consent: false }
}

export function useContactForm(send: ContactFormSubmitter) {
  const values = reactive<ContactFormValues>(createEmptyValues())
  const errors = ref<ContactFormErrors>({})
  const submitting = ref(false)
  const submitted = ref(false)
  const submitRejected = ref(false)

  const errorList = computed(() =>
    Object.entries(errors.value).map(([field, message]) => ({
      field: field as ContactFormField,
      message: message as string,
    })),
  )

  function setFieldError(field: ContactFormField, error: string | null) {
    const nextErrors = { ...errors.value }
    if (error === null) delete nextErrors[field]
    else nextErrors[field] = error
    errors.value = nextErrors
  }

  function validateOnBlur(field: ContactFormField) {
    setFieldError(field, validateField(field, values))
  }

  function validateOnInput(field: ContactFormField) {
    if (errors.value[field] !== undefined) setFieldError(field, validateField(field, values))
  }

  async function submitForm(): Promise<boolean> {
    if (submitting.value) return false
    errors.value = validateContactForm(values)
    if (Object.keys(errors.value).length > 0) {
      submitRejected.value = true
      return false
    }
    submitting.value = true
    try {
      await send({ ...values })
      submitted.value = true
      submitRejected.value = false
      Object.assign(values, createEmptyValues())
      errors.value = {}
      return true
    } finally {
      submitting.value = false
    }
  }

  function resetStatus() {
    submitted.value = false
    submitRejected.value = false
  }

  return {
    values,
    errors,
    errorList,
    submitting,
    submitted,
    submitRejected,
    validateOnBlur,
    validateOnInput,
    submitForm,
    resetStatus,
  }
}
