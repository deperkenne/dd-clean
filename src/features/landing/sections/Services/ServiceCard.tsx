import { Tag } from '@/components/common/Tag'

type ServiceCardProps = {
  index: number
  image: { src: string; alt: string }
  name: string
  description: string
  tags: string[]
}

export function ServiceCard({ index, image, name, description, tags }: ServiceCardProps) {
  return (
    <article className="group flex h-full flex-col">
      <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mint">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-400 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
        />
        <span className="absolute top-3 left-3 rounded-md bg-paper px-2 py-1 font-mono text-[13px] font-medium text-forest">
          {String(index).padStart(2, '0')}
        </span>
      </figure>
      <div className="flex flex-1 flex-col gap-2.5 border-b border-line pt-5 pb-6">
        <h3 className="text-[22px] leading-tight font-semibold">{name}</h3>
        <p className="text-[15px] text-muted-foreground">{description}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
