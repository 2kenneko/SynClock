'use client';
import styles from './Audioplayer.module.scss';
import AudioPlayer from 'react-h5-audio-player';
//import 'react-h5-audio-player/lib/styles.css';
import 'react-h5-audio-player/src/styles.scss';
import closebtn from '@/assets/images/svgs/close_btn.svg';
import Image from 'next/image';
import audio1 from '@/assets/audio/audio1.mp3';

export default function Page() {

  return (
    <main>
      <div className={styles.audioplayer_parent}>
    <div className={styles.closebtn} >
      <Image src={closebtn.src}
              width={30}
              height={30}
              alt="" 
              loading="lazy" 
              className={styles.closebtn} 
      />
    </div>

    <div className={styles.audiocontainer} >
      <AudioPlayer
        src={audio1}
        onPlay={() => console.log('onPlay')}
        className={styles.audioplayer}
        hasDefaultKeyBindings={false}
      />
      </div>
      </div>
    </main>
  );
}
