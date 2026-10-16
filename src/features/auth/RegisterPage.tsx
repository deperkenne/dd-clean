import { Link } from 'react-router-dom'
import { ActionButton } from '@/components/common/ActionButton'
import { useLocalized } from '@/hooks/useLocale'
import { AuthLayout } from './AuthLayout'
import { registerContent } from './RegisterPage.data'

/** Pas d'inscription publique : les comptes sont créés par l'administrateur D&D Clean. */
export function RegisterPage() {
  const t = useLocalized(registerContent)

  return (
    <AuthLayout
      logoLabel={t.logoLabel}
      eyebrow={t.eyebrow}
      title={t.title}
      lead={t.lead}
      backLabel={t.backLabel}
      languageLabel={t.languageLabel}
    >
      <p className="text-[15px]">{t.body}</p>
      <div className="mt-8 flex flex-col gap-3">
        <ActionButton asChild size="lg">
          <Link to={t.contactCta.href}>{t.contactCta.label}</Link>
        </ActionButton>
        <ActionButton asChild size="lg" variant="outline" className="border-ink bg-transparent">
          <Link to={t.loginCta.href}>{t.loginCta.label}</Link>
        </ActionButton>
      </div>
    </AuthLayout>
  )
}
