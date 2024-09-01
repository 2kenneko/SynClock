// vueの index.vueと同じ

"use client";
import { useEffect, useState } from "react";
import styles from "./bot.module.scss";
// import Showtime from "@/components/time-render/Showtime";
import useTimeDisplay from "~/hooks/useTimeDisplay";
export default function Page() {
  const [bottime_Num, setbottime_Num] = useState<number>(0);
  const showtime = useTimeDisplay(bottime_Num);
  let [progress_Num, setprogress_Num] = useState<number>(0);
  const [cpuname_Str, setcpuname_Str] = useState<string>("");

  const cpuname_list_array = [
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Emily Davis",
    "Chris Brown",
    "Jessica Wilson",
    "Matthew Moore",
    "Sarah Taylor",
    "David Anderson",
    "Laura Thomas",
  ];

  useEffect(() => {
    //最初のみ実行
    setbottime_Num(Math.floor(Math.random() * 10000));  //ランダムな数字を生成
    const intervalId = window.setInterval(loop, 1000); // 1秒に1回実行
    progress_Num = 0;
    setcpuname_Str(
      cpuname_list_array[Math.floor(Math.random() * cpuname_list_array.length)]
    );
    return () => clearInterval(intervalId);
  }, []);

  function loop() {
    setbottime_Num((bottime_Num) => bottime_Num + 1);
  }

  useEffect(() => {
    //progress_Numに更新があったときに実行

    setprogress_Num(() => {
      return (bottime_Num % 100); // 100sでリセット
    });
  }, [bottime_Num]);

  return (
    <main>
      <div className="parent">
        <div className="CPU">{cpuname_Str}</div>
        <div className={styles.set_font_size}>
          <div>{showtime}</div>
        </div>

        <div className={styles.progress_bar_wrapper}>
          <div className={styles.progress_bar}>
            <div
              className={styles.progress}
              style={{ width: `${progress_Num}%` }}
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
}
