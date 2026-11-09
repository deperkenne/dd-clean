import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import type { InvoiceResponse } from '@/features/invoices/invoice.dto'
import { invoiceRepository } from '@/features/invoices/invoice.repository.index'
import { currentBillingMonth, generateInvoiceSchema, isGenerateInvoiceErrorCode } from '@/features/invoices/invoice.schema'
import type { GenerateInvoiceFormValues } from '@/features/invoices/invoice.types'
import { useLocale } from '@/hooks/useLocale'
import { HttpError } from '@/lib/http'
import type { Locale } from '@/lib/i18n'
import type { GenerateInvoiceFailure, GeneratedInvoiceSummary } from './generateInvoice.types'
import { formatBillingMonth, formatEuro } from './toInvoiceView'
import { ownerInvoicesKey, useOwnerInvoices } from './useOwnerInvoices'

/** Statut HTTP → raison d'échec affichée. */
function toFailure(error: unknown): GenerateInvoiceFailure | undefined {
  if (!error) return undefined
  if (!(error instanceof HttpError)) return 'unknown'
  if (error.status === 409) return 'conflict'
  if (error.status === 400) return 'invalid'
  if (error.status === 404) return 'nothingToInvoice'
  if (error.status === 403) return 'forbidden'
  return 'unknown'
}

function summarize({ invoice, lines }: InvoiceResponse, locale: Locale): GeneratedInvoiceSummary {
  return {
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    month: formatBillingMonth(invoice.billingMonth, locale),
    total: formatEuro(invoice.total, locale),
    lineCount: lines.length,
  }
}

/**
 * Génération de la facture mensuelle d'un propriétaire.
 *
 * 1. Le mois saisi est vérifié par Zod (format "2026-11", pas un mois à
 *    venir) : tant qu'il est invalide, AUCUNE requête ne part.
 * 2. `POST /api/owners/{ownerId}/invoices?month=…` part avec le jeton
 *    Keycloak ; le back-end vérifie que ce propriétaire est bien au client.
 * 3. En cas de succès, la liste des factures est rechargée.
 * 4. Le back-end répond 409 dans deux cas : facture déjà émise pour ce mois
 *    (elle est alors retrouvée dans la liste, affichée et téléchargeable en
 *    PDF), ou génération refusée (ex. réservations sans prix) : la raison
 *    donnée par le serveur est alors affichée telle quelle.
 */
export function useGenerateInvoice(ownerId: string) {
  const { locale } = useLocale()
  const queryClient = useQueryClient()
  const maxMonth = currentBillingMonth()
  const { invoices } = useOwnerInvoices(ownerId)

  const form = useForm<GenerateInvoiceFormValues>({
    resolver: zodResolver(generateInvoiceSchema),
    defaultValues: { month: maxMonth },
  })

  const mutation = useMutation({
    mutationFn: ({ month }: GenerateInvoiceFormValues) => invoiceRepository.generateInvoice(ownerId, month),
    // Après un succès comme après un 409, la liste est rechargée : elle contient alors la facture du mois.
    onSettled: (_data, error) => {
      if (!error || toFailure(error) === 'conflict') void queryClient.invalidateQueries({ queryKey: ownerInvoicesKey(ownerId) })
    },
  })

  const errorCode = form.formState.errors.month?.message
  const requestedMonth = mutation.variables?.month
  const status = toFailure(mutation.error)
  const existing =
    status === 'conflict' ? invoices.find((invoice) => invoice.billingMonth === requestedMonth) : undefined
  const failure = status === 'conflict' && !existing ? 'rejected' : status

  return {
    register: form.register,
    maxMonth,
    monthError: isGenerateInvoiceErrorCode(errorCode) ? errorCode : undefined,
    submit: form.handleSubmit((values) => mutation.mutate(values)),
    isPending: mutation.isPending,
    failure,
    /** Raison donnée par le back-end, affichée quand la génération est refusée. */
    serverReason: failure === 'rejected' && mutation.error instanceof HttpError ? mutation.error.detail : undefined,
    /** Facture déjà émise pour le mois demandé (409 et facture présente dans la liste). */
    existing,
    generated: mutation.data ? summarize(mutation.data, locale) : undefined,
  }
}
