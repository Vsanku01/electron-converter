const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const { Notification } = require('electron');

function convert720p(filename, output) {
  console.log('from 720p');
  ffmpeg(filename)
    .addOptions([
      //720
      '-profile:v main',
      '-vf scale=w=1280:h=720:force_original_aspect_ratio=decrease',
      '-c:a aac',
      '-ar 48000',
      '-b:a 128k',
      '-c:v h264',
      '-crf 20',
      '-g 48',
      '-keyint_min 48',
      '-sc_threshold 0',
      '-b:v 2800k',
      '-maxrate 2996k',
      '-bufsize 4200k',
      '-hls_time 10',
      `-hls_segment_filename ${output}/720p_%03d.ts`,
      '-hls_playlist_type vod',
      '-f hls',
    ])
    .output(`${output}/720p.m3u8`)
    .on('end', () => sendNotification('Completed converting into 720p'))
    .run();
}

function sendNotification(message) {
  new Notification({
    title: 'Notification',
    body: message,
  }).show();
}
module.exports = convert720p;
