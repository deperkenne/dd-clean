import { MailIcon, ReceiptIcon, ShieldCheckIcon, type LucideIcon } from 'lucide-react'
import type { Localized } from '@/lib/i18n'

type GoodToKnowItem = {
  icon: LucideIcon
  title: string
  text: string
}

type GoodToKnowContent = {
  title: string
  meta: string
  items: GoodToKnowItem[]
}

export const goodToKnowContent: Localized<GoodToKnowContent> = {
  fr: {
    title: 'Bon à savoir',
    meta: '3 points',
    items: [
      {
        icon: ShieldCheckIcon,
        title: 'Chaque action est vérifiée',
        text: 'Ce que vous créez est rattaché à votre compte et contrôlé par le serveur à chaque envoi.',
      },
      {
        icon: MailIcon,
        title: 'Le nom Smoobu compte',
        text: 'Saisissez le nom du logement exactement comme dans les e-mails Smoobu : c’est lui qui relie chaque réservation au bon logement.',
      },
      {
        icon: ReceiptIcon,
        title: 'Un prix par chambre',
        text: 'Le prix du ménage est repris sur chaque réservation, puis sur la facture mensuelle du propriétaire.',
      },
    ],
  },
  de: {
    title: 'Gut zu wissen',
    meta: '3 Punkte',
    items: [
      {
        icon: ShieldCheckIcon,
        title: 'Jede Aktion wird geprüft',
        text: 'Was Sie anlegen, wird Ihrem Konto zugeordnet und bei jedem Senden vom Server geprüft.',
      },
      {
        icon: MailIcon,
        title: 'Der Smoobu-Name zählt',
        text: 'Geben Sie den Namen der Unterkunft genau wie in den Smoobu-E-Mails ein: Er ordnet jede Buchung der richtigen Unterkunft zu.',
      },
      {
        icon: ReceiptIcon,
        title: 'Ein Preis pro Zimmer',
        text: 'Der Reinigungspreis wird in jede Buchung und anschließend in die Monatsrechnung des Eigentümers übernommen.',
      },
    ],
  },
  en: {
    title: 'Good to know',
    meta: '3 points',
    items: [
      {
        icon: ShieldCheckIcon,
        title: 'Every action is checked',
        text: 'What you create is linked to your account and checked by the server every time it is sent.',
      },
      {
        icon: MailIcon,
        title: 'The Smoobu name matters',
        text: 'Enter the property name exactly as in Smoobu e-mails: it links each booking to the right property.',
      },
      {
        icon: ReceiptIcon,
        title: 'One price per room',
        text: 'The cleaning price is copied to each booking, then to the owner’s monthly invoice.',
      },
    ],
  },
}
