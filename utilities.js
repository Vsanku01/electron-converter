const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const { Notification } = require('electron');

function convert360p(filename, output) {
  console.log('Filename from 360p', filename);
  console.log('Out from 360p', output);
  ffmpeg(filename)
    .addOptions([
      //360
      '-profile:v main',
      '-vf scale=w=640:h=360:force_original_aspect_ratio=decrease',
      '-c:a aac',
      '-ar 48000',
      '-b:a 96k',
      '-c:v h264',
      '-crf 20',
      '-g 48',
      '-keyint_min 48',
      '-sc_threshold 0',
      '-b:v 800k',
      '-maxrate 856k',
      '-bufsize 1200k',
      '-hls_time 10',
      `-hls_segment_filename ${output}/360p_%03d.ts`,
      '-hls_playlist_type vod',
      '-f hls',
    ])
    // .output('videos/360p.m3u8')
    // .output(output.toString())
    .output(`${output}/360p.m3u8`)
    // videos/360p.m3u8
    .on('end', () => sendNotification('Completed converting into 360p'))
    .run();
}

function sendNotification(message) {
  new Notification({
    title: 'Notification',
    body: message,
  }).show();
}
module.exports = convert360p;
