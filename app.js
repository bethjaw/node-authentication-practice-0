const express = require('express');
const bodyParser = require('body-parser');
// this requires the file our database is connected to and hosts all of our functions we access below
const db = require('./db/query');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// this app.post creates a new user.
app.post('/api/users', (req, res, next) => {
// it accesses the database and function to create a new user and get's back the body, or the info the person put in (email).
	db.createUser(req.body)
	// Then it creates the user and sends back to the user an id and code.
		.then(user => res.status(201).json(user))
		//it also checks for an error
		.catch(err => res.status(500).send(err));
});


// this app.post is for when a user wants to login.  They only need their code to log in here.
app.post('/api/users/login', (req, res, next) => {
// We access the database and login function and capture the code the user puts in
	db.login(req.body.code)
	// Then, we check the code
		.then(user => {
			// if the code is wrong and does not belong to a user, we send back an unauthorized status
			if(!user) {
				res.sendStatus(401);
				// else, if the user's code belongs to a user in our DB, we sent back the users information (email, id, code) - this will give any user info that has that code
			} else {
				res.json(user);
			}
			// we also check for an errror
		}).catch(err => {
			res.status(500).send(err);
		});
});

// this app.get is for when we want to access a specfic user by id
app.get('/api/users/:id', (req, res, next) => {
	// we need both the user's code and id
	const code = req.query.code;
	const id = req.params.id;
// we access the database and our getUserById function plus input the id
	db.getUserById(id)
	// then we check the user information
		.then(user => {
			// if NOT an existing user they will get an unauthorized error
			if(!user) {
				res.sendStatus(401);
				// if the user code is wrong, the will also get the same error
			} else if(user.code !== code) {
				res.sendStatus(401);
				// if the user info is right, we will give them their user information (sends to postman)
			} else {
				res.json(user);
			}
		})
		// we also check for an error
		.catch(err => res.status(500).send(err));
});

// check that our server is listening for a port or local port (ignition button!)
app.listen(port, () => {
	console.log(`app listening on port: ${port}`);
});
