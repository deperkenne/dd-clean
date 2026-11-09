import {
  BrushCleaningIcon,
  CalendarCheckIcon,
  ContactRoundIcon,
  HouseIcon,
  LayoutDashboardIcon,
  UserPlusIcon,
  UsersIcon,
} from 'lucide-react'
import type { TabNavItem } from '@/components/common/TabNav'
import type { Localized } from '@/lib/i18n'
import { customerPaths } from './customerPaths'

type CustomerNavContent = { label: string; items: TabNavItem[] }

export const customerNavContent: Localized<CustomerNavContent> = {
  fr: {
    label: 'Navigation espace client',
    items: [
      { to: customerPaths.home, end: true, label: 'Tableau de bord', icon: LayoutDashboardIcon },
      { to: customerPaths.reservations, label: 'Mes réservations', icon: CalendarCheckIcon },
      { to: customerPaths.owners, end: true, label: 'Mes propriétaires', icon: UsersIcon },
      { to: customerPaths.properties, label: 'Mes logements', icon: HouseIcon },
      { to: customerPaths.createOwner, label: 'Nouveau propriétaire', icon: UserPlusIcon },
      { to: customerPaths.agents, end: true, label: 'Mes agents', icon: ContactRoundIcon },
      { to: customerPaths.createAgent, label: 'Nouvel agent', icon: BrushCleaningIcon },
    ],
  },
  de: {
    label: 'Navigation Kundenbereich',
    items: [
      { to: customerPaths.home, end: true, label: 'Übersicht', icon: LayoutDashboardIcon },
      { to: customerPaths.reservations, label: 'Meine Buchungen', icon: CalendarCheckIcon },
      { to: customerPaths.owners, end: true, label: 'Meine Eigentümer', icon: UsersIcon },
      { to: customerPaths.properties, label: 'Meine Unterkünfte', icon: HouseIcon },
      { to: customerPaths.createOwner, label: 'Neuer Eigentümer', icon: UserPlusIcon },
      { to: customerPaths.agents, end: true, label: 'Meine Reinigungskräfte', icon: ContactRoundIcon },
      { to: customerPaths.createAgent, label: 'Neue Reinigungskraft', icon: BrushCleaningIcon },
    ],
  },
  en: {
    label: 'Customer area navigation',
    items: [
      { to: customerPaths.home, end: true, label: 'Dashboard', icon: LayoutDashboardIcon },
      { to: customerPaths.reservations, label: 'My bookings', icon: CalendarCheckIcon },
      { to: customerPaths.owners, end: true, label: 'My owners', icon: UsersIcon },
      { to: customerPaths.properties, label: 'My properties', icon: HouseIcon },
      { to: customerPaths.createOwner, label: 'New owner', icon: UserPlusIcon },
      { to: customerPaths.agents, end: true, label: 'My agents', icon: ContactRoundIcon },
      { to: customerPaths.createAgent, label: 'New agent', icon: BrushCleaningIcon },
    ],
  },
}
