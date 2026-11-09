// =============================================================================
// property.repository.api.ts
// -----------------------------------------------------------------------------
// STUB — implémentation réelle, à écrire quand l'accès Smoobu/backend sera
// disponible. Respecte EXACTEMENT le même contrat (PropertyRepository) que
// property.repository.mock.ts : aucun hook ni composant UI n'aura à changer
// le jour où on bascule de l'un à l'autre (voir property.repository.index.ts
// pour le point d'injection unique).
//
// Ne pas implémenter avant que l'architecture d'appel backend (base URL,
// client HTTP, gestion des erreurs/auth) soit confirmée — ce fichier existe
// pour que le contrat soit visible dès maintenant, pas pour être codé en dur
// à la hâte.
// =============================================================================

import type { PropertyRepository } from "./property.repository";

export class PropertyRepositoryApi implements PropertyRepository {
  getProperties: PropertyRepository["getProperties"] = () => {
    throw new Error(
      "PropertyRepositoryApi.getProperties: pas encore implémenté — en attente de l'accès backend/Smoobu."
    );
  };

  getPropertyById: PropertyRepository["getPropertyById"] = () => {
    throw new Error(
      "PropertyRepositoryApi.getPropertyById: pas encore implémenté."
    );
  };

  getOwnerById: PropertyRepository["getOwnerById"] = () => {
    throw new Error(
      "PropertyRepositoryApi.getOwnerById: pas encore implémenté."
    );
  };

  getReservationsByPropertyId: PropertyRepository["getReservationsByPropertyId"] =
    () => {
      throw new Error(
        "PropertyRepositoryApi.getReservationsByPropertyId: pas encore implémenté."
      );
    };

  getCleaningJobs: PropertyRepository["getCleaningJobs"] = () => {
    throw new Error(
      "PropertyRepositoryApi.getCleaningJobs: pas encore implémenté."
    );
  };

  getCleaningJobsByPropertyId: PropertyRepository["getCleaningJobsByPropertyId"] =
    () => {
      throw new Error(
        "PropertyRepositoryApi.getCleaningJobsByPropertyId: pas encore implémenté."
      );
    };

  getAgents: PropertyRepository["getAgents"] = () => {
    throw new Error("PropertyRepositoryApi.getAgents: pas encore implémenté.");
  };

  assignAgent: PropertyRepository["assignAgent"] = () => {
    throw new Error("PropertyRepositoryApi.assignAgent: pas encore implémenté.");
  };

  updateJobStatus: PropertyRepository["updateJobStatus"] = () => {
    throw new Error("PropertyRepositoryApi.updateJobStatus: pas encore implémenté.");
  };
}