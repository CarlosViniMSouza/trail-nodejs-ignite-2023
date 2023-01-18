import http from 'node:http';
import { Transform } from 'node:stream';

class InvertNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const inverted = Number(chunk.toString()) * -1;

        console.log(inverted);

        callback(null, Buffer.from(String(inverted)));
    }
}

const server = http.createServer(async (req, res) => {
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const bodyTotal = Buffer.concat(buffers).toString();

    console.log(bodyTotal);

    return res.end(bodyTotal);
    
    /* return req
        .pipe(new InvertNumber())
        .pipe(res);
    */
});

server.listen(3001);