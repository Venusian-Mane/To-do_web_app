const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// USER SCHEMA FOR AUTHORIZATION

// This schema is made solely for creatingusers for authorization

const UserSchema = new Schema({
  userName: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
});

UserSchema.post('save', function (doc, next) {
  console.log(`A new user was created & saved: ${doc}`);
  next();
});
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
