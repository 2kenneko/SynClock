'use client';
import { darkThemeState } from './Header';
import styles from './footer.module.scss';
import { useRecoilState } from 'recoil';

export default function Page() {

  let [theme_Bool] = useRecoilState(darkThemeState);
  return (
    <footer className={`${styles.footer_container} ${theme_Bool ? styles.dark_mode : ''}`}>
      <p className={styles.footer_versionname}>ClockShare Beta version</p>
    </footer>
  );
}
