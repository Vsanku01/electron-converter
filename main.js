// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  dialog,
  Menu,
  MenuItem,
} = require('electron');
const path = require('path');
// Custom Converter Code

const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const fs = require('fs');
let filename = '';
const convert360p = require('./utilities');
const convert480p = require('./convert480p');
const convert720p = require('./convert720p');

// Check development environment
const isDev = !app.isPackaged;

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  const menu = new Menu();
  menu.append(
    new MenuItem({
      label: 'File',
      submenu: [
        {
          label: 'Open File',
          accelerator: process.platform === 'darwin' ? 'Cmd+o' : 'Ctrl+o',
          click: () => {
            console.log('Electron rocks!');
            openFile();
          },
        },
      ],
    })
  );

  Menu.setApplicationMenu(menu);
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
}

ipcMain.on('notify', (_, message) => {
  new Notification({ title: 'Notification', body: message }).show();
});

ipcMain.on('file-path', (_) => {
  openFile();
});

// Code
// Open File
function openFile() {
  const file = dialog
    .showOpenDialog(mainWindow, {
      properties: ['openFile', 'openDirectory'],
      filters: [{ name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] }],
    })
    .then(async (result) => {
      console.log(result);
      if (result.canceled) {
        new Notification({
          title: 'Notification',
          body: 'Please select a File to Convert',
        }).show();
        return;
      }
      filename = result.filePaths[0];
      // create a output directory

      // console.log(path.dirname(filename).split(path.sep).pop());
      let directoryName = path.basename(path.dirname(filename));
      console.log('Dir Name', directoryName);
      console.log('Directory Path', path.dirname(filename));
      // console.log('Absolute Path', path.resolve(directoryName));
      var dir = `${path.dirname(filename)}/output/`;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      let outputFolder = `${path.dirname(filename)}/output`;
      convert360p(filename, outputFolder);
      convert480p(filename, outputFolder);
      convert720p(filename, outputFolder);
    })
    .catch((error) => {
      console.log('File Error', error);
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
