import { useLocalized } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { myPropertiesContent } from './MyProperties.data'
import type { PropertyView } from './myProperties.types'
import { PropertyAgent } from './PropertyAgent'
import { PropertyIdentity } from './PropertyIdentity'
import { PropertyOwner } from './PropertyOwner'

const headCell =
  'px-4 py-3 text-left font-mono text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase first:pl-6 last:pr-6'
const bodyCell = 'px-4 py-5 align-top first:pl-6 last:pr-6'

/** Les logements en tableau (grands écrans). */
export function PropertyTable({ properties, caption }: { properties: PropertyView[]; caption: string }) {
  const t = useLocalized(myPropertiesContent)

  return (
    <table className="w-full table-fixed border-collapse text-[15px]">
      <caption className="sr-only">{caption}</caption>
      <thead className="border-b border-line bg-paper/70">
        <tr>
          <th scope="col" className={cn(headCell, 'w-20')}>{t.columns.position}</th>
          <th scope="col" className={cn(headCell, 'w-[40%]')}>{t.columns.property}</th>
          <th scope="col" className={cn(headCell, 'w-[24%]')}>{t.columns.owner}</th>
          <th scope="col" className={headCell}>{t.columns.agent}</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-line">
        {properties.map((property) => (
          <tr key={property.id} className="group transition-colors hover:bg-mint/25">
            <td className={bodyCell}>
              <span className="font-heading text-2xl leading-none font-medium text-ink/25 tabular-nums transition-colors group-hover:text-forest">
                {property.position}
              </span>
            </td>
            <td className={bodyCell}>
              <PropertyIdentity property={property} />
            </td>
            <td className={bodyCell}>
              <PropertyOwner property={property} />
            </td>
            <td className={bodyCell}>
              <PropertyAgent property={property} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
