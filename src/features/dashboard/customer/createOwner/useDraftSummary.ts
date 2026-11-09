import { useFormContext, useWatch } from 'react-hook-form'
import type { CreateOwnerFormValues } from '@/features/properties/owner.types'
import type { CreatedOwnerSummary } from './createOwner.types'

/** Récapitulatif de la saisie en cours, mis à jour à chaque frappe (aucun appel réseau). */
export function useDraftSummary(): CreatedOwnerSummary {
  const { control } = useFormContext<CreateOwnerFormValues>()
  const [name, properties] = useWatch({ control, name: ['name', 'properties'] })

  return {
    name: name.trim(),
    propertyCount: properties.length,
    roomCount: properties.reduce((total, property) => total + property.rooms.length, 0),
  }
}
