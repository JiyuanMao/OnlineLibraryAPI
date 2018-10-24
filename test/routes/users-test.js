let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
let _ = require('lodash' );

describe('Users', function () {
    describe('POST /users', function () {
        it('should return confirmation message and update datastore', function(done) {
            let user = {
                username: 'justin' ,
                password: "123456",
            };
            chai.request(server)
                .post('/users')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('User Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/users')
                .end(function(err, res) {
                    let result = _.map(res.body, (user) => {
                        return { username: user.username,
                            password:user.password,
                        };
                    }  );
                    expect(result).to.include( { username: 'justin' ,
                        password: "123456",
                    } );
                    done();
                });
        });
    });
    describe('PUT /users/:id', () => {
        it('should return the updated message', function (done) {
            let user = {
                username: "justin",
                passward: "654321"
            };
            chai.request(server)
                .put('/users/5bd0b10e0ab43a55c8d37787')
                .send(user)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
    describe.only('DELETE /users/:id', () => {
        it('should return delelte message and update datastore', function(done) {
            chai.request(server)
                .delete('/users/5bd0dab9e1040f60f04d57b8')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('User Successfully Deleted!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/users')
                .end(function(err, res) {
                    let result = _.map(res.body, (user) => {
                        return {
                            username: user.username,
                            password: user.password, };
                    }  );
                    expect(result).to.include( {  username: "zoe",
                        password: "123456"
                    } );
                    expect(result).to.include( {  username: "john",
                        password: "123456"
                    } );
                    done();
                });
        });
        it('should return a 404 and a message for invalid user id', function(done) {
            chai.request(server)
                .delete('/users/1100001')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message','User NOT DELETED!' ) ;
                    done();
                });
        });
    });
})