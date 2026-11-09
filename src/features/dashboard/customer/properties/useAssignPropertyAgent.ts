import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import type { AssignAgentRequest } from '@/features/properties/propertyAgent.dto'
import { customerPropertyRepository } from '@/features/properties/customerProperty.repository.index'
import { assignAgentSchema } from '@/features/properties/propertyAgent.schema'
import type { AssignAgentFormValues } from '@/features/properties/propertyAgent.types'
import { HttpError } from '@/lib/http'
import { useAgentOptions } from '../agents/useAgentOptions'
import type { AssignAgentFailure, AssignMode } from './assignPropertyAgent.types'
import type { PropertyView } from './myProperties.types'
import { myPropertiesKey } from './useMyProperties'

function toFailure(error: unknown): AssignAgentFailure | undefined {
  if (!error) return undefined
  if (!(error instanceof HttpError)) return 'unknown'
  if (error.status === 400) return 'invalid'
  if (error.status === 403) return 'forbidden'
  if (error.status === 404) return 'notFound'
  if (error.status === 409) return 'conflict'
  return 'unknown'
}

/**
 * Attribuer un agent à un logement, ou le changer.
 *
 * - Sans agent → `POST /api/properties/{id}/assign` ; avec agent → `/move`.
 * - Zod vérifie qu'un agent est choisi avant tout envoi (`@NotNull` côté Java).
 * - On ne propose que les agents actifs, sans l'agent actuel.
 * - Succès : la liste des logements est rechargée, le nouvel agent s'affiche.
 */
export function useAssignPropertyAgent(property: Pick<PropertyView, 'id' | 'agentId'>) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const { options, isLoading, isError } = useAgentOptions()
  const mode: AssignMode = property.agentId ? 'move' : 'assign'

  const form = useForm<AssignAgentFormValues, unknown, AssignAgentRequest>({
    resolver: zodResolver(assignAgentSchema),
    defaultValues: { agentId: '' },
  })

  const mutation = useMutation({
    mutationFn: (request: AssignAgentRequest) =>
      mode === 'move'
        ? customerPropertyRepository.moveToAgent(property.id, request)
        : customerPropertyRepository.assignAgent(property.id, request),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: myPropertiesKey })
      setIsOpen(false)
      form.reset({ agentId: '' })
    },
  })

  const failure = toFailure(mutation.error)

  return {
    mode,
    isOpen,
    open: () => setIsOpen(true),
    close: () => {
      setIsOpen(false)
      form.reset({ agentId: '' })
      mutation.reset()
    },
    form,
    choices: options.filter((option) => option.id !== property.agentId),
    isLoadingAgents: isLoading,
    agentsFailed: isError,
    submit: form.handleSubmit((request) => mutation.mutate(request)),
    isPending: mutation.isPending,
    failure,
    /** Message du serveur (`{"error": …}`), affiché en plus de la raison traduite. */
    serverReason: failure && mutation.error instanceof HttpError ? mutation.error.detail : undefined,
  }
}
