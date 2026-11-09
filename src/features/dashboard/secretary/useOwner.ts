import { useQuery } from '@tanstack/react-query'
import { propertyRepository } from '@/features/properties/Property.repository.index'

/**
 * Propriétaire d'un bien, via le repository (mock aujourd'hui, Smoobu demain).
 * Partagé par le détail d'un job et la fiche d'un bien ; désactivé tant que
 * l'identifiant n'est pas connu.
 */
export function useOwner(ownerId: string) {
  return useQuery({
    queryKey: ['owners', ownerId],
    queryFn: () => propertyRepository.getOwnerById(ownerId),
    enabled: Boolean(ownerId),
  })
}
