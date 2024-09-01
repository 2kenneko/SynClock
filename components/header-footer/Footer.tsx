'use client';
import { audio_modalwindow } from './Header';
import styles from './footer.module.scss';
import { useRecoilState } from 'recoil';
import styles_btn from '@/components/styles/btn.module.scss';

export default function Page() {

  let [isopenwin_Bool, setisopenwin_Bool] = useRecoilState(audio_modalwindow);
  const isopenaudiowindow_Str : string = 'open_modal_window';



  function toggleaudiowindow() {
    setisopenwin_Bool(()=> {
      isopenwin_Bool = !isopenwin_Bool;
      localStorage.setItem(isopenaudiowindow_Str, String(isopenwin_Bool));
      return isopenwin_Bool;
    })

  }


  return (
    <footer className={`${styles.footer_container}`}>
      <p className={styles.footer_versionname}>ClockShare Beta version</p>
      <button onClick={toggleaudiowindow} className={styles_btn.primary_btn}>toggle audio window</button>
    </footer>
  );
}
