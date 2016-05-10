var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send("OK");
});

app.listen(3000);