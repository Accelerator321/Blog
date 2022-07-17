const mongoose = require('mongoose');
const signUpSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    avatar: String,
});

const signUp = mongoose.model('signUp', signUpSchema);

module.exports = signUp;