import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { PropertyResponse } from '@/features/properties/owner.dto'
import { agentPropertyRepository } from '@/features/properties/agentProperty.repository.index'
import { useLocale } from '@/hooks/useLocale'
import { toPropertyView } from '../../customer/properties/toPropertyView'

/** Clé de cache des logements de l'agent connecté (vidée à la déconnexion avec tout le cache). */
export const assignedPropertiesKey = ['properties', 'assigned'] as const

/**
 * Logements attribués à l'agent connecté, par ville puis par nom.
 *
 * `GET /api/properties/assigned` part avec le jeton Keycloak ; le back-end
 * identifie l'agent par le jeton et ne renvoie que ses logements.
 */
export function useAssignedProperties() {
  const { locale } = useLocale()

  const select = useCallback(
    (properties: PropertyResponse[]) => {
      const compare = (a: string, b: string) => a.localeCompare(b, locale, { sensitivity: 'base' })
      return [...properties]
        .sort((a, b) => compare(a.city ?? '', b.city ?? '') || compare(a.name, b.name))
        .map(toPropertyView)
    },
    [locale],
  )

  const query = useQuery({
    queryKey: assignedPropertiesKey,
    queryFn: () => agentPropertyRepository.getAssignedProperties(),
    select,
  })

  return {
    properties: query.data ?? [],
    isLoading: query.isPending,
    isError: query.isError,
    isRetrying: query.isError && query.isFetching,
    retry: () => void query.refetch(),
  }
}
