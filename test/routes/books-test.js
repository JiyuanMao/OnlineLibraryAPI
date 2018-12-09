let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let Book=require('../../models/books');

chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));

describe('Books', function (){
    // TODO
    describe('Get/', function (){
        describe('GET /books',  () => {
            it('should return all the books in an array', function(done) {
                chai.request(server)
                    .get('/books')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(4);
                        let result = _.map(res.body, (book) => {
                            return {
                                name: book.name,
                                author:book.author,
                                publisher:book.publisher,
                                category:book.category,
                            }
                        });
                        expect(result).to.include( { name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                            author: 'Doug Sahlin',
                            publisher:'John Wiley & Sons',
                            category:'Computing Science',
                        } );
                        expect(result).to.include( { name: 'Digital Portrait Photography For Dummies',
                            author: 'Doug Sahlin',
                            publisher: 'John Wiley & Sons',
                            category:'Photography',
                        } );
                        expect(result).to.include( { name: 'Foundations for Analytics with Python',
                            author: 'Brownley, Clinton W.',
                            publisher: 'Southeast University Press',
                            category:'Computing Science',
                        } );
                        expect(result).to.include( { name: "Multi-objective Decision Analysis",
                            author: "Brownley, Clinton W.",
                            publisher: "Business Expert Pr",
                            category: "software engineering",
                        } );

                        done();
                    });
            });
        });

        describe('GET /books/bname/:name',  () => {
            describe('when name is correct', function(done) {
                it('should return one book according to name you search for', function (done) {
                    chai.request(server)
                        .get('/books/bname/Building Web Sites All-in-One Desk Reference For Dummies')
                        .end(function (err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).to.equal(1);
                            let result = _.map(res.body, (book) => {
                                return {
                                    name: book.name,
                                    author: book.author,
                                    publisher: book.publisher,
                                    category: book.category,
                                }
                            });
                            expect(result).to.include({
                                name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                                author: 'Doug Sahlin',
                                publisher: 'John Wiley & Sons',
                                category: 'Computing Science'
                            });

                            done();
                        });
                });
            });
            describe('when name is wrong', function(done) {
                it('should return a 404 and a message for wrong book name', function (done) {
                    chai.request(server)
                        .get('/books/bname/abc')
                        .end(function (err, res) {
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message', 'Book NOT Found!');
                            done();
                        });
                });
            });
        });

        describe('GET /books/bpublisher/:publisher',  () => {
            describe('when publisher is correct', function(done) {
                it('should return books according to publisher you search for', function (done) {
                    chai.request(server)
                        .get('/books/bpublisher/John Wiley & Sons')
                        .end(function (err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).to.equal(2);
                            let result = _.map(res.body, (book) => {
                                return {
                                    name: book.name,
                                    author: book.author,
                                    publisher: book.publisher,
                                    category: book.category,
                                }
                            });
                            expect(result).to.include({
                                name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                                author: 'Doug Sahlin',
                                publisher: 'John Wiley & Sons',
                                category: 'Computing Science'
                            });
                            expect(result).to.include( { name: 'Digital Portrait Photography For Dummies',
                                author: 'Doug Sahlin',
                                publisher: 'John Wiley & Sons',
                                category:'Photography',
                            } );
                            done();
                        });
                });
            });
            describe('when publisher is wrong', function(done) {
                it('should return a 404 and a message for invalid book publisher', function (done) {
                    chai.request(server)
                        .get('/books/bpublisher/abc')
                        .end(function (err, res) {
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message', 'Publisher NOT Found!');
                            done();
                        });
                });
            });
        });

        describe('GET /books/bcategory/:category',  () => {
            describe('when category is correct', function(done) {
                it('should return books according to category you search for', function (done) {
                    chai.request(server)
                        .get('/books/bcategory/Computing Science')
                        .end(function (err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).to.equal(2);
                            let result = _.map(res.body, (book) => {
                                return {
                                    name: book.name,
                                    author: book.author,
                                    publisher: book.publisher,
                                    category: book.category,
                                }
                            });
                            expect(result).to.include({
                                name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                                author: 'Doug Sahlin',
                                publisher: 'John Wiley & Sons',
                                category: 'Computing Science'
                            });
                            expect(result).to.include( { name: 'Foundations for Analytics with Python',
                                author: 'Brownley, Clinton W.',
                                publisher: 'Southeast University Press',
                                category:'Computing Science',
                            } );
                            done();
                        });
                });
            });
            describe('when category is wrong', function(done) {
                it('should return a 404 and a message for invalid book category', function (done) {
                    chai.request(server)
                        .get('/books/bcategory/abc')
                        .end(function (err, res) {
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message', 'Category NOT Found!');
                            done();
                        });
                });
            });
        });

        describe('GET /books/bauthor/:author',  () => {
            describe('when author is correct', function(done) {
                it('should return books according to author you search for', function (done) {
                    chai.request(server)
                        .get('/books/bauthor/Doug Sahlin')
                        .end(function (err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).to.equal(2);
                            let result = _.map(res.body, (book) => {
                                return {
                                    name: book.name,
                                    author: book.author,
                                    publisher: book.publisher,
                                    category: book.category,
                                }
                            });
                            expect(result).to.include({
                                name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                                author: 'Doug Sahlin',
                                publisher: 'John Wiley & Sons',
                                category: 'Computing Science'
                            });
                            expect(result).to.include( { name: 'Digital Portrait Photography For Dummies',
                                author: 'Doug Sahlin',
                                publisher: 'John Wiley & Sons',
                                category:'Photography',
                            } );
                            done();
                        });
                });
            });
            describe('when author is wrong', function(done) {
                it('should return a 404 and a message for invalid book author', function (done) {
                    chai.request(server)
                        .get('/books/bauthor/abc')
                        .end(function (err, res) {
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message', 'Author NOT Found!');
                            done();
                        });
                });
            });
        });

        describe('GET /books/searchname/:name',  () => {
            describe('when fuzzy search name is correct', function(done) {
                it('should return one or more books you fuzzy search for', function (done) {
                    chai.request(server)
                        .get('/books/searchname/Dummies')
                        .end(function (err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).to.equal(2);
                            let result = _.map(res.body, (book) => {
                                return {
                                    name: book.name,
                                    author: book.author,
                                    publisher: book.publisher,
                                    category: book.category,
                                }
                            });
                            expect(result).to.include({
                                name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                                author: 'Doug Sahlin',
                                publisher: 'John Wiley & Sons',
                                category: 'Computing Science',
                            });
                            expect(result).to.include( { name: 'Digital Portrait Photography For Dummies',
                                author: 'Doug Sahlin',
                                publisher: 'John Wiley & Sons',
                                category:'Photography',
                            } );
                            done();
                        });
                });
            });
            describe('when fuzzy search name is wrong', function(done) {
                it('should return a 404 and a message for invalid keyword', function (done) {
                    chai.request(server)
                        .get('/books/searchname/abc')
                        .end(function (err, res) {
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message', 'Book NOT Found!');
                            done();
                        });
                });
            });
        });

        describe('GET /books/searchauthor/:author',  () => {
            describe('when fuzzy search author is correct', function(done) {
                it('should return one or more books by author you fuzzy search for', function (done) {
                    chai.request(server)
                        .get('/books/searchauthor/Doug')
                        .end(function (err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).to.equal(2);
                            let result = _.map(res.body, (book) => {
                                return {
                                    name: book.name,
                                    author: book.author,
                                    publisher: book.publisher,
                                    category: book.category,
                                }
                            });
                            expect(result).to.include({
                                name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                                author: 'Doug Sahlin',
                                publisher: 'John Wiley & Sons',
                                category: 'Computing Science',
                            });
                            expect(result).to.include( { name: 'Digital Portrait Photography For Dummies',
                                author: 'Doug Sahlin',
                                publisher: 'John Wiley & Sons',
                                category:'Photography',
                            } );

                            done();
                        });
                });
            });
            describe('when fuzzy search author is wrong', function(done) {
                it('should return a 404 and a message for invalid keyword', function (done) {
                    chai.request(server)
                        .get('/books/searchauthor/abc')
                        .end(function (err, res) {
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message', 'Book NOT Found!');
                            done();
                        });
                });
            });
        });

        describe('GET /books/searchpublisher/:publisher',  () => {
            describe('when fuzzy search publisher is correct', function(done) {
                it('should return one or more books by publisher you fuzzy search for', function (done) {
                    chai.request(server)
                        .get('/books/searchpublisher/john')
                        .end(function (err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).to.equal(2);
                            let result = _.map(res.body, (book) => {
                                return {
                                    name: book.name,
                                    author: book.author,
                                    publisher: book.publisher,
                                    category: book.category,
                                }
                            });
                            expect(result).to.include({
                                name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                                author: 'Doug Sahlin',
                                publisher: 'John Wiley & Sons',
                                category: 'Computing Science'
                            });
                            expect(result).to.include( { name: 'Digital Portrait Photography For Dummies',
                                author: 'Doug Sahlin',
                                publisher: 'John Wiley & Sons',
                                category:'Photography',
                            } );

                            done();
                        });
                });
            });
            describe('when fuzzy search publisher is wrong', function(done) {
                it('should return a 404 and a message for invalid publisher keyword', function (done) {
                    chai.request(server)
                        .get('/books/searchpublisher/abc')
                        .end(function (err, res) {
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message', 'Book NOT Found!');
                            done();
                        });
                });
            });
        });

        describe('GET /books/searchcategory/:category',  () => {
            describe('when fuzzy search category is correct', function(done) {
                it('should return one or more books by category you fuzzy search for', function (done) {
                    chai.request(server)
                        .get('/books/searchcategory/computing')
                        .end(function (err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).to.equal(2);
                            let result = _.map(res.body, (book) => {
                                return {
                                    name: book.name,
                                    author: book.author,
                                    publisher: book.publisher,
                                    category: book.category,
                                }
                            });
                            expect(result).to.include({
                                name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                                author: 'Doug Sahlin',
                                publisher: 'John Wiley & Sons',
                                category: 'Computing Science',
                            });
                            expect(result).to.include( { name: 'Foundations for Analytics with Python',
                                author: 'Brownley, Clinton W.',
                                publisher: 'Southeast University Press',
                                category:'Computing Science',
                            } );
                            done();
                        });
                });
            });
            describe('when fuzzy search category is wrong', function(done) {
                it('should return a 404 and a message for invalid category keyword', function (done) {
                    chai.request(server)
                        .get('/books/searchcategory/abc')
                        .end(function (err, res) {
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message', 'Book NOT Found!');
                            done();
                        });
                });
            });
        });
    });
    describe('Post/', function (){
        describe('POST /books', function () {
            it('should return confirmation message and update datastore', function(done) {
                let book = {
                    name: 'Street Photography Now' ,
                    author: " Sophie Howarth,Stephen McL",
                    publisher: "Thames & Hudson",
                    category:"Photography",
                };
                chai.request(server)
                    .post('/books')
                    .send(book)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('Book Successfully Added!' );
                        done();
                    });
            });
            after(function  (done) {
                chai.request(server)
                    .get('/books')
                    .end(function(err, res) {
                        let result = _.map(res.body, (book) => {
                            return { name: book.name,
                                author:book.author,
                                publisher:book.publisher,
                                category:book.category,
                            };
                        }  );
                        expect(result).to.include( { name: 'Street Photography Now' ,
                            author: " Sophie Howarth,Stephen McL",
                            publisher: "Thames & Hudson",
                            category:"Photography",
                        } );
                        done();
                    });

            });
        });

    });
    describe('Put/', function () {
        describe('PUT /books/:id', () => {
            describe('when id is correct', function (done) {
                it('should return the updated message', function (done) {
                    let book = {
                        name: 'Street Photography Now',
                        author: " Sophie Howarth,Stephen McL",
                        publisher: "Thames & Hudson",
                        category: 'Computing Science&Software Engineering', likes: 0
                    };
                    chai.request(server)
                        .get('/books')
                        .end(function (err, res) {
                            const bookId = res.body[4]._id;
                            chai.request(server)
                                .put('/books/'+bookId)
                                .send(book)
                                .end(function (err, res) {
                                    expect(res).to.have.status(200);
                                    expect(res.body).to.have.property('message').equal('Book Successfully UpDated!');
                                    done();
                                });
                        });

                });
                after(function (done) {
                    chai.request(server)
                        .get('/books')
                        .end(function (err, res) {
                            let result = _.map(res.body, (book) => {
                                return {
                                    name: book.name,
                                    author: book.author,
                                    publisher: book.publisher,
                                    category: book.category,
                                };
                            });
                            expect(result).to.include({
                                name: 'Street Photography Now',
                                author: " Sophie Howarth,Stephen McL",
                                publisher: "Thames & Hudson",
                                category: "Computing Science&Software Engineering",
                            });
                            done();
                        });
                });
            });
            describe('when id is wrong', function (done) {
                it('should return a 404 and a message for invalid book id', function (done) {
                    chai.request(server)
                        .put('/books/1100001')
                        .end(function (err, res) {
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message', 'Book NOT Found!');
                            done();
                        });
                });
            });
        });
    });

    describe('Delete/', function () {
        describe('DELETE /books/:id', () => {
            describe('when id is correct', function (done) {
                it('should return delelte message and update datastore', function (done) {
                    chai.request(server)
                        .get('/books')
                        .end(function (err, res) {
                            const bookId = res.body[4]._id;
                            chai.request(server)
                                .delete('/books/'+ bookId)
                                .end(function (err, res) {
                                    expect(res).to.have.status(200);
                                    expect(res.body).to.have.property('message').equal('Book Successfully Deleted!');
                                    done();
                                });
                        });
                    //.delete('/books/5be0cb26e28cf53ff8b78beb')
                    //.end(function (err, res) {
                    // expect(res).to.have.status(200);
                    //expect(res.body).to.have.property('message').equal('Book Successfully Deleted!');
                    //done();
                });

                after(function (done) {
                    chai.request(server)
                        .get('/books')
                        .end(function(err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).to.equal(4);
                            let result = _.map(res.body, (book) => {
                                return {
                                    name: book.name,
                                    author:book.author,
                                    publisher:book.publisher,
                                    category:book.category,
                                }
                            });
                            expect(result).to.include( { name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                                author: 'Doug Sahlin',
                                publisher:'John Wiley & Sons',
                                category:'Computing Science',
                            } );
                            expect(result).to.include( { name: 'Digital Portrait Photography For Dummies',
                                author: 'Doug Sahlin',
                                publisher: 'John Wiley & Sons',
                                category:'Photography',
                            } );
                            expect(result).to.include( { name: 'Foundations for Analytics with Python',
                                author: 'Brownley, Clinton W.',
                                publisher: 'Southeast University Press',
                                category:'Computing Science',
                            } );
                            expect(result).to.include( { name: "Multi-objective Decision Analysis",
                                author: "Brownley, Clinton W.",
                                publisher: "Business Expert Pr",
                                category: "software engineering",
                            } );

                            done();
                        });
                });
            });
            describe('when id is wrong', function (done) {
                it('should return a 404 and a message for invalid book id', function (done) {
                    chai.request(server)
                        .delete('/books/1100001')
                        .end(function (err, res) {
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message', 'Book NOT DELETED!');
                            done();
                        });
                });
            });
        });
    });



});
