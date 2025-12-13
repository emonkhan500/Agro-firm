import type { Metadata } from 'next';
import { Sen } from 'next/font/google';
import './globals.css';

const sen = Sen({
  variable: '--font-sen',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Agro Farm',
  description: 'We are best cattle & dairy farm in our country',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sen.variable} font-sen antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
