'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { site } from '../content/th';

const { gallery } = site;

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const container = useRef(null);

  useGSAP(() => {
    // Header animation
    gsap.fromTo('.gallery-header', 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.gallery-header',
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    );

    // Gallery items staggered animation
    gsap.fromTo('.gallery-item', 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.gallery-grid',
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
    <section className="gallery" id="gallery" ref={container}>
      <div className="container">
        <div className="gallery-header">
          <span className="section-label">{gallery.label}</span>
          <h2 className="section-title">
            {gallery.titleBefore}{' '}
            <span className="gradient-text">{gallery.titleHighlight}</span>
          </h2>
          <p className="section-subtitle">{gallery.subtitle}</p>
        </div>

        <div className="gallery-grid">
          {gallery.shots.map(({ src, alt, title }, i) => (
            <div key={src} className="gallery-item">
              <Image
                src={src}
                alt={alt}
                width={1400}
                height={787}
                unoptimized
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
              <div className="gallery-item-overlay">
                <span className="gallery-item-title">{title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
