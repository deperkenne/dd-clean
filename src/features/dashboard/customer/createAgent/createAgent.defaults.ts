import type { CreateAgentFormValues } from '@/features/agents/agent.types'

/** Formulaire vide. */
export const emptyAgent = (): CreateAgentFormValues => ({ firstName: '', lastName: '', email: '', phone: '' })
