import type { Localized } from '@/lib/i18n'

type DepartureDayPageContent = {
  back: string
  eyebrow: string
  loading: string
  error: string
  retry: string
  invalidTitle: string
  invalid: string
  emptyTitle: string
  empty: string
}

export const departureDayPageContent: Localized<DepartureDayPageContent> = {
  fr: {
    back: 'Retour à mes réservations',
    eyebrow: 'Journée de départ',
    loading: 'Chargement des réservations du jour…',
    error: 'Les réservations de ce jour n’ont pas pu être chargées.',
    retry: 'Réessayer',
    invalidTitle: 'Date introuvable',
    invalid: 'Cette adresse ne correspond à aucune date valide.',
    emptyTitle: 'Aucun départ confirmé ce jour-là',
    empty: 'Il n’y a pas, ou plus, de réservation confirmée avec un départ à cette date.',
  },
  de: {
    back: 'Zurück zu meinen Buchungen',
    eyebrow: 'Abreisetag',
    loading: 'Buchungen des Tages werden geladen…',
    error: 'Die Buchungen dieses Tages konnten nicht geladen werden.',
    retry: 'Erneut versuchen',
    invalidTitle: 'Datum nicht gefunden',
    invalid: 'Diese Adresse entspricht keinem gültigen Datum.',
    emptyTitle: 'An diesem Tag keine bestätigte Abreise',
    empty: 'Für dieses Datum gibt es keine (oder keine mehr) bestätigte Buchung mit Abreise.',
  },
  en: {
    back: 'Back to my bookings',
    eyebrow: 'Departure day',
    loading: 'Loading the day’s bookings…',
    error: 'This day’s bookings could not be loaded.',
    retry: 'Try again',
    invalidTitle: 'Date not found',
    invalid: 'This address does not match any valid date.',
    emptyTitle: 'No confirmed departure that day',
    empty: 'There is no (longer any) confirmed booking departing on this date.',
  },
}
