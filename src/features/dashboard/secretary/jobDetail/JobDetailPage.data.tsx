import type { Localized } from '@/lib/i18n'
import type { BackTarget } from './useJobDetailBackLink'

type JobDetailContent = {
  back: Record<BackTarget, string>
  eyebrow: string
  loading: string
  error: string
  retry: string
  notFoundTitle: string
  notFoundText: string
  intervention: {
    title: string
    duration: string
    agent: string
    unassigned: string
  }
  reservation: {
    title: string
    guest: string
    stay: string
    status: string
    none: string
  }
  property: {
    title: string
    address: string
    service: string
    smoobu: string
    smoobuYes: string
    smoobuNo: string
    notes: string
    missing: string
    viewProperty: string
  }
  owner: {
    title: string
    name: string
    phone: string
    email: string
    missing: string
  }
}

export const jobDetailContent: Localized<JobDetailContent> = {
  fr: {
    back: { overview: "Retour à la vue d'ensemble", planning: 'Retour au planning', agents: 'Retour aux agents', property: 'Retour au bien' },
    eyebrow: 'Job de nettoyage',
    loading: 'Chargement du job…',
    error: "Le job n'a pas pu être chargé.",
    retry: 'Réessayer',
    notFoundTitle: 'Job introuvable',
    notFoundText: "Ce job n'existe pas ou a été supprimé.",
    intervention: {
      title: 'Intervention',
      duration: 'Durée estimée',
      agent: 'Agent',
      unassigned: 'Aucun agent assigné',
    },
    reservation: {
      title: 'Réservation liée',
      guest: 'Voyageur',
      stay: 'Séjour',
      status: 'Statut',
      none: 'Aucune réservation liée : job planifié manuellement.',
    },
    property: {
      title: 'Bien',
      address: 'Adresse',
      service: 'Type de prestation',
      smoobu: 'Smoobu',
      smoobuYes: 'Synchronisé',
      smoobuNo: 'Non synchronisé',
      notes: "Consignes d'accès",
      missing: 'Bien introuvable.',
      viewProperty: 'Voir la fiche du bien',
    },
    owner: {
      title: 'Propriétaire',
      name: 'Nom',
      phone: 'Téléphone',
      email: 'E-mail',
      missing: 'Propriétaire introuvable.',
    },
  },
  de: {
    back: { overview: 'Zurück zum Überblick', planning: 'Zurück zum Wochenplan', agents: 'Zurück zu den Reinigungskräften', property: 'Zurück zum Objekt' },
    eyebrow: 'Reinigungseinsatz',
    loading: 'Einsatz wird geladen…',
    error: 'Der Einsatz konnte nicht geladen werden.',
    retry: 'Erneut versuchen',
    notFoundTitle: 'Einsatz nicht gefunden',
    notFoundText: 'Dieser Einsatz existiert nicht oder wurde gelöscht.',
    intervention: {
      title: 'Einsatz',
      duration: 'Geschätzte Dauer',
      agent: 'Reinigungskraft',
      unassigned: 'Keine Reinigungskraft zugewiesen',
    },
    reservation: {
      title: 'Zugehörige Buchung',
      guest: 'Gast',
      stay: 'Aufenthalt',
      status: 'Status',
      none: 'Keine Buchung verknüpft: manuell geplanter Einsatz.',
    },
    property: {
      title: 'Objekt',
      address: 'Adresse',
      service: 'Leistung',
      smoobu: 'Smoobu',
      smoobuYes: 'Synchronisiert',
      smoobuNo: 'Nicht synchronisiert',
      notes: 'Zugangshinweise',
      missing: 'Objekt nicht gefunden.',
      viewProperty: 'Objektdetails ansehen',
    },
    owner: {
      title: 'Eigentümer',
      name: 'Name',
      phone: 'Telefon',
      email: 'E-Mail',
      missing: 'Eigentümer nicht gefunden.',
    },
  },
  en: {
    back: { overview: 'Back to overview', planning: 'Back to schedule', agents: 'Back to agents', property: 'Back to property' },
    eyebrow: 'Cleaning job',
    loading: 'Loading job…',
    error: 'The job could not be loaded.',
    retry: 'Try again',
    notFoundTitle: 'Job not found',
    notFoundText: 'This job does not exist or has been deleted.',
    intervention: {
      title: 'Visit',
      duration: 'Estimated duration',
      agent: 'Agent',
      unassigned: 'No agent assigned',
    },
    reservation: {
      title: 'Linked booking',
      guest: 'Guest',
      stay: 'Stay',
      status: 'Status',
      none: 'No linked booking: manually scheduled job.',
    },
    property: {
      title: 'Property',
      address: 'Address',
      service: 'Service',
      smoobu: 'Smoobu',
      smoobuYes: 'Synced',
      smoobuNo: 'Not synced',
      notes: 'Access instructions',
      missing: 'Property not found.',
      viewProperty: 'View property details',
    },
    owner: {
      title: 'Owner',
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      missing: 'Owner not found.',
    },
  },
}
