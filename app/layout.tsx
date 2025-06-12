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