import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { secretaryNextStatuses } from '@/features/properties/cleaningJob.rules'
import type { CleaningJob, CleaningJobStatus } from '@/features/properties/Property.types'
import { propertyRepository } from '@/features/properties/Property.repository.index'
import { createStatusChangeSchema } from './jobStatus.schema'

/**
 * Logique des changements de statut faits par la secrétaire.
 *
 * - Les actions proposées viennent des règles métier (cleaningJob.rules.ts).
 * - L'annulation se fait en deux temps (demande, puis confirmation), car
 *   elle n'est pas réversible depuis l'interface.
 * - Le statut demandé est validé par Zod avant l'appel au repository ; après
 *   succès, le cache des jobs est invalidé : détail, vue d'ensemble et
 *   planning se mettent à jour.
 */
export function useJobStatusActions(job: CleaningJob) {
  const queryClient = useQueryClient()
  const [confirmingCancel, setConfirmingCancel] = useState(false)
  const allowed = secretaryNextStatuses(job.status)

  const mutation = useMutation({
    mutationFn: (status: CleaningJobStatus) => propertyRepository.updateJobStatus(job.id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cleaning-jobs'] })
      setConfirmingCancel(false)
    },
  })

  const change = (status: CleaningJobStatus) => {
    const parsed = createStatusChangeSchema(allowed).safeParse({ status })
    if (parsed.success) mutation.mutate(parsed.data.status)
  }

  return {
    canVerify: allowed.includes('VERIFIED'),
    canCancel: allowed.includes('CANCELLED'),
    confirmingCancel,
    askCancel: () => {
      mutation.reset()
      setConfirmingCancel(true)
    },
    keepJob: () => setConfirmingCancel(false),
    verify: () => change('VERIFIED'),
    cancel: () => change('CANCELLED'),
    pendingStatus: mutation.isPending ? mutation.variables : undefined,
    /** Message à afficher : l'erreur, ou le succès une fois le job rechargé. */
    outcome: mutation.isError
      ? ('error' as const)
      : mutation.isSuccess && job.status === mutation.variables
        ? mutation.variables === 'VERIFIED'
          ? ('verified' as const)
          : ('cancelled' as const)
        : null,
  }
}
