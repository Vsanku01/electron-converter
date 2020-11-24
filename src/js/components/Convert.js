import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Convert = () => {
  const [format, setFormat] = useState('');
  return (
    <div className='h-screen bg-purple-500 mx-auto'>
      <div className='flex items-center justify-center pt-24'>
        <button
          className='bg-white p-3 rounded'
          onClick={() => {
            electron.filesApi.sendFilePath();
            electron.notificationApi.sendNotification(
              'Check the output folder for converted files'
            );
          }}
        >
          Click to select File
        </button>
      </div>
      <div className='flex items-center justify-center mt-24'>
        <p className='text-white text-xl'>
          Your files will the generated inside the output folder of root folder
          you have chosen!!
        </p>
      </div>
    </div>
  );
};

export default Convert;
