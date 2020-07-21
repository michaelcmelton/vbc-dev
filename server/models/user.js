const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  createdAt:{
  type: Date,
  required: true 
  }
})

module.exports = mongoose.model('Users', UsersSchema);
