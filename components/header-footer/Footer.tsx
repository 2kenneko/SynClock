'use client';
import { darkThemeState } from './Header';
import styles from './header_footer.module.css';
import { useRecoilState } from 'recoil';

//キーを保存

export default function Page() {

  let [theme_Bool] = useRecoilState(darkThemeState);
  return (
    <footer className={styles.footer_container}>
    <div  className={theme_Bool ? styles.dark_mode : ''}>
      <p className={styles.footer_versionname}>ClockShare Beta version</p>
    </div>
    </footer>
  );
}
