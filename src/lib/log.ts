/** Erreurs déjà journalisées à leur source : le cache de TanStack Query ne les relogue pas. */
const logged = new WeakSet<object>()

export function markLogged(error: unknown) {
  if (typeof error === 'object' && error !== null) logged.add(error)
}

const wasLogged = (error: unknown) => typeof error === 'object' && error !== null && logged.has(error)

/** `console.error` une seule fois par erreur, avec son contexte (jamais de jeton). */
export function logError(message: string, error: unknown, context?: Record<string, unknown>) {
  if (wasLogged(error)) return
  console.error(message, { ...context, error })
  markLogged(error)
}
