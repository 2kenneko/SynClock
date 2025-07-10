'use client';

import React, { useState } from 'react';
// CSSモジュールをインポートします
import styles from './page.module.scss';

// --- 型定義 ---
// イベントオブジェクトの型を定義します
interface Event {
  id: number;
  name: string;
  description: string;
}

// --- ダミーデータ ---
// 型付けされたイベントのサンプルリストです
const initialEvents: Event[] = [
  { id: 1, name: 'React.js勉強会', description: 'Reactの基礎からHooksまで、ハンズオン形式で学びます。初心者歓迎！' },
  { id: 2, name: '近所の公園でピクニック', description: '手作りのお弁当を持ち寄って、のんびりおしゃべりしましょう。雨天中止です。' },
  { id: 3, name: 'オンラインゲーム大会', description: '人気のアクションゲームで対戦！優勝者には豪華賞品があります。' },
  { id: 4, name: '週末のハッカソン', description: '「新しい働き方」をテーマに、2日間でプロトタイプを開発します。チーム参加も個人参加もOK。' },
  { id: 5, name: '新しいカフェのオープニング', description: 'こだわりのコーヒーと自家製ケーキが自慢のカフェがオープン！先着50名様にプレゼントあり。' },
];

// --- メインのAppコンポーネント ---
export default function Page() {
  const [availableEvents, setAvailableEvents] = useState<Event[]>(initialEvents);
  const [joinedEvents, setJoinedEvents] = useState<Event[]>([]);
  // 現在開いているイベントのIDを管理するState (ID or null)
  const [openEventId, setOpenEventId] = useState<number | null>(null);

  /**
   * イベント詳細の表示を切り替えます。
   * @param {number} eventId - 対象のイベントID
   */
  const handleToggleDetails = (eventId: number) => {
    setOpenEventId(prevOpenId => (prevOpenId === eventId ? null : eventId));
  };
  
  /**
   * イベントに参加する処理です。
   * @param {number} eventId - 参加するイベントのID
   */
  const handleJoin = (eventId: number) => {
    const eventToJoin = availableEvents.find(event => event.id === eventId);
    if (!eventToJoin) return;

    setJoinedEvents(prevJoined => [...prevJoined, eventToJoin]);
    setAvailableEvents(prevAvailable => prevAvailable.filter(event => event.id !== eventId));
    
    // 参加後はアコーディオンを閉じます
    setOpenEventId(null); 
  };

  /**
   * イベントから辞退する処理です。
   * @param {number} eventId - 辞退するイベントのID
   */
  const handleLeave = (eventId: number) => {
    const eventToLeave = joinedEvents.find(event => event.id === eventId);
    if (!eventToLeave) return;

    setAvailableEvents(prevAvailable => [...prevAvailable, eventToLeave].sort((a, b) => a.id - b.id));
    setJoinedEvents(prevJoined => prevJoined.filter(event => event.id !== eventId));
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        <header className={styles.header}>
          <h1 className={styles.title}>イベントポータル</h1>
          <p className={styles.subtitle}>気になるイベントに参加しよう！</p>
        </header>

        <main className={styles.mainContent}>
          
          {/* 参加可能なイベントセクション */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>参加可能なイベント</h2>
            {availableEvents.length > 0 ? (
              <ul className={styles.eventList}>
                {availableEvents.map(event => (
                  <li key={event.id} className={styles.eventItem}>
                    <div
                      className={styles.eventItemHeader}
                      onClick={() => handleToggleDetails(event.id)}
                    >
                      <span className={styles.eventName}>{event.name}</span>
                      <svg
                        className={`${styles.icon} ${openEventId === event.id ? styles.iconRotated : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                    
                    {/* 開閉する詳細セクション */}
                    <div className={`${styles.collapsible} ${openEventId === event.id ? styles.collapsibleOpen : ''}`}>
                      <div className={styles.collapsibleInner}>
                        <div className={styles.detailsContent}>
                            <p className={styles.description}>{event.description}</p>
                            <button
                                onClick={() => handleJoin(event.id)}
                                className={`${styles.button} ${styles.buttonBlue}`}
                            >
                                このイベントに参加する
                            </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyState}>参加できるイベントは現在ありません。</p>
            )}
          </div>

          {/* 現在参加しているイベントセクション */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>現在参加しているイベント</h2>
            {joinedEvents.length > 0 ? (
              <ul className={styles.eventList}>
                {joinedEvents.map(event => (
                  <li key={event.id} className={styles.joinedItem}>
                    <span className={styles.eventName}>{event.name}</span>
                     <button
                      onClick={() => handleLeave(event.id)}
                      className={`${styles.button} ${styles.buttonRed}`}
                    >
                      辞退
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyState}>まだ参加しているイベントはありません。</p>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
