const mongoose = require('mongoose');
const User = require('../models/User.model');
const Task = require('../models/Task.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { inDatabase } = require('./controllerFuncs');

// LOGIN FUNCTION

// The function below takes in the used state from the request and uses it to find any matching users in the database
// Mongoose is used to serach for any users in the DB
const login = async (req, res) => {
  let { username, password } = req.body.usedState;
  let user = { username, password };

  User.find({ userName: username }, function (err, users) {
    if (inDatabase(users, username) == false) {
      console.log(`No users found`);
      res.json({ message: 'could not find any users' });
    } else {
      console.log(`Users found: ${users}`);
      jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({ message: token });
      });
    }
  });
};

// VERIFICATION FUNCTION

// The function below is used to verify the JSON web token using the priate key
// If the user is verified, the list data for that person is sent as a response to the frontend along with permission to show the resources

const verification = (req, res) => {
  let data = req.body;
  let listData = '';
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json({ message: 'Error. Forbbiden' });
    } else {
      Task.find({ userName: authData.user.username }, (err, tasks) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ message: ['Allow', tasks] });
        }
      });
    }
  });
};

// CREATINNG A NEW USER

// The function below simply creates a new user and adds them into the database
// A JSON web token is then created and sent back as a response to the frontend

const createUser = (req, res) => {
  let { username, password } = req.body.usedState;
  let user = { username, password };
  let userModel = new User({
    userName: username,
    password: password,
  });
  userModel.save((err, data) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: 'Some error occured while creating user' });
    } else {
      console.log(data);
    }
  });
  jwt.sign({ user }, 'secretkey', (err, token) => {
    res.json({ message: token });
  });
};

// CREATING AND UPDATIGN THE NEW USER TASKLIST

// This function below is used to verifiy the JSON web token and extract its resulting contents
// Once the token is verified, a search for tht particular user is made in the database.
//If nothing i the DB is found, then a new user in the tasks collection will be made

const createTask = (req, res) => {
  let data = req.body;
  let authName = '';
  jwt.verify(data.jwtoken, 'secretkey', (err, authData) => {
    if (err) {
      console.log(err);
    } else {
      console.log(authData.user.username);
      authName = authData.user.username;
    }
  });

  Task.findOneAndUpdate(
    { userName: authName },
    { taskList: data.todoList },
    (err, findData) => {
      if (err || findData == null) {
        console.log(`There is nothing to display here`);

        let taskModel = new Task({
          userName: authName,
          taskList: data.todoList,
        });

        taskModel.save((err, savedata) => {
          if (err) {
            console.log(err);
            res.json({ message: `Some error occured while creating the list` });
          } else {
            console.log(savedata);
            res.json({ message: `List creation successful` });
          }
        });
      } else {
        console.log(data);
      }
    }
  );
};

//GETTING THE WEB TOKEN

// The function below extracts the token from the Header of the request made by the frontend
// This is used to authorize use of resources from the token.
function verifyToken(req, res, next) {
  //get the auth header value
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== undefined && typeof bearerHeader == 'string') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).json({ message: `forbidden. ${bearerHeader}` });
  }
}

module.exports = { createUser, login, verification, verifyToken, createTask };
