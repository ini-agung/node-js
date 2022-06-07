const http = require('http');
const port = 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });
    const url = req.url;
    switch (url) {
        case '/about':
            res.write('Ini about');
            break;
        case '/contact':
            res.write('Ini contact');
            break
        default:
            res.write('Hello');
            break;
    }
    res.end();
}).listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})