// vueの index.vueと同じ
'use client';
import Image from 'next/image';
import { useEffect, useState, useRef, SetStateAction } from 'react';
import styles from './page.module.css';

import Showtime from '@/components/time-render/Showtime';
import Resttime from '@/components/time-render/Resttime';
import Bot from '@/components/Bot';
import running_stickman_link from '@/assets/images/running-stickman-transparency.gif';
import { darkThemeState } from '~/components/header-footer/Header-footer';
import { useRecoilState } from 'recoil';
export default function Page() {
  // SCRIPT SETUP
  /* 変数定義のルール
  - わかりやすい名前
  - ＿の後は大文字
  - 初期状態を保存しておく
*/

  let [task_Str, settask_Str] = useState<string>(''); //タスクの名前
  let [time_Num, settime_Num] = useState<number>(0); //時間保存
  let [isResting_Bool, setisResting_Bool] = useState<boolean>(false); //休憩しているか
  let [progress_Num, setprogress_Num] = useState<number>(0); //プログレスバーの進捗度
  let [togglebtn_Bool, settogglebtn_Bool] = useState<Boolean>(false); //トグルボタンの状態
  let [progress_count_Num, setprogress_count_Num] = useState<Number>(0); //プログレスバーが進むとカウントが進む
  let [btn_hover_Bool, setbtn_hover_Bool] = useState<boolean>(false);
  let [resttime_Num, setresttime_Num] = useState<number>(100); //休憩時間

  const time_localkeyname_Str: string = 'time';
  const progress_count_localkeyname_Str: string = 'check-count';
  const theme_localkeyname_Str: string = 'dark_theme';
  const task_Str_localkeyname_Str: string = 'whatstudy';

  let [theme_Bool, settheme_Bool] = useRecoilState(darkThemeState);

  let [timeS, settimeS] = useState<string>('00'); //秒
  let [timeM, settimeM] = useState<string>('00'); //分
  let [timeH, settimeH] = useState<string>('00'); //時

  //タイトルに時間を表示
  useEffect(() => {
    const seconds = (time_Num % 60) + 1;
    const minutes = Math.floor(time_Num / 60) % 60;
    const hours = Math.floor(time_Num / (60 * 60)) % 24;
    settimeS(seconds.toString().padStart(2, '0'));
    settimeM(minutes.toString().padStart(2, '0'));
    settimeH(hours.toString().padStart(2, '0'));
    document.title = `${timeH}:${timeM}:${timeS}`;
  }, [time_Num]);

  useEffect(() => {
    //最初のみ実行
    checklocalkey();
  }, []);

  function checklocalkey() {
    // キーの存在を確認する
    if (!localStorage.getItem(time_localkeyname_Str)) {
      localStorage.setItem(time_localkeyname_Str, String(time_Num));
    }
    if (!localStorage.getItem(progress_count_localkeyname_Str)) {
      localStorage.setItem(progress_count_localkeyname_Str, String(progress_count_Num));
    }
    if (!localStorage.getItem(theme_localkeyname_Str)) {
      localStorage.setItem(theme_localkeyname_Str, String(theme_Bool));
    }
    if (!localStorage.getItem(task_Str_localkeyname_Str)) {
      localStorage.setItem(task_Str_localkeyname_Str, '');
    }

    settime_Num((time_Num) => {
      time_Num = Number(localStorage.getItem(time_localkeyname_Str)); //タイマーをストレージから取得
      return time_Num;
    });
    settask_Str((task_Str) => {
      task_Str = String(localStorage.getItem(task_Str_localkeyname_Str));
      return task_Str;
    });
  }
  function cleartime() {
    //リセット
    localStorage.setItem(time_localkeyname_Str, '0');
    localStorage.setItem(progress_count_localkeyname_Str, '0');

    settime_Num((time_Num = 0));
    setprogress_Num((progress_Num = 0));
    setprogress_count_Num((progress_count_Num = 0));
  }

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (!isResting_Bool) {
        settime_Num((time_Num) => {
          time_Num = time_Num + 1;
          localStorage.setItem(time_localkeyname_Str, String(time_Num)); //時間の保存
          return time_Num;
        });
      }
    }, 1000);

    // クリーンアップ関数
    return () => clearInterval(intervalId);
  }, [isResting_Bool]);

  function toggleRest() {
    setisResting_Bool((prevIsResting_Bool) => !prevIsResting_Bool);
  }

  useEffect(() => {
    //timeが更新されたときに実行
    setprogress_Num((progress_Num) => {
      progress_Num = time_Num % 600;

      if (progress_count_Num === 599) {
        // プログレスバーがマックスになったとき
        setprogress_count_Num((progress_count_Num) => {
          return Number(progress_count_Num) + 1;
        });
        localStorage.setItem(progress_count_localkeyname_Str, String(progress_count_Num));
      }
      return progress_Num;
    });
  }, [time_Num]);

  function hover_MouseOver(ishover: boolean) {
    //ボタンにマウスが乗ったとき
    btn_hover_Bool = ishover;
  }
  return (
    <main id="app" className={theme_Bool ? `${styles.dark_mode}` : ''}>
      <div>
        <div className={styles.timer_container}>
          <h1>タイマーテスト</h1>
          <p>今勉強していること：{task_Str}</p>
          <p>
            check: {String(progress_count_Num)} time: {time_Num}
          </p>
          <div className={styles.maincontent}>
            {!isResting_Bool && <Showtime time={time_Num} />}

            {isResting_Bool && (
              <div className={styles.maincontent_rest}>
                <Resttime resttime_Num={resttime_Num} isRest_Bool={isResting_Bool} />
              </div>
            )}
          </div>

          <div style={{ position: 'relative' }}>
            <Image
              src={running_stickman_link.src}
              width={1}
              height={1}
              alt="stickman"
              loading="lazy"
              className={styles.running_stickman}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>

          <div className={styles.progress_bar}>
            <div className={styles.progress} style={{ width: `${progress_Num * (1 / 6)}%` }}></div>
          </div>
        </div>
        <div className={styles.btn_main}>
          <button className={`${styles.toggle_button} ${togglebtn_Bool ? 'hover' : ''}`} onMouseOver={() => hover_MouseOver(true)} onMouseLeave={() => hover_MouseOver(false)} onClick={toggleRest}>
            {isResting_Bool ? 'REST' : 'studying'}
          </button>

          <button className={styles.clear_button} onClick={cleartime}>
            ClearTime
          </button>
        </div>
        <div className={styles.bot_container}>
          <Bot />
          <Bot />
          <Bot />
        </div>
      </div>
    </main>
  );
}
