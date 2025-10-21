import Layout from '../components/Layout.jsx'
import Hero from '../components/Hero.jsx'
import Services from '../components/Services.jsx'
import About from '../components/About.jsx'
import Reviews from '../components/Reviews.jsx'
import Contact from '../components/Contact.jsx'
import FAQ from '../components/FAQ.jsx'
import CallToAction from '../components/CallToAction.jsx'

function App() {
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

export default App