import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'Thierry Barbezat — Marketing Digital · Genève',
  description:
    'Expert en SEO, automatisation IA et stratégie digitale basé à Genève. DAS Communication Digitale — Université de Genève.',
  keywords: ['SEO', 'Automatisation IA', 'Marketing Digital', 'Genève', 'n8n', 'Make', 'Web Design'],
  authors: [{ name: 'Thierry Barbezat' }],
  openGraph: {
    title: 'Thierry Barbezat — Marketing Digital · Genève',
    description: 'Je rends les entreprises visibles — SEO · Automatisation IA · Stratégie Digitale',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
