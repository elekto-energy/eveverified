import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Products from '@/components/ProductCard'
import VerifiedDemonstrations from '@/components/VerifiedDemonstrations'
import StartingPoint from '@/components/StartingPoint'
import HowItWorks from '@/components/HowItWorks'
import Philosophy from '@/components/Philosophy'
import Footer from '@/components/Footer'
import Autonomy from '@/components/Autonomy'
import Milestones from '@/components/Milestones'

export default function Home() {
  return (
    <main className="min-h-screen bg-ent-bg">
      <Navigation />
      <Hero />
      <Autonomy />
      <VerifiedDemonstrations />
      <Milestones />
      <Products />
      <StartingPoint />
      <HowItWorks />
      <Philosophy />
      <Footer />
    </main>
  )
}
