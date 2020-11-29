const { ipcRenderer, contextBridge } = require('electron');
var child_process = require('child_process');

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message) {
      console.log(message);
      ipcRenderer.send('notify', message);
    },
  },

  filesApi: {
    sendFilePath() {
      ipcRenderer.send('file-path');
    },
  },

  changeDirectory: {
    selectDirectory() {
      ipcRenderer.send('select-directory');
    },
  },

  sendMessage: {
    async msgFromFrontend() {
      // msg = 'hello';
      // ipcRenderer.send('get-directory', 'Calling from Preload.js');
      // return msg;
      const result = await ipcRenderer.invoke('get-directory');
      console.log(result);
      return result;
    },
  },
});

// ipcRenderer.on('app-version', (event, args) => {
//   console.log(`Node version is ${args}`);
// });
