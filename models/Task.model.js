const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TASK SCHEMA FOR USERS

// Below is a schema created with mongoose to create new users and tasklist for those users

const TaskSchema = new Schema({
  userName: {
    type: String,
    default: null,
  },
  taskList: {
    type: Array,
    default: null,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
