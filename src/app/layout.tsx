'use client';
//Vue.js のDefaultと同じ
import { Inter } from 'next/font/google';
import './globals.css';
import Header_footer from '@/components/header-footer/Header-footer';
import { RecoilRoot } from 'recoil';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* Vue.jsでは<nuxt/>と同じ */}
      <meta name="Clockshare_React" content="" />
      <body className={inter.className}>
        <div>
          <RecoilRoot>
            <Header_footer />
            {children}
          </RecoilRoot>
        </div>
      </body>
    </html>
  );
}
