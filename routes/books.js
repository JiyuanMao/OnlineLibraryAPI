let books = require('../models/books');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Book = require('../models/books');


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

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    Book.find(function(err, books) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(books,null,5));
    });
}



router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    Book.find({ "_id" : req.params.id },function(err, book) {
        if (err){
			res.status(404);
            res.json({ message: 'Book NOT Found!', errmsg : err } )
        }else{
            res.send(JSON.stringify(book,null,5));
		}
    });
}

router.addBook = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var book = new Book();

    book.name = req.body.name;
    book.author = req.body.author;
    book.publisher = req.body.publisher;
    book.category = req.body.category;

    book.save(function(err) {
        if (err)
            res.json({ message: 'Book NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Book Successfully Added!', data: book });
    });
}

router.incrementLikes = (req, res) => {

    Book.findById(req.params.id, function(err,book) {
        if (err) {
            res.status(404);  //new
            res.json({message: 'Book NOT Found!', errmsg: err})
        }else {
            book.likes += 1;
            book.save(function (err) {
                if (err) {
                    res.json({message: 'Book NOT Successfully Liked!', errmsg: err})
                }else {
                    res.json({message: 'Book Successfully Liked!', data: book});
                }
            });
        }
    });
}

router.deleteBook = (req, res) => {

    Book.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.status(404);  //new
            res.json({message: 'Book NOT DELETED!', errmsg: err});
        }else{
            res.json({ message: 'Book Successfully Deleted!'});
        }
    });
}

router.findByAuthor = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Book.find({ "author" : req.params.author },function(err, book) {
        if (err) {
            // return a suitable error message
            res.json({message: 'Book NOT Found!', errmsg: err})
        }else{
            // return the book
            res.send(JSON.stringify(book,null,5));
        }
    });

}



router.findByPublisher = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Book.find({ "publisher" : req.params.publisher },function(err, book) {
        if (err)
        // return a suitable error message
            res.json({ message: 'Book NOT Found!', errmsg : err } );
        else
        // return the book
            res.send(JSON.stringify(book,null,5));
    });

}

router.findByCategory = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Book.find({ "category" : req.params.category },function(err, book) {
        if (err)
        // return a suitable error message
            res.json({ message: 'Book NOT Found!', errmsg : err } );
        else
        // return the book
            res.send(JSON.stringify(book,null,5));
    });

}

router.editBook = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

        var updatestr = {
            "name": req.body.name,
            "author": req.body.author,
            "publisher": req.body.publisher,
            "category": req.body.category,
            "likes": req.body.likes
        }
        Book.findByIdAndUpdate(req.params.id, updatestr, function (err, book) {
            if (err){
				res.status(404);
                res.json({message: 'Book NOT Successfully edit!'});
            }else {

                res.json({message: 'Book Successfully UpDated!'});
            }
        });

}

router.searchByName = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var keyword = {'name': {$regex:req.params.name,$options:'i'}};
    Book.find(keyword, function (err, book) {
        if (book.length <= 0){
			res.status(404);
            res.json({message: 'Book NOT Found!'})
        }else {

            res.send(JSON.stringify(book,null,5));
        }
    });
}

router.searchByAuthor = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var keyword = {'author': {$regex:req.params.author,$options:'i'}};
    Book.find(keyword, function (err, book) {
        if (err)
            res.json({message: 'Book NOT Found!'});
        else {

            res.send(JSON.stringify(book,null,5));
        }
    });
}

router.searchByPublisher = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var keyword = {'publisher': {$regex:req.params.publisher,$options:'i'}};
    Book.find(keyword, function (err, book) {
        if (err)
            res.json({message: 'Book NOT Found!'});
        else {

            res.send(JSON.stringify(book,null,5));
        }
    });
}

router.searchByCategory = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var keyword = {'category': {$regex:req.params.category,$options:'i'}};
    Book.find(keyword, function (err, book) {
        if (err)
            res.json({message: 'Book NOT Found!'});
        else {

            res.send(JSON.stringify(book,null,5));
        }
    });
}
module.exports = router;