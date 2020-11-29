import React, { useState, useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player';

const Test = () => {
  const [src, setSrc] = useState('');
  console.log(ReactHlsPlayer);
  const fileHandler = async (e) => {
    const name = e.target.files[0].name;
    const url = e.target.files[0].path;
    console.log(url);
    setSrc(url);
    // electron.videoApi.callVlcPlayer(url);
  };
  useEffect(() => {}, [src]);
  return (
    <div>
      <input
        type='file'
        accept='.mp4,.m3u8'
        onChange={(e) => {
          fileHandler(e);
        }}
      />

      <ReactHlsPlayer
        url={src}
        autoplay={false}
        controls={true}
        width={500}
        height={375}
      />
    </div>
  );
};

export default Test;
