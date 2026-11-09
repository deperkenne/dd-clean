/** Adresses de l'espace client, partagées par le routeur et les liens. */
export const customerPaths = {
  home: '/dashboard/customer',
  reservations: '/dashboard/customer/reservations',
  /** Toutes les réservations d'un jour de départ, "2026-11-09". */
  reservationDay: (date: string) => `/dashboard/customer/reservations/${encodeURIComponent(date)}`,
  owners: '/dashboard/customer/owners',
  ownerInvoices: (ownerId: string) => `/dashboard/customer/owners/${encodeURIComponent(ownerId)}/invoices`,
  createOwner: '/dashboard/customer/owners/new',
  properties: '/dashboard/customer/properties',
  agents: '/dashboard/customer/agents',
  createAgent: '/dashboard/customer/agents/new',
} as const
