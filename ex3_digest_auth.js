var express = require('express');
var crypto = require('crypto');
var app = express();

var md5 = function (text) {
	return crypto.createHash("md5").update(text).digest("hex");
};

var username = "root";
var password = "123456";
var realm = "AgileCode";
var nonce = Math.random();
var opaque = md5(realm);

var auth = function (req) {
	var authorization = req.headers.authorization;
	if (authorization.indexOf("Digest") > -1) {
		var credentials = authorization.replace(/Digest/g, "").replace(/ /g, "").split(",");
		var obj = {};
		credentials.forEach(function (credential) {
			var key = credential.split("=")[0].replace(/"/g, "");
			var value = credential.split("=")[1].replace(/"/g, "");
			obj[key] = value;
		});
		var h1 = md5(obj.username + ":" + realm + ":" + password);
		var h2 = md5(req.method + ":" + obj.uri);
		var response = md5(h1 + ":" + nonce + ":" + h2);
		return true;
	}
	return false;
}

app.get("/", function (req, res) {
	if (auth(req)) {
		res.send("OK");
	} else {
		res.statusCode = 401;
		res.setHeader('WWW-Authenticate', 'Digest realm="' + realm + '", nonce="' + nonce + '", opaque="' + opaque + '"');
		res.end('Unauthorized');
	}
});

app.listen(3000);