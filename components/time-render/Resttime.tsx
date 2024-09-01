'use client';
import { useEffect, useState } from 'react';

//import Showtime from '@/components/time-render/Showtime';
import useTimeDisplay from "@/hooks/useTimeDisplay";
type Props = {
  resttime_Num: number; // 親から受け取る変数\
  isRest_Bool: boolean;
};

const Resttime: React.FC<Props> = ({ resttime_Num, isRest_Bool }) => {
  const [resttime_timeleft_Num, setresttime_timeleft_Num] = useState<number>(0);

  const showtime = useTimeDisplay(resttime_timeleft_Num);


  useEffect(() => {
    if (isRest_Bool) {
      setresttime_timeleft_Num(resttime_Num);
    }
  }, [isRest_Bool, resttime_Num]);

  //タイトル名を設定
  useEffect(()=> {
  document.title = showtime;
  },[resttime_Num])


  useEffect(() => {
    //１秒毎に実行
    const intervalId = window.setInterval(() => {
      if (isRest_Bool && resttime_timeleft_Num > 0) {
        setresttime_timeleft_Num((resttime_timeleft_Num) => resttime_timeleft_Num - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isRest_Bool, resttime_timeleft_Num]);

  return (
    <main>
      <div>{showtime}</div>
    </main>
  );
};

export default Resttime;
