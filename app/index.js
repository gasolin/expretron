'use strict';

const electron = require('electron');
const desktop = electron.app;
const BrowserWindow = electron.BrowserWindow;
const server = require('./server');

var mainWindow = null;
var webServer;

desktop.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    desktop.quit();
  }
});

desktop.on('ready', function() {
  if (!mainWindow) {
    mainWindow = createMainWindow();
    webServer = server.setupExpress(function() {
      mainWindow.loadURL('http://127.0.0.1:' + server.PORT);
      //comment this out when production
      mainWindow.toggleDevTools();
    });
  }
});

function createMainWindow() {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    },
    width: 600,
    height: 400
  });

	// win.loadURL(`file://${__dirname}/index.html`);
  win.on('closed', onClosed);
  return win;
}

function onClosed() {
	// dereference the window
  // for multiple windows store them in an array
  mainWindow = null;
  // close web server
  webServer.close();
}
