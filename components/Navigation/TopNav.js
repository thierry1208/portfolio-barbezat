'use client';

import { useState, useEffect } from 'react';
import styles from './TopNav.module.css';

export default function TopNav({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const container = document.querySelector('.snapContainer');
    if (!container) return;
    const handleScroll = () => setScrolled(container.scrollTop > 60);
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (id) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  const navLinks = [
    { id: 'about', label: 'À propos' },
    { id: 'competences', label: 'Compétences' },
    { id: 'webmaster', label: 'Projets' },
    { id: 'seo', label: 'SEO' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={() => handleNav('hero')}>
          TB.
        </button>
        <nav className={styles.links}>
          {navLinks.map((l) => (
            <button key={l.id} className={styles.link} onClick={() => handleNav(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
        </button>
      </div>
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((l) => (
            <button key={l.id} className={styles.mobileLink} onClick={() => handleNav(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
