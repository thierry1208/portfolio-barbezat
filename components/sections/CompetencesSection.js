'use client';

import { useState } from 'react';
import Slide from '@/components/ui/Slide';
import useSectionVisible from '@/components/hooks/useSectionVisible';
import { COMPETENCES } from '@/lib/constants';
import styles from './CompetencesSection.module.css';

export default function CompetencesSection() {
  const [ref, vis] = useSectionVisible(0.3);
  const [hov, setHov] = useState(null);
  const ease = 'cubic-bezier(0.34,1.56,0.64,1)';

  return (
    <Slide
      id="competences"
      gradient="linear-gradient(180deg, #0c0c0e 0%, #111114 100%)"
    >
      <div ref={ref} className={styles.inner}>
        <div
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(30px)',
            transition: `all 0.7s ${ease} 0s`,
          }}
        >
          <p className={styles.overline}>Compétences</p>
        </div>
        <h2
          className={styles.title}
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(30px)',
            transition: `all 0.7s ${ease} 0.1s`,
          }}
        >
          Mes domaines <span className={styles.accent}>d&apos;expertise</span>
        </h2>
        <div className={styles.grid}>
          {COMPETENCES.map((item, i) => (
            <a
              key={i}
              href={`#${item.link}`}
              className={styles.card}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                opacity: vis ? 1 : 0,
                transform: vis ? 'scale(1)' : 'scale(0.3)',
                transition: `opacity 0.6s ${ease} ${0.15 + i * 0.08}s, transform 0.6s ${ease} ${0.15 + i * 0.08}s`,
                background: hov === i ? 'rgba(200,170,120,0.06)' : 'rgba(255,255,255,0.015)',
                borderColor: hov === i ? 'rgba(200,170,120,0.2)' : 'rgba(255,255,255,0.05)',
              }}
            >
              <div
                className={styles.icon}
                style={{ opacity: hov === i ? 1 : 0.5 }}
              >
                {item.icon}
              </div>
              <div className={styles.cardTitle}>{item.title}</div>
              <div className={styles.cardDesc}>{item.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </Slide>
  );
}
