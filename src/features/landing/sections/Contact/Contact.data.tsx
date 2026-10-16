import { MailIcon, MessageCircleIcon, PhoneIcon, type LucideIcon } from 'lucide-react'
import { company } from '@/lib/company.data'
import type { Localized } from '@/lib/i18n'

type ChannelId = 'phone' | 'whatsapp' | 'email'

type ChannelDefinition = {
  id: ChannelId
  icon: LucideIcon
  href: string
  value: string
  external: boolean
}

export const contactChannels: ChannelDefinition[] = [
  { id: 'phone', icon: PhoneIcon, href: company.phone.href, value: company.phone.display, external: false },
  {
    id: 'whatsapp',
    icon: MessageCircleIcon,
    href: company.whatsapp.href,
    value: company.whatsapp.display,
    external: true,
  },
  { id: 'email', icon: MailIcon, href: company.email.href, value: company.email.display, external: false },
]

type ContactContent = {
  eyebrow: string
  title: string
  titleAccent: string
  description: string
  channelLabels: Record<ChannelId, string>
  externalHint: string
}

export const contactContent: Localized<ContactContent> = {
  fr: {
    eyebrow: 'Contact',
    title: "On s'occupe du propre.",
    titleAccent: 'Vous, du reste.',
    description:
      'Décrivez votre besoin (type de lieu, surface, fréquence) et recevez une proposition adaptée.',
    channelLabels: { phone: 'Appeler', whatsapp: 'WhatsApp', email: 'E-mail' },
    externalHint: "(s'ouvre dans un nouvel onglet)",
  },
  de: {
    eyebrow: 'Kontakt',
    title: 'Wir kümmern uns um Sauberkeit.',
    titleAccent: 'Sie sich um den Rest.',
    description:
      'Beschreiben Sie Ihren Bedarf (Objektart, Fläche, Häufigkeit) und erhalten Sie ein passendes Angebot.',
    channelLabels: { phone: 'Anrufen', whatsapp: 'WhatsApp', email: 'E-Mail' },
    externalHint: '(öffnet in neuem Tab)',
  },
  en: {
    eyebrow: 'Contact',
    title: "We handle the clean.",
    titleAccent: 'You handle the rest.',
    description:
      'Tell us what you need (type of place, size, frequency) and get a tailored proposal.',
    channelLabels: { phone: 'Call', whatsapp: 'WhatsApp', email: 'Email' },
    externalHint: '(opens in a new tab)',
  },
}
