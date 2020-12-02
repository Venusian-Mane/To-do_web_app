const mongoose = require('mongoose');
const uri =
  'mongodb+srv://mentor:9iNcCTKTAXTnRk3@manelisi-cluster1.a59wu.mongodb.net/manelisi-cluster1?retryWrites=true&w=majority';

// DATABASE CONNECTION

// The code below is simply used to establish a connection to my cluster and collections on MongoDB
mongoose.connect(uri);

mongoose.connection.on('error', function () {
  console.log('Connection to Mongo established.');
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});
mongoose.connection.once('open', function () {
  console.log('Successfully connected to the database');
});

require('./User.model');
