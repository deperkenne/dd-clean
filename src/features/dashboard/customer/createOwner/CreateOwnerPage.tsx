import { BackLink } from '@/components/common/BackLink'
import { useLocalized } from '@/hooks/useLocale'
import { customerPaths } from '../customerPaths'
import { CreateOwnerForm } from './CreateOwnerForm'
import { createOwnerContent } from './CreateOwnerPage.data'
import { CreateOwnerSuccess } from './CreateOwnerSuccess'
import { useCreateOwner } from './useCreateOwner'

/** Page « Créer un propriétaire » de l'espace client : la fiche, puis la confirmation. */
export function CreateOwnerPage() {
  const t = useLocalized(createOwnerContent)
  const owner = useCreateOwner()

  return (
    <div className="mx-auto max-w-[1200px]">
      <BackLink to={customerPaths.home} label={t.backLabel} />
      {owner.created ? (
        <CreateOwnerSuccess summary={owner.created} onStartOver={owner.startOver} />
      ) : (
        <CreateOwnerForm owner={owner} />
      )}
    </div>
  )
}
