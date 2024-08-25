// vueの index.vueと同じ

"use client";
import Image from "next/image";
import { useEffect, useState, useRef, use } from "react";
import styles from "./CSS/bot.module.css";
import Showtime from "@/components/Showtime";
export default function Page() {
  let [bottime_Num, setbottime_Num] = useState<number>(
    Math.floor(Math.random() * 10000)
  );
  let [progress_Num, setprogress_Num] = useState<number>(0);
  let [cpuname_Str, setcpuname_Str] = useState<string>("");

  const localkeyname_Str: string = "time";
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
    window.setInterval(loop, 1000); // 1秒に1回実行
    progress_Num = 0;

    cpuname_Str =
      cpuname_list_array[Math.floor(Math.random() * cpuname_list_array.length)];
  }, []);

  function loop() {
    setbottime_Num(bottime_Num + 1);
    setprogress_Num(bottime_Num % 100); //100sでリセット)
    localStorage.setItem(localkeyname_Str, String(bottime_Num));
  }

  return (
    <main>
      <div className="parent">
        <div className="CPU">{cpuname_Str}</div>
        <div className={styles.set_font_size}>
          <Showtime time={bottime_Num} />
        </div>

        <div className="progress-bar-wrapper">
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${progress_Num}%` }}
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
}
