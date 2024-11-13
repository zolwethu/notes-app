import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's URL
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current file
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const filePath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Internal Server Error</h1>');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  } else if (req.url.startsWith('/css') || req.url.startsWith('/js')) {
    let filePath = path.join(__dirname, 'public', req.url);
    const extname = path.extname(filePath);

    let contentType = 'text/plain';
    if (extname === '.css') {
      contentType = 'text/css';
    } else if (extname === '.js') {
      contentType = 'application/javascript';
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading static file:', err);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>File Not Found</h1>');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(data);
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Page Not Found</h1>');
  }
});

const port = 56708;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
