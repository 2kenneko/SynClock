/*
 * Time(seconds) -> (hour):(minutes):(seconds) に変換するプログラムです。
 * 使用方法は以下のサンプルを参考にしてください
 *
 * =====================================================
 *
 * import useTimeDisplay from "@/hooks/useTimeDisplay";
 *
 * export default function Page() {
 *   const showtime = useTimeDisplay(time_Num);
 *
 *   useEffect(()=> {
 *    document.title = showtime;
 *   },[time_Num])
 *
 *   return (
 *    <div>{showtime}</div>
 *   )
 * }
 * 
 * =====================================================
 */

import { useMemo } from 'react';

function useFormattedTime(seconds: number) {
  const time = useMemo(() => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const pad = (num: number) => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  }, [seconds]);

  return time;
}

export default useFormattedTime;
