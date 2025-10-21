import Layout from '../components/Layout.jsx'
import Hero from '../components/Hero.jsx'
import Services from '../components/Services.jsx'
import Reviews from '../components/Reviews.jsx'
import CallToAction from '../components/CallToAction.jsx'

function App() {
  return (
    <Layout>
      <Hero />
      <Services />
      <Reviews />
      <CallToAction />
    </Layout>
  )
}

export default App