const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/query');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/users', (req, res, next) => {
	db.createUser(req.body)
		.then(user => res.status(201).json(user))
		.catch(err => res.status(500).send(err));
});

app.post('/api/users/login', (req, res, next) => {
	db.login(req.body.code)
		.then(user => {
			if(!user) {
				res.sendStatus(401);
			} else {
				res.json(user);
			}
		}).catch(err => {
			res.status(500).send(err);
		});
});

app.get('/api/users/:id', (req, res, next) => {
	const code = req.query.code;
	const id = req.params.id;

	db.getUserById(id)
		.then(user => {
			if(!user) {
				res.sendStatus(401);
			} else if(user.code !== code) {
				res.sendStatus(401);
			} else {
				res.json(user);
			}
		})
		.catch(err => res.status(500).send(err));
});

app.listen(port, () => {
	console.log(`app listening on port: ${port}`);
});
