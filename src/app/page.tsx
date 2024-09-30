'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import styles_btn from "@/components/styles/btn.module.scss";

//import Showtime from '@/components/time-render/Showtime';
import Resttime from '@/components/time-render/Resttime';
import Bot from '@/components/Bot';
import running_stickman_link from '@/assets/images/running-stickman-transparency.gif';
import { audio_modalwindow, darkThemeState } from '@/components/header-footer/Header';
import { useRecoilState } from 'recoil';


import useTimeDisplay from "@/hooks/useTimeDisplay";
import { useHotkeys } from 'react-hotkeys-hook';
import useLocalStorage from '~/hooks/useLocalStorage';



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
  let [isopenwin_Bool] = useRecoilState(audio_modalwindow);
  const [task_Str, settask_Str] = useState<string>('');
  const [isResting_Bool, setisResting_Bool] = useState<boolean>(false);
  const [togglebtn_Bool] = useState<boolean>(false);
  const [resttime_Num] = useState<number>(6000); //休憩時間

  const time_localkeyname_Str: string = 'time';
  const progress_count_localkeyname_Str: string = 'check-count';
  const theme_localkeyname_Str: string = 'dark_theme';
  const task_Str_localkeyname_Str: string = 'whatstudy';
  const selectedImage_localkeyname_Str: string = 'Selected_image'; // 追加
  const isopenaudiowindow_Str : string = 'open_modal_window';

  const showtime = useTimeDisplay(time_Num);

  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 追加


  /*——————————————————————
    最初に実行
  ———————————————————————*/
  useEffect(() => {
    checklocalkey();
  }, []);

  /*——————————————————————
    ローカルストレージからSelected_imageを取得
  ———————————————————————*/
  useEffect(() => {
    const storedImage = localStorage.getItem(selectedImage_localkeyname_Str);
    if (storedImage) {
      setSelectedImage(storedImage);
    }
  }, []);

  //時間をタイトルに表示する
  useEffect(()=> {
    document.title = showtime;
  },[time_Num])

  /*  ——————————————————————
    ローカルストレージを確認する
  ———————————————————————  */
  function checklocalkey() {
    useLocalStorage(time_localkeyname_Str, String(time_Num), true);
    useLocalStorage(progress_count_localkeyname_Str, String(progress_count_Num), true);
    useLocalStorage(theme_localkeyname_Str, String(theme_Bool), true);
    useLocalStorage(task_Str_localkeyname_Str, "", true);
    useLocalStorage(isopenaudiowindow_Str, String(isopenwin_Bool), true);
    
    settime_Num(Number(localStorage.getItem(time_localkeyname_Str)));
    settask_Str(String(localStorage.getItem(task_Str_localkeyname_Str)));

  }

  /*  ————————————————————
        クリアボタン
  —————————————————————  */
  function cleartime() {
    localStorage.setItem(time_localkeyname_Str, '0');
    localStorage.setItem(progress_count_localkeyname_Str, '0');

    settime_Num(0);
    setprogress_Num(0);
    setprogress_count_Num(0);
  }
//ゲージの色変化
function getProgressBarColor(progress: number): string {
  // 進捗度に応じた色を計算する
  const percentage = progress / 100 * 360;

  return `hsl(${percentage}, ${100}%, ${50}%)`;
}





  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (!isResting_Bool) {
        settime_Num((time_Num) => {
          time_Num = time_Num + 1;
          localStorage.setItem(time_localkeyname_Str, String(time_Num));
          return time_Num;
        });
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isResting_Bool]);

  

  useHotkeys('space', ()=> toggleRest()); //ショートカットを追加
  function toggleRest() {
    setisResting_Bool((prevIsResting_Bool) => !prevIsResting_Bool);
  }

  useEffect(() => {
    setprogress_Num((progress_Num) => {
      progress_Num = time_Num % 600;

      if (progress_count_Num === 599) {
        setprogress_count_Num((progress_count_Num) => progress_count_Num + 1);
        localStorage.setItem(progress_count_localkeyname_Str, String(progress_count_Num));
      }
      return progress_Num;
    });
  }, [time_Num]);

  return (
    <main id="app">
      <div>
        <div className={styles.timer_container}>
          {/* <h1>SynClock</h1> */}
          <p>今勉強していること：{task_Str}</p>
          <p>
            check: {String(progress_count_Num)} time: {time_Num}
          </p>
          <div className={styles.maincontent}>
            {!isResting_Bool && <div>{showtime}</div>}
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
            <div
              className={styles.progress}
              style={{ 
                width: `${progress_Num * (1 / 6)}%`, 
                backgroundColor: getProgressBarColor(progress_Num * (1 / 6))
              }}
            ></div>
          </div>
        </div>
        <div className={styles.btn_main}>
          <button className={`${styles_btn.primary_btn} ${togglebtn_Bool ? 'hover' : ''}`} onClick={toggleRest}>
            {isResting_Bool ? 'REST' : 'studying'}
          </button>
  
          <button className={styles_btn.secondary_btn} onClick={cleartime}>
            ClearTime
          </button>
        </div>
  
        {/* Selected_imageが存在する場合に表示 */}
        {selectedImage && (
          <div className={styles.selected_image}>
            <Image src={selectedImage} alt="Selected" width={200} height={200} />
          </div>
        )}
  
        <div className={styles.bot_container}>
          <Bot />
          <Bot />
          <Bot />
        </div>
      </div>
    </main>
  )};