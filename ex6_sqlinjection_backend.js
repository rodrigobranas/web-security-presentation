var express = require('express');
var database = require('./database');
var app = express();

app.use(express.json());

app.post("/login", async function (req, res) {
	const loginForm = req.body;
	const user = await database.oneOrNone(`select * from blog.user where username='${loginForm.username}' and password='${loginForm.password}'`, []);	
	if (user) {
		res.json(user);
	} else {
		res.status(401).send('Invalid username or password');
	}
});

app.listen(3006);
