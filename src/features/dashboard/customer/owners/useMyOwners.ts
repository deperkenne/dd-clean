import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { OwnerResponse } from '@/features/properties/owner.dto'
import { ownerRepository } from '@/features/properties/owner.repository.index'
import { useLocale } from '@/hooks/useLocale'
import { toOwnerView } from './toOwnerView'

/** Clé de cache des propriétaires du compte connecté (vidée à la déconnexion avec tout le cache). */
export const myOwnersKey = ['owners', 'mine'] as const

/**
 * Propriétaires du client connecté, par ordre alphabétique.
 *
 * `GET /api/owners/mine` part avec le jeton Keycloak (via le repository et
 * `lib/http.ts`) ; c'est le back-end qui ne renvoie que les propriétaires de
 * ce client. La liste est rechargée après chaque création (voir `useCreateOwner`).
 */
export function useMyOwners() {
  const { locale } = useLocale()

  const select = useCallback(
    (owners: OwnerResponse[]) =>
      [...owners]
        .sort((a, b) => a.name.localeCompare(b.name, locale, { sensitivity: 'base' }))
        .map((owner, index) => toOwnerView(owner, index, locale)),
    [locale],
  )

  const query = useQuery({
    queryKey: myOwnersKey,
    queryFn: () => ownerRepository.getMyOwners(),
    select,
  })

  return {
    owners: query.data ?? [],
    isLoading: query.isPending,
    isError: query.isError,
    isRetrying: query.isError && query.isFetching,
    retry: () => void query.refetch(),
  }
}
