var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const books = require("./routes/books");
const comments = require("./routes/comments");
const users = require("./routes/users");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/users', users.findAll);
app.get('/books', books.findAll);
app.get('/books/:id', books.findOne);
app.get('/books/:publisher', books.findByPublisher);
app.get('/books/:category', books.findByCategory);
app.get('/books/:author', books.findByAuthor);
app.get('/books/searchname/:name', books.searchByName);
app.get('/books/searchauthor/:author', books.searchByAuthor);
app.get('/books/searchpublisher/:publisher', books.searchByPublisher);
app.get('/books/searchcategory/:category', books.searchByCategory);
app.get('/comments/:bookname', comments.findOne);
app.get('/comments/search/:bookname', comments.searchByName);


app.post('/books',books.addBook);
app.post('/comments',comments.addComment);
app.post('/users',users.addUser);

app.put('/books/:id', books.editBook);
app.put('/books/:id/like', books.incrementLikes);
app.put('/comments/:id', comments.editComment);
app.put('/users/:id', users.editUser);

app.delete('/books/:id', books.deleteBook);
app.delete('/comments/:id', comments.deleteComment);
app.delete('/users/:id', users.deleteUser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}

module.exports = app;
