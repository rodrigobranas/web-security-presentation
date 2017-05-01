var express = require('express');
var app = express();

app.get('/books', function (req, res) {
	res.json(["Clean Code", "Refactoring", "Extreme Programming"]);
});

app.listen(3001);