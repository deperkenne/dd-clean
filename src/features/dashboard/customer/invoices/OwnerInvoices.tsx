import { FileTextIcon, Loader2Icon, RotateCwIcon, SearchXIcon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Skeleton } from '@/components/ui/skeleton'
import { useLocalized } from '@/hooks/useLocale'
import { GenerateInvoiceForm } from './GenerateInvoiceForm'
import { InvoiceCard } from './InvoiceCard'
import { InvoiceTable } from './InvoiceTable'
import { ownerInvoicesContent } from './OwnerInvoices.data'
import { useOwnerInvoices } from './useOwnerInvoices'

/** Factures d'un propriétaire : chargement, introuvable, erreur, liste vide, liste. */
export function OwnerInvoices({ ownerId }: { ownerId: string }) {
  const t = useLocalized(ownerInvoicesContent)
  const { ownerName, invoices, total, isLoading, isNotFound, isError, isRetrying, retry } = useOwnerInvoices(ownerId)
  const isLoaded = !isLoading && !isError && !isNotFound

  return (
    <section
      aria-labelledby="owner-invoices-title"
      className="min-w-0 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04),0_16px_40px_-16px_rgb(60_20_30/0.18)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"
    >
      <header className="grid gap-6 px-4 pt-6 pb-6 md:px-6 md:pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
        <div className="min-w-0">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1
            id="owner-invoices-title"
            className="mt-3 max-w-[24ch] text-[clamp(1.6rem,3.2vw,2.25rem)] leading-[1.1] font-semibold tracking-[-0.015em] break-words text-balance"
          >
            {t.title(ownerName)}
          </h1>
          <p className="mt-3 max-w-[56ch] text-[15px] text-muted-foreground">{t.lead}</p>
        </div>

        {isLoaded && invoices.length > 0 && (
          <dl className="flex flex-wrap items-end gap-x-8 gap-y-4">
            <div>
              <dt className="font-mono text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                {t.countLabel(invoices.length)}
              </dt>
              <dd className="mt-1 font-heading text-[clamp(2.25rem,5vw,3rem)] leading-none font-semibold text-ink tabular-nums">
                {invoices.length}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                {t.totalLabel}
              </dt>
              <dd className="mt-1 font-heading text-[clamp(2.25rem,5vw,3rem)] leading-none font-semibold text-forest tabular-nums">
                {total}
              </dd>
            </div>
          </dl>
        )}
      </header>

      {!isNotFound && <GenerateInvoiceForm ownerId={ownerId} />}

      {isLoading && (
        <div role="status" aria-label={t.loading} className="flex flex-col gap-3 border-t border-line p-4 md:p-6">
          {[0, 1, 2].map((key) => (
            <Skeleton key={key} className="h-16 rounded-xl" />
          ))}
        </div>
      )}

      {isNotFound && (
        <div role="alert" className="flex items-start gap-4 border-t border-line px-4 py-10 md:px-6">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint text-forest">
            <SearchXIcon aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-ink">{t.notFoundTitle}</p>
            <p className="mt-1 max-w-[60ch] text-[15px] text-muted-foreground">{t.notFound}</p>
          </div>
        </div>
      )}

      {isError && (
        <div role="alert" className="flex flex-col items-start gap-4 border-t border-line px-4 py-8 md:px-6">
          <p className="text-[15px] text-ink">{t.error}</p>
          <ActionButton type="button" variant="outline" onClick={retry} disabled={isRetrying} className="border-ink">
            {isRetrying ? (
              <Loader2Icon aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
            ) : (
              <RotateCwIcon aria-hidden="true" />
            )}
            {t.retry}
          </ActionButton>
        </div>
      )}

      {isLoaded && invoices.length === 0 && (
        <div className="flex items-start gap-4 border-t border-line px-4 py-10 md:px-6">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint text-forest">
            <FileTextIcon aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-ink">{t.emptyTitle}</p>
            <p className="mt-1 max-w-[60ch] text-[15px] text-muted-foreground">{t.empty}</p>
          </div>
        </div>
      )}

      {isLoaded && invoices.length > 0 && (
        <>
          <ul className="flex flex-col gap-3 border-t border-line bg-paper/40 p-4 lg:hidden">
            {invoices.map((invoice) => (
              <li key={invoice.id}>
                <InvoiceCard invoice={invoice} />
              </li>
            ))}
          </ul>
          <div className="hidden border-t border-line lg:block">
            <InvoiceTable invoices={invoices} caption={t.title(ownerName)} />
          </div>
        </>
      )}
    </section>
  )
}
