'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroBackground from './HeroBackground';
import DownloadCta from './DownloadCta';
import { DOWNLOAD_AVAILABLE } from '../config/download';
import { site } from '../content/th';

const { hero } = site;
const TICKER_EQUATIONS = ['7 × 8 = 56', '15 + 9 = 24', '81 ÷ 9 = 9', '12 × 3 − 6 = 30'];

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

      <div className="container hero-content">
        <div className="hero-badge hero-anim">
          <span className="pulse-dot" />
          {DOWNLOAD_AVAILABLE ? hero.badge : (hero.badgePending ?? hero.badge)}
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

        <div className="hero-ticker hero-anim" aria-label="ตัวอย่างสมการในเกม">
          <div className="hero-ticker-track">
            {[...TICKER_EQUATIONS, ...TICKER_EQUATIONS].map((equation, index) => (
              <span key={`${equation}-${index}`} aria-hidden={index >= TICKER_EQUATIONS.length}>
                <i />{equation}<small>VALID</small>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
