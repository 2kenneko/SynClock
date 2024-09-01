'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import Header, { darkThemeState } from '@/components/header-footer/Header';
import Footer from '@/components/header-footer/Footer';
import AudioPlayer from '@/components/audioplayer/Audioplayer';
import { RecoilRoot, useRecoilState } from 'recoil';


/*
 *  下のimport ~ のところに書き、場所を指定することでページそれぞれにdark_modeと記述する手間を省きます
 *  
 *  使い方
 *  1.下のimportに作成したcss,またはscssを適用します。
 *  2.return ( のところに1.で追加したcssまたはscssを入力します
 *  3.cssまたはscssで " .dark_modeと入力することでdark_modeにすると適用されるcssが作成できます "
 *  
*/
import styles_btn from '@/components/styles/btn.module.scss';
import styles_page from '@/src/app/page.module.scss';
import styles_todo from "@/src/app/page.module.scss";
import styles_whatstudy from "@/src/app/whatstudy/whatstudy.module.scss";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecoilRoot>
      <RootLayoutInner>{children}</RootLayoutInner>
    </RecoilRoot>
  );
}

function RootLayoutInner({ children }: { children: React.ReactNode }) {
  const [isdark_mode] = useRecoilState(darkThemeState);

  return (
    <html lang="ja">
      {/* Vue.jsでは<nuxt/>と同じ */}
      <meta name="Clockshare_React" content="" />
      <body className={`${inter.className} ${isdark_mode? 
        `
        {/* ここにダークテーマを使用したいページをかく*/}
        ${styles_btn.styles_btn}
        ${styles_page.dark_mode}
        ${styles_todo.dark_mode}
        ${styles_whatstudy.dark_mode}
        ${styles_todo.dark_mode}
        
        
        
        `: ''}`}>
        <Header />
        <AudioPlayer />
        {children}
        <Footer />
      </body>
    </html>
  );
}
