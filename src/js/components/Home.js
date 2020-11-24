import React from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Player
        autoplay
        loop
        src='https://assets4.lottiefiles.com/packages/lf20_un2lm1oc.json'
        style={{ height: '300px', width: '300px' }}
      >
        <Controls
          visible={false}
          buttons={['play', 'repeat', 'frame', 'debug']}
        />
      </Player>
      <div className='flex justify-center items-center'>
        <h1 className='text-white text-xl capitalize font-medium'>
          Convert your mp4 video files to HLS Format with one click
        </h1>
      </div>
      <div className='flex justify-center items-center'>
        <Link to='/convert'>
          <button className='bg-white p-3 rounded mt-3 capitalize font-bold shadow  focus:ring focus:border-blue-500'>
            Convert Now
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
