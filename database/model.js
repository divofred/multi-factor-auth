const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
  //Creating the schema
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Provide an email address'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
  },
});
//Checking if the model has been created
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
