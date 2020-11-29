import React, { useState } from 'react';
import './../styles.css';

const ViewPlayer = () => {
  const [filepath, setFilepath] = useState('');

  const playSelectedFile = (event) => {
    console.log('Calling the event');
    console.log('Initial file path', filepath);
    setFilepath('Hello World');
    console.log('Final file path', filepath);
  };
  return (
    <div className='grid grid-cols-4 gap-0 h-screen'>
      <aside className='bg-red-200 h-full'>Side Menu Bar</aside>
      <main className='bg-blue-200 col-span-3 h-full'>
        <input
          type='file'
          accept='.mp4,.m3u8'
          onChange={(e) => playSelectedFile(e.target.files)}
        />
      </main>
    </div>
  );
};

export default ViewPlayer;
