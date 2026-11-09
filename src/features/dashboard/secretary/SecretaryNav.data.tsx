import { CalendarDaysIcon, LayoutDashboardIcon, UsersRoundIcon, type LucideIcon } from 'lucide-react'
import type { Localized } from '@/lib/i18n'

type NavItemId = 'overview' | 'planning' | 'agents'

/** Entrées du menu de l'espace secrétaire, dans l'ordre d'affichage. */
export const secretaryNavItems: { id: NavItemId; to: string; end: boolean; icon: LucideIcon }[] = [
  { id: 'overview', to: '/dashboard/secretary', end: true, icon: LayoutDashboardIcon },
  { id: 'planning', to: '/dashboard/secretary/planning', end: false, icon: CalendarDaysIcon },
  { id: 'agents', to: '/dashboard/secretary/agents', end: false, icon: UsersRoundIcon },
]

export const secretaryNavContent: Localized<{ label: string; items: Record<NavItemId, string> }> = {
  fr: { label: 'Navigation secrétariat', items: { overview: "Vue d'ensemble", planning: 'Planning', agents: 'Agents' } },
  de: { label: 'Navigation Sekretariat', items: { overview: 'Überblick', planning: 'Wochenplan', agents: 'Reinigungskräfte' } },
  en: { label: 'Secretary navigation', items: { overview: 'Overview', planning: 'Schedule', agents: 'Agents' } },
}
