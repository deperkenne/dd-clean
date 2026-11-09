import type { LucideIcon } from 'lucide-react'

type ContactLinkProps = {
  href: string
  icon: LucideIcon
  children: string
}

/** Lien téléphone / e-mail cliquable (zone tactile ≥ 44px). */
export function ContactLink({ href, icon: Icon, children }: ContactLinkProps) {
  return (
    <a
      href={href}
      className="inline-flex min-h-11 items-center gap-2 rounded-sm font-medium break-all text-forest underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Icon aria-hidden="true" className="size-4 shrink-0" />
      {children}
    </a>
  )
}
