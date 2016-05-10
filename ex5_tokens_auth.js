var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

var auth = function (req) {
	jwt.verify(req.headers.authorization, "AgileCode", function (user) {

	});
	if (req.headers.authorization === "Bearer xyz123") {
		return true;
	}
	return false;
}

app.post("/autenticate", function (req, res) {
	var credentials = req.body;
	if (credentials.username === "root" && credentials.password === "123456") {
		var user = {
			id: 1,
			name: "Rodrigo Branas"
		};
		var token = jwt.sign(user, "AgileCode");
		res.json({
			user: user,
			token: token
		});
	}
});

app.get("/", function (req, res) {
	if (auth(req)) {
		res.statusCode = 200;
		res.send("OK");
	} else {
		res.statusCode = 401;
		res.send("<html><head><title>Login</title></head><body><form action='/autenticate' method='POST'><input type='text' name='username'/><input type='password' name='password'/><input type='submit' value='OK'/></form></html>")
	}
});

app.listen(3000);