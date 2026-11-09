import { z } from 'zod'
import type { CleaningJobStatus } from '@/features/properties/Property.types'

/**
 * Validation du statut demandé, AVANT tout appel au repository : il doit faire
 * partie des changements permis à la secrétaire pour le statut actuel.
 */
export function createStatusChangeSchema(allowed: CleaningJobStatus[]) {
  return z.object({
    status: z
      .string()
      .refine((status): status is CleaningJobStatus => allowed.includes(status as CleaningJobStatus)),
  })
}
