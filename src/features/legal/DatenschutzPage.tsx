import { useLocalized } from '@/hooks/useLocale'
import { datenschutzContent } from './Datenschutz.data'
import { LegalLayout } from './LegalLayout'

export function DatenschutzPage() {
  const t = useLocalized(datenschutzContent)
  return <LegalLayout {...t} />
}
