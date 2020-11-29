import React, { useState, useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import ReactPlayer from 'react-player/file';
import { useHistory } from 'react-router-dom';
import Card from './Card';

function Player(props) {
  const [src, setSrc] = useState('');
  const [vidtype, setVidtype] = useState('audio/mpegurl');
  const [getDir, setgetDir] = useState('');
  const history = useHistory();
  console.log('From player.js', props.location.state);
  const dirInfo = props.location.state;

  const fileHandler = async (e) => {
    const url = e.target.files[0].path;
    console.log(e.target.files);
    console.log(url);
    setSrc(url);
    console.log(e.target.files[0].type);
    setVidtype(e.target.files[0].type);
    // electron.videoApi.callVlcPlayer(url);
  };

  useEffect(() => {}, [src, vidtype]);

  return (
    <div className='grid grid-cols-4 gap-0 h-screen'>
      <aside className='bg-blue-200 h-full'>
        <button
          className=''
          onClick={() => {
            history.push('/convert');
          }}
        >
          <i className='material-icons'>arrow_back</i>
        </button>
        <div>
          {dirInfo
            ? dirInfo.res.map((file, idx) => {
                if (file.split('.')[1] === 'm3u8') {
                  return (
                    <Card
                      file={file}
                      path={dirInfo.outputDirPath}
                      setSrc={setSrc}
                      setVidtype={setVidtype}
                      key={idx}
                    />
                  );
                } else {
                }
              })
            : ''}
        </div>
      </aside>

      <main className='bg-blue-200 col-span-3 h-full'>
        {/* <input
          type='file'
          accept='.mp4,.m3u8'
          onChange={(e) => {
            fileHandler(e);
          }}
        /> */}

        {vidtype === 'audio/mpegurl' ? (
          <ReactHlsPlayer
            url={src}
            autoplay={false}
            controls={true}
            className='h-screen'
          />
        ) : (
          <ReactPlayer
            url={src}
            playing={true}
            controls={true}
            width={'800px'}
            height={'600px'}
            className='h-full'
          />
        )}
      </main>
    </div>
  );
}

export default Player;
