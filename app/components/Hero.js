'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroBackground from './HeroBackground';
import Hero3DModel from './Hero3DModel';
import DownloadCta from './DownloadCta';
import { site } from '../content/th';

const { hero } = site;

export default function Hero() {
  const container = useRef();

  useGSAP(() => {
    gsap.fromTo('.hero-anim', 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.2
      }
    );
  }, { scope: container });

  const scrollToFeatures = (e) => {
    e.preventDefault();
    document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero" ref={container}>
      <HeroBackground bgAlt={hero.bgAlt} />

      <div className="container hero-layout">
        <div className="hero-content">
          <div className="hero-badge hero-anim">
            <span className="pulse-dot" />
            {hero.badge}
          </div>

          <h1 className="hero-anim">
            {hero.titleBefore}{' '}
            <span className="gradient-text">{hero.titleHighlight}</span>
          </h1>

          <p className="hero-description hero-anim">
            {hero.description}
          </p>

          <div className="hero-actions hero-anim">
            <DownloadCta variant="hero" className="btn btn-primary" />
            <a href="#features" className="btn btn-secondary" onClick={scrollToFeatures}>
              {hero.learnMore}
            </a>
          </div>

          <div className="hero-stats hero-anim">
            <div className="hero-stat">
              <div className="hero-stat-value gradient-text">{hero.stats.board.value}</div>
              <div className="hero-stat-label">{hero.stats.board.label}</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value gradient-text">{hero.stats.tiles.value}</div>
              <div className="hero-stat-label">{hero.stats.tiles.label}</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value gradient-text">{hero.stats.players.value}</div>
              <div className="hero-stat-label">{hero.stats.players.label}</div>
            </div>
          </div>
        </div>

        <div className="hero-visual hero-anim">
          <Hero3DModel />
        </div>
      </div>
    </section>
  );
}
