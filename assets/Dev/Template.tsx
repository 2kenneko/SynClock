import Showtime from '@/components/timer';
import { useState } from 'react';

export default function Page() {

  let [time, settime] = useState<number>(0);
  const [playername, setplayername] = useState<string>("Bob");
  const rest_time : number = 100;

  return (
    <main>
      <Showtime time={time} />
    </main>
  );
}
