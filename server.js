var http = require('http'),
    fs = require('fs')

var server = http.createServer(function(req, res) {
  // send all urls to render index
  var path = 'index.html';

  // make exception for static assets
  if (req.url.match(/^\/media/)) {
    path = req.url;
  }

  var absPath = __dirname + '/' + path;

  // load file
  fs.readFile(absPath, function(error, content) {
    if (error) {
      res.writeHead(500);
      res.end();
    } else {
      res.writeHead(200);
      res.end(content, 'utf-8');
    }
  });
});

server.listen(8008);
console.log('Listening on port: 8008');

