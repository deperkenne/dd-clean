// =============================================================================
// backend.types.ts
// -----------------------------------------------------------------------------
// Entités JPA du back-end Spring Boot (Owner, Property, Room, Reservation),
// champ pour champ. Une relation @ManyToOne devient l'identifiant de la ligne
// liée (colonne `owner_id` → `ownerId`). Un champ sans `nullable = false` peut
// valoir `null`.
//
// Ces types remplaceront ceux de `Property.types.ts` (données fictives) quand
// les API réelles seront branchées. Le front recevra les DTO de réponse
// (`*Response`), qui s'appuieront sur ces entités.
// =============================================================================

import type { Decimal, IsoDate, IsoInstant, Uuid } from '@/lib/api.types'

/** Propriétaire (table `owners`). */
export type Owner = {
  id: Uuid
  /** Numéro client métier, visible par la secrétaire (ex. DD-0001). */
  customerId: string
  name: string
  email: string | null
  phone: string | null
  createdAt: IsoInstant
}

/** Logement (table `properties`). */
export type Property = {
  id: Uuid
  ownerId: Uuid
  name: string
  /**
   * Nom exact du logement tel qu'il apparaît dans les e-mails Smoobu, unique
   * dans toute la base : c'est la seule clé de l'e-mail.
   */
  emailLabel: string
  street: string | null
  postalCode: string | null
  city: string | null
}

/** Chambre d'un logement (table `rooms`) ; `number` est unique dans un même logement. */
export type Room = {
  id: Uuid
  propertyId: Uuid
  /** Numéro ou code : « 101 », « 2B », « Mansarde ». */
  number: string
  /** Prix du ménage de la chambre, en euros. */
  price: Decimal
}

/** Statut Smoobu d'une réservation annulée (`Reservation.CANCELLED` côté Java). */
export const RESERVATION_CANCELLED = 'CANCELLED'

/** Réservation Smoobu (table `reservation`). */
export type Reservation = {
  id: number
  /** Nom du logement, ex. "Loft am Pegnitztal Nürnberg". */
  propertyName: string
  /** Prix de la chambre copié au moment de la réservation ; null si la chambre n'est pas connue. */
  price: Decimal | null
  /** Anreise. */
  checkIn: IsoDate
  /** Jour d'arrivée tel qu'écrit dans l'e-mail Smoobu, ex. "Montag". */
  arrivalDay: string | null
  /** Abreise. */
  checkOut: IsoDate
  propertyId: Uuid
  /** Numéro de la chambre réservée, ou "unique" si l'e-mail Smoobu n'en donne pas. */
  roomNumber: string | null
  /** Gast (facultatif, non alimenté par la simulation Smoobu). */
  guestName: string | null
  /** Buchungsnummer, ex. "6041336634" (unique). */
  bookingNumber: string
  /** Gastnachricht (texte libre, ex. note de pré-paiement). */
  guestMessage: string | null
  /** Canal de réservation, ex. "Booking.com", "Airbnb". */
  channel: string | null
  /** Statut Smoobu (texte libre côté back-end), dont `RESERVATION_CANCELLED`. */
  status: string | null
  /** Date de la première annulation ; null si la réservation n'est pas annulée. */
  cancelledAt: IsoInstant | null
}
