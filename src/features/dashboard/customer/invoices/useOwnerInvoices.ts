import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import type { InvoiceSummaryResponse } from '@/features/invoices/invoice.dto'
import { invoiceRepository } from '@/features/invoices/invoice.repository.index'
import { useLocale } from '@/hooks/useLocale'
import { HttpError } from '@/lib/http'
import { useMyOwners } from '../owners/useMyOwners'
import { formatEuro, toInvoiceView } from './toInvoiceView'

const ownerIdSchema = z.uuid()

/** Clé de cache des factures d'un propriétaire. */
export const ownerInvoicesKey = (ownerId: string) => ['invoices', 'owner', ownerId] as const

/** 403/404 : ce propriétaire n'existe pas ou n'appartient pas au client connecté. */
function isNotFound(error: unknown): boolean {
  return error instanceof HttpError && (error.status === 403 || error.status === 404)
}

/**
 * Factures d'un propriétaire du client connecté, les plus récentes d'abord.
 *
 * 1. L'identifiant lu dans l'adresse est vérifié (format UUID) AVANT tout
 *    appel : une adresse modifiée à la main ne déclenche aucune requête.
 * 2. `GET /api/owners/{ownerId}/invoices` part avec le jeton Keycloak ; le
 *    back-end refuse si le propriétaire n'appartient pas à ce client.
 * 3. Le nom du propriétaire vient des factures, ou à défaut de la liste
 *    « Mes propriétaires » (déjà en cache la plupart du temps).
 */
export function useOwnerInvoices(ownerId: string) {
  const { locale } = useLocale()
  const isValidId = ownerIdSchema.safeParse(ownerId).success
  const { owners } = useMyOwners()

  const select = useCallback(
    (invoices: InvoiceSummaryResponse[]) => {
      const sorted = [...invoices].sort((a, b) => b.billingMonth.localeCompare(a.billingMonth))
      const totalCents = sorted.reduce((sum, invoice) => sum + Math.round(invoice.total * 100), 0)
      return {
        ownerName: sorted[0]?.ownerName,
        invoices: sorted.map((invoice) => toInvoiceView(invoice, locale)),
        total: formatEuro(totalCents / 100, locale),
      }
    },
    [locale],
  )

  const query = useQuery({
    queryKey: ownerInvoicesKey(ownerId),
    queryFn: () => invoiceRepository.getOwnerInvoices(ownerId),
    enabled: isValidId,
    select,
  })

  const notFound = !isValidId || isNotFound(query.error)

  return {
    ownerName: query.data?.ownerName ?? owners.find((owner) => owner.id === ownerId)?.name,
    invoices: query.data?.invoices ?? [],
    total: query.data?.total,
    isLoading: isValidId && query.isPending,
    isNotFound: notFound,
    isError: query.isError && !notFound,
    isRetrying: query.isError && query.isFetching,
    retry: () => void query.refetch(),
  }
}
