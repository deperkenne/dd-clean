import type { StatusTone } from '@/components/common/StatusDot'
import type {
  CleaningJobStatus,
  PropertyServiceType,
  ReservationStatus,
} from '@/features/properties/Property.types'
import type { Localized } from '@/lib/i18n'

/** Couleur d'état de chaque statut de job (toujours affichée avec son libellé). */
export const jobStatusTones: Record<CleaningJobStatus, StatusTone> = {
  PLANNED: 'neutral',
  ASSIGNED: 'info',
  IN_PROGRESS: 'warning',
  DONE: 'success',
  // Vérifié = job clos, plus rien à faire : gris, pour ne pas le confondre avec « Terminé ».
  VERIFIED: 'muted',
  CANCELLED: 'muted',
}

export const jobStatusLabels: Localized<Record<CleaningJobStatus, string>> = {
  fr: {
    PLANNED: 'Planifié',
    ASSIGNED: 'Assigné',
    IN_PROGRESS: 'En cours',
    DONE: 'Terminé',
    VERIFIED: 'Vérifié',
    CANCELLED: 'Annulé',
  },
  de: {
    PLANNED: 'Geplant',
    ASSIGNED: 'Zugewiesen',
    IN_PROGRESS: 'Läuft',
    DONE: 'Erledigt',
    VERIFIED: 'Geprüft',
    CANCELLED: 'Storniert',
  },
  en: {
    PLANNED: 'Planned',
    ASSIGNED: 'Assigned',
    IN_PROGRESS: 'In progress',
    DONE: 'Done',
    VERIFIED: 'Verified',
    CANCELLED: 'Cancelled',
  },
}

export const serviceTypeLabels: Localized<Record<PropertyServiceType, string>> = {
  fr: {
    AIRBNB: 'Airbnb',
    HOTEL: 'Hôtel',
    OFFICE: 'Bureaux',
    POST_CONSTRUCTION: 'Fin de chantier',
    CAR: 'Voiture',
    SOFA: 'Canapé',
  },
  de: {
    AIRBNB: 'Airbnb',
    HOTEL: 'Hotel',
    OFFICE: 'Büro',
    POST_CONSTRUCTION: 'Baureinigung',
    CAR: 'Auto',
    SOFA: 'Sofa',
  },
  en: {
    AIRBNB: 'Airbnb',
    HOTEL: 'Hotel',
    OFFICE: 'Office',
    POST_CONSTRUCTION: 'Post-construction',
    CAR: 'Car',
    SOFA: 'Sofa',
  },
}

export const reservationStatusTones: Record<ReservationStatus, StatusTone> = {
  PENDING: 'warning',
  CONFIRMED: 'info',
  COMPLETED: 'muted',
  CANCELLED: 'muted',
}

export const reservationStatusLabels: Localized<Record<ReservationStatus, string>> = {
  fr: { PENDING: 'En attente', CONFIRMED: 'Confirmée', COMPLETED: 'Terminée', CANCELLED: 'Annulée' },
  de: { PENDING: 'Ausstehend', CONFIRMED: 'Bestätigt', COMPLETED: 'Abgeschlossen', CANCELLED: 'Storniert' },
  en: { PENDING: 'Pending', CONFIRMED: 'Confirmed', COMPLETED: 'Completed', CANCELLED: 'Cancelled' },
}
