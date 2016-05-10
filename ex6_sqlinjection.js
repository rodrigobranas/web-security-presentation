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

// http://localhost:3000/report?model=A3&color=blue
// http://localhost:3000/report?model=\'; DROP TABLE CARS;--&color=blue

app.listen(3000);