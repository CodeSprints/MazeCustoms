<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { CircleCheck } from 'lucide-vue-next'
import { useContactForm } from '@/composables/useContactForm'
import { carTypeOptions, topicOptions } from '@/data/contact'
import type { ContactFormField } from '@/utils/validation'

const submitDelayMs = 800

async function send() {
  await new Promise((resolve) => setTimeout(resolve, submitDelayMs))
}

const {
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
} = useContactForm(send)

const summary = ref<HTMLDivElement | null>(null)
const successPanel = ref<HTMLDivElement | null>(null)

const fieldIds: Record<ContactFormField, string> = {
  name: 'contact-name',
  email: 'contact-email',
  carType: 'contact-car-type',
  topic: 'contact-topic',
  message: 'contact-message',
  consent: 'contact-consent',
}

const fieldLabels: Record<ContactFormField, string> = {
  name: 'Imię i nazwisko',
  email: 'Adres e-mail',
  carType: 'Rodzaj samochodu',
  topic: 'Temat wiadomości',
  message: 'Treść wiadomości',
  consent: 'Zgoda na przetwarzanie danych',
}

const inputClasses =
  'min-h-11 w-full rounded-md border bg-white px-3 py-2 text-base text-zinc-900 transition-colors placeholder:text-zinc-500 focus:border-sky-600 aria-invalid:border-red-700'

async function handleSubmit() {
  const sent = await submitForm()
  await nextTick()
  if (sent) successPanel.value?.focus()
  else summary.value?.focus()
}

function focusField(field: ContactFormField, event: Event) {
  event.preventDefault()
  document.getElementById(fieldIds[field])?.focus()
}
</script>

