import { Contact } from './sections/Contact/Contact'
import { Hero } from './sections/Hero/Hero'
import { Services } from './sections/Services/Services'
import { HowItWorks } from './sections/HowItWorks/HowItWorks'
import { Partners } from './sections/Partners/Partners'
import { WhyUs } from './sections/WhyUs/WhyUs'

export function LandingPage() {
  return (
    <>
      <Hero />
      <Services />
      <Partners />
      <WhyUs />
      <HowItWorks />
      <Contact />
    </>
  )
}
