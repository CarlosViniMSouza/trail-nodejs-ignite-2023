import http from 'node:http';
import { Database } from './db.js';
import { convertToJSON } from './middlewares/convertToJSON.js';

const port = 3000;

const db = new Database();

const server = http.createServer(async (req, res) => {
    const {method, url} = req;

    await convertToJSON(req, res);

    if (method === 'GET' && url === '/users') {
        const users = db.select('users');

        return res.end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        const {name, email} = req.body;

        const user = {
            id: 0,
            name,
            email,
        }

        db.insert('users', user);

        return res.writeHead(201).end();
    }

    return res.writeHead(404).end("Route Not Found");
});

server.listen(port);
