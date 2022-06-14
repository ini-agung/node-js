const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookiePareser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const { loadContacts, findContact, addContact, isDuplicate } = require('./utils/contact');
const { body, validationResult, check } = require('express-validator');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(cookiePareser('secret'));
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());


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

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main',
        nama: 'About',
        title: 'About'
    });
})

app.get('/contact', (req, res) => {
    const contacts = loadContacts();
    res.render('contact', {
        layout: 'layouts/main',
        nama: 'Contact',
        title: 'Contact',
        contacts,
        msg: req.flash('msg'),
    });
})

app.get('/contact/delete/:email', (req, res) => {
    const contact = findContact(req.params.email);
    if (!contact) {
        res.status(404);
        res.send('no');
    } else {
        deleteContact(req.params.email);
    }
});

app.get('/contact/add', (req, res) => {
    const contacts = loadContacts();
    res.render('add-contact', {
        layout: 'layouts/main',
        nama: 'Contact',
        title: 'Contact',
        contacts,
    });
});

app.post('/contact', [
        check('nama', 'Nama Tidak Valid').isLength({ min: 5 }),
        check('email', 'Email Tidak Valid').isEmail(),
        check('phone', 'Nomor Telepon Tidak Valid').isMobilePhone('id-ID'),
        body('email').custom((email) => {
            const duplikat = isDuplicate(email);
            if (duplikat) {
                throw new Error('Duplikate');
            }
            return true;
        }),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('add-contact', {
                layout: 'layouts/main',
                nama: 'Contact',
                title: 'Contact',
                errors: errors.array(),

            });
        } else {
            addContact(req.body)
            req.flash('msg', 'Kontak Berhasil Di Dapat');
            res.redirect('/contact');
        }
    });

app.get('/contact/:email', (req, res) => {
    const contact = findContact(req.params.email);
    res.render('detail', {
        layout: 'layouts/main',
        title: 'Detail',
        contact,
    });
});

app.use((req, res, next) => {
    res.status(404);
    res.send('<h1>404</h1>');
    res.end();
})

app.listen(port)