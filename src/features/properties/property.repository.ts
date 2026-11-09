// =============================================================================
// property.repository.ts
// -----------------------------------------------------------------------------
// Interface du Repository — contrat unique pour l'accès aux données
// properties/reservations/cleaning jobs, que la source soit fictive (mock) ou
// réelle (API backend branchée sur Smoobu). Les hooks (useProperties.ts, etc.)
// ne dépendent JAMAIS d'une implémentation concrète, seulement de ce contrat.
// Changer de source de données = changer l'implémentation injectée, zéro
// changement dans les hooks ou l'UI (principe Open/Closed).
// =============================================================================

import type {
  Property,
  Reservation,
  CleaningJob,
  Agent,
  Owner,
} from "./Property.types";

export interface PropertyRepository {
  getProperties(): Promise<Property[]>;
  getPropertyById(id: string): Promise<Property | null>;
  getOwnerById(id: string): Promise<Owner | null>;
  getReservationsByPropertyId(propertyId: string): Promise<Reservation[]>;
  getCleaningJobs(): Promise<CleaningJob[]>;
  getCleaningJobsByPropertyId(propertyId: string): Promise<CleaningJob[]>;
  getAgents(): Promise<Agent[]>;
}