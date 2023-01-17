// Stream -> Principal Node.js feature (emphasis)

// example 01 (replicates what is written in the terminal):

process.stdin.pipe(process.stdout);

// example 02 (using native features):

import { Readable } from 'node:stream';

class TestStream extends Readable {
    index = 1;

    _read() {
        const i = this.index + 1;

        if (i >= 100) {
            this.push(null);
        } else {
            const buf = Buffer.from(String(i));
            
            this.push(buf);
        }
    }
}

new TestStream().pipe(process.stdout);