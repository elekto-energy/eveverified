import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import EVECore from '@/components/EVECore'
import Products from '@/components/ProductCard'
import Philosophy from '@/components/Philosophy'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      <Hero />
      <EVECore />
      <Products />
      <Philosophy />
      <Footer />
    </main>
  )
}
