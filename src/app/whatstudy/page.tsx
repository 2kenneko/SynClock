// vueの index.vueと同じ

"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import styles from "../CSS/whatstudy.module.css";


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

  let [task_Str, settask_Str] = useState<string>(""); //タスクの名前
  let [istaskEnterd_Bool ,setistaskEnterd_Bool] = useState<boolean>(false);

  const whatstudy_locakkeyname_Str : string = "whatstudy"
  useEffect(() => {
    //最初のみ実行

  }, []);

  function enterTask() {
    settask_Str((task_Str) => {
      if (task_Str.trim() !== "") {
        istaskEnterd_Bool = true;
        localStorage.setItem(whatstudy_locakkeyname_Str, task_Str);
      } else {
        localStorage.setItem(whatstudy_locakkeyname_Str, "");
      }
      return task_Str;
    })
  }


  return (
    <main>
  <div className={styles.app}>
    <h1 >今勉強するべきことはなんですか？</h1>
    <div>
      <input className={styles.input} placeholder="Enter a task" />
    <div>path: '/'
        <button className={styles.btn} onClick={enterTask}>
          <span>GO</span>
        </button>
    </div>
  </div>
  </div>
    </main>
  );
}
