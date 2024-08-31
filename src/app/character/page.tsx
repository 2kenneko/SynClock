'use client';
import { useState, useEffect } from 'react';
import { darkThemeState } from '~/components/header-footer/Header';
import styles from './page.module.scss';
import { useRecoilState } from 'recoil';
import Image from 'next/image';

import character1 from '@/assets/images/neko.png';
import character2 from '@/assets/images/dog.webp';

export default function Page() {
  let [theme_Bool] = useRecoilState(darkThemeState);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // コンポーネントがマウントされたときにローカルストレージから画像を読み込む
  useEffect(() => {
    const storedImage = localStorage.getItem('Selected_image');
    if (storedImage) {
      setSelectedImage(storedImage);
    }
  }, []);

  // 画像がクリックされたときに呼ばれる関数
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    localStorage.setItem('Selected_image', imageUrl);
  };

  return (
    <div className={`${styles.footer_container} ${theme_Bool ? styles.dark_mode : ''}`}>
      <h1 className={styles.text_h1}>ガチャ画面</h1>
      <div className={styles.character_container}>

      <div className={styles.character1}>
        <Image
          src={character1.src}
          width={200}
          height={200}
          alt="character"
          loading="lazy"
          onClick={() => handleImageClick(character1.src)} // 画像をクリック可能に
          style={{ cursor: 'pointer' }} // マウスオーバー時にポインターを表示
        />
      </div>

      <div className={styles.character1}>
        <Image
          src={character2.src}
          width={200}
          height={200}
          alt="character"
          loading="lazy"
          onClick={() => handleImageClick(character2.src)} // 画像をクリック可能に
          style={{ cursor: 'pointer' }} // マウスオーバー時にポインターを表示
        />
        </div>
      </div>

      {/* ローカルストレージから読み込まれた画像がある場合に表示 */}
      {selectedImage && (
        <div className={styles.selected_image}>
          <h2>Selected Image</h2>
          <Image src={selectedImage} width={200} height={200} alt="Selected character" />
        </div>
      )}
    </div>
  );
}