// https://blog.1password.com/bcrypt-is-great-but-is-password-cracking-infeasible/

var pbkdf2 = require('pbkdf2')

const password = '123456';
const salt = '123456';
const iterations = 1;
const keylen = 32;
const digest = 'sha512';

var derivedKey = pbkdf2.pbkdf2Sync(password, salt, iterations, keylen, digest)
console.log(derivedKey.toString('hex'));
