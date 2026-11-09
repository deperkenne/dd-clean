import { ArrowLeftIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

/** Lien de retour vers la page parente (zone tactile ≥ 44px). */
export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-11 items-center gap-2 rounded-sm text-[15px] font-medium text-forest outline-none hover:text-forest-strong focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <ArrowLeftIcon aria-hidden="true" className="size-4" />
      {label}
    </Link>
  )
}
