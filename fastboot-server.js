const FastBootAppServer = require('fastboot-app-server');
const FSNotifier = require('fastboot-fs-notifier');

let notifier = new FSNotifier({
  targetDir: 'dist',
});

let server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true,
  port: 3000,
  notifier: notifier,
  chunkedResponse: true,
});

server.start();
