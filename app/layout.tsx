import './globals.css';
import type { Metadata } from 'next';
import { Inter, Dancing_Script, Great_Vibes } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  variable: '--font-dancing-script',
});
const greatVibes = Great_Vibes({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-great-vibes',
});

export const metadata: Metadata = {
  title: 'Igmar & Manuel - Nuestra Boda',
  description: 'Celebra con nosotros el día más especial de nuestras vidas - 14 de Septiembre, 2025',
  openGraph: {
    title: 'Igmar & Manuel - Nuestra Boda',
    description: 'Celebra con nosotros el día más especial de nuestras vidas - 14 de Septiembre, 2025',
    url: 'https://invitacion-boda-gold.vercel.app',
    siteName: 'Igmar & Manuel - Nuestra Boda',
    images: [
      {
        url: 'https://invitacion-boda-gold.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Igmar & Manuel - Nuestra Boda',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Igmar & Manuel - Nuestra Boda',
    description: 'Celebra con nosotros el día más especial de nuestras vidas - 14 de Septiembre, 2025',
    images: ['https://invitacion-boda-gold.vercel.app/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${dancingScript.variable} ${greatVibes.variable}`}>
        {children}
      </body>
    </html>
  );
}