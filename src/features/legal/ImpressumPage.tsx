import { useLocalized } from '@/hooks/useLocale'
import { impressumContent } from './Impressum.data'
import { LegalLayout } from './LegalLayout'

export function ImpressumPage() {
  const t = useLocalized(impressumContent)
  return <LegalLayout {...t} />
}
