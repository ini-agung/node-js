const yargs = require("yargs");
const contact = require("./contacts");
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
})

yargs.parse();