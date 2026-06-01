'use client';

import { useState, useEffect } from 'react';
import { site } from '../content/th';
import DownloadCta from './DownloadCta';

const { nav, brand } = site;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: nav.features, href: '#features' },
    { label: nav.screenshots, href: '#gallery' },
    { label: nav.download, href: '#download' },
  ];

  return (
    <nav id="navbar" className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#" className="navbar-logo" aria-label={nav.homeLabel}>
          <span className="logo-icon">A</span>
          {brand}
        </a>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a href={href} onClick={(e) => handleNavClick(e, href)}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <DownloadCta
              variant="nav"
              className="btn btn-primary navbar-cta"
              onNavigate={() => setMenuOpen(false)}
            />
          </li>
        </ul>

        <button
          className="menu-toggle"
          aria-label={nav.menuToggle}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
