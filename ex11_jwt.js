const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
	modulusLength: 2048,
	publicKeyEncoding: {
		type: 'spki',
		format: 'pem'
	},
	privateKeyEncoding: {
		type: 'pkcs8',
		format: 'pem'
	}
});

const options = {
	expiresIn: 432000,
	algorithm: 'RS256'
};

const token = jwt.sign({ email: 'rodrigo.branas@gmail.com' }, privateKey, options);
console.log(token);
jwt.verify(token, publicKey, function (error, result) {
	console.log(error, result);
});
