'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { useHotkeys } from 'react-hotkeys-hook';

// SCSSモジュールをインポートします
import styles from './page.module.scss';
import styles_btn from './btn.module.scss';

// --- ヘルパーコンポーネントとフック ---
const useTimeDisplay = (timeInSeconds: number) => {
  return useMemo(() => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, [timeInSeconds]);
};

// Resttimeコンポーネントのプロパティの型を定義
interface ResttimeProps {
  resttime_Num: number;
  isRest_Bool: boolean;
}

const Resttime: React.FC<ResttimeProps> = ({ resttime_Num, isRest_Bool }) => {
    const [remaining, setRemaining] = useState(resttime_Num);
    const timeDisplay = useTimeDisplay(remaining);

    useEffect(() => {
        if (isRest_Bool) {
            setRemaining(resttime_Num);
            const interval = setInterval(() => {
                setRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRest_Bool, resttime_Num]);

    return (
        <div className={styles.timerSection}>
            <div className={styles.timerDisplay}>{timeDisplay}</div>
            <div className={styles.restingLabel}>RESTING</div>
        </div>
    );
};

// --- メインコンポーネント ---
export default function Page() {
  const [time_Num, setTime_Num] = useState<number>(0);
  const [progress_count_Num, setProgress_count_Num] = useState<number>(0);
  const [task_Str, setTask_Str] = useState<string>('');
  const [isResting_Bool, setIsResting_Bool] = useState<boolean>(false);
  
  const resttime_Num: number = 600; // 休憩時間は10分

  const time_localkeyname_Str: string = 'time';
  const progress_count_localkeyname_Str: string = 'check-count';
  const task_Str_localkeyname_Str: string = 'whatstudy';
  const current_time_localkeyname_Str: string = 'Current_Time';

  const showtime = useTimeDisplay(time_Num);
  
  const toggleRest = useCallback(() => {
    setIsResting_Bool(prev => !prev);
  }, []);

  // react-hotkeys-hookを再度使用
  useHotkeys('space', toggleRest, { preventDefault: true });

  useEffect(() => {
    const storedTime = localStorage.getItem(time_localkeyname_Str);
    if (storedTime) setTime_Num(Number(storedTime));

    const storedCount = localStorage.getItem(progress_count_localkeyname_Str);
    if (storedCount) setProgress_count_Num(Number(storedCount));
    
    const storedTask = localStorage.getItem(task_Str_localkeyname_Str);
    if (storedTask) {
        setTask_Str(storedTask);
    } else {
        localStorage.setItem(task_Str_localkeyname_Str, 'Next.jsの学習');
        setTask_Str('Next.jsの学習');
    }
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (!isResting_Bool) {
      intervalId = setInterval(() => {
        setTime_Num(prevTime => {
          const newTime = prevTime + 1;
          localStorage.setItem(time_localkeyname_Str, String(newTime));
          
          if (newTime > 0 && newTime % 600 === 0) {
            setProgress_count_Num(prevCount => {
                const newCount = prevCount + 1;
                localStorage.setItem(progress_count_localkeyname_Str, String(newCount));
                return newCount;
            });
          }
          return newTime;
        });
      }, 1000);
    }
    document.title = `${showtime} - ${task_Str}`;

    
    return () => {
      if(intervalId) clearInterval(intervalId);
    };
  }, [isResting_Bool, showtime, task_Str]);

  const progress_percentage = (time_Num % 600) / 600 * 100;

  const cleartime = () => {
    localStorage.setItem(current_time_localkeyname_Str, String(time_Num));
    setTime_Num(0);
    setProgress_count_Num(0);
    localStorage.setItem(time_localkeyname_Str, '0');
    localStorage.setItem(progress_count_localkeyname_Str, '0');
  };

  const progressBarColor = useMemo(() => {
    const hue = progress_percentage * 1.2;
    return `hsl(${hue}, 80%, 50%)`;
  }, [progress_percentage]);

  return (
    <div className={styles.background}>
      <main className={styles.container}>
        <div className={styles.headerSection}>
          <p className={styles.taskLabel}>現在のタスク</p>
          <h1 className={styles.taskTitle} title={task_Str}>
            {task_Str}
          </h1>
        </div>

        {isResting_Bool ? (
          <Resttime resttime_Num={resttime_Num} isRest_Bool={isResting_Bool} />
        ) : (
          <div className={styles.timerSection}>
            <div className={styles.timerDisplay}>{showtime}</div>
            <div className={styles.checkCountDisplay}>
              <span className={styles.checkCountNumber}>{progress_count_Num}</span>
              <span className={styles.checkCountLabel}> check(s)</span>
            </div>
          </div>
        )}
        
        <div className={styles.progressSection}>
            <div className={styles.progressBarBackground}>
                 <div
                    className={styles.progressBarFill}
                    style={{
                        width: `${progress_percentage}%`,
                        backgroundColor: progressBarColor
                    }}
                 ></div>
                 <Image
                    src="https://media.tenor.com/Jug6_zZv0H8AAAAi/stickman-running.gif"
                    alt="Running Stickman"
                    width={56}
                    height={56}
                    unoptimized
                    className={styles.stickman}
                    style={{ left: `calc(${progress_percentage}% - 28px)` }}
                 />
            </div>
        </div>

        <div className={styles.buttonsSection}>
          <button 
            className={`${styles_btn.baseBtn} ${isResting_Bool ? styles_btn.restingBtn : styles_btn.studyingBtn}`}
            onClick={toggleRest}
          >
            {isResting_Bool ? '休憩中' : '集中'}
          </button>
          <button 
            className={`${styles_btn.baseBtn} ${styles_btn.resetBtn}`}
            onClick={cleartime}
          >
            リセット
          </button>
        </div>
      </main>
    </div>
  );
}
