const electron = require('electron-prebuilt');
const proc = require('child_process');
const fs = require('fs');

fs.access('build', fs.F_OK, function(err) {
  if (!err) {
    proc.spawn(electron, ['./build'], {
      stdio: 'inherit'
    }).on('close', function() {
      // User closed the app. Kill the host process.
      process.exit();
    });
  } else {
    // It isn't accessible
    console.error('try `npm run setup` before running start-app.js');
  }
});
