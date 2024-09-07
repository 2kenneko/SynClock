'use client';
import Image from 'next/image';


type Props = {
  src: string;
};

const page: React.FC<Props> = ({ src }) => {
  return (
    <div>
      <Image
        src={src}
        width={200}
        height={200}
        alt="character"
        loading="lazy"
        style={{ cursor: 'pointer' }} // マウスオーバー時にポインターを表示
      />
    </div>
  );
};

export default page;
