import { DownloadIcon, Loader2Icon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'
import { useLocalized } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { invoicePdfButtonContent } from './InvoicePdfButton.data'
import { useDownloadInvoicePdf } from './useDownloadInvoicePdf'

type InvoicePdfButtonProps = {
  invoice: { id: number; invoiceNumber: string }
  /** Texte du bouton ; « PDF » par défaut. */
  label?: string
  className?: string
}

/** Bouton « Télécharger le PDF » d'une facture, avec son état et son erreur. */
export function InvoicePdfButton({ invoice, label, className }: InvoicePdfButtonProps) {
  const t = useLocalized(invoicePdfButtonContent)
  const { download, isPending, isError } = useDownloadInvoicePdf()

  return (
    <div className={cn('inline-flex flex-col items-stretch gap-1.5', className)}>
      <ActionButton
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => download(invoice)}
        aria-label={t.ariaLabel(invoice.invoiceNumber)}
        className="border-ink/20 bg-white hover:border-forest hover:bg-mint/50 hover:text-forest"
      >
        {isPending ? (
          <Loader2Icon aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
        ) : (
          <DownloadIcon aria-hidden="true" />
        )}
        {isPending ? t.pending : (label ?? t.label)}
      </ActionButton>
      {isError && (
        <p role="alert" className="text-[13px] font-medium text-danger">
          {t.error}
        </p>
      )}
    </div>
  )
}
