import { useParams } from 'react-router-dom'
import { BackLink } from '@/components/common/BackLink'
import { useLocalized } from '@/hooks/useLocale'
import { customerPaths } from '../customerPaths'
import { ownerInvoicesContent } from './OwnerInvoices.data'
import { OwnerInvoices } from './OwnerInvoices'

/** Page « Factures d'un propriétaire » de l'espace client. */
export function OwnerInvoicesPage() {
  const t = useLocalized(ownerInvoicesContent)
  const { ownerId = '' } = useParams()

  return (
    <div className="flex flex-col gap-4">
      <BackLink to={customerPaths.owners} label={t.back} />
      <OwnerInvoices ownerId={ownerId} />
    </div>
  )
}
