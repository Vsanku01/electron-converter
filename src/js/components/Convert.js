import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

const Convert = () => {
  const [format, setFormat] = useState('');
  const [outputDir, setOutputDir] = useState('');
  const history = useHistory();

  return (
    <div className='h-screen bg-purple-500 mx-auto'>
      <div className='flex items-center justify-around pt-24'>
        <Player
          autoplay
          loop
          src='https://assets3.lottiefiles.com/packages/lf20_HnzSHS.json'
          style={{ height: '400px', width: '400px' }}
        >
          <Controls
            visible={false}
            buttons={['play', 'repeat', 'frame', 'debug']}
          />
        </Player>
        <button
          className='bg-white p-6 rounded text-2xl shadow-2xl hover:bg-black hover:text-white transform hover:translate-y-1.5 hover:scale-110 duration-500'
          onClick={() => {
            electron.filesApi.sendFilePath();
            electron.notificationApi.sendNotification(
              'Check the output folder for converted files'
            );
          }}
        >
          Choose File
        </button>
      </div>
      <div className='flex items-center justify-center'>
        {/* <button className='bg-white p-3 rounded-md w-6/12 focus:outline-none focus:border-white-200 transform hover:translate-y-1.5 hover:scale-110 duration-500 hover:bg-black hover:text-white'>Choose your output Folder</button> */}

        <button
          className='bg-white p-3 rounded-md max-w-6/12 focus:outline-none focus:border-white-200 transform hover:translate-y-1.5 hover:scale-110 duration-500 hover:bg-black hover:text-white shadow-2xl m-4'
          onClick={() => {
            electron.changeDirectory.selectDirectory();
            electron.notificationApi.sendNotification(
              'Select the directory of your choice to output files'
            );
            // history.push('/player');
          }}
        >
          Choose your destination folder
        </button>

        <button
          className='bg-white p-3 rounded-md transform hover:translate-y-1.5 hover:scale-110 duration-500 hover:bg-black hover:text-white shadow-2xl'
          onClick={async () => {
            const res = await electron.sendMessage.msgFromFrontend();
            const result = await res;
            setOutputDir(result);
            console.log('From ipcMain', result);
            history.push({
              pathname: '/player',
              state: result,
            });
          }}
        >
          Click to view output files
        </button>
      </div>
    </div>
  );
};

export default Convert;
