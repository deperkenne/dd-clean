import { CircleAlertIcon, CircleCheckIcon, Loader2Icon, SparklesIcon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'
import { TextField } from '@/components/common/TextField'
import { useLocalized } from '@/hooks/useLocale'
import { generateInvoiceContent } from './GenerateInvoice.data'
import { InvoicePdfButton } from './InvoicePdfButton'
import { useGenerateInvoice } from './useGenerateInvoice'

/** Bandeau « Générer une facture » : choix du mois, envoi, résultat. */
export function GenerateInvoiceForm({ ownerId }: { ownerId: string }) {
  const t = useLocalized(generateInvoiceContent)
  const { register, maxMonth, monthError, submit, isPending, failure, serverReason, existing, generated } =
    useGenerateInvoice(ownerId)

  return (
    <div className="border-t border-line bg-paper/70 px-4 py-6 md:px-6">
      <form
        noValidate
        onSubmit={submit}
        aria-labelledby="generate-invoice-title"
        className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-10"
      >
        <div className="flex min-w-0 items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink text-citron">
            <SparklesIcon aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0">
            <h2 id="generate-invoice-title" className="text-xl font-semibold tracking-[-0.01em]">
              {t.title}
            </h2>
            <p className="mt-1.5 max-w-[56ch] text-[15px] text-muted-foreground">{t.lead}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <TextField
            id="generate-invoice-month"
            type="month"
            label={t.monthLabel}
            hint={t.monthHint}
            max={maxMonth}
            placeholder="2026-11"
            error={monthError && t.errors[monthError]}
            className="sm:w-60"
            {...register('month')}
          />
          <ActionButton type="submit" disabled={isPending} className="bg-ink text-paper hover:bg-ink/85 sm:mt-[1.625rem]">
            {isPending && <Loader2Icon aria-hidden="true" className="animate-spin motion-reduce:animate-none" />}
            {isPending ? t.pending : t.submit}
          </ActionButton>
        </div>
      </form>

      <div aria-live="polite">
        {generated && (
          <div className="mt-5 flex flex-col gap-4 rounded-lg border border-forest/25 bg-mint px-4 py-3 text-ink sm:flex-row sm:items-center sm:justify-between">
            <p className="flex min-w-0 items-start gap-3">
              <CircleCheckIcon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-forest" />
              <span className="min-w-0">
                <span className="block font-semibold break-words">{t.successTitle(generated.invoiceNumber)}</span>
                <span className="mt-0.5 block text-[14px] text-muted-foreground first-letter:uppercase">
                  {t.success(generated.month, generated.lineCount, generated.total)}
                </span>
              </span>
            </p>
            <InvoicePdfButton invoice={generated} label={t.downloadPdf} className="shrink-0" />
          </div>
        )}
        {failure && (
          <div
            role="alert"
            className="mt-5 flex flex-col gap-4 rounded-lg border border-danger/30 bg-white px-4 py-3 text-[15px] text-ink sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="flex min-w-0 items-start gap-3">
              <CircleAlertIcon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-danger" />
              <span className="min-w-0">
                <span className="block">{t.failures[failure]}</span>
                {serverReason && (
                  <span className="mt-0.5 block text-[14px] break-words text-muted-foreground">{serverReason}</span>
                )}
                {existing && (
                  <span className="mt-0.5 block text-[14px] break-words text-muted-foreground">
                    {t.existingSummary(existing.invoiceNumber, existing.month, existing.total)}
                  </span>
                )}
              </span>
            </p>
            {existing && <InvoicePdfButton invoice={existing} label={t.downloadPdf} className="shrink-0" />}
          </div>
        )}
      </div>
    </div>
  )
}
