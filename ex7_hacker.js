var express = require('express');
var app = express();

app.get("/hacker", function (req, res) {
	var url = req.url;
	var queryString = req.url.split("?")[1];
	console.log(queryString);
	res.end();
});

app.listen(3001);