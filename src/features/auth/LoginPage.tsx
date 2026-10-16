import { Loader2Icon, LogInIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ActionButton } from '@/components/common/ActionButton'
import { useLocalized } from '@/hooks/useLocale'
import { AuthLayout } from './AuthLayout'
import { loginContent } from './LoginPage.data'
import { useLogin } from './useLogin'

export function LoginPage() {
  const t = useLocalized(loginContent)
  const { login, isBusy, canLogin, errorCode } = useLogin()

  return (
    <AuthLayout
      logoLabel={t.logoLabel}
      eyebrow={t.eyebrow}
      title={t.title}
      lead={t.lead}
      backLabel={t.backLabel}
      languageLabel={t.languageLabel}
    >
      {errorCode && (
        <p
          role="alert"
          className="mb-5 rounded-md border-l-[3px] border-destructive bg-destructive/5 px-4 py-3 text-[15px] text-ink"
        >
          {t.errors[errorCode]}
        </p>
      )}

      <ActionButton
        type="button"
        size="lg"
        className="w-full"
        onClick={login}
        aria-busy={isBusy}
      >
        {isBusy ? (
          <Loader2Icon aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
        ) : (
          <LogInIcon aria-hidden="true" />
        )}
        {isBusy ? t.busy : t.submit}
      </ActionButton>
      <p className="mt-4 text-sm text-muted-foreground">{t.secureNote}</p>

      <p className="mt-8 flex flex-wrap items-center gap-x-1.5 border-t border-line pt-6 text-[15px]">
        <span>{t.noAccount}</span>
        <Link
          to="/register"
          className="inline-flex min-h-11 items-center rounded-sm font-medium text-forest underline underline-offset-4 outline-none hover:text-forest-strong focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {t.noAccountLink}
        </Link>
      </p>
    </AuthLayout>
  )
}
