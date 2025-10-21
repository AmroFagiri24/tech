import { useEffect, useState } from 'react'

export default function MouseLightning() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Main lightning glow */}
      <div 
        className="fixed pointer-events-none z-50 w-96 h-96 opacity-60 animate-pulse"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.8) 0%, rgba(6, 182, 212, 0.6) 20%, rgba(59, 130, 246, 0.4) 40%, transparent 70%)',
          filter: 'blur(15px)',
          transition: 'all 0.05s ease-out',
          animation: 'electric-pulse 0.3s infinite alternate'
        }}
      />
      
      {/* Inner bright core */}
      <div 
        className="fixed pointer-events-none z-50 w-32 h-32 opacity-80"
        style={{
          left: mousePos.x - 64,
          top: mousePos.y - 64,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(0, 255, 255, 0.7) 30%, transparent 60%)',
          filter: 'blur(5px)',
          transition: 'all 0.05s ease-out',
          animation: 'electric-flicker 0.1s infinite'
        }}
      />
      
      {/* Electric sparks */}
      <div 
        className="fixed pointer-events-none z-50 w-64 h-64 opacity-40"
        style={{
          left: mousePos.x - 128,
          top: mousePos.y - 128,
          background: 'conic-gradient(from 0deg, transparent, rgba(0, 255, 255, 0.6), transparent, rgba(255, 255, 255, 0.4), transparent)',
          filter: 'blur(8px)',
          transition: 'all 0.05s ease-out',
          animation: 'electric-rotate 2s linear infinite'
        }}
      />
      
      <style jsx>{`
        @keyframes electric-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.1); opacity: 0.8; }
        }
        
        @keyframes electric-flicker {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes electric-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}