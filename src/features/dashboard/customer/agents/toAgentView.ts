import type { AgentResponse } from '@/features/agents/agent.dto'
import { initialsOf } from '@/lib/initials'
import type { AgentView } from './myAgents.types'

/** Réponse de l'API → agent affichable (rang, monogramme, contact nettoyé). */
export function toAgentView(agent: AgentResponse, index: number): AgentView {
  const phone = agent.phone?.trim() || undefined
  return {
    id: agent.id,
    position: String(index + 1).padStart(2, '0'),
    fullName: agent.fullName,
    initials: initialsOf(agent.fullName),
    email: agent.email.trim() || undefined,
    phone,
    phoneHref: phone?.replace(/[^\d+]/g, ''),
    active: agent.active,
  }
}
