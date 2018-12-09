let users = require('../models/users');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var User = require('../models/users');

var mongodbUri = 'mongodb://jiyuan:qwert12345@ds151523.mlab.com:51523/onlinelibrary';
mongoose.connect(mongodbUri);
let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    User.find(function (err, users) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(users, null, 5));
    });
}

router.loginUser = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    User.find({"username": req.body.username, "password": req.body.password}, function (err, book) {
        if (book.length <= 0) {
            // return a suitable error message
            res.status(404);
            res.json({message: 'User NOT Found!'});
        } else
        // return the book
            res.send(JSON.stringify(book, null, 5));
    });

}
router.addUser = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var user = new User();

    user.username = req.body.username;
    user.password = req.body.password;
    user.usertype = req.body.usertype;

    user.save(function (err) {
        if (err)
            res.json({message: 'User NOT Added!', errmsg: err});
        else
            res.json({message: 'User Successfully Added!', data: user});
    });
}

router.deleteUser = (req, res) => {

    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.status(404);  //new
            res.json({message: 'User NOT DELETED!', errmsg: err});
        } else {
            res.json({message: 'User Successfully Deleted!'});
        }
    });
}

router.editUser = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    /*var updatestr = {
        "username": req.body.username,
        "password": req.body.password,
    }*/
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.status(404);
            res.json({message: 'User NOT Found!'});
        } else {
            user.username = req.body.username;
            user.password = req.body.password;
            user.usertype = req.body.usertype;
            user.save(function () {
                if (err)
                    res.json({message: 'User NOT UpDated!', errmsg: err});
                else
                    res.json({message: 'User Successfully UpDated!', data: user});
            });
        }
    });

}

module.exports = router;

