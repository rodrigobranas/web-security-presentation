// http://localhost:3006/report?model=ecosport&color=branco';drop table cars;--

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/report", function (req, res) {
	var parameters = {};
	req.url.split("?")[1].split("&").forEach(function (parameter) {
		var parts = parameter.split("=");
		parameters[parts[0]] = parts[1];
	});
	console.log(parameters);
	var query = "select * from cars where model='" + parameters.model + "' and color='" + parameters.color + "'";
	res.send(query);
});

app.listen(3006);