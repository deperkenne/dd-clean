import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type ReasonItemProps = {
  icon: LucideIcon
  title: string
  description: string
  children?: ReactNode
}

export function ReasonItem({ icon: Icon, title, description, children }: ReasonItemProps) {
  return (
    <div className="flex gap-4 border-t border-line pt-6">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-mint text-forest">
        <Icon aria-hidden="true" strokeWidth={1.75} className="size-5" />
      </span>
      <div className="min-w-0">
        <h3 className="text-xl leading-tight font-semibold">{title}</h3>
        <p className="mt-2 text-[15px] text-muted-foreground">{description}</p>
        {children}
      </div>
    </div>
  )
}
