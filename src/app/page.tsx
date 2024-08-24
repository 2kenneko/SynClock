import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
// SCRIPT SETUP

/* 変数定義のルール
  - わかりやすい名前
  - ＿の後は大文字
  - 初期状態を保存しておく

  - Boolは_Stage
  - numberは_Value
  - stringは_Str
*/

  let task_Str: string = (""); //タスクの名前
  let time_Num: number = 0;  //時間保存
  let isResting_Bool : boolean = (false);  //休憩しているか
  let progress_Num : number = 0;  //プログレスバーの進捗度
  let togglebtn_Bool : boolean = (false);  //トグルボタンの状態
  let progress_count_Num : number = 0;  //プログレスバーが進むとカウントが進む
  








  return (
  <main>
    
    <h1>helloworld</h1>

  </main>
  );
}
