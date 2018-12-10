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
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (comment) => {
                        return {
                            text: comment.text,
                            username: comment.username,
                            bookname: comment.bookname,
                        };
                    });
                    expect(result).to.include({
                        text: 'I like it! ',
                        bookname: 'Foundations for Analytics with Python',
                        username: 'justin'
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
                text: 'it needs improvements',
                bookname: 'Multi-objective Decision Analysis',
                username: 'theo'
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
                .get('/comments/Multi-objective Decision Analysis')
                .end(function (err, res) {
                    let result = _.map(res.body, (comment) => {
                        return {
                            text: comment.text,
                            username: comment.username,
                            bookname: comment.bookname,
                        };
                    });
                    expect(result).to.include({
                        text: 'it needs improvements',
                        bookname: 'Multi-objective Decision Analysis',
                        username: 'theo'
                    });
                    done();
                });
        });
    });
    /*describe('PUT /comments/:id', () => {
        it('should return the updated message', function (done) {
            let comment = {
                text: "it is very useful",
				//bookname: "Foundations for Analytics with Python",
                bookname: "Digital Portrait Photography For Dummies",
                username: "john"
            };
            chai.request(server)
                .put('/comments/5bcc6cce83482d46acf0b4a8')
                .send(comment)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
		it('should return a 404 and a message for invalid comment id', function(done) {
            chai.request(server)
                .put('/comments/1100001')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message','Comment NOT Found!' ) ;
                    done();
                });
        });
    });*/
    describe('DELETE /comments/:id', () => {
        it('should return delelte message and update datastore', function (done) {
            chai.request(server)
                .get('/comments/Multi-objective Decision Analysis')
                .end(function (err, res) {
                    const commentId = res.body[0]._id;
                    chai.request(server)
                        .delete('/comments/'+ commentId)
                        .end(function (err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('message').equal('Comment Successfully Deleted!');
                            done();
                        });
                });
        });

        after(function (done) {
            chai.request(server)
                .get('/comments/Multi-objective Decision Analysis')
                .end(function (err, res) {
                    expect(res.body).to.be.empty;
                });
            done();
        });
        it('should return a 404 and a message for invalid comment id', function(done) {
            chai.request(server)
                .delete('/comments/1100001')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message','Comment NOT DELETED!' ) ;
                    done();
                });
        });
    });
});
