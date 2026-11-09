import type { ReactNode } from 'react'

export type InfoItem = {
  label: string
  value: ReactNode
}

/** Liste « libellé → valeur » (balise <dl>), empilée sur mobile, en deux colonnes ensuite. */
export function InfoList({ items }: { items: InfoItem[] }) {
  return (
    <dl className="divide-y divide-line">
      {items.map((item) => (
        <div key={item.label} className="grid gap-1 px-4 py-3 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-4 md:px-5">
          <dt className="text-[13px] text-muted-foreground">{item.label}</dt>
          <dd className="min-w-0 text-[15px] break-words text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
