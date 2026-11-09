import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { AgentResponse } from '@/features/agents/agent.dto'
import { agentRepository } from '@/features/agents/agent.repository.index'
import { useLocale } from '@/hooks/useLocale'
import { toAgentView } from './toAgentView'

/** Clé de cache des agents du compte connecté (vidée à la déconnexion avec tout le cache). */
export const myAgentsKey = ['agents', 'mine'] as const

/**
 * Agents de ménage du client connecté : les actifs d'abord, puis par nom.
 *
 * `GET /api/agents` part avec le jeton Keycloak ; c'est le back-end qui ne
 * renvoie que les agents de ce client. La liste est rechargée après chaque
 * création (voir `useCreateAgent`). Elle servira aussi à choisir l'agent
 * attribué à chaque logement.
 */
export function useMyAgents() {
  const { locale } = useLocale()

  const select = useCallback(
    (agents: AgentResponse[]) =>
      [...agents]
        .sort(
          (a, b) =>
            Number(b.active) - Number(a.active) ||
            a.fullName.localeCompare(b.fullName, locale, { sensitivity: 'base' }),
        )
        .map(toAgentView),
    [locale],
  )

  const query = useQuery({
    queryKey: myAgentsKey,
    queryFn: () => agentRepository.getMyAgents(),
    select,
  })

  const agents = query.data ?? []

  return {
    agents,
    activeCount: agents.filter((agent) => agent.active).length,
    isLoading: query.isPending,
    isError: query.isError,
    isRetrying: query.isError && query.isFetching,
    retry: () => void query.refetch(),
  }
}
