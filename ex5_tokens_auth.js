let express = require('express');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let app = express();

app.use(bodyParser.urlencoded({extended: true}));

let auth = function (req) {
	jwt.verify(req.headers.authorization, "AgileCode", function (user) {

	});
	if (req.headers.authorization === "Bearer xyz123") {
		return true;
	}
	return false;
}

app.post("/autenticate", function (req, res) {
	let credentials = req.body;
	if (credentials.username === "root" && credentials.password === "123456") {
		let user = {
			id: 987654321,
			name: "Rodrigo Branas"
		};
		let token = jwt.sign(user, "AgileCode");
		res.json({
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