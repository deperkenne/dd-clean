import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { PropertyResponse } from '@/features/properties/owner.dto'
import { customerPropertyRepository } from '@/features/properties/customerProperty.repository.index'
import { useLocale } from '@/hooks/useLocale'
import type { PropertyAgentFilter } from './myProperties.types'
import { toPropertyView } from './toPropertyView'

/** Clé de cache des logements du compte connecté (vidée à la déconnexion avec tout le cache). */
export const myPropertiesKey = ['properties', 'mine'] as const

/**
 * Logements du client connecté, par propriétaire puis par nom.
 *
 * `GET /api/properties/mine` part avec le jeton Keycloak ; le back-end ne
 * renvoie que les logements de ce client. Rechargée après chaque attribution
 * d'agent (voir `useAssignPropertyAgent`).
 * Le filtre « Sans agent » aide à repérer les logements à attribuer.
 */
export function useMyProperties() {
  const { locale } = useLocale()
  const [filter, setFilter] = useState<PropertyAgentFilter>('all')

  const select = useCallback(
    (properties: PropertyResponse[]) => {
      const compare = (a: string, b: string) => a.localeCompare(b, locale, { sensitivity: 'base' })
      return [...properties]
        .sort((a, b) => compare(a.ownerName, b.ownerName) || compare(a.name, b.name))
        .map(toPropertyView)
    },
    [locale],
  )

  const query = useQuery({
    queryKey: myPropertiesKey,
    queryFn: () => customerPropertyRepository.getMyProperties(),
    select,
  })

  const all = query.data ?? []
  const unassignedCount = all.filter((property) => !property.agentId).length

  return {
    properties: filter === 'unassigned' ? all.filter((property) => !property.agentId) : all,
    total: all.length,
    unassignedCount,
    filter,
    setFilter,
    isLoading: query.isPending,
    isError: query.isError,
    isRetrying: query.isError && query.isFetching,
    retry: () => void query.refetch(),
  }
}
