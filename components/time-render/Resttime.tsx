'use client';
import { useEffect, useState } from 'react';

import Showtime from '@/components/time-render/Showtime';
type Props = {
  resttime_Num: number; // 親から受け取る変数\
  isRest_Bool: boolean;
};

const Resttime: React.FC<Props> = ({ resttime_Num, isRest_Bool }) => {
  const [resttime_timeleft_Num, setresttime_timeleft_Num] = useState<number>(0);

  const [timeS, settimeS] = useState<string>("00"); //秒
  const [timeM, settimeM] = useState<string>("00"); //分
  const [timeH, settimeH] = useState<string>("00"); //時


  useEffect(() => {
    if (isRest_Bool) {
      //setresttime_timeleft_Num((resttime_timeleft_Num = resttime_Num - 1));
      setresttime_timeleft_Num(resttime_Num);
    }
  }, [isRest_Bool, resttime_Num]);


    // タイトルのために休憩時間を生成
  useEffect(() => {
    const seconds = (resttime_timeleft_Num % 60) - 1;
    const minutes = Math.floor(resttime_timeleft_Num / 60) % 60;
    const hours = Math.floor(resttime_timeleft_Num / (60 * 60)) % 24;
    // パディングして時間を更新
    settimeS(seconds.toString().padStart(2, "0"));
    settimeM(minutes.toString().padStart(2, "0"));
    settimeH(hours.toString().padStart(2, "0"));

    document.title = `${timeH}:${timeM}:${timeS}`;
  }, [resttime_timeleft_Num]);


  useEffect(() => {
    //１秒毎に実行
    // 今までのloopと同じ
    const intervalId = window.setInterval(() => {
      if (isRest_Bool && resttime_timeleft_Num > 0) {
        setresttime_timeleft_Num((resttime_timeleft_Num) => resttime_timeleft_Num - 1);
      }
    }, 1000);

    // クリーンアップ関数
    return () => clearInterval(intervalId);
  }, [isRest_Bool, resttime_timeleft_Num]);

  return (
    <main>
      <Showtime time={resttime_timeleft_Num} />
    </main>
  );
};

export default Resttime;
