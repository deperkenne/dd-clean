import { Eyebrow } from '@/components/common/Eyebrow'
import { useLocalized } from '@/hooks/useLocale'
import { Overview } from './overview/Overview'
import { secretaryDashboardContent } from './SecretaryDashboardPage.data'

/** Accueil du dashboard secrétaire — les fonctionnalités s'ajoutent une par une. */
export function SecretaryDashboardPage() {
  const t = useLocalized(secretaryDashboardContent)

  return (
    <>
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <h1 className="mt-3 mb-2 text-[clamp(1.875rem,4vw,2.5rem)] leading-tight font-semibold tracking-[-0.01em]">
        {t.title}
      </h1>
      <Overview />
    </>
  )
}
