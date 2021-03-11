const axios = require('axios');

axios({
	url: 'http://localhost:3006/login',
	method: 'post',
	data: {
		username: 'rodrigobranas',
		password: '123456'
	},
	validateStatus: false
}).then(function (response) {
	console.log(response.status, response.data);
});
