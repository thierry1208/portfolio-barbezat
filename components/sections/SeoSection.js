'use client';

import Slide from '@/components/ui/Slide';
import useSectionVisible from '@/components/hooks/useSectionVisible';
import { SEO_RESULTS } from '@/lib/constants';
import styles from './SeoSection.module.css';

export default function SeoSection() {
  const [ref, vis] = useSectionVisible(0.3);

  return (
    <Slide id="seo" style={{ perspective: '1200px' }}>
      <div ref={ref} className={styles.inner}>
        <div style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.6s 0s' }}>
          <p className={styles.overline}>SEO – GEO</p>
        </div>
        <h2
          className={styles.title}
          style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.6s 0.05s' }}
        >
          Les chiffres <span className={styles.accent}>parlent</span>
        </h2>
        <p
          className={styles.quote}
          style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.5s 0.1s' }}
        >
          « Un beau site mal référencé, c&apos;est une vitrine splendide… au fond d&apos;une ruelle déserte. »
        </p>
        <div className={styles.grid}>
          {SEO_RESULTS.map((r, i) => (
            <div
              key={i}
              style={{
                opacity: vis ? 1 : 0,
                transform: vis ? 'rotateY(0deg)' : 'rotateY(90deg)',
                transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.12}s`,
                transformOrigin: 'left center',
              }}
            >
              <div className={styles.card}>
                <div className={styles.metric}>{r.metric}</div>
                <p className={styles.desc}>{r.desc}</p>
                <div className={styles.client}>{r.client}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
