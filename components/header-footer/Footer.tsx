'use client';
import { audio_modalwindow, darkThemeState } from './Header';
import styles from './footer.module.scss';
import { useRecoilState } from 'recoil';

export default function Page() {

  let [theme_Bool] = useRecoilState(darkThemeState);
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
    <footer className={`${styles.footer_container} ${theme_Bool ? styles.dark_mode : ''}`}>
      <p className={styles.footer_versionname}>ClockShare Beta version</p>
      <button onClick={toggleaudiowindow}>toggle audio window</button>
    </footer>
  );
}
