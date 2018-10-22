let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
        username: String,
        password: String,
    },
    { collection: 'usersdb' });

module.exports = mongoose.model('User', UserSchema);