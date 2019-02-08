const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const api = require('./server/routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// Node + Express + Angular: Uncaught SyntaxError: Unexpected token <
// 정적리소스 제공폴더 경로를 정확히 설정하면 해결된다.
app.use(express.static(path.join(__dirname, 'dist/mean-app')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.type('html');
  res.sendFile(path.join(__dirname, 'dist/mean-app/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
