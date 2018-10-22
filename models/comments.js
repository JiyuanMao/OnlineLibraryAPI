let mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
        text: String,
        username:String,
        bookname: String,
    },
    { collection: 'commentsdb' });

module.exports = mongoose.model('Comment', CommentSchema);