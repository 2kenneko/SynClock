'use client';
//Vue.js のDefaultと同じ
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header-footer/Header';
import Footer from '@/components/header-footer/Footer';
import AudioPlayer from '@/components/audioplayer/Audioplayer';
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
          <RecoilRoot>
            <Header />
            <AudioPlayer />
            {children}
            <Footer />
          </RecoilRoot>
      </body>
    </html>
  );
}
