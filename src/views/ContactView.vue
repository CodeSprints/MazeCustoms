<script setup lang="ts">
import { Mail, MapPin, Phone, Snowflake } from 'lucide-vue-next'
import ContactForm from '@/components/contact/ContactForm.vue'
import PageHero from '@/components/shared/PageHero.vue'
import { companyInfo, mapEmbedUrl, mapLinkUrl } from '@/data/contact'
</script>

<template>
  <PageHero title="Kontakt" image-class="hero-contact" />

  <section class="py-16 md:py-24" aria-labelledby="contact-title">
    <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h2 id="contact-title" class="text-3xl font-bold text-zinc-900 md:text-4xl">Napisz do nas</h2>
        <p class="mt-6">
          Opisz swój samochód i oczekiwania. Odpowiemy w ciągu dwóch dni roboczych i przygotujemy wycenę.
        </p>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-5">
        <div class="flex flex-col gap-6 rounded-lg border border-zinc-200 bg-white p-6 lg:col-span-2">
          <div>
            <h3 class="text-lg font-bold uppercase tracking-wider text-zinc-900">Dane kontaktowe</h3>
            <p class="mt-2 text-sm text-zinc-600">Zadzwoń, napisz albo wpadnij osobiście.</p>
          </div>

          <div class="flex items-start gap-3">
            <MapPin class="mt-1 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
            <div>
              <h4 class="text-sm font-semibold uppercase tracking-wider text-zinc-900">Adres</h4>
              <p class="mt-1">{{ companyInfo.addressLines[0] }}</p>
              <p>{{ companyInfo.addressLines[1] }}</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <Phone class="mt-1 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
            <div>
              <h4 class="text-sm font-semibold uppercase tracking-wider text-zinc-900">Telefon</h4>
              <p class="mt-1">
                <a :href="companyInfo.phoneHref" class="font-semibold text-sky-700 underline hover:text-sky-800">
                  {{ companyInfo.phone }}
                </a>
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <Mail class="mt-1 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
            <div>
              <h4 class="text-sm font-semibold uppercase tracking-wider text-zinc-900">E-mail</h4>
              <p class="mt-1">
                <a :href="companyInfo.emailHref" class="font-semibold text-sky-700 underline hover:text-sky-800">
                  {{ companyInfo.email }}
                </a>
              </p>
            </div>
          </div>

          <p class="mt-auto flex items-center gap-2 border-t border-zinc-200 pt-6 text-lg font-bold text-zinc-900">
            <Snowflake class="h-5 w-5 text-sky-700" aria-hidden="true" />
            <span>Ama<span class="text-sky-700">ze</span> Customs</span>
          </p>
        </div>

        <div class="rounded-lg border border-zinc-200 bg-white p-6 lg:col-span-3">
          <h3 class="mb-6 text-lg font-bold uppercase tracking-wider text-zinc-900">Formularz kontaktowy</h3>
          <ContactForm />
        </div>
      </div>
    </div>
  </section>

  <section class="pb-16 md:pb-24" aria-labelledby="contact-map-title">
    <div class="mx-auto flex w-full max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8">
      <h2 id="contact-map-title" class="text-2xl font-bold text-zinc-900 md:text-3xl">Mapa dojazdu</h2>
      <iframe
        :src="mapEmbedUrl"
        class="mt-8 h-80 w-full rounded-lg border border-zinc-200 md:h-96"
        title="Mapa z dojazdem do siedziby Amaze Customs w Krakowie"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <p class="mt-4 text-sm text-zinc-600">
        Mapa nie działa?
        <a
          :href="mapLinkUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="font-semibold text-sky-700 underline hover:text-sky-800"
        >
          Otwórz ją w Google Maps<span class="sr-only"> (otwiera się w nowej karcie)</span></a
        >.
      </p>
    </div>
  </section>
</template>
