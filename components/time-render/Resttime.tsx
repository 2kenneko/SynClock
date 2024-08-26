'use client';
import { useEffect, useState, useRef } from 'react';

import Showtime from '@/components/time-render/Showtime';
type Props = {
  resttime_Num: number; // 親から受け取る変数\
  isRest_Bool: boolean;
};

const Resttime: React.FC<Props> = ({ resttime_Num, isRest_Bool }) => {
  let [resttime_timeleft_Num, setresttime_timeleft_Num] = useState<number>(0);

  useEffect(() => {
    if (isRest_Bool) {
      //setresttime_timeleft_Num((resttime_timeleft_Num = resttime_Num - 1));
      setresttime_timeleft_Num(resttime_Num);
    }
  }, [isRest_Bool, resttime_Num]);

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
