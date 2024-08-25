// vueの index.vueと同じ

"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import styles from "./css/page.module.css";

import Showtime from "@/components/Showtime";
import Bot from "@/components/Bot";
export default function Page() {
  // SCRIPT SETUP

  /* 変数定義のルール
  - わかりやすい名前
  - ＿の後は大文字
  - 初期状態を保存しておく

  - Boolは_Stage
  - numberは_Value
  - stringは_Str
*/

  let [task_Str, settask_Str]                     = useState<string>  (""); //タスクの名前
  let [time_Num, settime_Num]                     = useState<number>  (0); //時間保存
  let [isResting_Bool, setisResting_Bool]         = useState<boolean> (false); //休憩しているか
  let [progress_Num, setprogress_Num]             = useState<number>  (0); //プログレスバーの進捗度
  let [togglebtn_Bool, settogglebtn_Bool]         = useState<Boolean> (false); //トグルボタンの状態
  let [progress_count_Num, setprogress_count_Num] = useState<Number>  (0); //プログレスバーが進むとカウントが進む
  let [theme_Bool, settheme_Bool]                 = useState<boolean> (false);
  let [btn_hover_Bool, setbtn_hover_Bool]         = useState<boolean> (false);

  const time_localkeyname_Str: string = "time";
  const progress_count_localkeyname_Str: string = "check-count";
  const theme_localkeyname_Str: string = "local-theme";

  useEffect(() => {
    //最初のみ実行
    checklocalkey();
    //const intervalId = window.setInterval(loop, 1000);
    // クリーンアップ関数でタイマーをクリアする
    //return () => clearInterval(intervalId);
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

    settime_Num((time_Num) => {
      return (time_Num = Number(localStorage.getItem(time_localkeyname_Str))); //タイマーをストレージから取得
    });
  }
  function cleartime() {
    //リセット
    localStorage.setItem(time_localkeyname_Str, "0");
    localStorage.setItem(progress_count_localkeyname_Str, "0");

    settime_Num(progress_Num=0);
    setprogress_Num(progress_Num=0);
    setprogress_count_Num(progress_count_Num=0);

  }

  useEffect(() => {
    //１秒毎に実行
    // 今までのloopと同じ
    const intervalId = window.setInterval(() => {
      if (!isResting_Bool) {
        settime_Num(prevTime_Num => prevTime_Num + 1);
      }
    }, 1000);

    // クリーンアップ関数
    return () => clearInterval(intervalId);
  }, [isResting_Bool]);

  function toggleRest() {
    setisResting_Bool(prevIsResting_Bool => !prevIsResting_Bool);
  }

useEffect(()=>{
  //timeが更新されたときに実行
  setprogress_Num((progress_Num)=> {
    progress_Num = time_Num % 600;

    if (progress_count_Num === 599) {
      // プログレスバーがマックスになったとき
      setprogress_count_Num((progress_count_Num) => {
        return Number(progress_count_Num) + 1;
      });

      localStorage.setItem(
        progress_count_localkeyname_Str,
        String(progress_count_Num)
      );
    }
    return progress_Num;
  })

  localStorage.setItem(time_localkeyname_Str, String(time_Num)); //時間の保存
},[time_Num])


  function hover_MouseOver(ishover: boolean) {
    //ボタンにマウスが乗ったとき
    btn_hover_Bool = ishover;
  }

  function toggleDarkMode() {
    theme_Bool = !theme_Bool;
    localStorage.setItem(theme_localkeyname_Str, String(theme_Bool));
  }

  return (
    <main>
      <div id="app" className={theme_Bool ? "dark-mode" : ""}>
        <div className={styles.timer_container}>
          <h1>タイマーテスト</h1>
          <p>今勉強していること：{task_Str}</p>
          <p>
            check: {String(progress_count_Num)} time: {time_Num}
          </p>
          <div className={styles.maincontent}>
            <Showtime time={time_Num} />
          </div>

          <div className={styles.parent}>
            <Image
              src="/images/running-stickman-transparency.gif"
              layout="responsive"
              width={10} // これを相対値に変換するためのベース
              height={10} // 幅に対する高さの割合（アスペクト比を維持）
              style={{ width: "10vw", height: "auto" }} // vw単位を使ったスタイル設定
              alt="stickman"
              loading="lazy"
              className={styles.running_stickman}
            />
          </div>

          <div className={styles.progress_bar}>
            <div className={styles.progress}></div>
          </div>
        </div>
        <div className={styles.btn_main}>
          <button
            className={`${styles.toggle_button} ${
              togglebtn_Bool ? "hover" : ""
            }`}
            onMouseOver={() => hover_MouseOver(true)}
            onMouseLeave={() => hover_MouseOver(false)}
            onClick={toggleRest}
          >
            {isResting_Bool ? "REST" : "studying"}
          </button>

          <button className={styles.clear_button} onClick={cleartime}>
            ClearTime
          </button>

          <button className={styles.dark_mode_button} onClick={toggleDarkMode}>
            {styles.theme_Bool ? "Light Mode" : "Dark Mode"}
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
