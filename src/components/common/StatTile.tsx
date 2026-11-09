import type { ReactNode } from 'react'

type StatTileProps = {
  label: string
  value: number
  hint: string
  /** Pastille ou icône d'état, à côté du libellé. */
  indicator?: ReactNode
}

/** Chiffre clé : libellé, valeur (sans-serif, chiffres proportionnels), précision. */
export function StatTile({ label, value, hint, indicator }: StatTileProps) {
  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-xl border border-line bg-white p-4 md:p-5">
      <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {indicator}
        <span className="truncate">{label}</span>
      </p>
      <p className="font-sans text-[32px] leading-none font-semibold text-ink md:text-[40px]">{value}</p>
      <p className="text-[13px] text-muted-foreground">{hint}</p>
    </div>
  )
}
