const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(morgan('dev'));
app.get('/', function(req, res) {
    const mahasiswa = [{
        'nama': 'agung',
        'email': 'agung@gmail.com',
        'phone': '082208220822'
    }, {
        'nama': 'pangestu',
        'email': 'pangestu@gmail.com',
        'phone': '083308330833'

    }]
    res.render('index', {
        layout: 'layouts/main',
        nama: 'Home',
        title: 'Home',
        mahasiswa,
    });
})

app.get('/about', function(req, res) {
    res.render('about', {
        layout: 'layouts/main',
        nama: 'About',
        title: 'About'
    });
})
app.get('/contact', function(req, res) {
    res.render('contact', {
        layout: 'layouts/main',
        nama: 'Contact',
        title: 'Contact'
    });
})

app.use((req, res, next) => {
    res.status(404);
    res.send('<h1>404</h1>');
    res.end();
})

app.listen(3000)