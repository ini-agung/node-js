const validator = require('validator');
const chalk = require('chalk');
const log = console.log;
const msg = chalk `asd {bgGreen.black.bold sadasdasdsada} sdas`;
console.log(
    // validator.isEmail('a@b.co'),
    validator.isMobilePhone('+6281211111', 'id-ID')
);
log(chalk.black(msg))