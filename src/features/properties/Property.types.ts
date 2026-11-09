// =============================================================================
// Property.types.ts
// -----------------------------------------------------------------------------
// Types et interfaces du domaine "Properties / Reservations / Cleaning Jobs".
// Aucune implémentation ici — uniquement la forme des données, cohérente avec
// le schéma Postgres défini dans le document d'architecture (tables: owners,
// smoobu_integrations, properties, reservations, cleaning_jobs, job_assignments,
// job_events). Ces types sont partagés par le repository mock ET le futur
// repository API : changer de source de données ne doit jamais obliger à
// changer ces types.
// =============================================================================

/** Rôle interne D&D Clean (back-office), repris de l'architecture globale. */
export type StaffRole = "ADMIN" | "SECRETARY" | "AGENT";

/** Statut d'une réservation, tel que remonté par Smoobu (ou simulé ici). */
export type ReservationStatus =
  | "CONFIRMED"
  | "CANCELLED"
  | "PENDING"
  | "COMPLETED";

/** Statut d'un job de nettoyage planifié pour une propriété donnée. */
export type CleaningJobStatus =
  | "PLANNED"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "DONE"
  | "VERIFIED"
  | "CANCELLED";

/** Type de bien, aligné sur les 6 services réels de D&D Clean. */
export type PropertyServiceType =
  | "AIRBNB"
  | "HOTEL"
  | "OFFICE"
  | "POST_CONSTRUCTION"
  | "CAR"
  | "SOFA";

/** Propriétaire d'un bien (table `owners`), simplifié pour le frontend. */
export interface Owner {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

/** Bien à nettoyer (table `properties`), source Smoobu pour AIRBNB/HOTEL. */
export interface Property {
  id: string;
  ownerId: string;
  serviceType: PropertyServiceType;
  label: string;
  address: string;
  city: string;
  postalCode: string;
  /** Null si le bien n'est pas synchronisé avec Smoobu (ex. bureau, voiture). */
  smoobuPropertyId: string | null;
  notes?: string;
}

/** Réservation liée à une propriété (table `reservations`, source Smoobu). */
export interface Reservation {
  id: string;
  propertyId: string;
  guestName: string;
  checkIn: string; // ISO date
  checkOut: string; // ISO date
  status: ReservationStatus;
  /** Null si la réservation n'a pas encore généré de job de nettoyage. */
  cleaningJobId: string | null;
}

/** Job de nettoyage (table `cleaning_jobs`), au cœur du back-office. */
export interface CleaningJob {
  id: string;
  propertyId: string;
  reservationId: string | null;
  scheduledDate: string; // ISO date
  status: CleaningJobStatus;
  assignedAgentId: string | null;
  estimatedDurationMinutes: number;
}

/** Agent de nettoyage affecté à un job (sous-ensemble de `users`). */
export interface Agent {
  id: string;
  fullName: string;
  role: StaffRole;
  phone: string;
}