"use client";
import { useEffect, useState } from "react";
import styles from "./bot.module.scss";
// import Showtime from "@/components/time-render/Showtime";
import useTimeDisplay from "~/hooks/useTimeDisplay";

export default function Page() {
  const [bottime_Num, setbottime_Num] = useState<number>(0);
  const [isResting, setIsResting] = useState<boolean>(false); // 休憩中かどうかの状態
  const showtime = useTimeDisplay(bottime_Num);
  const [progress_Num, setprogress_Num] = useState<number>(0);
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
    // 最初のみ実行
    setbottime_Num(Math.floor(Math.random() * 10000)); // ランダムな数字を生成
    const intervalId = window.setInterval(loop, 1000); // 1秒に1回実行

    setcpuname_Str(
      cpuname_list_array[Math.floor(Math.random() * cpuname_list_array.length)]
    );

    const restTimeout = startRandomRest(); // ランダムな時間で休憩を開始

    return () => {
      clearInterval(intervalId);
      clearTimeout(restTimeout); // クリーンアップ時にタイムアウトもクリア
    };
  }, []);

  function loop() {
    if (!isResting) { // 休憩中でないときに時間を進める
      setbottime_Num((prevTime) => prevTime + 1);
    }
  }

  useEffect(() => {
    // bottime_Numが更新されたときに進捗バーを更新
    if (!isResting) {
      setprogress_Num(() => {
        return bottime_Num % 100; // 100秒でリセット
      });
    }
  }, [bottime_Num, isResting]);

  // ランダムに30～50分の間で休憩を開始する
  function startRandomRest() {
    const randomMinutes = Math.floor(Math.random() * (50 - 30 + 1)) + 30; // 30～50分のランダムな時間
    const timeoutDuration = randomMinutes * 60 * 1000; // ミリ秒に変換

    return setTimeout(() => {
      setIsResting(true); // 休憩開始
      console.log("休憩開始");

      // 5分後に休憩終了
      setTimeout(() => {
        setIsResting(false);
        console.log("休憩終了");
      }, 5 * 60 * 1000); // 5分間休憩
    }, timeoutDuration);
  }

  return (
    <main>
      <div className="parent">
        <div className="CPU">{cpuname_Str}</div>
        <div className={styles.set_font_size}>
          <div>
            {isResting ? "休憩中" : showtime} {/* 休憩中の表示 */}
          </div>
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