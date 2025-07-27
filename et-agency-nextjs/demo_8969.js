const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8969;

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'demo.html');

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading demo.html');
      console.error('Error reading demo.html:', err);
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});