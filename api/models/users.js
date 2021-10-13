const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('User', userSchema);