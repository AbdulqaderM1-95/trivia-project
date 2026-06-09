'use client'
import { useEffect, useRef } from 'react'

export default function Particles() {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    const count = 18
    container.innerHTML = ''
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      const size = Math.random() * 4 + 2
      p.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `left:${Math.random() * 100}%`,
        `animation-duration:${Math.random() * 15 + 10}s`,
        `animation-delay:${Math.random() * 10}s`,
        `opacity:${Math.random() * 0.4 + 0.1}`,
      ].join(';')
      container.appendChild(p)
    }
  }, [])

  return <div className="particles" ref={ref} />
}
