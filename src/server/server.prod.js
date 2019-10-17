const path = require('path');
const express = require('express');
const open = require('open');
const app = express();
const PORT = 3001;
const HOST = '127.0.0.1';
const PROTOCOL = 'http://';
const BUILD_PATH = '../../build';
const FILE_NAME = 'index.html';

const DIST_DIR = path.join(__dirname, BUILD_PATH);
app.use(express.static(DIST_DIR));
app.get('*', function (req, res) {
  res.sendFile(path.join(DIST_DIR, FILE_NAME));
});

app.listen(PORT, HOST,function(){
    console.log(`\nServer started on ${PORT} port`);
    open(`${PROTOCOL}${HOST}:${PORT}`);
});