import type { Localized } from '@/lib/i18n'

type PropertyDetailContent = {
  back: string
  eyebrow: string
  loading: string
  error: string
  retry: string
  notFoundTitle: string
  notFoundText: string
  info: {
    title: string
    address: string
    smoobu: string
    smoobuYes: string
    smoobuNo: string
    notes: string
    noNotes: string
  }
  owner: { title: string; name: string; phone: string; email: string; missing: string }
  reservations: {
    title: string
    count: (count: number) => string
    empty: string
    linkedJob: string
    noJob: string
  }
  jobs: {
    upcomingTitle: string
    pastTitle: string
    count: (count: number) => string
    upcomingEmpty: string
    pastEmpty: string
    unassigned: string
  }
}

export const propertyDetailContent: Localized<PropertyDetailContent> = {
  fr: {
    back: "Retour à la vue d'ensemble",
    eyebrow: 'Fiche du bien',
    loading: 'Chargement du bien…',
    error: "Le bien n'a pas pu être chargé.",
    retry: 'Réessayer',
    notFoundTitle: 'Bien introuvable',
    notFoundText: "Ce bien n'existe pas ou a été supprimé.",
    info: {
      title: 'Informations',
      address: 'Adresse',
      smoobu: 'Smoobu',
      smoobuYes: 'Synchronisé',
      smoobuNo: 'Non synchronisé',
      notes: "Consignes d'accès",
      noNotes: 'Aucune consigne particulière',
    },
    owner: { title: 'Propriétaire', name: 'Nom', phone: 'Téléphone', email: 'E-mail', missing: 'Propriétaire introuvable.' },
    reservations: {
      title: 'Réservations',
      count: (count) => `${count} réservation${count > 1 ? 's' : ''}`,
      empty: 'Aucune réservation pour ce bien.',
      linkedJob: 'Voir le job',
      noJob: 'Pas encore de job',
    },
    jobs: {
      upcomingTitle: 'Jobs à venir',
      pastTitle: 'Historique des jobs',
      count: (count) => `${count} job${count > 1 ? 's' : ''}`,
      upcomingEmpty: 'Aucun job prévu pour ce bien.',
      pastEmpty: 'Aucun job passé.',
      unassigned: 'Non assigné',
    },
  },
  de: {
    back: 'Zurück zum Überblick',
    eyebrow: 'Objektdetails',
    loading: 'Objekt wird geladen…',
    error: 'Das Objekt konnte nicht geladen werden.',
    retry: 'Erneut versuchen',
    notFoundTitle: 'Objekt nicht gefunden',
    notFoundText: 'Dieses Objekt existiert nicht oder wurde gelöscht.',
    info: {
      title: 'Informationen',
      address: 'Adresse',
      smoobu: 'Smoobu',
      smoobuYes: 'Synchronisiert',
      smoobuNo: 'Nicht synchronisiert',
      notes: 'Zugangshinweise',
      noNotes: 'Keine besonderen Hinweise',
    },
    owner: { title: 'Eigentümer', name: 'Name', phone: 'Telefon', email: 'E-Mail', missing: 'Eigentümer nicht gefunden.' },
    reservations: {
      title: 'Buchungen',
      count: (count) => `${count} ${count > 1 ? 'Buchungen' : 'Buchung'}`,
      empty: 'Keine Buchungen für dieses Objekt.',
      linkedJob: 'Einsatz ansehen',
      noJob: 'Noch kein Einsatz',
    },
    jobs: {
      upcomingTitle: 'Anstehende Einsätze',
      pastTitle: 'Einsatzverlauf',
      count: (count) => `${count} ${count > 1 ? 'Einsätze' : 'Einsatz'}`,
      upcomingEmpty: 'Für dieses Objekt ist kein Einsatz geplant.',
      pastEmpty: 'Keine vergangenen Einsätze.',
      unassigned: 'Nicht zugewiesen',
    },
  },
  en: {
    back: 'Back to overview',
    eyebrow: 'Property details',
    loading: 'Loading property…',
    error: 'The property could not be loaded.',
    retry: 'Try again',
    notFoundTitle: 'Property not found',
    notFoundText: 'This property does not exist or has been deleted.',
    info: {
      title: 'Information',
      address: 'Address',
      smoobu: 'Smoobu',
      smoobuYes: 'Synced',
      smoobuNo: 'Not synced',
      notes: 'Access instructions',
      noNotes: 'No special instructions',
    },
    owner: { title: 'Owner', name: 'Name', phone: 'Phone', email: 'Email', missing: 'Owner not found.' },
    reservations: {
      title: 'Bookings',
      count: (count) => `${count} booking${count > 1 ? 's' : ''}`,
      empty: 'No bookings for this property.',
      linkedJob: 'View job',
      noJob: 'No job yet',
    },
    jobs: {
      upcomingTitle: 'Upcoming jobs',
      pastTitle: 'Job history',
      count: (count) => `${count} job${count > 1 ? 's' : ''}`,
      upcomingEmpty: 'No job scheduled for this property.',
      pastEmpty: 'No past jobs.',
      unassigned: 'Unassigned',
    },
  },
}
