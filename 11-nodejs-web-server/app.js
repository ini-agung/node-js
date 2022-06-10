const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.sendFile('./layouts/index.html', { root: __dirname })
})
app.get('/about', function(req, res) {
    res.sendFile('./layouts/about.html', { root: __dirname })
})
app.get('/contact', function(req, res) {
    res.sendFile('./layouts/contact.html', { root: __dirname })
})

app.listen(3000)