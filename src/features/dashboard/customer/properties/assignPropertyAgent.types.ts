/** `assign` : le logement n'a pas d'agent ; `move` : il en a un, on le change. */
export type AssignMode = 'assign' | 'move'

/**
 * Raison d'un échec, traduite par l'UI :
 * - `invalid`   : 400, agent refusé (inactif, ou d'un autre client)
 * - `forbidden` : 403
 * - `notFound`  : 404, logement ou agent introuvable
 * - `conflict`  : 409, la situation a changé entre-temps (déjà attribué…)
 * - `unknown`   : réseau, serveur indisponible, autre
 */
export type AssignAgentFailure = 'invalid' | 'forbidden' | 'notFound' | 'conflict' | 'unknown'
