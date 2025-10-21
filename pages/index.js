import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Reviews from '../components/Reviews'
import Contact from '../components/Contact'
import FAQ from '../components/FAQ'
import CallToAction from '../components/CallToAction'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Services />
      <About />
      <Reviews />
      <Contact />
      <FAQ />
      <CallToAction />
    </Layout>
  )
}