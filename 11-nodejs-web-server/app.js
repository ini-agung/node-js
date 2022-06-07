const http = require('http');
const fs = require('fs');
const port = 3000;
const renderHTML = (path, res) => {
    fs.readFile(path, (error, data) => {
        if (error) {
            res.writeHead(404);
            res.write('Not Found');
        } else {
            res.write(data)
        }
        res.end();
    })
}
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });
    const url = req.url;
    console.log(url);
    switch (url) {
        case '/about':
            renderHTML('./about.html', res)
            break;
        case '/contact':
            renderHTML('./contact.html', res)
            break;

        default:
            renderHTML('./index.html', res)
            break;
    }
}).listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})