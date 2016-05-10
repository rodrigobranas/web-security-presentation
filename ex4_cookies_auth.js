var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

var auth = function (req) {
	return req.headers.cookie === "sessionToken=xyz123";
}

app.post("/autenticate", function (req, res) {
	var credentials = req.body;
	if (credentials.username === "root" && credentials.password === "123456") {
		res.setHeader("Set-Cookie","sessionToken=xyz123; Expires=Wed, 09 Jun 2021 10:18:14 GMT");
	}
	res.redirect("/");
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