let users = require('../models/users');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var User = require('../models/users');


var mongodbUri ='mongodb://booksdb:1997914mjy@ds125683.mlab.com:25683/onlinebooksdb';
//mongoose.connect('mongodb://localhost:27017/booksdb');
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
    User.find(function(err, users) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(users,null,5));
    });
}
router.addUser = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var user = new User();

    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err) {
        if (err)
            res.json({ message: 'User NOT Added!', errmsg : err } );
        else
            res.json({ message: 'User Successfully Added!', data: user });
    });
}

router.deleteUser = (req, res) => {

    User.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.status(404);  //new
            res.json({message: 'User NOT DELETED!', errmsg: err});
        }else{
            res.json({ message: 'User Successfully Deleted!'});
        }
    });
}

router.editUser = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    var updatestr = {
        "username": req.body.username,
        "password": req.body.password,
    }
    User.findByIdAndUpdate(req.params.id, updatestr, function (err, user) {
        if (err)
            res.json({message: 'User NOT Found!'});
        else {

            res.json({message: 'User Successfully UpDated!'});
        }
    });

}

module.exports = router;
