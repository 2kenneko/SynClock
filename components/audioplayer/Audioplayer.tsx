'use client';
import styles from './audioplayer.module.scss';
import AudioPlayer from 'react-h5-audio-player';
//import 'react-h5-audio-player/lib/styles.css';
import 'react-h5-audio-player/src/styles.scss';
import closebtn from '@/assets/images/svgs/close_btn.svg';
import Image from 'next/image';
import audio1 from '@/assets/audio/audio1.mp3';
import { audio_modalwindow } from '../header-footer/Header';
import { useRecoilState } from 'recoil';
import Draggable from 'react-draggable';
import { useEffect } from 'react';

/* ―――――――――――――――――――――――――――――――――――――――――
 *
 * use Library -->  react-draggable
 * https://www.npmjs.com/package/react-draggable
 *
 * ―――――――――――――――――――――――――――――――――――――――――
 */

export default function Page() {
  let [isopenwin_Bool, setisopenwin_Bool] = useRecoilState(audio_modalwindow);
  const isopenaudiowindow_Str : string = 'open_modal_window';


  function close() {
    setisopenwin_Bool(()=> {
      isopenwin_Bool = false;
      localStorage.setItem(isopenaudiowindow_Str, String(isopenwin_Bool));
      return isopenwin_Bool;
    });
  }

  useEffect(()=> {
    //console.log(JSON.parse(String(localStorage.getItem(isopenaudiowindow_Str))));
    setisopenwin_Bool(JSON.parse(String(localStorage.getItem(isopenaudiowindow_Str))))
  }, [])

  return (
    <Draggable
    bounds="parent"
    cancel={`.${styles.audioplayer}`} // Prevent child elements from being draggable
    >
    <div
      style={{
        cursor: 'move',
        position: 'absolute',
        width: '330px',
        margin: '5px',
        zIndex: '120',
        height: '115px',
      }}
      className={`${isopenwin_Bool ? styles.window_open : styles.window_hidden}`}
    >
      <div className={styles.audioplayer_parent}>
        <div className={styles.closebtn_container}>
          <button onClick={close} className={styles.closebtn}>
            <Image src={closebtn.src} width={20} height={20} alt="" loading="lazy" className={styles.closebtn} />
          </button>
        </div>
        <div className={styles.audiocontainer}>
          <AudioPlayer src={audio1} onPlay={() => console.log('onPlay')} className={styles.audioplayer} hasDefaultKeyBindings={false} />
        </div>
      </div>
    </div>
    </Draggable>
  );
}
