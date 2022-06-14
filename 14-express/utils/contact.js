const { constants } = require('buffer');
const fs = require('fs');

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

const findContact = (email) => {
    const contacts = loadContacts();
    const contact = contacts.find((contact) => contact.email.toLowerCase() === email.toLowerCase());
    if (!contact) {
        return false;
    }
    return contact;
}

const contactSave = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

const addContact = (contact) => {
    const contacts = loadContacts();
    contacts.push(contact);
    contactSave(contacts)
}

const isDuplicate = (email) => {
    const contacts = loadContacts();
    return contacts.find((contact) => contact.email === email);
}

const deleteContact = (email) => {
    const contacts = loadContacts();
}
module.exports = {
    loadContacts,
    findContact,
    addContact,
    isDuplicate,
    deleteContact,
}