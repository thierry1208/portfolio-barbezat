'use client';

import Slide from '@/components/ui/Slide';
import useSectionVisible from '@/components/hooks/useSectionVisible';
import { AUTO_USE_CASES } from '@/lib/constants';
import styles from './AutomatisationSection.module.css';

export default function AutomatisationSection() {
  const [ref, vis] = useSectionVisible(0.3);
  const ease = 'cubic-bezier(0.16,1,0.3,1)';

  return (
    <Slide
      id="automatisation"
      gradient="linear-gradient(160deg, #0c0c0e 0%, #12121a 100%)"
    >
      <div ref={ref} className={styles.inner}>
        <div
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(20px)',
            transition: `all 0.7s ${ease} 0s`,
          }}
        >
          <p className={styles.overline}>Automatisation & Agents IA</p>
        </div>
        <h2
          className={styles.title}
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(20px)',
            transition: `all 0.7s ${ease} 0.08s`,
          }}
        >
          Des processus <span className={styles.accent}>intelligents</span>
        </h2>
        <div className={styles.columns}>
          <div
            className={styles.leftCol}
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateX(0)' : 'translateX(-120px)',
              transition: `all 0.9s ${ease} 0.15s`,
            }}
          >
            <div className={styles.glassCard}>
              <p className={styles.cardLabel}>Expertise</p>
              <p className={styles.cardText}>
                Solutions basées sur des agents IA avec{' '}
                <strong className={styles.strong}>n8n</strong> et{' '}
                <strong className={styles.strong}>Make</strong>.
              </p>
              {AUTO_USE_CASES.map((t, i) => (
                <div key={i} className={styles.useCase}>
                  <span className={styles.dot} />
                  <span className={styles.useCaseText}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            className={styles.rightCol}
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateX(0)' : 'translateX(120px)',
              transition: `all 0.9s ${ease} 0.25s`,
            }}
          >
            <div className={styles.glassCard}>
              <p className={styles.cardLabel}>Projet — Génération de blog</p>
              <p className={styles.cardDesc}>
                Pipeline n8n : scraping SERP, analyse vectorielle, génération SEO par 3 agents IA,
                humanisation du contenu.
              </p>
            </div>
            <div className={styles.glassCard}>
              <p className={styles.cardLabel}>Projet — Audit SEO automatisé</p>
              <p className={styles.cardDesc}>
                Agent IA sur n8n : analyse automatique d&apos;une page web et rapport d&apos;audit SEO
                complet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
