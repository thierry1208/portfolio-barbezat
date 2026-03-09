import styles from './Slide.module.css';

export default function Slide({ id, children, bg, gradient, style: extra = {} }) {
  const bgStyle = gradient
    ? { background: gradient }
    : { background: bg || 'var(--bg-primary)' };

  return (
    <section id={id} className={styles.slide} style={{ ...bgStyle, ...extra }}>
      {children}
    </section>
  );
}
