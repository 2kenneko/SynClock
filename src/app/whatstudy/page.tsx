'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './whatstudy.module.scss';
import styles_btn from "@/components/styles/btn.module.scss";

export default function Page() {
  // SCRIPT SETUP

  let [task_Str, settask_Str] = useState<string>(''); //タスクの名前
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
    <main>
      <div className={styles.main}>
        <h1 className={styles.h1}>今勉強するべきことはなんですか？</h1>
        <div>
          <input className={styles.input} placeholder="Enter a task" value={task_Str} onChange={(event) => settask_Str(event.target.value)} />
          <button className={styles_btn.primary_btn} onClick={enterTask}>
            <span>GO</span>
          </button>
        </div>
      </div>
    </main>
  );
}
