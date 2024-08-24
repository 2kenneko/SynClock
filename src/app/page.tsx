"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import styles from "./page.module.css";
import { relative } from "path";
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

  let task_Str: string = ""; //タスクの名前
  let time_Num: number = 0; //時間保存
  let isResting_Bool: boolean = false; //休憩しているか
  let progress_Num: number = 0; //プログレスバーの進捗度
  let togglebtn_Bool: boolean = false; //トグルボタンの状態
  let progress_count_Num: number = 0; //プログレスバーが進むとカウントが進む
  let theme_Bool: boolean = false;
  let btn_hover_Bool: boolean = false;

  const time_localkeyname_Str: string = "time";
  const progress_count_localkeyname_Str: string = "check-count";
  const theme_localkeyname_Str: string = "local-theme";

  useEffect(() => {
    //最初のみ実行
    checklocalkey();
    starttimer();
  }, []);

  function checklocalkey() {
    // キーの存在を確認する
    if (!localStorage.getItem(time_localkeyname_Str)) {
      localStorage.setItem(time_localkeyname_Str, String(time_Num));
    }
    if (!localStorage.getItem(progress_count_localkeyname_Str)) {
      localStorage.setItem(
        progress_count_localkeyname_Str,
        String(progress_count_Num)
      );
    }
    if (!localStorage.getItem(theme_localkeyname_Str)) {
      localStorage.setItem(theme_localkeyname_Str, String(theme_Bool));
    }

    time_Num = Number(localStorage.getItem(time_localkeyname_Str)); //タイマーをストレージから取得
  }

  function starttimer() {
    // タイマースタート
    window.setInterval(loop, 1000);
  }
  function cleartime() {
    //リセット
    localStorage.setItem(time_localkeyname_Str, "0");
    localStorage.setItem(progress_count_localkeyname_Str, "0");
    time_Num = 0;
    progress_Num = 0;
    progress_count_Num = 0;
  }

  function loop() {
    //１秒毎にループ
    if (!isResting_Bool) {
      localStorage.setItem(time_localkeyname_Str, String(time_Num)); //時間の保存
      time_Num++;
      progress_Num = time_Num % 600;

      if (progress_count_Num === 599) {
        // プログレスバーがマックスになったとき
        progress_count_Num++;
        localStorage.setItem(
          progress_count_localkeyname_Str,
          String(progress_count_Num)
        );
      }
    }
  }

  function hover_MouseOver(ishover: boolean) {
    //ボタンにマウスが乗ったとき
    btn_hover_Bool = ishover;
  }
  function toggleRest() {
    // トグルボタン
    isResting_Bool = !isResting_Bool;
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
            check: {progress_count_Num} time: {task_Str}
          </p>

          <div className={styles.parent}>
            <Image
              src="/images/running-stickman-transparency.gif"
              layout="fill"
              objectFit="contain"
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
            className={`toggle_button ${togglebtn_Bool ? "hover" : ""}`}
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
        <div className={styles.bot_container}></div>
      </div>
    </main>
  );
}
