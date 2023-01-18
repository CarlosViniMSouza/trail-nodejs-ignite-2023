// Stream -> Principal Node.js feature (emphasis)

// example 01 (replicates what is written in the terminal):

process.stdin.pipe(process.stdout);

// example 02 (using native features):

import { Readable, Transform, Writable } from 'node:stream';

class TestStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;

        setTimeout(() => {
            if (i > 100) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i));
                
                this.push(buf);
            }
        }, 1000);
    }
}

class InvertNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const inverted = Number(chunk.toString()) * -1;

        callback(null, Buffer.from(String(inverted)));
    }
}

class MultiStreams extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10);
        
        callback();
    }
}

new TestStream()
    .pipe(new InvertNumber())
    .pipe(new MultiStreams());