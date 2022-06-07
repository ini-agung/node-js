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

const loadContacts = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const saveContact = (name, phone, email) => {
    const contact = {
        name,
        phone,
        email
    };

    const contacts = loadContacts();

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

const listContacts = () => {
    const contacts = loadContacts();
    console.log(chalk.cyan.inverse.bold('Daftar Kontak : '));

    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.name} - ${contact.phone}`);
    })
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.name} - ${contact.phone}`);
    })

    return contacts;
}

const detailContact = (name) => {
    const contacts = loadContacts();
    const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
    if (!contact) {
        console.log(chalk.red.inverse.bold(`${name} Tidak Ditemukan`));
        return false;
    }
    console.log(chalk.cyan.inverse.bold(contact.name));
    console.log(contact.phone);
    if (contact.email)
        console.log(contact.email);
}

const deleteContact = (name) => {
    const contacts = loadContacts();
    const newContacts = contacts.filter((contact) => contact.name.toLowerCase() !== name.toLowerCase());
    if (contacts.length === newContacts.length) {
        console.log(chalk.red.inverse.bold(`${name} Tidak Ditemukan`));
        return false;
    } else {
        1
        fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts))
        console.log(chalk.green.inverse.bold(`Data ${name} Berhasil Di Hapus`));
    }
}


module.exports = {
    saveContact,
    listContacts,
    detailContact,
    deleteContact
}