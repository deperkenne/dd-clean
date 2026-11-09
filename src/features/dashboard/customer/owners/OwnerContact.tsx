import { MailIcon, PhoneIcon, type LucideIcon } from 'lucide-react'
import { useLocalized } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { myOwnersContent } from './MyOwners.data'
import type { OwnerView } from './myOwners.types'

type ContactLineProps = { icon: LucideIcon; label: string; value?: string; href?: string }

/** Une longue adresse e-mail passe à la ligne après le « @ » plutôt qu'au milieu d'un mot. */
function withBreakAfterAt(value: string) {
  const at = value.indexOf('@')
  if (at < 0) return value
  return (
    <>
      {value.slice(0, at + 1)}
      <wbr />
      {value.slice(at + 1)}
    </>
  )
}

const lineClass ='flex min-h-11 items-center gap-2.5 text-[15px] lg:min-h-8'

function ContactLine({ icon: Icon, label, value, href }: ContactLineProps) {
  const t = useLocalized(myOwnersContent)
  const content = (
    <>
      <Icon aria-hidden="true" className="size-4 shrink-0 text-forest" />
      <span className="sr-only">{label} : </span>
      <span className={cn('min-w-0 [overflow-wrap:anywhere]', !value && 'text-muted-foreground')}>
        {value ? withBreakAfterAt(value) : t.notProvided}
      </span>
    </>
  )

  return value && href ? (
    <a
      href={href}
      className={cn(
        lineClass,
        'rounded-sm text-ink underline-offset-4 outline-none hover:text-forest hover:underline focus-visible:ring-3 focus-visible:ring-ring/50',
      )}
    >
      {content}
    </a>
  ) : (
    <p className={lineClass}>{content}</p>
  )
}

/** E-mail et téléphone (propriétaire ou agent), cliquables quand ils sont renseignés. */
export function OwnerContact({ owner }: { owner: Pick<OwnerView, 'email' | 'phone' | 'phoneHref'> }) {
  const t = useLocalized(myOwnersContent)

  return (
    <div className="flex min-w-0 flex-col">
      <ContactLine
        icon={MailIcon}
        label={t.emailLabel}
        value={owner.email}
        href={owner.email && `mailto:${owner.email}`}
      />
      <ContactLine
        icon={PhoneIcon}
        label={t.phoneLabel}
        value={owner.phone}
        href={owner.phoneHref && `tel:${owner.phoneHref}`}
      />
    </div>
  )
}