<template>
  <form class="flex flex-col gap-6" novalidate @submit.prevent="handleSubmit">
    <div
      v-if="submitRejected && errorList.length > 0"
      ref="summary"
      role="alert"
      tabindex="-1"
      class="rounded-md border border-red-300 bg-red-50 p-4"
    >
      <h3 class="text-base font-bold text-red-800">Nie udało się wysłać wiadomości</h3>
      <p class="mt-1 text-sm text-red-700">Popraw następujące pola:</p>
      <ul class="mt-2 list-inside list-disc text-sm text-red-700">
        <li v-for="error in errorList" :key="error.field">
          <a :href="`#${fieldIds[error.field]}`" class="underline" @click="focusField(error.field, $event)">
            {{ fieldLabels[error.field] }}: {{ error.message }}
          </a>
        </li>
      </ul>
    </div>

    <div
      v-if="submitted"
      ref="successPanel"
      role="status"
      tabindex="-1"
      class="rounded-md border border-green-300 bg-green-50 p-4"
    >
      <p class="flex items-center gap-2 text-base font-bold text-green-800">
        <CircleCheck class="h-5 w-5" aria-hidden="true" />
        Dziękujemy za wiadomość
      </p>
      <p class="mt-1 text-sm text-green-800">
        Odezwiemy się w ciągu dwóch dni roboczych. Jeśli sprawa jest pilna, zadzwoń do nas.
      </p>
      <button
        type="button"
        class="mt-3 min-h-11 rounded-md border border-green-700 px-4 text-sm font-semibold uppercase tracking-wider text-green-900 transition-colors hover:bg-green-100"
        @click="resetStatus"
      >
        Wyślij kolejną wiadomość
      </button>
    </div>

    <div class="grid gap-6 sm:grid-cols-2">
      <div>
        <label for="contact-name" class="mb-1 block text-sm font-semibold text-zinc-900">
          Imię i nazwisko <span class="text-sky-700" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          v-model="values.name"
          type="text"
          name="name"
          autocomplete="name"
          required
          :class="inputClasses"
          :aria-invalid="errors.name ? 'true' : undefined"
          :aria-describedby="errors.name ? 'contact-name-error' : undefined"
          @blur="validateOnBlur('name')"
          @input="validateOnInput('name')"
        />
        <p v-if="errors.name" id="contact-name-error" class="mt-1 text-sm text-red-700">
          {{ errors.name }}
        </p>
      </div>

      <div>
        <label for="contact-email" class="mb-1 block text-sm font-semibold text-zinc-900">
          Adres e-mail <span class="text-sky-700" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          v-model="values.email"
          type="email"
          name="email"
          autocomplete="email"
          required
          :class="inputClasses"
          :aria-invalid="errors.email ? 'true' : undefined"
          :aria-describedby="errors.email ? 'contact-email-error' : undefined"
          @blur="validateOnBlur('email')"
          @input="validateOnInput('email')"
        />
        <p v-if="errors.email" id="contact-email-error" class="mt-1 text-sm text-red-700">
          {{ errors.email }}
        </p>
      </div>

      <div>
        <label for="contact-car-type" class="mb-1 block text-sm font-semibold text-zinc-900">
          Jaki posiadasz samochód? <span class="text-sky-700" aria-hidden="true">*</span>
        </label>
        <select
          id="contact-car-type"
          v-model="values.carType"
          name="carType"
          required
          :class="inputClasses"
          :aria-invalid="errors.carType ? 'true' : undefined"
          :aria-describedby="errors.carType ? 'contact-car-type-error' : undefined"
          @blur="validateOnBlur('carType')"
          @change="validateOnInput('carType')"
        >
          <option value="">Wybierz z listy</option>
          <option v-for="option in carTypeOptions" :key="option" :value="option">{{ option }}</option>
        </select>
        <p v-if="errors.carType" id="contact-car-type-error" class="mt-1 text-sm text-red-700">
          {{ errors.carType }}
        </p>
      </div>

      <div>
        <label for="contact-topic" class="mb-1 block text-sm font-semibold text-zinc-900">
          W jakiej sprawie piszesz? <span class="text-sky-700" aria-hidden="true">*</span>
        </label>
        <select
          id="contact-topic"
          v-model="values.topic"
          name="topic"
          required
          :class="inputClasses"
          :aria-invalid="errors.topic ? 'true' : undefined"
          :aria-describedby="errors.topic ? 'contact-topic-error' : undefined"
          @blur="validateOnBlur('topic')"
          @change="validateOnInput('topic')"
        >
          <option value="">Wybierz z listy</option>
          <option v-for="option in topicOptions" :key="option" :value="option">{{ option }}</option>
        </select>
        <p v-if="errors.topic" id="contact-topic-error" class="mt-1 text-sm text-red-700">
          {{ errors.topic }}
        </p>
      </div>
    </div>

    <div>
      <label for="contact-message" class="mb-1 block text-sm font-semibold text-zinc-900">
        Treść wiadomości <span class="text-sky-700" aria-hidden="true">*</span>
      </label>
      <textarea
        id="contact-message"
        v-model="values.message"
        name="message"
        rows="6"
        required
        :class="inputClasses"
        class="min-h-28"
        :aria-invalid="errors.message ? 'true' : undefined"
        :aria-describedby="errors.message ? 'contact-message-error' : undefined"
        @blur="validateOnBlur('message')"
        @input="validateOnInput('message')"
      ></textarea>
      <p v-if="errors.message" id="contact-message-error" class="mt-1 text-sm text-red-700">
        {{ errors.message }}
      </p>
    </div>

    <div>
      <div class="flex items-start gap-3">
        <input
          id="contact-consent"
          v-model="values.consent"
          type="checkbox"
          name="consent"
          required
          class="mt-1 h-5 w-5 rounded border-zinc-300 text-sky-700 accent-sky-700"
          :aria-invalid="errors.consent ? 'true' : undefined"
          :aria-describedby="errors.consent ? 'contact-consent-error' : undefined"
          @blur="validateOnBlur('consent')"
          @change="validateOnInput('consent')"
        />
        <label for="contact-consent" class="text-sm text-zinc-600">
          Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na wiadomość.
          <span class="text-sky-700" aria-hidden="true">*</span>
        </label>
      </div>
      <p v-if="errors.consent" id="contact-consent-error" class="mt-1 text-sm text-red-700">
        {{ errors.consent }}
      </p>
    </div>

    <p class="text-sm text-zinc-500">Pola oznaczone gwiazdką są wymagane.</p>

    <div>
      <button
        type="submit"
        class="min-h-11 rounded-md bg-sky-700 px-6 text-base font-semibold uppercase tracking-wider text-white transition-colors hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="submitting"
      >
        {{ submitting ? 'Wysyłanie…' : 'Wyślij wiadomość' }}
      </button>
    </div>
  </form>
</template>
