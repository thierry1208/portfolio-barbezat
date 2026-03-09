'use client';

import Image from 'next/image';
import Slide from '@/components/ui/Slide';
import useSectionVisible from '@/components/hooks/useSectionVisible';
import { ABOUT_STATS } from '@/lib/constants';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const [ref, vis] = useSectionVisible(0.3);

  const item = (i) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(60px)',
    transition: `opacity 0.9s var(--ease-out-expo) ${0.1 + i * 0.12}s, transform 0.9s var(--ease-out-expo) ${0.1 + i * 0.12}s`,
  });

  return (
    <Slide id="about">
      <div ref={ref} className={styles.inner}>
        <div className={styles.photoCol} style={item(0)}>
          <div className={styles.photoWrapper}>
            <div className={styles.photo}>
              <Image
                src="/images/thierrybarbezat-portrait.webp"
                alt="Thierry Barbezat"
                fill
                className={styles.photoImg}
                sizes="(max-width: 768px) 100vw, 320px"
                priority
              />
              <div className={styles.photoLine} />
            </div>
            <div className={styles.photoFrame} />
          </div>
        </div>
        <div className={styles.textCol}>
          <div style={item(1)}>
            <p className={styles.overline}>À propos</p>
          </div>
          <h2 className={styles.title} style={item(2)}>
            10+ ans à transformer
            <br />
            <span className={styles.accent}>la visibilité digitale</span>
          </h2>
          <p className={styles.text} style={item(3)}>
            Expert digital avec un DAS en Communication Digitale de l&apos;Université de Genève.
            J&apos;allie vision stratégique, rigueur technique et approche business.
          </p>
          <p className={styles.textMuted} style={item(4)}>
            Mon background en électronique (CFC CERN) et en management m&apos;a donné une rigueur
            opérationnelle unique.
          </p>
          <div className={styles.stats} style={item(5)}>
            {ABOUT_STATS.map((s, i) => (
              <div key={i} className={styles.stat}>
                <div className={styles.statNumber}>{s.n}</div>
                <div className={styles.statLabel}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
