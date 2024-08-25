

"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./whatstudy.module.css";


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

  const whatstudy_locakkeyname_Str : string = "whatstudy";
  const link_top : string = "/";
  const router = useRouter();

  function enterTask() {
    localStorage.setItem(whatstudy_locakkeyname_Str, task_Str);
    istaskEnterd_Bool = true;
    router.push(link_top);  //TOPページへ遷移
  }


  return (
    <main>
  <div className={styles.app}>
    <h1 >今勉強するべきことはなんですか？</h1>
    <div>
      <input
        className={styles.input}
        placeholder="Enter a task"
        value={task_Str}
        onChange={(event) => settask_Str(event.target.value)}
      />
        <button className={styles.btn} onClick={enterTask}>
          <span>GO</span>
        </button>
        
  </div>
  </div>
    </main>
  );
}
