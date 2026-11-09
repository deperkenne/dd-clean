// =============================================================================
// useProperties.ts
// -----------------------------------------------------------------------------
// Hook métier — toute la logique d'accès aux données vit ici, jamais dans un
// composant UI (règle SOLID/DRY du CLAUDE.md). Utilise TanStack Query, comme
// imposé par la stack : pas de fetch brut, pas de useState/useEffect pour
// simuler un appel réseau.
// =============================================================================

import { useQuery } from "@tanstack/react-query";
import { propertyRepository } from "./Property.repository.index";

export function useProperties() {
  return useQuery({
    queryKey: ["properties"],
    queryFn: () => propertyRepository.getProperties(),
  });
}

export function usePropertyById(id: string) {
  return useQuery({
    queryKey: ["properties", id],
    queryFn: () => propertyRepository.getPropertyById(id),
    enabled: Boolean(id),
  });
}

export function useReservationsByPropertyId(propertyId: string) {
  return useQuery({
    queryKey: ["reservations", propertyId],
    queryFn: () => propertyRepository.getReservationsByPropertyId(propertyId),
    enabled: Boolean(propertyId),
  });
}

export function useCleaningJobs() {
  return useQuery({
    queryKey: ["cleaning-jobs"],
    queryFn: () => propertyRepository.getCleaningJobs(),
  });
}

export function useCleaningJobsByPropertyId(propertyId: string) {
  return useQuery({
    queryKey: ["cleaning-jobs", propertyId],
    queryFn: () =>
      propertyRepository.getCleaningJobsByPropertyId(propertyId),
    enabled: Boolean(propertyId),
  });
}

export function useAgents() {
  return useQuery({
    queryKey: ["agents"],
    queryFn: () => propertyRepository.getAgents(),
  });
}