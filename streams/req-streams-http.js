import { Readable } from 'node:stream';

class TestStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;

        setTimeout(() => {
            if (i > 6) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i));
                
                this.push(buf);
            }
        }, 1000);
    }
}

fetch('http://localhost:3001', {
    method: 'POST',
    body: new TestStream(),
    duplex: 'half',
}).then(res => {
    return res.text()
}).then(data => {
  console.log(data)
});