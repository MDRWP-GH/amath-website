'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { site } from '../content/th';

const { features } = site;

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const container = useRef();

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
          {features.items.map(({ icon, color, title, desc }, i) => (
            <div key={title} className="feature-card">
              <div className={`feature-icon ${color}`}>{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
