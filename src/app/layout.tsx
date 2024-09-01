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
 *  2.return ( のところに1.で追加したscssを入力します
 *  3.scssで " .dark_modeと入力することでdark_modeにすると適用されるcssが作成できます "
 *  
*/
import styles_01 from '@/components/styles/btn.module.scss';
import styles_02 from '@/src/app/page.module.scss';
import styles_03 from "@/components/bot.module.scss";
import styles_04 from "@/src/app/whatstudy/whatstudy.module.scss";
import styles_05 from '@/src/app/questionnaire/page.module.scss';
import styles_06 from '@/src/app/character/page.module.scss';
import styles_07 from '@/components/header-footer/footer.module.scss';
import styles_08 from '@/components/header-footer/header.module.scss';
import styles_09 from '@/components/audioplayer/audioplayer.module.scss';
import styles_10 from '@/src/app/todo/todo.module.scss';
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
        {/* 
          ここにダークテーマを使用したいページをかく
          記述がない場合はlayout.tsxを参照してください
        */}
        ${styles_01.dark_mode}
        ${styles_02.dark_mode}
        ${styles_03.dark_mode}
        ${styles_04.dark_mode}
        ${styles_05.dark_mode}
        ${styles_06.dark_mode}
        ${styles_07.dark_mode}
        ${styles_08.dark_mode}
        ${styles_09.dark_mode}
        ${styles_10.dark_mode}
        
        
        
        `: ''}`}>
        <Header />
        <AudioPlayer />
        {children}
        <Footer />
      </body>
    </html>
  );
}
