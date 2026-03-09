'use client';

import { useState, useEffect } from 'react';
import Slide from '@/components/ui/Slide';
import MagneticOrb from '@/components/ui/MagneticOrb';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  const anim = (dy, delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'none' : `translateY(${dy}px)`,
    transition: `all 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <Slide
      id="hero"
      gradient="linear-gradient(160deg, #0c0c0e 0%, #141418 40%, #0c0c0e 100%)"
    >
      <MagneticOrb />
      <div className={styles.decorLine} />
      <div className={styles.content}>
        <p className={styles.overline} style={anim(16, 0.3)}>
          Genève · Suisse
        </p>
        <h1 className={styles.title} style={anim(40, 0.5)}>
          Thierry
          <br />
          <span className={styles.titleAccent}>Barbezat</span>
        </h1>
        <p className={styles.tagline} style={anim(24, 0.8)}>
          Je rends les entreprises visibles —
          <br />
          <span className={styles.taglineStrong}>
            SEO · Automatisation IA · Stratégie Digitale
          </span>
        </p>
        <div className={styles.ctas} style={anim(16, 1.1)}>
          <a href="#webmaster" className={styles.ctaPrimary}>
            Voir mes projets
          </a>
          <a href="#contact" className={styles.ctaGhost}>
            Me contacter →
          </a>
        </div>
      </div>
      <div className={styles.scrollIndicator} style={anim(0, 1.6)}>
        <div className={styles.scrollLine} />
      </div>
    </Slide>
  );
}
