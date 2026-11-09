import type { FieldPath } from 'react-hook-form'
import type { CreateOwnerFormValues } from '@/features/properties/owner.types'
import { HttpError } from '@/lib/http'
import type { CreateOwnerFailure } from './createOwner.types'

/** Statut HTTP → raison d'échec affichée. */
export function toCreateOwnerFailure(error: unknown): CreateOwnerFailure | undefined {
  if (!error) return undefined
  if (!(error instanceof HttpError)) return 'unknown'
  if (error.status === 400) return 'invalid'
  if (error.status === 403) return 'forbidden'
  if (error.status === 409) return 'conflict'
  return 'unknown'
}

/**
 * Champs refusés par le serveur (400), au format du formulaire :
 * `properties[0].rooms[1].price` (Spring) → `properties.0.rooms.1.price` (React Hook Form).
 */
export function toServerFieldPaths(error: unknown): FieldPath<CreateOwnerFormValues>[] {
  if (!(error instanceof HttpError)) return []
  return error.fieldErrors.map(
    ({ field }) => field.replace(/\[(\d+)\]/g, '.$1') as FieldPath<CreateOwnerFormValues>,
  )
}
