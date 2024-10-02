// vueの index.vueと同じ
'use client';
import Link from 'next/link';
import styles from './page.module.scss';
export default function Page() {


  
  return (
    <main>
      <h1 className={styles.h2}>ぜひアンケートにご協力ください</h1>
      <div className={styles.text}>
        <span>もし下にアンケート画面が表示されない場合は </span>
        <Link target="_blank" href="https://forms.gle/cv4y3GZEeWvwZ9BVA">
          <span className={styles.link}>ここから</span>
        </Link>
        <span> ご回答ください</span>
      </div>

      <div className={styles.iframe_container}>
        <iframe className={styles.iframe} src="https://docs.google.com/forms/d/e/1FAIpQLSdjv4NeV7xfBXLOqcsiD-bn4F2UXZeu_NbozfxQF167jUbyAg/viewform?embedded=true">
          読み込んでいます…
        </iframe>
      </div>
    </main>
  );
}
