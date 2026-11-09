import { GoodToKnow } from './home/GoodToKnow'
import { JourneySteps } from './home/JourneySteps'
import { useCustomerProfile } from './home/useCustomerProfile'
import { WelcomeHero } from './home/WelcomeHero'

/** Accueil de l'espace client : en-tête, parcours en étapes et règles utiles. */
export function CustomerDashboardPage() {
  const profile = useCustomerProfile()

  return (
    <div className="flex flex-col gap-10 lg:gap-14">
      <WelcomeHero profile={profile} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_360px]">
        <JourneySteps />
        <GoodToKnow />
      </div>
    </div>
  )
}
