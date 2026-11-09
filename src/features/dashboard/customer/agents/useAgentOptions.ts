import { useMyAgents } from './useMyAgents'

/**
 * Agents proposés pour un logement : seulement les agents ACTIFS du client
 * connecté. Même cache que la page « Mes agents » : un seul appel réseau, quel
 * que soit le nombre de listes affichées.
 */
export function useAgentOptions() {
  const { agents, isLoading, isError } = useMyAgents()

  return {
    options: agents.filter((agent) => agent.active).map((agent) => ({ id: agent.id, label: agent.fullName })),
    isLoading,
    isError,
  }
}
