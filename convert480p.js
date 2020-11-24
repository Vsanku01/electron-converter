const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const { Notification } = require('electron');

function convert480p(filename, output) {
  console.log('from 480p');
  ffmpeg(filename)
    .addOptions([
      //480
      '-profile:v main',
      '-vf scale=w=842:h=480:force_original_aspect_ratio=decrease',
      '-c:a aac',
      '-ar 48000',
      '-b:a 128k',
      '-c:v h264',
      '-crf 20',
      '-g 48',
      '-keyint_min 48',
      '-sc_threshold 0',
      '-b:v 1400k',
      '-maxrate 1498k',
      '-bufsize 2100k',
      '-hls_time 10',
      `-hls_segment_filename ${output}/480p_%03d.ts`,
      '-hls_playlist_type vod',
      '-f hls',
    ])
    .output(`${output}/480p.m3u8`)
    .on('end', () => sendNotification('Completed converting into 480p'))
    .run();
}

function sendNotification(message) {
  new Notification({
    title: 'Notification',
    body: message,
  }).show();
}
module.exports = convert480p;
