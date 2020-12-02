const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const controller = require('./controllers/auth.controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CALL THE DATABASE CONNECTION FUNCTION

// This is calling the functions made to connect to the database

require('./models/db');

// ROUTES WITH RESPECTIVE FUNCTIONS

// The HTTP requests go here and the functions associated with the link are fired

app.post('/login', controller.login);
app.post('/signup', controller.createUser);
app.get('/todo', controller.verifyToken, controller.verification);
app.post('/todo', controller.createTask);

// SERVER IS LISTENING AFTER START UP
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
