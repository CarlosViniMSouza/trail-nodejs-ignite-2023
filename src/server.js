import http from 'node:http';

const port = 3000;

const users = [];

const server = http.createServer((req, res) => {
    const {method, url} = req;

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 0,
            name: 'John Doe',
            email: 'johndoe@email.com'
        });
    }

    return res.end("Hello User !!");
});

server.listen(port);
