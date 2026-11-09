import { useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { canAssignAgent } from '@/features/properties/cleaningJob.rules'
import type { CleaningJob } from '@/features/properties/Property.types'
import { propertyRepository } from '@/features/properties/Property.repository.index'
import { useAgents, useCleaningJobs } from '@/features/properties/Userproperties'
import { buildAgentOptions } from '../agentOptions/buildAgentOptions'
import { createAssignAgentSchema } from './assignAgent.schema'
import type { AssignAgentFormValues } from './assignAgent.types'

/**
 * Logique de l'assignation d'un agent à un job.
 *
 * 1. Le formulaire (React Hook Form) part de l'agent actuel du job.
 * 2. À l'envoi, Zod vérifie le choix ; rien ne part au repository sinon.
 * 3. La mutation TanStack Query appelle `assignAgent` (mock aujourd'hui,
 *    backend demain), puis invalide le cache des jobs : vue d'ensemble,
 *    planning et détail se mettent à jour d'eux-mêmes.
 */
export function useAssignAgent(job: CleaningJob) {
  const queryClient = useQueryClient()
  const agents = useAgents()
  const jobs = useCleaningJobs()

  // Charge de chaque agent le jour du job (hors ce job et hors annulés).
  const options = useMemo(
    () => buildAgentOptions(agents.data ?? [], jobs.data ?? [], job.scheduledDate, job.id),
    [agents.data, jobs.data, job.id, job.scheduledDate],
  )

  const schema = useMemo(() => createAssignAgentSchema(options.map((option) => option.id)), [options])
  const form = useForm<AssignAgentFormValues>({
    resolver: zodResolver(schema),
    values: { agentId: job.assignedAgentId ?? '' },
  })

  const mutation = useMutation({
    mutationFn: (values: AssignAgentFormValues) => propertyRepository.assignAgent(job.id, values.agentId || null),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cleaning-jobs'] }),
  })

  return {
    canAssign: canAssignAgent(job.status),
    options,
    form,
    submit: form.handleSubmit((values) => mutation.mutate(values)),
    isPending: mutation.isPending,
    /**
     * Message à afficher : l'erreur dès l'échec ; le succès une fois le job
     * rechargé (le formulaire n'est alors plus « modifié »).
     */
    outcome: mutation.isPending
      ? null
      : mutation.isError
        ? ('error' as const)
        : mutation.isSuccess && !form.formState.isDirty
          ? mutation.variables.agentId
            ? ('assigned' as const)
            : ('removed' as const)
          : null,
  }
}
