'use client';

import { useState } from 'react';
import Slide from '@/components/ui/Slide';
import Lightbox from '@/components/ui/Lightbox';
import useSectionVisible from '@/components/hooks/useSectionVisible';
import { PROJECTS } from '@/lib/constants';
import styles from './WebmasterSection.module.css';

export default function WebmasterSection() {
  const [ref, vis] = useSectionVisible(0.25);
  const [hov, setHov] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  return (
    <Slide id="webmaster">
      <div ref={ref} className={styles.inner}>
        <div style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.6s 0s' }}>
          <p className={styles.overline}>Webmaster · Web Designer · Web Developer</p>
        </div>
        <h2
          className={styles.title}
          style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.6s 0.05s' }}
        >
          Projets <span className={styles.accent}>sélectionnés</span>
        </h2>
        <p
          className={styles.intro}
          style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.5s 0.1s' }}
        >
          Sites vitrines, e-commerce, intégrations CRM/ERP — de la maquette au déploiement.
        </p>
        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className={styles.card}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              onClick={() => setLightbox(p)}
              style={{ cursor: 'pointer',
                background: `linear-gradient(135deg, ${p.color}, #0c0c0e)`,
                opacity: vis ? 1 : 0,
                transform: vis
                  ? 'translateY(0) rotate(0deg)'
                  : `translateY(-80px) rotate(${i % 2 === 0 ? -3 : 3}deg)`,
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.12 + i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.12 + i * 0.1}s`,
              }}
            >
              <div
                className={styles.overlay}
                style={{
                  background: hov === i
                    ? 'linear-gradient(to top, rgba(12,12,14,0.95), rgba(12,12,14,0.2))'
                    : 'linear-gradient(to top, rgba(12,12,14,0.88), rgba(12,12,14,0.5))',
                }}
              />
              <div className={styles.info}>
                <div className={styles.cardType}>{p.type}</div>
                <div className={styles.cardName}>{p.name}</div>
                <div className={styles.cardTag}>{p.tag}</div>
              </div>
              <div
                className={styles.arrow}
                style={{
                  opacity: hov === i ? 1 : 0,
                  transform: hov === i ? 'none' : 'translate(-6px, 6px)',
                }}
              >
                ↗
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox project={lightbox} onClose={() => setLightbox(null)} />
      )}
    </Slide>
  );
}
