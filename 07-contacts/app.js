const contact = require('./contacts.js');
const main = async() => {
    const nama = await contact.question('Masukkan Nama : ');
    const telp = await contact.question('Masukkan Telp : ');
    const email = await contact.question('Masukkan Email :');

    contact.saveContact(nama, telp, email);

}

main();