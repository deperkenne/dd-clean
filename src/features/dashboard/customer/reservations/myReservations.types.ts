/** Une réservation prête à afficher : textes déjà formatés dans la langue active. */
export type ReservationView = {
  id: number
  bookingReference: string
  channel?: string
  propertyId: string
  propertyName: string
  /** Numéro de chambre, `whole` si Smoobu n'en donne pas (logement entier), absent si inconnu. */
  room?: string | 'whole'
  ownerCustomerId: string
  /** « ven. 7 nov. » */
  arrival: string
  departure: string
  nights: number
  /** Jour d'arrivée tel qu'écrit dans l'e-mail Smoobu (ex. « Montag »), si présent. */
  arrivalDay?: string
  /** « 45,50 € » ; absent si le prix n'est pas connu. */
  price?: string
  cancelled: boolean
  /** « 3 nov. » ; date de l'annulation, si connue. */
  cancelledOn?: string
}

/** Toutes les réservations confirmées qui partent le même jour, tous propriétaires confondus. */
export type DepartureDay = {
  /** Jour de départ ISO, "2026-11-03" (sert de clé). */
  date: string
  /** « lundi » */
  weekday: string
  /** « 3 novembre 2026 » */
  fullDate: string
  /** Repère pour les deux prochains jours. */
  relative?: 'today' | 'tomorrow'
  reservations: ReservationView[]
}

/** Jours de départ, à venir (le plus proche d'abord) puis passés (le plus récent d'abord). */
export type DepartureSchedule = {
  upcoming: DepartureDay[]
  past: DepartureDay[]
  /** Nombre total de réservations confirmées classées. */
  total: number
}

/** Un choix du filtre « logement » d'un jour de départ. */
export type PropertyFilterOption = {
  propertyId: string
  propertyName: string
  /** Nombre de départs de ce logement ce jour-là. */
  count: number
}
