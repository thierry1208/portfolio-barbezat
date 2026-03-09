'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Lightbox.module.css';

export default function Lightbox({ project, onClose }) {
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  useEffect(() => {
    loadedRef.current = false;
    setLoaded(false);
    setBlocked(!!project.noEmbed);
    if (project.noEmbed) return;
    const t = setTimeout(() => {
      if (!loadedRef.current) setBlocked(true);
    }, 3500);
    return () => clearTimeout(t);
  }, [project]);

  const hostname = (() => {
    try { return new URL(project.url).hostname.replace('www.', ''); }
    catch { return project.url; }
  })();

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.bar}>
          <div className={styles.barLeft}>
            <span className={styles.dot} style={{ background: '#ff5f57' }} />
            <span className={styles.dot} style={{ background: '#febc2e' }} />
            <span className={styles.dot} style={{ background: '#28c840' }} />
          </div>
          <div className={styles.urlBar}>
            <span className={styles.lock}>🔒</span>
            <span className={styles.hostname}>{hostname}</span>
          </div>
          <div className={styles.barRight}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.openBtn}
              title="Ouvrir dans un nouvel onglet"
            >
              ↗
            </a>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
              ✕
            </button>
          </div>
        </div>

        <div className={styles.iframeWrapper}>
          {!loaded && !blocked && (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <span>Chargement…</span>
            </div>
          )}
          {blocked ? (
            <div className={styles.fallback}>
              <p className={styles.fallbackMsg}>
                Ce site ne peut pas être intégré dans une fenêtre.
              </p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fallbackLink}
              >
                Ouvrir {project.name} dans un nouvel onglet →
              </a>
            </div>
          ) : (
            <iframe
              src={project.url}
              title={project.name}
              className={styles.iframe}
              style={{ opacity: loaded ? 1 : 0 }}
              onLoad={() => { loadedRef.current = true; setLoaded(true); setBlocked(false); }}
              onError={() => setBlocked(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
