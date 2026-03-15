'use client';

import Slide from '@/components/ui/Slide';
import useSectionVisible from '@/components/hooks/useSectionVisible';
import { EDUCATION } from '@/lib/constants';
import styles from './EducationSection.module.css';

export default function EducationSection() {
  const [ref, vis] = useSectionVisible(0.3);

  return (
    <Slide id="education">
      <div ref={ref} className={styles.inner}>
        <div style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.5s 0s' }}>
          <p className={styles.overline}>Formation</p>
        </div>
        <h2
          className={styles.title}
          style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.5s 0.05s' }}
        >
          Parcours <span className={styles.accent}>académique</span>
        </h2>
        <div className={styles.list}>
          {EDUCATION.map((e, i) => (
            <div
              key={i}
              className={`${styles.row} ${i === EDUCATION.length - 1 ? styles.rowLast : ''}`}
              style={{
                opacity: vis ? 1 : 0,
                clipPath: vis ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                transition: `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.13}s, clip-path 0.8s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.13}s`,
              }}
            >
              <div className={styles.logo}>
                <img src={e.logo} alt={e.org} className={styles.logoImg} />
              </div>
              <div className={styles.info}>
                <div className={styles.rowTitle}>{e.title}</div>
                <div className={styles.rowSub}>{e.sub}</div>
              </div>
              <div className={styles.org}>{e.org}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
