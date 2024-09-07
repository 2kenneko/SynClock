'use client';
import { useState, useEffect } from 'react';
import { darkThemeState } from '~/components/header-footer/Header';
import styles from './page.module.scss';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import styles_btn from '@/components/styles/btn.module.scss';
import ShowCharacter from '@/components/ShowCharacter/ShowCharacter';

/*  画像のインポート */
import character01 from '@/assets/images/character/01.webp';
import character02 from '@/assets/images/character/02.webp';
import character03 from '@/assets/images/character/03.webp';
import character04 from '@/assets/images/character/04.webp';
import character05 from '@/assets/images/character/05.webp';
import character06 from '@/assets/images/character/06.webp';
import character07 from '@/assets/images/character/07.webp';
import character08 from '@/assets/images/character/08.webp';
import character09 from '@/assets/images/character/09.webp';
import character10 from '@/assets/images/character/10.webp';
import character11 from '@/assets/images/character/11.webp';
import character12 from '@/assets/images/character/12.webp';

export default function Page() {
  let [theme_Bool] = useRecoilState(darkThemeState);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const selectedimage_Str: string = 'Selected_image';

  // コンポーネントがマウントされたときにローカルストレージから画像を読み込む
  useEffect(() => {
    const storedImage = localStorage.getItem(selectedimage_Str);
    if (storedImage) {
      setSelectedImage(storedImage);
    }
  }, []);

  // 画像がクリックされたときに呼ばれる関数
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    localStorage.setItem(selectedimage_Str, imageUrl);
  };

  return (
    <div className={`${styles.footer_container} ${theme_Bool ? styles.dark_mode : ''}`}>
      <h1 className={styles.text_h1}>ガチャ画面</h1>
      <button className={styles_btn.secondary_btn} onClick={() => handleImageClick('')}>
        unselect character
      </button>
      {/* <div className={styles.character_container}>
        <div className={styles.character1}>
          <Image
            src={character01.src}
            width={200}
            height={200}
            alt="character"
            loading="lazy"
            onClick={() => handleImageClick(character01.src)} // 画像をクリック可能に
            style={{ cursor: 'pointer' }} // マウスオーバー時にポインターを表示
          />
        </div>

        <div className={styles.character1}>
          <Image
            src={character02.src}
            width={200}
            height={200}
            alt="character"
            loading="lazy"
            onClick={() => handleImageClick(character02.src)} // 画像をクリック可能に
            style={{ cursor: 'pointer' }} // マウスオーバー時にポインターを表示
          />
        </div>
      </div> */}

      <div className={styles.select_character_container}>
        <div className={styles.item}>
          <button className={styles.item_btn} onClick={() => handleImageClick(character01.src)}>
            <ShowCharacter src={character01.src} />
          </button>
        </div>
        <div className={styles.item}>
          <button className={styles.item_btn} onClick={() => handleImageClick(character02.src)}>
            <ShowCharacter src={character02.src} />
          </button>
        </div>
        <div className={styles.item}>
          <button className={styles.item_btn} onClick={() => handleImageClick(character03.src)}>
            <ShowCharacter src={character03.src} />
          </button>
        </div>
        <div className={styles.item}>
          <button className={styles.item_btn} onClick={() => handleImageClick(character04.src)}>
            <ShowCharacter src={character04.src} />
          </button>
        </div>

        <div className={styles.item}>
          <button className={styles.item_btn} onClick={() => handleImageClick(character05.src)}>
            <ShowCharacter src={character05.src} />
          </button>
        </div>
        <div className={styles.item}>
          <button className={styles.item_btn} onClick={() => handleImageClick(character06.src)}>
            <ShowCharacter src={character06.src} />
          </button>
        </div>
        <div className={styles.item}>
          <button className={styles.item_btn} onClick={() => handleImageClick(character07.src)}>
            <ShowCharacter src={character07.src} />
          </button>
        </div>
        <div className={styles.item}>
          <button className={styles.item_btn} onClick={() => handleImageClick(character08.src)}>
            <ShowCharacter src={character08.src} />
          </button>
        </div>
        <div className={styles.item}>
          <button className={styles.item_btn} onClick={() => handleImageClick(character09.src)}>
            <ShowCharacter src={character09.src} />
          </button>
        </div>

        <div className={styles.item}>
          <button className={styles.item_btn} onClick={() => handleImageClick(character10.src)}>
            <ShowCharacter src={character10.src} />
          </button>
        </div>
        <div className={styles.item}>
          <button className={styles.item_btn} onClick={() => handleImageClick(character11.src)}>
            <ShowCharacter src={character11.src} />
          </button>
        </div>
        <div className={styles.item}>
          <button className={styles.item_btn} onClick={() => handleImageClick(character12.src)}>
            <ShowCharacter src={character12.src} />
          </button>
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
