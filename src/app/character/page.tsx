'use client';
import { darkThemeState } from '~/components/header-footer/Header';
import styles from './page.module.scss';
import { useRecoilState } from 'recoil';
import Image from 'next/image';

import character1 from '@/assets/images/character_1.webp';

export default function Page() {
  let [theme_Bool] = useRecoilState(darkThemeState);
  return (
    <div className={`${styles.footer_container} ${theme_Bool ? styles.dark_mode : ''}`}>
      <h1 className={styles.text_h1}>ガチャ画面</h1>
      <div className={styles.character1}>
        <Image src={character1.src} width={860} height={540} alt="character" loading="lazy" />
      </div>
    </div>
  );
}
