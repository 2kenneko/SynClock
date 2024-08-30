// vueの index.vueと同じ
'use client';
import Link from 'next/link';
import styles from './page.module.scss';
import { darkThemeState } from '@/components/header-footer/Header';
import { useRecoilState } from 'recoil';
export default function Page() {

  let [theme_Bool] = useRecoilState(darkThemeState);

  
  return (
    <main className={ theme_Bool ? `${styles.dark_mode}` : ""}>
      <h1 className={styles.h2}>ぜひアンケートにご協力ください</h1>
      <div className={styles.text}>
        <span>もし下にアンケート画面が表示されない場合は </span>
        <Link target="_blank" href="https://forms.gle/USVrgnD6yfS1XZ7Y8">
          <span className={styles.link}>ここから</span>
        </Link>
        <span> ご回答ください</span>
      </div>

      <div className={styles.iframe_container}>
        <iframe className={styles.iframe} src="https://docs.google.com/forms/d/e/1FAIpQLSfj0FLQQTev2eitJK7MXD-b69xcwBO5Z3p54_-Kndrh__NhPg/viewform?embedded=true">
          読み込んでいます…
        </iframe>
      </div>
    </main>
  );
}
