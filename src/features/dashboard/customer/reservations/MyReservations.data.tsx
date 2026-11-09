import type { Localized } from '@/lib/i18n'

type MyReservationsContent = {
  eyebrow: string
  title: string
  count: (count: number) => string
  lead: string
  upcomingTitle: string
  pastTitle: string
  noUpcoming: string
  today: string
  tomorrow: string
  departures: (count: number) => string
  departuresUnit: (count: number) => string
  filterLabel: (day: string) => string
  allProperties: string
  openDay: (day: string) => string
  seeDay: string
  loading: string
  empty: string
  error: string
  retry: string
  columns: { booking: string; property: string; room: string; stay: string; price: string; status: string }
  roomNumber: (number: string) => string
  uniqueRoom: string
  noRoom: string
  nights: (count: number) => string
  smoobuDay: (day: string) => string
  noPrice: string
  active: string
  cancelled: string
  cancelledOn: (date: string) => string
}

export const myReservationsContent: Localized<MyReservationsContent> = {
  fr: {
    eyebrow: 'Mes réservations',
    title: 'Vos départs, jour par jour',
    count: (count) => (count === 0 ? 'Aucune' : count === 1 ? '1 réservation confirmée' : `${count} réservations confirmées`),
    lead: 'Les réservations confirmées, regroupées par date de départ, tous propriétaires confondus. Une réservation annulée disparaît de son jour.',
    upcomingTitle: 'Départs à venir',
    pastTitle: 'Départs passés',
    noUpcoming: 'Aucun départ à venir pour l’instant.',
    today: 'Aujourd’hui',
    tomorrow: 'Demain',
    departures: (count) => (count === 1 ? '1 départ' : `${count} départs`),
    departuresUnit: (count) => (count === 1 ? 'départ' : 'départs'),
    filterLabel: (day) => `Filtrer les départs du ${day} par logement`,
    allProperties: 'Tous les logements',
    openDay: (day) => `Voir toutes les réservations du ${day}`,
    seeDay: 'Voir la journée',
    loading: 'Chargement de vos réservations…',
    empty: 'Aucune réservation confirmée pour l’instant. Elles apparaîtront ici dès que Smoobu les transmet pour vos logements.',
    error: 'Vos réservations n’ont pas pu être chargées.',
    retry: 'Réessayer',
    columns: { booking: 'Réservation', property: 'Logement', room: 'Chambre', stay: 'Séjour', price: 'Prix', status: 'Statut' },
    roomNumber: (number) => `N° ${number}`,
    uniqueRoom: 'Unique',
    noRoom: 'Non renseignée',
    nights: (count) => (count === 1 ? '1 nuit' : `${count} nuits`),
    smoobuDay: (day) => `Arrivée Smoobu : ${day}`,
    noPrice: 'Prix non renseigné',
    active: 'Active',
    cancelled: 'Annulée',
    cancelledOn: (date) => `Annulée le ${date}`,
  },
  de: {
    eyebrow: 'Meine Buchungen',
    title: 'Ihre Abreisen, Tag für Tag',
    count: (count) => (count === 0 ? 'Keine' : count === 1 ? '1 bestätigte Buchung' : `${count} bestätigte Buchungen`),
    lead: 'Die bestätigten Buchungen, nach Abreisedatum gruppiert, über alle Eigentümer hinweg. Eine stornierte Buchung verschwindet aus ihrem Tag.',
    upcomingTitle: 'Kommende Abreisen',
    pastTitle: 'Vergangene Abreisen',
    noUpcoming: 'Derzeit keine kommenden Abreisen.',
    today: 'Heute',
    tomorrow: 'Morgen',
    departures: (count) => (count === 1 ? '1 Abreise' : `${count} Abreisen`),
    departuresUnit: (count) => (count === 1 ? 'Abreise' : 'Abreisen'),
    filterLabel: (day) => `Abreisen am ${day} nach Unterkunft filtern`,
    allProperties: 'Alle Unterkünfte',
    openDay: (day) => `Alle Buchungen am ${day} ansehen`,
    seeDay: 'Tag ansehen',
    loading: 'Ihre Buchungen werden geladen…',
    empty: 'Noch keine bestätigten Buchungen. Sie erscheinen hier, sobald Smoobu sie für Ihre Unterkünfte übermittelt.',
    error: 'Ihre Buchungen konnten nicht geladen werden.',
    retry: 'Erneut versuchen',
    columns: { booking: 'Buchung', property: 'Unterkunft', room: 'Zimmer', stay: 'Aufenthalt', price: 'Preis', status: 'Status' },
    roomNumber: (number) => `Nr. ${number}`,
    uniqueRoom: 'Einzige',
    noRoom: 'Nicht angegeben',
    nights: (count) => (count === 1 ? '1 Nacht' : `${count} Nächte`),
    smoobuDay: (day) => `Smoobu-Anreise: ${day}`,
    noPrice: 'Kein Preis angegeben',
    active: 'Aktiv',
    cancelled: 'Storniert',
    cancelledOn: (date) => `Storniert am ${date}`,
  },
  en: {
    eyebrow: 'My bookings',
    title: 'Your departures, day by day',
    count: (count) => (count === 0 ? 'None' : count === 1 ? '1 confirmed booking' : `${count} confirmed bookings`),
    lead: 'Confirmed bookings, grouped by departure date across all owners. A cancelled booking drops out of its day.',
    upcomingTitle: 'Upcoming departures',
    pastTitle: 'Past departures',
    noUpcoming: 'No upcoming departures for now.',
    today: 'Today',
    tomorrow: 'Tomorrow',
    departures: (count) => (count === 1 ? '1 departure' : `${count} departures`),
    departuresUnit: (count) => (count === 1 ? 'departure' : 'departures'),
    filterLabel: (day) => `Filter departures on ${day} by property`,
    allProperties: 'All properties',
    openDay: (day) => `View all bookings on ${day}`,
    seeDay: 'View day',
    loading: 'Loading your bookings…',
    empty: 'No confirmed bookings yet. They will appear here as soon as Smoobu sends them for your properties.',
    error: 'Your bookings could not be loaded.',
    retry: 'Try again',
    columns: { booking: 'Booking', property: 'Property', room: 'Room', stay: 'Stay', price: 'Price', status: 'Status' },
    roomNumber: (number) => `No. ${number}`,
    uniqueRoom: 'Single',
    noRoom: 'Not provided',
    nights: (count) => (count === 1 ? '1 night' : `${count} nights`),
    smoobuDay: (day) => `Smoobu arrival: ${day}`,
    noPrice: 'No price set',
    active: 'Active',
    cancelled: 'Cancelled',
    cancelledOn: (date) => `Cancelled on ${date}`,
  },
}
