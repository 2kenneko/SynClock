'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './whatstudy.module.css';
import { useRecoilState } from 'recoil';
import { darkThemeState } from '~/components/header-footer/Header-footer';

export default function Page() {
  // SCRIPT SETUP

  let [task_Str, settask_Str] = useState<string>(''); //タスクの名前
  let [darktheme] = useRecoilState(darkThemeState);
  const whatstudy_locakkeyname_Str: string = 'whatstudy';
  const link_top: string = '/';
  const router = useRouter();

  useEffect(()=> {
    document.title = "whatstudy";
  }, [])

  /* ————————————————
  *   TOPページへ遷移
  ———————————————— */
  function enterTask() {
    localStorage.setItem(whatstudy_locakkeyname_Str, task_Str);
    router.push(link_top);
  }

  return (
    <main className={darktheme ? `${styles.dark_mode}` : ''}>
      <div className={styles.main}>
        <h1 className={styles.h1}>今勉強するべきことはなんですか？</h1>
        <div>
          <input className={styles.input} placeholder="Enter a task" value={task_Str} onChange={(event) => settask_Str(event.target.value)} />
          <button className={styles.btn} onClick={enterTask}>
            <span>GO</span>
          </button>
        </div>
      </div>
    </main>
  );
}
