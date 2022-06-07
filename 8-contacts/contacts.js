const { resolve } = require('path');
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');


const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}
const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8')
}

const saveContact = (name, phone, email) => {
    const contact = {
        name,
        phone,
        email
    };

    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);

    //Cek Is Duplicate

    const duplicate = contacts.find((contacts) => contacts.name === name);
    if (duplicate) {
        console.log(chalk.red.inverse.bold('Duplikat Data'));
        return false;
    }

    // Cek Valid Email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Email Tidak Valid'));
            return false;
        }
    }

    // Cek Valid Phone
    if (phone) {
        if (!validator.isMobilePhone(phone, 'id-ID')) {
            console.log(chalk.red.inverse.bold('Nomor Telepon Tidak Valid'));
            return false;
        }
    }

    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
    console.log(chalk.green.inverse.bold('Data Berhasil Di Input'));
}
module.exports = {
    saveContact
}