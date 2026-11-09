import { useFieldArray, useFormContext } from 'react-hook-form'
import type { CreateOwnerFormValues } from '@/features/properties/owner.types'
import { emptyRoom } from './createOwner.defaults'

/** Liste des chambres d'un logement du formulaire : ajout et retrait. */
export function useRoomFields(propertyIndex: number) {
  const { control } = useFormContext<CreateOwnerFormValues>()
  const rooms = useFieldArray({ control, name: `properties.${propertyIndex}.rooms` })

  return {
    fields: rooms.fields,
    add: () => rooms.append(emptyRoom()),
    remove: rooms.remove,
  }
}
