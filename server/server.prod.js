const express = require('express');
const app = express();
const path = require('path');

const BUILD_PATH = '../build';
const FILE_NAME = 'index.html';
const DIST_DIR = path.join(__dirname, BUILD_PATH);
let envSettings = require('../envSettings.json');
const log = require('console-log-level')({ level: envSettings.logLevel })

app.use(express.static(DIST_DIR));
app.get('*', function (req, res) {
  res.sendFile(path.join(DIST_DIR, FILE_NAME));
});

app.listen(envSettings.port, function() {
    log.info(`\nServer started on ${envSettings.port} port...`);
});