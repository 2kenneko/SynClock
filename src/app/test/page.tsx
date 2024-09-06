'use client';

import { SetStateAction, useState } from 'react';

export default function Page() {
  /*
  これはscssのテスト用ページです。
*/

  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');

  const convertToEmbed = (url: string) => {
    // Extract the video ID from the URL
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/))([^?&]+)/);
    if (videoIdMatch) {
      const videoId = videoIdMatch[1];
      setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
    } else {
      alert('Invalid YouTube URL');
    }
  };

  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setYoutubeUrl(e.target.value);
  };

  const handleConvert = () => {
    convertToEmbed(youtubeUrl);
  };

  return (
    <div>
      <h1>YouTube Embed Converter</h1>
      <input type="text" value={youtubeUrl} onChange={handleInputChange} placeholder="Paste YouTube URL here" />
      <button onClick={handleConvert}>Convert to Embed</button>

      {embedUrl && (
        <div>
          <h3>Embedded Video:</h3>
          <iframe
            width="560"
            height="315"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
