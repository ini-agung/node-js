const http = require('http');
const fs = require('fs');

const port = 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });
    const url = req.url;
    if (url === '/') {
        fs.readFile('./layouts/index.html', (err, data) => {
            res.write(data);
            res.end();
        });
    }
}).listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})