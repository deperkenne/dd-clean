// =============================================================================
// property.repository.mock.ts
// -----------------------------------------------------------------------------
// Implémentation FICTIVE du PropertyRepository. Utilisée pendant que l'accès
// Smoobu/backend n'est pas encore disponible. Simule une latence réseau
// réaliste (setTimeout) pour que le code appelant (hooks TanStack Query, états
// de chargement dans l'UI) se comporte exactement comme avec une vraie API —
// aucune surprise le jour où on bascule sur property.repository.api.ts.
// =============================================================================

import type { PropertyRepository } from "./property.repository";
import {
  mockProperties,
  mockOwners,
  mockReservations,
  mockCleaningJobs,
  mockAgents,
} from "./MockProperties";
import type { CleaningJobStatus } from "./Property.types";
import {
  canAssignAgent,
  canSecretaryChangeStatus,
  withAssignedAgent,
  withStatus,
} from "./cleaningJob.rules";

/** Petite latence simulée, pour reproduire le comportement d'un vrai réseau. */
function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export class PropertyRepositoryMock implements PropertyRepository {
  /**
   * Copie de travail des jobs : les écritures (assignation…) la modifient
   * pendant la session, sans toucher aux données fictives d'origine. Chaque
   * lecture renvoie de nouveaux objets, comme le ferait une vraie API — sinon
   * TanStack Query ne verrait pas les changements.
   */
  private jobs = mockCleaningJobs.map((job) => ({ ...job }));

  async getProperties() {
    return delay(mockProperties);
  }

  async getPropertyById(id: string) {
    return delay(mockProperties.find((p) => p.id === id) ?? null);
  }

  async getOwnerById(id: string) {
    return delay(mockOwners.find((o) => o.id === id) ?? null);
  }

  async getReservationsByPropertyId(propertyId: string) {
    return delay(
      mockReservations.filter((r) => r.propertyId === propertyId)
    );
  }

  async getCleaningJobs() {
    return delay(this.jobs.map((job) => ({ ...job })));
  }

  async getCleaningJobsByPropertyId(propertyId: string) {
    return delay(
      this.jobs.filter((j) => j.propertyId === propertyId).map((job) => ({ ...job }))
    );
  }

  async getAgents() {
    return delay(mockAgents);
  }

  async assignAgent(jobId: string, agentId: string | null) {
    await delay(null);
    const index = this.jobs.findIndex((job) => job.id === jobId);
    if (index === -1) throw new Error(`Job ${jobId} introuvable.`);
    if (!canAssignAgent(this.jobs[index].status)) {
      throw new Error(`Le job ${jobId} a déjà commencé : assignation impossible.`);
    }
    if (agentId && !mockAgents.some((agent) => agent.id === agentId)) {
      throw new Error(`Agent ${agentId} introuvable.`);
    }
    this.jobs[index] = withAssignedAgent(this.jobs[index], agentId);
    return { ...this.jobs[index] };
  }

  async updateJobStatus(jobId: string, status: CleaningJobStatus) {
    await delay(null);
    const index = this.jobs.findIndex((job) => job.id === jobId);
    if (index === -1) throw new Error(`Job ${jobId} introuvable.`);
    if (!canSecretaryChangeStatus(this.jobs[index].status, status)) {
      throw new Error(`Transition ${this.jobs[index].status} → ${status} non permise.`);
    }
    this.jobs[index] = withStatus(this.jobs[index], status);
    return { ...this.jobs[index] };
  }
}