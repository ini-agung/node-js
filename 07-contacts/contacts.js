const { rejects } = require('assert');
const { resolve } = require('path');
const fs = require('fs');
const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}
const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8')
}

const firstQuestion = () => {
    return new Promise((resolve, rejects) => {
        rl.question('Nama : ', (nama) => {
            resolve(nama);
        });
    })
}
const secQuestion = () => {
    return new Promise((resolve, rejects) => {
        rl.question('Telp : ', (telp) => {
            resolve(telp);
        });
    })
}
const thirdQuestion = () => {
    return new Promise((resolve, rejects) => {
        rl.question('Email : ', (email) => {
            resolve(email);
        });
    })
}
const question = (q) => {
    return new Promise((resolve, rejects) => {
        rl.question(q, (answer) => {
            resolve(answer);
        });
    })
}

const saveContact = (nama, telp, email) => {
    const contact = {
        nama,
        telp,
        email
    };
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
    rl.close();
}
module.exports = {
    saveContact,
    question
}