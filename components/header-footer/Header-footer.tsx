'use client';
import Image from 'next/image';
import { useEffect, useState, useRef, FC, useCallback } from 'react';
import styles from './header_footer.module.css';
import { useRouter } from 'next/navigation';
import landscape_screen from '@/assets/images/landscape-screen.gif';
import { atom, useRecoilState } from 'recoil';

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
  const theme_localkeyname_Str: string = 'dark_theme';

  useEffect(()=> {

  },[])

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

  // フルスクリーンのセット/解除
  function toggleMaximize() {
    /*
    document.body.requestFullscreen();
    document.exitFullscreen();
    */
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
                <button onClick={top_link} className={styles.menu_link}>
                  <span className={styles.lable}>TOP</span>
                </button>
              </div>

              <div>
                <button onClick={todo_link} className={styles.menu_link}>
                  <span className={styles.lable}>TODO</span>
                </button>
              </div>

              <div>
                <button onClick={whatstudy_link} className={styles.menu_link}>
                  <span className={styles.lable}>What study?</span>
                </button>
              </div>

              <button className={styles.menu_link} onClick={toggleDarkMode}>
                <span className={styles.lable}>{theme_Bool ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

            <button className={styles.menu_link} onClick={toggleMaximize}>
            <svg className={styles.maximize_img} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 4H4v3m13-3h3v3M7 20H4v-3m13 3h3v-3"></path></svg>
            maximize
            </button>


            </div>
            <div className={styles.overlay}>
              <Image src={landscape_screen.src} layout="responsive" width={1} height={1} alt="" loading="lazy" className={styles.landscape_screen} />
            </div>


            

          </div>
        </header>
      </div>
    </main>
  );
}
