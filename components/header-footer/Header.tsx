'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './header.module.scss';
import styles_btn from '@/components/styles/btn.module.scss';
import { useRouter } from 'next/navigation';
import landscape_screen from '@/assets/images/landscape-screen.gif';
import { atom, useRecoilState } from 'recoil';
import maxmize_icon from '@/assets/images/svgs/maximize.svg';
import minimize_icon from '@/assets/images/svgs/minimize.svg';
import darkmode_icon from '@/assets/images/svgs/darkmode.svg';
import lightmode_icon from '@/assets/images/svgs/lightmode.svg';
import logo from '@/assets/logo/Icon.svg'
import { useHotkeys } from 'react-hotkeys-hook';


//キーを保存
export const darkThemeState = atom({
  key: 'dark_theme', // キーを指定
  default: false, // 初期値をfalseに設定（ダークテーマ無効）
});
//  オーディオ用のモーダルウィンドウの表示
export const audio_modalwindow = atom({
  key: 'audio_window', // キーを指定
  default: false, // 初期値をfalseに設定（ダークテーマ無効）
});
export default function Page() {
  const router = useRouter();
  const link_top: string = '/';
  const link_todo: string = '/todo';
  const link_whatstudy: string = '/whatstudy';
  const link_character: string = '/character';

  let [theme_Bool, settheme_Bool] = useRecoilState(darkThemeState);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const theme_localkeyname_Str: string = 'dark_theme';



// ____ 画面のフルスクリーン切り替え  ____
  useEffect(() => {
//  __________  ローカルストレージ->テーマをロード時に変更  __________
    if(JSON.parse(String(localStorage.getItem(theme_localkeyname_Str)))) {
      settheme_Bool(true);
      //  darktheme -> true
    } else {
      settheme_Bool(false);
      //  darktheme -> false
    }
//_________________________________________________________________







    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  const toggleMaximize = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`フルスクリーンモードに切り替えられませんでした: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
// _____________________________________


// ________ リンク先へ飛ぶ  ________
  function top_link() {
    router.push(link_top);
  }
  function todo_link() {
    router.push(link_todo);
  }
  function whatstudy_link() {
    router.push(link_whatstudy);
  }
  function character_link() {
    router.push(link_character);
  }
//________________________________


//______ ショートカットを追加 ________
  useHotkeys('1', ()=> top_link());
  useHotkeys('2', ()=> todo_link());
  useHotkeys('3', ()=> whatstudy_link());
  useHotkeys('4', ()=> character_link());
  useHotkeys('5', ()=> toggleDarkMode());
  useHotkeys('6', ()=> toggleMaximize());
//________________________________



//  ________ダークモード切り替え________
  function toggleDarkMode() {
    settheme_Bool((theme_Bool) => {
      theme_Bool = !theme_Bool;
      localStorage.setItem(theme_localkeyname_Str, String(theme_Bool));
      return theme_Bool;
    });
  }
//  ____________________________________



  return (
    <main>
      <div className={theme_Bool ? `${styles.dark_mode} ${styles_btn.dark_mode}` : ''}>
        <header className={styles.header}>
          <div className={styles['header-left']}>
            {/* <h1 className={styles['header_text']}>SynClock</h1> */}
            <button onClick={top_link} className={styles_btn.transparent_btn}>
              <Image src={logo.src} width={200} height={200} alt="" loading="lazy" className={styles.icon} />
            </button>
          </div>
          <div className={styles['header-right']}>
            <div className={styles['header_btn_container']}>
              <div>
                {/*————————————————————
                    TOPボタン 
                  _____________________
                */}
                <button onClick={top_link} className={styles_btn.header_btn}>
                  <span className={styles.label}>TOP</span>
                </button>
              </div>
              {/*————————————————————
                    TODOボタン 
                  _____________________
              */}
              <div>
                <button onClick={todo_link} className={styles_btn.header_btn}>
                  <span className={styles.label}>TODO</span>
                </button>
              </div>
              {/*——————————————————————
                    Characterボタン 
                  _____________________
              */}
              <div>
                <button onClick={character_link} className={styles_btn.header_btn}>
                  <span className={styles.label}>CHARACTER</span>
                </button>
              </div>
              {/*——————————————————————
                    What studyボタン 
                  _____________________
              */}
              <div>
                <button onClick={whatstudy_link} className={styles_btn.header_btn}>
                  <span className={styles.label}>What study?</span>
                </button>
              </div>

              {/*—————————————————————————
                    Dark / Light modeボタン 
                  ________________________
              */}

              <button className={styles_btn.header_btn} onClick={toggleDarkMode}>

              {theme_Bool ? (
                ''
                ) : 
                <div className={styles.icon_container}>
                <Image src={lightmode_icon.src} width={20} height={20} alt="" loading="lazy" className={styles.icon} />
              </div>
                }
                <span className={styles.label}>{theme_Bool ? 'Light Mode' : 'Dark Mode'}</span>
                {theme_Bool ? (
                    <div className={styles.icon_container}>
                      <Image src={darkmode_icon.src} width={20} height={20} alt="" loading="lazy" className={styles.icon} />
                    </div>
                ) : ''}
              </button>


                {/*——————————————————————
                    最大/最小切り替えボタン 
                  _______________________
                */}
              <button className={styles_btn.header_btn} onClick={toggleMaximize}>
                <div>
                  {isFullscreen ? (
                    <div className={styles.icon_container}>
                      <Image src={minimize_icon.src} width={20} height={20} alt="" loading="lazy" className={styles.icon} />
                      <div>minimize</div>
                    </div>
                  ) : (
                    <div className={styles.icon_container}>
                      <Image src={maxmize_icon.src} width={20} height={20} alt="" loading="lazy" className={styles.icon} />
                      maxmize
                    </div>
                  )}
                </div>
              </button>
            </div>
            {/*——————————————————————
                画面 横/縦 オーバーレイ
              _______________________
            */}
            <div className={styles.overlay}>
              <Image src={landscape_screen.src}
              width={100}
              height={100}
              alt="" 
              loading="lazy" 
              className={styles.landscape_screen} 
              sizes="100%"
              style={{
                width: '100%',
                height: 'auto',
              }}
              />
            </div>
          </div>
        </header>
      </div>
    </main>
  );
}
