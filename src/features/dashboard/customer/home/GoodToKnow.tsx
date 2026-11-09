import { Panel } from '@/components/common/Panel'
import { useLocalized } from '@/hooks/useLocale'
import { goodToKnowContent } from './GoodToKnow.data'

/** Panneau latéral : les règles du back-end utiles au client, en clair. */
export function GoodToKnow() {
  const t = useLocalized(goodToKnowContent)

  return (
    <Panel title={t.title} titleId="customer-good-to-know" meta={t.meta} className="self-start lg:sticky lg:top-24">
      <ul className="divide-y divide-line">
        {t.items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-4 px-4 py-5 md:px-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-mint text-forest">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <div className="min-w-0">
              <h3 className="font-sans text-[15px] font-semibold">{title}</h3>
              <p className="mt-1 text-[14px] text-muted-foreground">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
