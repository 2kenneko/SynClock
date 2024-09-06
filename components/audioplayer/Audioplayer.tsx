'use client';
import styles from './audioplayer.module.scss';
// import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';
import closebtn from '@/assets/images/svgs/close_btn.svg';
import Image from 'next/image';
import { audio_modalwindow } from '../header-footer/Header';
import { useRecoilState } from 'recoil';
import Draggable from 'react-draggable';
import { SetStateAction, useEffect, useState } from 'react';
import styles_btn from '@/components/styles/btn.module.scss';

// import audio1 from '@/assets/audio/audio1.mp3';
// import audio2 from '@/assets/audio/audio2.mp3';

/*
 * ―――――――――――――――――――――――――――――――――――――――――
 * use Library
 * - react-draggable        https://www.npmjs.com/package/react-draggable
 * - react-h5-audio-player  https://www.npmjs.com/package/react-h5-audio-player
 * ―――――――――――――――――――――――――――――――――――――――――
 */

export default function Page() {
  let [isopenwin_Bool, setisopenwin_Bool] = useRecoilState(audio_modalwindow);
  const isopenaudiowindow_Str: string = 'open_modal_window';

  function close() {
    setisopenwin_Bool(() => {
      isopenwin_Bool = false;
      localStorage.setItem(isopenaudiowindow_Str, String(isopenwin_Bool));
      return isopenwin_Bool;
    });
  }

  useEffect(() => {
    //console.log(JSON.parse(String(localStorage.getItem(isopenaudiowindow_Str))));
    setisopenwin_Bool(JSON.parse(String(localStorage.getItem(isopenaudiowindow_Str))));
  }, []);

  // --------ADDED --------------
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');

  const convertToEmbed = (url: string) => {
    // Extract the video ID from the URL
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/))([^?&]+)/);
    if (videoIdMatch) {
      const videoId = videoIdMatch[1];
      setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
    } else {
      alert('Invalid YouTube URL');
    }
  };

  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setYoutubeUrl(e.target.value);
  };

  const handleConvert = () => {
    convertToEmbed(youtubeUrl);
  };

  return (
    <Draggable
      bounds="parent"
      cancel={`.${styles.audioplayer} .${styles.input}`} // Prevent child elements from being draggable
    >
      <div
        style={{
          cursor: 'move',
          position: 'absolute',
          width: '560px',
          margin: '5px',
          zIndex: '120',
          height: '310px',
          background: 'red',
        }}
        className={`${isopenwin_Bool ? styles.window_open : styles.window_hidden}`}
      >
        <div className={styles.audioplayer_parent}>
          <div className={styles.closebtn_container}>
            <button onClick={close} className={styles.closebtn}>
              <Image src={closebtn.src} width={20} height={20} alt="" loading="lazy" className={styles.close_icon} />
            </button>
          </div>

          <div className={styles.input_container}>
            <input className={styles.input} type="text" value={youtubeUrl} onChange={handleInputChange} placeholder="Paste YouTube URL here" />
            <button className={styles_btn.header_btn} onClick={handleConvert}>
              Embed
            </button>
          </div>

          <div className={styles.audiocontainer}>
            {embedUrl && (
              <div>
                <iframe
                  width="560"
                  height="312"
                  src={embedUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
}
