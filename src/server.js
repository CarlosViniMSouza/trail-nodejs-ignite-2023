import http from 'node:http';

const port = 3000;

const server = http.createServer((req, res) => {
    return res.end("Hello, world!");
});

server.listen(port);
