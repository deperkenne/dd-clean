import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import type { CreateAgentRequest } from '@/features/agents/agent.dto'
import { agentRepository } from '@/features/agents/agent.repository.index'
import { createAgentSchema } from '@/features/agents/agent.schema'
import type { CreateAgentFormValues } from '@/features/agents/agent.types'
import { myAgentsKey } from '../agents/useMyAgents'
import { emptyAgent } from './createAgent.defaults'
import { isEmailAlreadyUsed, toCreateAgentFailure, toServerFieldPaths } from './createAgent.errors'
import type { CreatedAgentSummary } from './createAgent.types'

/**
 * Création d'un agent de ménage par le client connecté.
 *
 * 1. React Hook Form garde la saisie ; Zod (`createAgentSchema`, mêmes règles
 *    que le back-end) la vérifie à l'envoi : tant qu'un champ est invalide,
 *    AUCUNE requête ne part.
 * 2. La mutation envoie `POST /api/agents` avec le jeton Keycloak ; le
 *    back-end rattache l'agent au client du jeton (ni client ni rôle envoyés).
 * 3. 409 : un compte existe déjà avec cet e-mail → signalé sous le champ
 *    e-mail. 400 : champs refusés signalés un par un.
 * 4. Succès : la liste « Mes agents » est rechargée ; la confirmation affiche
 *    l'agent tel que le back-end l'a enregistré (`AgentResponse`).
 */
export function useCreateAgent() {
  const queryClient = useQueryClient()
  const form = useForm<CreateAgentFormValues, unknown, CreateAgentRequest>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: emptyAgent(),
    mode: 'onTouched',
  })

  const mutation = useMutation({
    mutationFn: (request: CreateAgentRequest) => agentRepository.createAgent(request),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: myAgentsKey }),
    onError: (error) => {
      if (isEmailAlreadyUsed(error)) {
        form.setError('email', { type: 'server', message: 'emailUsed' }, { shouldFocus: true })
        return
      }
      for (const path of toServerFieldPaths(error)) form.setError(path, { type: 'server', message: 'server' })
    },
  })

  const created: CreatedAgentSummary | undefined = mutation.isSuccess
    ? { fullName: mutation.data.fullName, email: mutation.data.email }
    : undefined

  return {
    form,
    submit: form.handleSubmit((request) => mutation.mutate(request)),
    isPending: mutation.isPending,
    failure: toCreateAgentFailure(mutation.error),
    created,
    /** Nouveau formulaire vide après une création réussie. */
    startOver: () => {
      mutation.reset()
      form.reset(emptyAgent())
    },
  }
}
