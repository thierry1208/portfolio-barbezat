'use client';

import { useState } from 'react';
import Slide from '@/components/ui/Slide';
import useSectionVisible from '@/components/hooks/useSectionVisible';
import styles from './AuditSeoSection.module.css';

const WEBHOOK_URL = 'https://n8n.zenyio.ch/webhook/test-webhook';

export default function AuditSeoSection() {
  const [ref, vis] = useSectionVisible(0.3);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const ease = 'cubic-bezier(0.16,1,0.3,1)';

  const item = (i) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.8s ${ease} ${0.1 + i * 0.12}s, transform 0.8s ${ease} ${0.1 + i * 0.12}s`,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    // Écrire tout le template HTML synchroniquement (popup jamais bloquée)
    // puis mettre à jour #result via getElementById après le fetch
    const popup = window.open('', 'audit-seo', 'width=860,height=680,scrollbars=yes,resizable=yes');
    popup.document.open();
    popup.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Audit SEO — ${url}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f9f9f9; color: #1a1a1a; padding: 32px; line-height: 1.7; }
    #loading { display: flex; align-items: center; gap: 12px; color: #666; font-size: 14px; }
    .spinner { width: 18px; height: 18px; border: 2px solid #ddd; border-top-color: #c8aa78; border-radius: 50%; animation: spin 0.7s linear infinite; flex-shrink: 0; }
    @keyframes spin { to { transform: rotate(360deg); } }
    #result h1,#result h2,#result h3 { color: #0066cc; margin: 20px 0 8px; }
    #result p { margin-bottom: 12px; }
    #result ul,#result ol { padding-left: 20px; margin-bottom: 12px; }
    #result table { border-collapse: collapse; width: 100%; margin-bottom: 16px; }
    #result th,#result td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
    #result th { background: #f0f0f0; }
    #result code { background: #eee; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
  </style>
</head>
<body>
  <div id="loading"><div class="spinner"></div>Analyse SEO en cours…</div>
  <div id="result"></div>
</body>
</html>`);
    popup.document.close();

    setLoading(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: url }),
      });

      if (!res.ok) throw new Error('HTTP ' + res.status);

      const html = await res.text();

      if (popup && !popup.closed) {
        popup.document.getElementById('loading').style.display = 'none';
        popup.document.getElementById('result').innerHTML = html;
      }
    } catch (err) {
      if (popup && !popup.closed) {
        popup.document.getElementById('loading').style.display = 'none';
        popup.document.getElementById('result').innerHTML =
          `<p style="color:red;">Erreur : ${err.message}</p>`;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Slide
      id="audit-seo"
      gradient="linear-gradient(160deg, #0c0c0e 0%, #12121a 100%)"
    >
      <div ref={ref} className={styles.inner}>
        <div style={item(0)} className={styles.overlineRow}>
          <img src="/images/logo_school/logo-n8n.webp" alt="n8n" className={styles.n8nLogo} />
          <p className={styles.overline}>Projet réalisé avec n8n — démonstration live</p>
        </div>
        <h2 className={styles.title} style={item(1)}>
          Audit SEO <span className={styles.accent}>instantané</span>
        </h2>
        <p className={styles.desc} style={item(2)}>
          Saisissez n&apos;importe quelle URL — un agent IA analyse la page et génère un rapport SEO
          complet en quelques secondes.
        </p>
        <p className={styles.desc} style={item(2)}>
          Ce workflow a été entièrement conçu et développé avec n8n incluant 2 agents IA — essayez-le en direct.
        </p>

        <form onSubmit={handleSubmit} className={styles.form} style={item(3)}>
          <div className={styles.inputRow}>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://exemple.ch/page"
              required
              disabled={loading}
              className={styles.input}
            />
            <button type="submit" disabled={loading} className={styles.btn}>
              {loading ? (
                <span className={styles.spinner} />
              ) : (
                'Analyser →'
              )}
            </button>
          </div>
          <p className={styles.hint}>
            Le rapport s&apos;ouvre dans une nouvelle fenêtre
          </p>
        </form>

        <div className={styles.pills} style={item(4)}>
          {['Balises meta', 'Titres H1–H6', 'Performance', 'Maillage interne', 'Contenu', 'Score global'].map((t) => (
            <span key={t} className={styles.pill}>{t}</span>
          ))}
        </div>
      </div>
    </Slide>
  );
}
