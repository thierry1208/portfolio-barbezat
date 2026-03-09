'use client';

import { useState, useEffect } from 'react';
import styles from './MagneticOrb.module.css';

export default function MagneticOrb() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMove = (e) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.orb}
        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      />
    </div>
  );
}
