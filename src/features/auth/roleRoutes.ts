import type { Role } from './auth.types'

/**
 * Espace d'arrivée de chaque rôle après connexion.
 *
 * Chaque rôle a SA route : on ne partage pas un « /dashboard » générique entre
 * rôles, pour que les interfaces ne se mélangent jamais. Le rôle dont
 * l'espace n'existe pas encore (ADMIN) arrive sur une page « à venir ».
 *
 * Tous les clients partagent la même adresse, mais chacun n'y voit que SES
 * données : le back-end les filtre avec l'identité lue dans le jeton
 * (`sub`), jamais avec un identifiant placé dans l'adresse, qu'on pourrait
 * modifier à la main.
 */
export const roleHomePaths: Record<Role, string> = {
  SECRETARY: '/dashboard/secretary',
  CUSTOMER: '/dashboard/customer',
  ADMIN: '/coming-soon',
  AGENT: '/dashboard/agent',
}

/** Page affichée à un compte connecté qui n'a aucun rôle D&D Clean. */
export const noRolePath = '/coming-soon'

/**
 * Si un compte a plusieurs rôles, le plus large l'emporte : un administrateur
 * qui est aussi secrétaire arrive dans l'espace administrateur. Le rôle client
 * passe après les rôles de l'équipe D&D Clean.
 */
const rolePriority: Role[] = ['ADMIN', 'SECRETARY', 'AGENT', 'CUSTOMER']

export function homePathFor(roles: Role[]): string {
  const role = rolePriority.find((candidate) => roles.includes(candidate))
  return role ? roleHomePaths[role] : noRolePath
}
