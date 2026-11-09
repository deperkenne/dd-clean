import { FormSubmitBar } from '@/components/common/FormSubmitBar'
import { useLocalized } from '@/hooks/useLocale'
import { createOwnerContent } from './CreateOwnerPage.data'

/** Barre d'envoi de la fiche propriétaire (barre partagée, textes de cette fiche). */
export function SubmitBar({ isPending }: { isPending: boolean }) {
  const t = useLocalized(createOwnerContent)
  return (
    <FormSubmitBar
      isPending={isPending}
      secureNote={t.secureNote}
      submitLabel={t.submit}
      submittingLabel={t.submitting}
    />
  )
}
