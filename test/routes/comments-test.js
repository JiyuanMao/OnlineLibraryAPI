let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
let _ = require('lodash' );

describe('Comments', function () {
    // TODO
    describe('GET /comments/:bookname', () => {
        it('should return the comments you search for', function (done) {
            chai.request(server)
                .get('/comments/Foundations for Analytics with Python')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(2);
                    let result = _.map(res.body, (comment) => {
                        return {
                            text: comment.text,
                            username: comment.username,
                            bookname: comment.bookname,
                        }
                    });
                    expect(result).to.include({
                        text: "it is very useful ",
                        bookname: "Foundations for Analytics with Python",
                        username: "john"
                    });

                    done();
                });
        });
        it('should return a 404 and a message for invalid book name', function (done) {
            chai.request(server)
                .get('/comments/abc')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message', 'Comment NOT Found!');
                    done();
                });
        });
    });
    describe('POST /comments', function () {
        it('should return confirmation message and update datastore', function (done) {
            let comment = {
                text: "it needs improvements",
                bookname: "Foundations for Analytics with Python",
                username: "justin"
            };
            chai.request(server)
                .post('/comments')
                .send(comment)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Comment Successfully Added!');
                    done();
                });
        });
        after(function (done) {
            chai.request(server)
                .get('/comments/Foundations for Analytics with Python')
                .end(function (err, res) {
                    let result = _.map(res.body, (comment) => {
                        return {
                            text: comment.text,
                            username: comment.username,
                            bookname: comment.bookname,
                        };
                    });
                    expect(result).to.include({
                        text: "it needs improvements",
                        bookname: "Foundations for Analytics with Python",
                        username: "justin"
                    });
                    done();
                });
        });
    });
    describe.only('PUT /comments/:id', () => {
        it('should return the updated message', function (done) {
            let comment = {
                text: "it needs improvements",
                bookname: "Digital Portrait Photography For Dummies",
                username: "justin"
            };
            chai.request(server)
                .put('/books/5bd09713d78fca279c9a7981')
                .send(comment)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
})