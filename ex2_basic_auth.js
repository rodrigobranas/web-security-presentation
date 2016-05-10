var express = require('express');
var app = express();

app.get('/', function (req, res) {
	if (auth(req)) {
		res.send("OK");
	} else {
		res.statusCode = 401;
		res.setHeader('WWW-Authenticate', 'Basic realm="AgileCode"');
		res.end();
	}
});

var auth = function (req) {
	var authorization = req.headers.authorization;
	if (authorization) {
		var credentials = new Buffer(authorization.split(" ")[1], "base64").toString("ascii").split(":");
		var username = credentials[0];
		var password = credentials[1];
		if (username === "root" && password === "123456") {
			return true;
		}
	}
	return false;
}

app.listen(3000);