'use client';
import Image from 'next/image';
import { useEffect, useState, useRef, FC, useCallback } from 'react';
import styles from './header_footer.module.css';
import { useRouter } from 'next/navigation';
import landscape_screen from '@/assets/images/landscape-screen.gif';
import { atom, useRecoilState } from 'recoil';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import maxmize_icon from '@/assets/images/maximize.svg';
import minimize_icon from '@/assets/images/minimize.svg';

//キーを保存
export const darkThemeState = atom({
  key: 'dark_theme', // キーを指定
  default: false, // 初期値をfalseに設定（ダークテーマ無効）
});

export default function Page() {
  const router = useRouter();
  const link_top: string = '/';
  const link_todo: string = '/todo';
  const link_whatstudy: string = '/whatstudy';

  //let [theme_Bool, settheme_Bool] = useState<boolean>(false);
  let [theme_Bool, settheme_Bool] = useRecoilState(darkThemeState);
  let [isFullScreen_Bool, setisFullScreen_Bool] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const handle = useFullScreenHandle();

  const theme_localkeyname_Str: string = 'dark_theme';
  const fullscreen_localkeyname_Str: string = 'isfullscreen';

  // ------------------------------------
  // 画面のフルスクリーン切り替え
  useEffect(() => {
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
  // ------------------------------------

  function top_link() {
    router.push(link_top);
  }
  function todo_link() {
    router.push(link_todo);
  }
  function whatstudy_link() {
    router.push(link_whatstudy);
  }

  //ダークモード切り替え
  function toggleDarkMode() {
    settheme_Bool((theme_Bool) => {
      theme_Bool = !theme_Bool;
      localStorage.setItem(theme_localkeyname_Str, String(theme_Bool));
      return theme_Bool;
    });
  }

  return (
    <main>
      <div className={theme_Bool ? `${styles.dark_mode}` : ''}>
        <header className={styles.header}>
          <div className={styles['header-left']}>
            <h1 className={styles['header-text']}>タイマーテスト</h1>
          </div>
          <div className={styles['header-right']}>
            <div className={styles['header-btn']}>
              <div>
                {/*————————————————————
                    TOPボタン 
                  _____________________
                */}
                <button onClick={top_link} className={styles.menu_link}>
                  <span className={styles.lable}>TOP</span>
                </button>
              </div>
              {/*————————————————————
                    TODOボタン 
                  _____________________
              */}
              <div>
                <button onClick={todo_link} className={styles.menu_link}>
                  <span className={styles.lable}>TODO</span>
                </button>
              </div>
              {/*——————————————————————
                    What studyボタン 
                  _____________________
              */}
              <div>
                <button onClick={whatstudy_link} className={styles.menu_link}>
                  <span className={styles.lable}>What study?</span>
                </button>
              </div>

              <button className={styles.menu_link} onClick={toggleDarkMode}>
                <span className={styles.lable}>{theme_Bool ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              <button className={styles.menu_link} onClick={toggleMaximize}>
                {/*——————————————————————
                    最大/最小切り替えボタン 
                  _______________________
                */}
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
