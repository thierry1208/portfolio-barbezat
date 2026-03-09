'use client';

import { useState } from 'react';
import { SECTIONS } from '@/lib/constants';
import styles from './DotNav.module.css';

export default function DotNav({ active, onNavigate }) {
  const [tip, setTip] = useState(null);

  return (
    <nav className={styles.nav} aria-label="Navigation sections">
      {SECTIONS.map((s, i) => (
        <div
          key={s.id}
          className={styles.item}
          onMouseEnter={() => setTip(i)}
          onMouseLeave={() => setTip(null)}
          onClick={() => onNavigate(s.id)}
        >
          <span
            className={styles.label}
            style={{
              opacity: tip === i ? 1 : 0,
              transform: tip === i ? 'translateX(0)' : 'translateX(8px)',
            }}
          >
            {s.label}
          </span>
          <div
            className={styles.dot}
            style={{
              width: active === s.id ? 10 : 6,
              height: active === s.id ? 10 : 6,
              background: active === s.id ? 'var(--accent)' : 'rgba(255,255,255,0.18)',
              border: active === s.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
              boxShadow: active === s.id ? '0 0 14px rgba(200,170,120,0.35)' : 'none',
            }}
          />
        </div>
      ))}
    </nav>
  );
}
