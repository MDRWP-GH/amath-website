'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

/** A-Math Example Equations */
const EQUATIONS = [
  { text: '12 + 8 = 20', left: '6%', top: '12%', rotate: -6, size: 'clamp(1rem, 2.2vw, 1.55rem)', tone: 'purple', delay: 0, duration: 18 },
  { text: '15 × 2 = 30', left: '72%', top: '8%', rotate: 4, size: 'clamp(0.9rem, 2vw, 1.4rem)', tone: 'teal', delay: 2, duration: 20 },
  { text: '7² = 49', left: '84%', top: '38%', rotate: 8, size: 'clamp(1.1rem, 2.4vw, 1.65rem)', tone: 'pink', delay: 1, duration: 16 },
  { text: '18 − 5 = 13', left: '4%', top: '48%', rotate: -4, size: 'clamp(0.85rem, 1.8vw, 1.3rem)', tone: 'teal', delay: 3, duration: 22 },
  { text: '3 × 4 = 12', left: '58%', top: '22%', rotate: -8, size: 'clamp(1rem, 2.1vw, 1.5rem)', tone: 'purple', delay: 4, duration: 19 },
  { text: '9 + 11 = 20', left: '38%', top: '68%', rotate: 5, size: 'clamp(1.05rem, 2.3vw, 1.6rem)', tone: 'pink', delay: 1.5, duration: 17 },
  { text: '20 ÷ 4 = 5', left: '78%', top: '72%', rotate: -5, size: 'clamp(0.9rem, 2vw, 1.35rem)', tone: 'purple', delay: 5, duration: 21 },
  { text: '6 + 7 = 13', left: '22%', top: '28%', rotate: 3, size: 'clamp(0.95rem, 2vw, 1.45rem)', tone: 'teal', delay: 2.5, duration: 15 },
  { text: '14 − 6 = 8', left: '48%', top: '82%', rotate: -7, size: 'clamp(0.88rem, 1.9vw, 1.25rem)', tone: 'purple', delay: 6, duration: 23 },
  { text: '5 × 5 = 25', left: '90%', top: '58%', rotate: 6, size: 'clamp(1rem, 2.2vw, 1.5rem)', tone: 'pink', delay: 0.5, duration: 18 },
  { text: '10 + 10 = 20', left: '14%', top: '78%', rotate: -3, size: 'clamp(0.8rem, 1.7vw, 1.2rem)', tone: 'teal', delay: 3.5, duration: 20 },
  { text: '16 ÷ 2 = 8', left: '65%', top: '52%', rotate: 4, size: 'clamp(0.92rem, 2vw, 1.4rem)', tone: 'purple', delay: 4.5, duration: 16 },
];

const PARTICLE_COUNT = 36;

export default function HeroBackground({ bgAlt }) {
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const colors = [
      'rgba(108,99,255,.45)',
      'rgba(0,210,255,.35)',
      'rgba(255,107,157,.3)',
      'rgba(139,131,255,.4)',
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 7 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      Object.assign(particle.style, {
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      });
      container.appendChild(particle);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-mesh" />
        <div className="hero-bg-grid" />
        <div className="hero-bg-image-wrap">
          <Image
            src="/images/hero-bg.png"
            alt={bgAlt}
            fill
            unoptimized
            className="hero-bg-image"
            priority
          />
        </div>
      </div>

      <div className="hero-equations" aria-hidden="true">
        {EQUATIONS.map((eq) => (
          <span
            key={eq.text}
            className={`hero-equation hero-equation--${eq.tone}`}
            style={{
              left: eq.left,
              top: eq.top,
              fontSize: eq.size,
              '--eq-rotate': `${eq.rotate}deg`,
              '--eq-delay': `${eq.delay}s`,
              '--eq-dur': `${eq.duration}s`,
            }}
          >
            {eq.text}
          </span>
        ))}
      </div>

      <div className="hero-particles" ref={particlesRef} aria-hidden="true" />
    </>
  );
}
