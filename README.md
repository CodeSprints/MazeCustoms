# Amaze Customs

Strona warsztatu samochodowego z Krakowa. Projekt powstał na podstawie repozytorium [Xmausix/AmazeCustoms](https://github.com/Xmausix/AmazeCustoms). Oryginał był zbudowany z osobnych plików HTML i Bootstrapa. Ta wersja jest przepisana od zera jako aplikacja Vue.

## Technologie

- Vue 3 z Composition API i `<script setup>`
- TypeScript
- Tailwind CSS 4
- Vue Router
- Vite
- Vitest, Vue Test Utils i happy-dom do testów
- ESLint i Prettier

## Podstrony

- Start: karuzela, specjalności warsztatu, historia firmy
- O nas: opis firmy, wartości, karty atutów
- Usługi: tuning mechaniczny, tuning wizualny, car audio, pakiet All-in-One
- Projekty: dziewięć realizacji z możliwością powiększenia zdjęcia
- Kontakt: dane warsztatu, formularz, mapa dojazdu

## Wymagania

- Node.js 20 lub nowszy
- npm

## Uruchomienie

```
npm install
npm run dev
```

Strona działa pod adresem http://localhost:5173.

## Dostępne polecenia

| Polecenie               | Działanie                                 |
| ----------------------- | ----------------------------------------- |
| `npm run dev`           | uruchamia serwer developerski             |
| `npm run build`         | sprawdza typy i buduje wersję produkcyjną |
| `npm run preview`       | podgląda wersję produkcyjną lokalnie      |
| `npm test`              | uruchamia wszystkie testy raz             |
| `npm run test:watch`    | uruchamia testy w trybie obserwacji       |
| `npm run test:coverage` | uruchamia testy z raportem pokrycia       |
| `npm run lint`          | sprawdza kod za pomocą ESLint             |
| `npm run format`        | formatuje kod za pomocą Prettiera         |
| `npm run type-check`    | sprawdza typy za pomocą vue-tsc           |

## Testy

W projekcie jest 81 test — jednostkowych i komponentowych. Pokrywają one:

- walidację formularza kontaktowego,
- logikę karuzeli,
- zachowanie menu mobilnego,
- otwieranie i zamykanie okna realizacji,
- poprawność widoków i tytułów podstron.

Raport pokrycia generuje polecenie `npm run test:coverage`.

## Struktura projektu

```
src/
  components/   komponenty interfejsu
  composables/  logika karuzeli i formularza
  data/         treści strony jako dane
  router/       konfiguracja tras
  test/         pomocnicze narzędzia testowe
  utils/        walidacja formularza
  views/        podstrony aplikacji
```

## Dostępność

Strona spełnia zasady WCAG 2.1 na poziomie AA w zakresie, który da się sprawdzić w kodzie:

- link „Przejdź do głównej treści" na początku strony,
- poprawna struktura nagłówków i znaczników semantycznych,
- karuzela z przyciskiem pauzy, obsługą klawiatury i respektowaniem ustawienia `prefers-reduced-motion`,
- formularz z etykietami, komunikatami błędów i podsumowaniem błędów,
- kontrasty tekstów sprawdzone wobec poziomu AA,
- widoczny fokus klawiatury i cele dotykowe o wymiarze co najmniej 44 pikseli,
- zdjęcia z sensownymi tekstami alternatywnymi.

## Dane w projekcie

Adres, numer telefonu, adres e-mail i opisy realizacji są przykładowe. Formularz kontaktowy nie wysyła danych na serwer. Symuluje wysyłkę i pokazuje komunikat po stronie przeglądarki. Mapa jest osadzona z Google Maps, więc potrzebuje połączenia z internetem.

## Licencja

MIT. Licencja pochodzi z oryginalnego projektu.
