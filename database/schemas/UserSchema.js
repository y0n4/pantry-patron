const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hash: String,
  grocery_lists: [{
    type: Schema.Types.ObjectId,
    ref: 'GroceryLists',
  }],
  last_login: Date,
  failed_login_attempts: Number,
});

module.exports = mongoose.model('Users', UserSchema);
