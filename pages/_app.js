import '../styles/globals.css'
import Head from 'next/head'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Import buttonActions to make it globally available
    import('../utils/buttonActions.js')
  }, [])

  return (
    <>
      <Head>
        <title>TechOS - Local Tech Support & Repair Service</title>
        <meta name="description" content="Professional computer repair, MacBook service, virus removal, data recovery, and CCTV installation. Same-day service with No Fix, No Pay guarantee." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}