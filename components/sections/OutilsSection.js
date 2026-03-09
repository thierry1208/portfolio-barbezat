'use client';

import Slide from '@/components/ui/Slide';
import useSectionVisible from '@/components/hooks/useSectionVisible';
import { OUTILS } from '@/lib/constants';
import styles from './OutilsSection.module.css';

const depths = [100, 60, 130, 80, 110, 70];
const scales = [0.85, 0.9, 0.82, 0.88, 0.84, 0.92];

export default function OutilsSection() {
  const [ref, vis] = useSectionVisible(0.25);

  return (
    <Slide
      id="outils"
      gradient="linear-gradient(180deg, #0c0c0e 0%, #111114 100%)"
    >
      <div ref={ref} className={styles.inner}>
        <div style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.5s 0s' }}>
          <p className={styles.overline}>Outils informatiques</p>
        </div>
        <h2
          className={styles.title}
          style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.5s 0.05s' }}
        >
          Stack <span className={styles.accent}>technique</span>
        </h2>
        <div className={styles.grid}>
          {OUTILS.map((cat, i) => (
            <div
              key={i}
              className={styles.card}
              style={{
                opacity: vis ? 1 : 0,
                transform: vis
                  ? 'translateY(0) scale(1)'
                  : `translateY(${depths[i]}px) scale(${scales[i]})`,
                transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.07}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.07}s`,
              }}
            >
              <p className={styles.catLabel}>{cat.label}</p>
              <div className={styles.tags}>
                {cat.tools.map((t, j) => (
                  <span key={j} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
