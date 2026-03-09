'use client';

import { useState } from 'react';
import Slide from '@/components/ui/Slide';
import useSectionVisible from '@/components/hooks/useSectionVisible';
import { FOOTER_LINKS } from '@/lib/constants';
import styles from './ContactSection.module.css';

const FORMSPREE_ID = 'mzdjdpjk'; // Remplacer par l'ID Formspree

export default function ContactSection() {
  const [ref, vis] = useSectionVisible(0.3);
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const ease = 'cubic-bezier(0.16,1,0.3,1)';

  const line = (i) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'scale(1)' : 'scale(0.92)',
    filter: vis ? 'blur(0px)' : 'blur(6px)',
    transition: `all 1.1s ${ease} ${0.2 + i * 0.18}s`,
  });

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setStatus('success');
        setFields({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <Slide id="contact">
      <div ref={ref} className={styles.inner}>
        <div style={line(0)}>
          <p className={styles.overline}>Contact</p>
        </div>
        <h2 className={styles.title} style={line(1)}>
          Créons quelque chose
          <br />
          <span className={styles.accent}>d&apos;exceptionnel</span>
        </h2>
        <p className={styles.subtitle} style={line(2)}>
          Projet ponctuel ou collaboration à long terme — je suis ouvert à échanger sur vos besoins.
        </p>

        {status === 'success' ? (
          <div className={styles.successMsg} style={line(3)}>
            <p className={styles.successText}>Message envoyé — je vous réponds sous 24h.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form} style={line(3)} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Nom</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={fields.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Votre nom"
                  disabled={status === 'sending'}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={fields.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="votre@email.com"
                  disabled={status === 'sending'}
                />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={fields.message}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Décrivez votre projet..."
                disabled={status === 'sending'}
              />
            </div>
            {status === 'error' && (
              <p className={styles.errorMsg}>Une erreur est survenue — réessayez ou écrivez directement à contact@thierrybarbezat.ch</p>
            )}
            <button
              type="submit"
              className={styles.submit}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Envoi…' : 'Envoyer le message'}
            </button>
          </form>
        )}

        <div className={styles.footerLinks} style={line(4)}>
          {FOOTER_LINKS.map((l) => (
            <a key={l.label} href={l.href} className={styles.footerLink}>
              {l.label}
            </a>
          ))}
        </div>
        <div className={styles.copyright} style={line(5)}>
          © 2026 Thierry Barbezat · Genève, Suisse
        </div>
      </div>
    </Slide>
  );
}
