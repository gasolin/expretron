'use strict';

const electron = require('electron');
const desktop = electron.app;
const BrowserWindow = electron.BrowserWindow;

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const path = require('path');
const PORT = normalizePort(process.env.PORT || '3000');

var mainWindow = null;
var server;

desktop.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    desktop.quit();
  }
});

desktop.on('ready', function() {
  if (!mainWindow) {
    mainWindow = createMainWindow();
    setupExpress();
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
  server.close();
}

function setupExpress() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

  server = http.createServer(app);
  server.listen(PORT, function() {
    console.log('listening on *:' + PORT);
  });
  // server.on('error', onError);
  server.on('listening', function() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);

    mainWindow.loadURL('http://127.0.0.1:3000');
    // mainWindow.toggleDevTools();
  });
};

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
