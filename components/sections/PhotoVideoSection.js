'use client';

import Slide from '@/components/ui/Slide';
import useSectionVisible from '@/components/hooks/useSectionVisible';
import { PHOTO_SERVICES } from '@/lib/constants';
import styles from './PhotoVideoSection.module.css';

export default function PhotoVideoSection() {
  const [ref, vis] = useSectionVisible(0.3);

  const blur = (i) => ({
    opacity: vis ? 1 : 0,
    filter: vis ? 'blur(0px)' : 'blur(18px)',
    transform: vis ? 'scale(1)' : 'scale(1.04)',
    transition: `all 1s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.15}s`,
  });

  return (
    <Slide
      id="photo-video"
      gradient="linear-gradient(160deg, #0c0c0e 0%, #15131a 100%)"
    >
      <div ref={ref} className={styles.inner}>
        <div style={blur(0)}>
          <p className={styles.overline}>Photo & Vidéo</p>
        </div>
        <h2 className={styles.title} style={blur(0.5)}>
          Contenus <span className={styles.accent}>visuels</span>
        </h2>
        <div className={styles.columns}>
          <div className={styles.col} style={blur(1)}>
            <div className={styles.glassCard}>
              <p className={styles.cardLabel}>Services</p>
              {PHOTO_SERVICES.map((t, i) => (
                <div key={i} className={styles.serviceItem}>
                  <span className={styles.dot} />
                  <span className={styles.serviceText}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.col} style={blur(2)}>
            <div className={styles.glassCard}>
              <p className={styles.cardLabel}>Projet — Rencontres Inspirantes</p>
              <p className={styles.cardDesc}>
                Couverture événementielle pour Digitalizers — renforcement de la notoriété IA sur la
                place genevoise.
              </p>
              <div className={styles.tags}>
                {['1 vidéo globale', '5 capsules réseaux', '↑ abonnés LinkedIn'].map((t, i) => (
                  <span key={i} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
