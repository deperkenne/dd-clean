import type { FieldPath } from 'react-hook-form'
import type { CreateAgentFormValues } from '@/features/agents/agent.types'
import { HttpError } from '@/lib/http'
import type { CreateAgentFailure } from './createAgent.types'

const FIELDS: readonly FieldPath<CreateAgentFormValues>[] = ['firstName', 'lastName', 'email', 'phone']

/** Statut HTTP → raison d'échec affichée en bas du formulaire (le 409 est traité sur le champ e-mail). */
export function toCreateAgentFailure(error: unknown): CreateAgentFailure | undefined {
  if (!error) return undefined
  if (!(error instanceof HttpError)) return 'unknown'
  if (error.status === 409) return undefined
  if (error.status === 400) return 'invalid'
  if (error.status === 403) return 'forbidden'
  if (error.status === 404) return 'notFound'
  return 'unknown'
}

/** 409 `EmailAlreadyUsedException` : un compte existe déjà avec cet e-mail. */
export const isEmailAlreadyUsed = (error: unknown) => error instanceof HttpError && error.status === 409

/** Champs refusés par le serveur (400), limités aux champs connus du formulaire. */
export function toServerFieldPaths(error: unknown): FieldPath<CreateAgentFormValues>[] {
  if (!(error instanceof HttpError)) return []
  return FIELDS.filter((field) => error.fieldErrors.some((problem) => problem.field === field))
}
