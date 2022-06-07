// Core Modules
// File System
const { error } = require('console');
const { create } = require('domain');
const fs = require('fs');

// // Write To File Sync
// try {
//     fs.writeFileSync('js.js', '//Ini Syncronus')

// } catch (error) {
//     console.log(error);

// }

// //Write To File Async
// fs.writeFile('data/data.txt', '//Ini Asyncronus', (error) => {
//     console.log(error);
// })

// // Read Value From File Sync
// const readData = fs.readFileSync('data/data.txt', 'utf-8');
// console.log(readData);

// // Read Value From File Async
// const readData = fs.readFile('data/data.txt', 'utf-8', (error, data) => {
//     if (error) throw error;
//     console.log(data);
// });

// //Read Line
const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Nama : ', (nama) => {
    rl.question('Telp : ', (telp) => {
        // Prepare JSON format
        const contact = {
            nama,
            telp
        };
        // Read Value
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);
        contacts.push(contact);
        fs.writeFile('data/contacts.json', JSON.stringify(contacts), (error) => {
            console.log(error);
        })
        rl.close;
    })
})