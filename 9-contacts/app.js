const yargs = require("yargs");
const contact = require("./contacts");

// Create New Data
yargs.command({
    command: 'add',
    describe: 'Insert New Data',
    builder: {
        name: {
            describe: 'Full Name',
            demandOption: true,
            type: 'string',

        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string',

        },
        phone: {
            describe: 'Phone Number',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        const newcontact = {
            name: argv.name,
            phone: argv.phone,
            email: argv.email,
        }
        contact.saveContact(argv.name, argv.phone, argv.email);

        console.log(argv);
    }
}).demandCommand();

// List Data
yargs.command({
    command: 'list',
    describe: 'Show List Data',
    handler() {
        contact.listContacts()
    }
})


// Detail Data
yargs.command({
    command: 'detail',
    describe: 'Detail Data',
    builder: {
        name: {
            describe: 'Full Name',
            demandOption: true,
            type: 'string',

        }
    },
    handler(argv) {
        contact.detailContact(argv.name);
    }
})

// Delete Data
yargs.command({
    command: 'delete',
    describe: 'Delete Data By Name',
    builder: {
        name: {
            describe: 'Full Name',
            demandCommand: true,
            type: 'string'
        }
    },
    handler(argv) {
        contact.deleteContact(argv.name);
    }
})

yargs.parse();