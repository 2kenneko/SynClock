"use client";
import { useEffect, useState } from "react";

type Props = {    
  time: number; // 親から受け取る変数
};

const Clock: React.FC<Props> = ({ time }) => {
  // SCRIPT SETUP

  const [timeS, settimeS] = useState<string>("00"); //秒
  const [timeM, settimeM] = useState<string>("00"); //分
  const [timeH, settimeH] = useState<string>("00"); //時

  useEffect(() => {
    const seconds = time % 60;
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / (60 * 60)) % 24;
    // パディングして時間を更新
    settimeS(seconds.toString().padStart(2, "0"));
    settimeM(minutes.toString().padStart(2, "0"));
    settimeH(hours.toString().padStart(2, "0"));
  }, [time]);






  return (
    <main>
      
      <div>{ timeH }:{ timeM }:{ timeS }</div>
    </main>
  );
};

export default Clock;
