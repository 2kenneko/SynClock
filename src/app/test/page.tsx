'use client';
import styles from './page.module.scss';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
import 'react-h5-audio-player/src/styles.scss';

import audio1 from '@/assets/audio/audio1.mp3';

export default function Page() {
  /*
  これはscssのテスト用ページです。
*/

  return (
    <main>
      <div className={styles.test}>helloworld</div>
    <div className={styles.audiocontainer} >
      <AudioPlayer
        autoPlay
        src={audio1}
        onPlay={() => console.log('onPlay')}
      />
      </div>
    </main>
  );
}
