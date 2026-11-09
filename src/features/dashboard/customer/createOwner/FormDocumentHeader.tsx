import { FormDocumentHeader as DocumentHeader } from '@/components/common/FormDocumentHeader'
import { useLocalized } from '@/hooks/useLocale'
import { createOwnerContent } from './CreateOwnerPage.data'

/** En-tête de la fiche propriétaire (en-tête de document partagé, textes de cette fiche). */
export function FormDocumentHeader() {
  const t = useLocalized(createOwnerContent)
  return (
    <DocumentHeader
      titleId="create-owner-title"
      logoLabel={t.logoLabel}
      documentLabel={t.documentLabel}
      title={t.title}
      lead={t.lead}
    />
  )
}
