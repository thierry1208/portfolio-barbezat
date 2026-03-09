'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { SECTIONS } from '@/lib/constants';
import DotNav from '@/components/Navigation/DotNav';
import TopNav from '@/components/Navigation/TopNav';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import CompetencesSection from '@/components/sections/CompetencesSection';
import WebmasterSection from '@/components/sections/WebmasterSection';
import AutomatisationSection from '@/components/sections/AutomatisationSection';
import AuditSeoSection from '@/components/sections/AuditSeoSection';
import SeoSection from '@/components/sections/SeoSection';
import PhotoVideoSection from '@/components/sections/PhotoVideoSection';
import EducationSection from '@/components/sections/EducationSection';
import OutilsSection from '@/components/sections/OutilsSection';
import ContactSection from '@/components/sections/ContactSection';
import styles from './page.module.css';

export default function Home() {
  const [active, setActive] = useState('hero');
  const containerRef = useRef(null);

  const navigateTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.55, root: containerRef.current }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`snapContainer ${styles.container}`}>
      <TopNav onNavigate={navigateTo} />
      <DotNav active={active} onNavigate={navigateTo} />
      <HeroSection />
      <AboutSection />
      <CompetencesSection />
      <WebmasterSection />
      <AutomatisationSection />
      <AuditSeoSection />
      <SeoSection />
      <PhotoVideoSection />
      <EducationSection />
      <OutilsSection />
      <ContactSection />
    </div>
  );
}
