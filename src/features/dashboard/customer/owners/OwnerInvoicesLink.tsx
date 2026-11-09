import { ArrowUpRightIcon, ReceiptTextIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ActionButton } from '@/components/common/ActionButton'
import { useLocalized } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { customerPaths } from '../customerPaths'
import { myOwnersContent } from './MyOwners.data'
import type { OwnerView } from './myOwners.types'

/** Bouton « Factures » d'un propriétaire : ouvre la page de ses factures. */
export function OwnerInvoicesLink({ owner, className }: { owner: OwnerView; className?: string }) {
  const t = useLocalized(myOwnersContent)

  return (
    <ActionButton
      asChild
      variant="outline"
      className={cn('group/link border-ink/20 bg-white hover:border-forest hover:bg-mint/50 hover:text-forest', className)}
    >
      <Link to={customerPaths.ownerInvoices(owner.id)} aria-label={t.invoicesFor(owner.name)}>
        <ReceiptTextIcon aria-hidden="true" />
        {t.invoices}
        <ArrowUpRightIcon
          aria-hidden="true"
          className="size-4 opacity-50 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100 motion-reduce:transition-none"
        />
      </Link>
    </ActionButton>
  )
}
