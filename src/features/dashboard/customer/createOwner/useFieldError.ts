import { useFormContext, useFormState, type FieldPath } from 'react-hook-form'
import { isOwnerFieldErrorCode } from '@/features/properties/owner.schema'
import type { CreateOwnerFormValues, OwnerFieldErrorCode } from '@/features/properties/owner.types'

/** Code d'erreur d'un champ du formulaire (client ou serveur), à traduire par l'interface. */
export function useFieldError(name: FieldPath<CreateOwnerFormValues>): OwnerFieldErrorCode | undefined {
  const { getFieldState } = useFormContext<CreateOwnerFormValues>()
  const formState = useFormState<CreateOwnerFormValues>({ name })
  const message = getFieldState(name, formState).error?.message
  return isOwnerFieldErrorCode(message) ? message : undefined
}
