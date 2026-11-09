// =============================================================================
// cleaningJob.rules.ts
// -----------------------------------------------------------------------------
// Règles métier des jobs de nettoyage, en fonctions pures. Partagées par le
// repository mock (qui simule ce que fera le backend) et par l'UI (qui s'en
// sert pour désactiver ce qui n'est pas permis). La vraie vérification restera
// côté backend : l'UI ne fait que l'anticiper.
// =============================================================================

import type { CleaningJob, CleaningJobStatus } from "./Property.types";

/** Un agent ne peut être (ré)assigné qu'avant le début du nettoyage. */
const ASSIGNABLE_STATUSES: CleaningJobStatus[] = ["PLANNED", "ASSIGNED"];

export function canAssignAgent(status: CleaningJobStatus): boolean {
  return ASSIGNABLE_STATUSES.includes(status);
}

/**
 * Résultat d'une (dés)assignation : un agent fait passer le job à
 * « Assigné », retirer l'agent le ramène à « Planifié ».
 */
export function withAssignedAgent(
  job: CleaningJob,
  agentId: string | null
): CleaningJob {
  return {
    ...job,
    assignedAgentId: agentId,
    status: agentId ? "ASSIGNED" : "PLANNED",
  };
}

/**
 * Changements de statut que la SECRÉTAIRE peut faire. « En cours » et
 * « Terminé » sont signalés par l'agent sur le terrain, pas par elle :
 * - un job terminé peut être vérifié (contrôle qualité) ;
 * - un job pas encore commencé peut être annulé.
 */
const SECRETARY_TRANSITIONS: Record<CleaningJobStatus, CleaningJobStatus[]> = {
  PLANNED: ["CANCELLED"],
  ASSIGNED: ["CANCELLED"],
  IN_PROGRESS: [],
  DONE: ["VERIFIED"],
  VERIFIED: [],
  CANCELLED: [],
};

export function secretaryNextStatuses(status: CleaningJobStatus): CleaningJobStatus[] {
  return SECRETARY_TRANSITIONS[status];
}

export function canSecretaryChangeStatus(
  from: CleaningJobStatus,
  to: CleaningJobStatus
): boolean {
  return SECRETARY_TRANSITIONS[from].includes(to);
}

/** Nouveau statut ; un job annulé libère son agent. */
export function withStatus(job: CleaningJob, status: CleaningJobStatus): CleaningJob {
  return {
    ...job,
    status,
    assignedAgentId: status === "CANCELLED" ? null : job.assignedAgentId,
  };
}
