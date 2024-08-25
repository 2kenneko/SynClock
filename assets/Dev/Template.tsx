// vueの index.vueと同じ

"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import styles from "./css/page.module.css";
import Showtime from "@/components/time-render/Showtime";

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


  useEffect(() => {
    //最初のみ実行

  }, []);


  return (
    <main>

    </main>
  );
}
