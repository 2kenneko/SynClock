// vueの index.vueと同じ
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

import Showtime from '@/components/time-render/Showtime';
import Resttime from '@/components/time-render/Resttime';
import Bot from '@/components/Bot';
import running_stickman_link from '@/assets/images/running-stickman-transparency.gif';
import { darkThemeState } from '@/components/header-footer/Header';
import { useRecoilState } from 'recoil';
export default function Page() {
  /*
   * —————————————— 変数定義のルール ——————————————
   *     - わかりやすい名前
   *     - ＿の後は大文字
   *     - 初期状態の記述
   *
   * ———————————————— 変数の使用用途 ————————————————
   *   time_Num           -> 時間保存
   *   progress_Num       -> プログレスバーの進捗度
   *   progress_count_Num -> プログレスバーが進むとカウントが進む
   *   task_Str           -> タスクの名前
   *   isResting_Bool     -> 休憩しているか
   *   togglebtn_Bool     -> トグルボタンの状態
   *   resttime_Num       -> 休憩時間
   *   theme_Bool         -> ダークテーマ
   * 
   *   timeS -> 秒
   *   timeM -> 分
   *   timeH -> 時
   *
   * ———————————————— ローカルストレージのキーの名前 ————————————————
   *   time -> 時間の保存
   *   progress_count -> プログレスバーのカウントの保存
   *   theme -> ダークテーマ
   *   task -> 何を勉強しているか
   *
   */

  let [time_Num, settime_Num] = useState<number>(0);
  let [progress_Num, setprogress_Num] = useState<number>(0);
  let [progress_count_Num, setprogress_count_Num] = useState<number>(0);
  let [theme_Bool] = useRecoilState(darkThemeState);
  const [task_Str, settask_Str] = useState<string>('');
  const [isResting_Bool, setisResting_Bool] = useState<boolean>(false);
  const [togglebtn_Bool] = useState<boolean>(false);
  const [resttime_Num] = useState<number>(100);

  const time_localkeyname_Str: string = 'time';
  const progress_count_localkeyname_Str: string = 'check-count';
  const theme_localkeyname_Str: string = 'dark_theme';
  const task_Str_localkeyname_Str: string = 'whatstudy';

  let [timeS, settimeS] = useState<string>('00'); //秒
  let [timeM, settimeM] = useState<string>('00'); //分
  let [timeH, settimeH] = useState<string>('00'); //時

  /*——————————————————————
  *   タイトルに時間を表示
  ——————————————————————*/
  useEffect(() => {
    const seconds = (time_Num % 60) + 1;
    const minutes = Math.floor(time_Num / 60) % 60;
    const hours = Math.floor(time_Num / (60 * 60)) % 24;
    settimeS(seconds.toString().padStart(2, '0'));
    settimeM(minutes.toString().padStart(2, '0'));
    settimeH(hours.toString().padStart(2, '0'));
    document.title = `${timeH}:${timeM}:${timeS}`;
  }, [time_Num]);

  /*——————————————————————
    最初に実行
  ———————————————————————*/
  useEffect(() => {
    checklocalkey();
  }, []);

  /*  ——————————————————————
    ローカルストレージを確認する
  ———————————————————————  */
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
      time_Num = Number(localStorage.getItem(time_localkeyname_Str));
      return time_Num;
    });
    settask_Str((task_Str) => {
      task_Str = String(localStorage.getItem(task_Str_localkeyname_Str));
      return task_Str;
    });
  }

  /*  ————————————————————
        クリアボタン
  —————————————————————  */
  function cleartime() {
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
    return () => clearInterval(intervalId);
  }, [isResting_Bool]);

  function toggleRest() {
    setisResting_Bool((prevIsResting_Bool) => !prevIsResting_Bool);
  }

  useEffect(() => {
    //timeが更新されたとき
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
          <button className={`${styles.toggle_button} ${togglebtn_Bool ? 'hover' : ''}`} onClick={toggleRest}>
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
