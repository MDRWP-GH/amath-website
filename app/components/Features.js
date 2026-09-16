'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { site } from '../content/th';

const { features } = site;

const FEATURE_UI = [
  { symbol: '+', points: '2', code: 'BOARD_RULES', badge: '15×15', status: 'CORE' },
  { symbol: '×', points: '3', code: 'MULTIPLAYER', badge: '2–4P', status: 'ONLINE' },
  { symbol: '7', points: '1', code: 'TUTORIAL', badge: 'STEP', status: 'GUIDE' },
  { symbol: '=', points: '1', code: 'EQUATION_ENGINE', badge: '= ✓', status: 'AUTO' },
  { symbol: '9', points: '1', code: 'MATCH_HISTORY', badge: 'LOG', status: 'SAVE' },
  { symbol: '÷', points: '2', code: 'NETWORK_SYNC', badge: 'SYNC', status: 'STABLE' },
];

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const container = useRef();

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`);
  };

  useGSAP(() => {
    // Header animation
    gsap.fromTo('.features-header', 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.features-header',
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    );

    // Cards staggered animation
    gsap.fromTo('.feature-card', 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }
    );
  }, { scope: container });

  return (
    <section className="features" id="features" ref={container}>
      <div className="container">
        <div className="features-header">
          <span className="section-label">{features.label}</span>
          <h2 className="section-title">
            {features.titleBefore}{' '}
            <span className="gradient-text">{features.titleHighlight}</span>
          </h2>
          <p className="section-subtitle">{features.subtitle}</p>
        </div>

        <div className="features-grid">
          {features.items.map(({ color, title, desc }, i) => {
            const ui = FEATURE_UI[i];

            return (
              <article key={title} className={`feature-card feature-card--${color}`} onPointerMove={handlePointerMove}>
                <div className="feature-board-grid" aria-hidden="true" />

                <div className="feature-card-hud">
                  <span>SYS_{String(i + 1).padStart(2, '0')}</span>
                  <span className="feature-status"><i />{ui.status}</span>
                </div>

                <div className="feature-symbol" aria-hidden="true">
                  <span>{ui.symbol}</span>
                  <small>{ui.points}</small>
                </div>

                <div className="feature-card-copy">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>

                <div className="feature-card-footer" aria-hidden="true">
                  <span>{ui.code}</span>
                  <strong>{ui.badge}</strong>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
