let request = require('request');
let express = require('express');
let app = express();

let token;

app.get('/', function (req, res) {
	if (!token) {
		let clientId = 'a60736726d8249140d2b';
		let redirectUrl = 'http://localhost:3000/authorization';
		let state = Math.floor(Math.random() * 10000);
		return res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_url=${redirectUrl}&scope=user&state=${state}`);
	} else {
		return res.redirect('http://localhost:3000/api');
	}
});

app.get('/authorization', function (req, res) {
	let code = req.query.code;
	let clientId = 'a60736726d8249140d2b';
	let clientSecret = '644247f7bf9cea397d0cc5ad50cca288e2ccad1d';
	let state = 6196;
	let redirectUrl = 'http://localhost:3000/token';
	let form = {client_id: clientId, client_secret: clientSecret, code, state, redirect_url: redirectUrl};
	let options = {
		url: `https://github.com/login/oauth/access_token`,
		form: form,
		headers: {
			Accept: 'application/json'
		}
	};
	request.post(options, function (error, response, body) {
		body = JSON.parse(body);
		token = body.access_token;
		res.redirect('http://localhost:3000/api');
	});
});

app.get('/api', function (req, res) {
	return res.send("Authorized for user, emails and followers");
});

app.get('/user', function (req, res) {
	let options = {
		url: `https://api.github.com/user`,
		headers: {
			'User-Agent': 'Express.js',
			'Authorization': `Bearer ${token}`
		}
	};
	request.get(options, function (error, response, body) {
		res.send(body);
	});
});

app.get('/followers', function (req, res) {
	let options = {
		url: `https://api.github.com/user/followers`,
		headers: {
			'User-Agent': 'Express.js',
			'Authorization': `Bearer ${token}`
		}
	};
	request.get(options, function (error, response, body) {
		res.send(body);
	});
});

app.get('/emails', function (req, res) {
	let options = {
		url: `https://api.github.com/user/emails`,
		headers: {
			'User-Agent': 'Express.js',
			'Authorization': `Bearer ${token}`
		}
	};
	request.get(options, function (error, response, body) {
		res.send(body);
	});
});

app.listen(3000);