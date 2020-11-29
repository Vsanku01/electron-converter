import React from 'react';
import '../styles.css';

const Card = ({ file, path, setSrc, setVidtype }) => {
  return (
    <div
      className='bg-purple-600 h-20 w-full rounded m-1 p-1 flex-col text-white shadow-2xl cursor-pointer'
      onClick={() => {
        setSrc(`${path}/${file}`);
        setVidtype('audio/mpegurl');
      }}
    >
      <i className='material-icons'>ondemand_video</i>
      <div>{file}</div>
      <p className='text-xs'>Click to preview File</p>
    </div>
  );
};

export default Card;
