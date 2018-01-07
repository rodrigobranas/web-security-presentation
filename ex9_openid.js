let request = require('request');
let express = require('express');
let app = express();

let token;

app.get('/', function (req, res) {
	if (!token) {
		let clientId = '1042011359644-bnfdb918j457oslf61sorti8pcs83suv.apps.googleusercontent.com';
		let redirectUrl = 'http://localhost:3000/authorization';
		let state = Math.floor(Math.random() * 10000);
		return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=openid%20email&state=${state}&response_type=code`);
	} else {
		return res.redirect('http://localhost:3000/api');
	}
});

app.get('/authorization', function (req, res) {
	let code = req.query.code;
	let clientId = '1042011359644-bnfdb918j457oslf61sorti8pcs83suv.apps.googleusercontent.com';
	let clientSecret = 'G7kGPLy4t290JOIjBcBBD8nR';
	let state = 6196;
	let redirectUrl = 'http://localhost:3000/callback';
	let form = {client_id: clientId, client_secret: clientSecret, code, redirect_uri: redirectUrl, grant_type: 'authorization_code'};
	let options = {
		url: `https://www.googleapis.com/oauth2/v4/token`,
		form: form,
		headers: {
			Accept: 'application/json'
		}
	};
	request.post(options, function (error, response, body) {
		console.log(body);
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