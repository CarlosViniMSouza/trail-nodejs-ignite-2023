import http from 'node:http';

const port = 3000;

const users = [];

const server = http.createServer(async (req, res) => {
    const {method, url} = req;

    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        // At class: 
        req.body = null;

        // My code:
        // new Error(`Invalid request: ${req.body}`);
    }

    console.log(req.body);

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        const {name, email} = req.body;

        users.push({
            id: 0,
            name,
            email,
        });

        return res.writeHead(201).end();
    }

    return res.writeHead(404).end("Route Not Found");
});

server.listen(port);
