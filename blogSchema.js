
const mongoose = require('mongoose');
const blogPost = new mongoose.Schema({
    username: String,
    title: String,
    image: String,
    text: Array,
    heading:Array,
    pattern: String,
    getid: String

});

const blog = mongoose.model('blog', blogPost);

module.exports = blog;