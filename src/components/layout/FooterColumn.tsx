import type { ReactNode } from 'react'

type FooterColumnProps = {
  title: string
  children: ReactNode
}

export function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <h2 className="font-mono text-xs font-medium tracking-[0.12em] text-forest uppercase">{title}</h2>
      <div className="mt-3 text-[15px]">{children}</div>
    </div>
  )
}
