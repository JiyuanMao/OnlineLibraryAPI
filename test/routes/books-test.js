let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let datastore = require('../../models/books');

chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));

describe('Books', function (){
    /*beforeEach(function(){
        while(datastore.length > 0) {
            datastore.pop();
        }
        datastore.push(
            {   name: 'INTRODUCTION TO QUANTUM COMPUTERS',
                author: 'Gary D. Doolen，Ronnie Mainieri，Vldimir I. Tsifrinovich，Gennady P. Berman',
                publisher:'Southeast University Press',
                category:'Computing Science',
                upvotes:45}
        );
        datastore.push(
            {   name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                author: 'Doug Sahlin',
                publisher:'John Wiley & Sons',
                category:'Computing Science',
                upvotes:0}
        );
        datastore.push(
            {   name: 'Digital Portrait Photography For Dummies',
                author: 'Doug Sahlin',
                publisher: 'John Wiley & Sons',
                category:'Photography' ,
                upvotes:0}
        );
        datastore.push(
            {   name: 'Foundations for Analytics with Python',
                author: 'Brownley, Clinton W.',
                publisher: 'Southeast University Press',
                category:'Computing Science',
                upvotes:3}
        );
        datastore.push(
            {   name: 'Multi-objective Decision Analysis' ,
                author: "Brownley, Clinton W.",
                publisher: "Business Expert Pr",
                category:"software engineering",
                upvotes:16}
        );
    });*/
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
                    expect(result).to.include( { name: 'INTRODUCTION TO QUANTUM COMPUTERS',
                        author: 'Gary D. Doolen，Ronnie Mainieri，Vldimir I. Tsifrinovich，Gennady P. Berman',
                        publisher:'Southeast University Press',
                        category:'Computing Science',
                    } );
                    expect(result).to.include( { name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                        author: 'Doug Sahlin',
                        publisher:'John Wiley & Sons',
                        category:'Computing Science',
                    } );
                    expect(result).to.include( { name: 'Digital Portrait Photography For Dummies',
                        author: 'Doug Sahlin',
                        publisher: 'John Wiley & Sons',
                        category:'Photography' ,
                    } );
                    expect(result).to.include( { name: 'Foundations for Analytics with Python',
                        author: 'Brownley, Clinton W.',
                        publisher: 'Southeast University Press',
                        category:'Computing Science',
                    } );
                    /*expect(result).to.include( { name: 'Multi-objective Decision Analysis' ,
                        author: "Brownley, Clinton W.",
                        publisher: "Business Expert Pr",
                        category:"software engineering",
                    } );*/
                    /*expect(result).to.include( { name: 'Street Photography Now' ,
                        author: " Sophie Howarth,Stephen McL",
                        publisher: "Thames & Hudson",
                        category:"Photography",
                    } );*/
                    done();
                });
        });
    });
	describe('GET /books/:id',  () => {
        it('should return one book you search for', function(done) {
            chai.request(server)
                .get('/books/5bcf6c50e2df0f50e01d2391')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (book) => {
                        return {
                            name: book.name,
                            author:book.author,
                            publisher:book.publisher,
                            category:book.category,
                        }
                    });
                    expect(result).to.include( { name: 'INTRODUCTION TO QUANTUM COMPUTERS',
                        author: 'Gary D. Doolen，Ronnie Mainieri，Vldimir I. Tsifrinovich，Gennady P. Berman',
                        publisher:'Southeast University Press',
                        category:'Computing Science',
                    } );
                   
                    done();
                });
        });
		it('should return a 404 and a message for invalid book id', function(done) {
            chai.request(server)
                .get('/books/1100001')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message','Book NOT Found!' ) ;
                    done();
                });
        }); 
    });
    describe('GET /books/searchname/:name',  () => {
        it('should return one or more books you fuzzy search for', function(done) {
            chai.request(server)
                .get('/books/searchname/analy')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (book) => {
                        return {
                            name: book.name,
                            author:book.author,
                            publisher:book.publisher,
                            category:book.category,
                        }
                    });
                    expect(result).to.include( { name: 'Foundations for Analytics with Python',
                        author: 'Brownley, Clinton W.',
                        publisher: 'Southeast University Press',
                        category:'Computing Science',
                    } );
                   
                    done();
                });
        });
		it('should return a 404 and a message for invalid keyword', function(done) {
            chai.request(server)
                .get('/books/searchname/abc')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message','Book NOT Found!' ) ;
                    done();
                });
        }); 
    });
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
    describe('PUT /books/:id/vote', () => {
        it('should return a message and the book upvoted by 1', function(done) {
            chai.request(server)
                .put('/books/5bc79fbf6e54d40398216463/vote')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let book = res.body.data ;
                    expect(book).to.include( { name: 'Foundations for Analytics with Python',
                        author: 'Brownley, Clinton W.',
                        publisher: 'Southeast University Press',
                        category:'Computing Science', upvotes: 10  } );
                    done();
                });
        });
        it('should return a 404 and a message for invalid book id', function(done) {
            chai.request(server)
                .put('/books/1100001/vote')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message','Book NOT Found!' ) ;
                    done();
                });
        });
    });
    describe('DELETE /books/:id', () => {
        it('should return delelte message and update datastore', function(done) {
            chai.request(server)
                .delete('/books/5bcd9f51c778f76ab49c36dd')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Book Successfully Deleted!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/books')
                .end(function(err, res) {
                    let result = _.map(res.body, (book) => {
                        return {
                            name: book.name,
                            author:book.author,
                            publisher:book.publisher,
                            category:book.category, };
                    }  );
                    /*expect(result).to.include( { name: 'INTRODUCTION TO QUANTUM COMPUTERS',
                        author: 'Gary D. Doolen，Ronnie Mainieri，Vldimir I. Tsifrinovich，Gennady P. Berman',
                        publisher:'Southeast University Press',
                        category:'Computing Science',

                    } );*/
                    expect(result).to.include( { name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                        author: 'Doug Sahlin',
                        publisher:'John Wiley & Sons',
                        category:'Computing Science',
                    } );
                    expect(result).to.include( { name: 'Digital Portrait Photography For Dummies',
                        author: 'Doug Sahlin',
                        publisher: 'John Wiley & Sons',
                        category:'Photography' ,
                    } );
                    expect(result).to.include( { name: 'Foundations for Analytics with Python',
                        author: 'Brownley, Clinton W.',
                        publisher: 'Southeast University Press',
                        category:'Computing Science',
                    } );
                    expect(result).to.include( { name: 'Multi-objective Decision Analysis' ,
                        author: "Brownley, Clinton W.",
                        publisher: "Business Expert Pr",
                        category:"software engineering",
                    } );
                    expect(result).to.include( { name: 'Street Photography Now' ,
                        author: " Sophie Howarth,Stephen McL",
                        publisher: "Thames & Hudson",
                        category:"Photography",
                    } );
                    done();
                });
        });
        it('should return a 404 and a message for invalid book id', function(done) {
            chai.request(server)
                .delete('/books/1100001')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message','Book NOT DELETED!' ) ;
                    done();
                });
        });
    });
});