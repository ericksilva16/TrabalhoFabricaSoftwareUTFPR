const { createServer } = require('node:http');
const { readFile } = require('node:fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  if (req.url === '/') {
    readFile('index.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Erro ao carregar a homepage');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Página não encontrada');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});