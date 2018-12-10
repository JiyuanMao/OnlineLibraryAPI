let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let User=require('../../models/users');

chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));

describe('Users', function () {
    describe('GET /users',  () => {
            it('should return all the users in an array', function(done) {
                chai.request(server)
                    .get('/users')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(3);
                        let result = _.map(res.body, (user) => {
                            return {
                                username: user.username,
                                password: user.password,
                                usertype:user.usertype
                            }
                        });
                        expect(result).to.include( {  username: "theo",
                            password: "123456",
                            usertype:"user"
                        } );
                        expect(result).to.include( {  username: "justin",
                            password: "123456",
                            usertype:"user"
                        } );
                        expect(result).to.include( {  username: "zoe",
                            password: "123456",
                            usertype:"admin"
                        } );
                        done();
                    });
            });
        });
        describe('POST /users', function () {
            it('should return confirmation message and update datastore', function (done) {
                let user = {
                    username: "austin",
                    password: "123456",
                    usertype:"user"
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
            after(function (done) {
                chai.request(server)
                    .get('/users/')
                    .end(function (err, res) {
                        let result = _.map(res.body, (user) => {
                            return {
                                username: user.username,
                                password: user.password,
                                usertype:user.usertype
                            };
                        });
                        expect(result).to.include( {  username: "austin",
                            password: "123456",
                            usertype:"user"
                        } );
                        done();
                    });
            });
        });
    describe('POST /users/login', function () {
        it('should return success', function (done) {
            let user = {
                username: "justin",
                password: "123456",
                usertype: "user"
            };
            chai.request(server)
                .post('/users/login')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    //expect(res.body).to.have.property('message').equal('User Successfully Added!' );
                    done();
                });
        });
        after(function (done) {
            chai.request(server)
                .get('/users/')
                .end(function (err, res) {
                    let result = _.map(res.body, (user) => {
                        return {
                            username: user.username,
                            password: user.password,
                            usertype:user.usertype
                        };
                    });
                    expect(result).to.include( {  username: "justin",
                        password: "123456",
                        usertype:"user"
                    } );
                    done();
                });
        });
        it('should return 404', function (done) {
            let user = {
                username: "justin",
                password: "654321",
            };
            chai.request(server)
                .post('/users/login')
                .send(user)
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message', 'User NOT Found!');
                    done();
                });
        });
    });
    /*describe('POST /users/login', function () {
        it('should return confirmation message and update datastore', function (done) {
            let user = {
                username: "austin",
                password: "123456",
                usertype:"user"
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
        after(function (done) {
            chai.request(server)
                .get('/users/')
                .end(function (err, res) {
                    let result = _.map(res.body, (user) => {
                        return {
                            username: user.username,
                            password: user.password,
                            usertype:user.usertype
                        };
                    });
                    expect(result).to.include( {  username: "austin",
                        password: "123456",
                        usertype:"user"
                    } );
                    done();
                });
        });
    });*/

        /*describe('PUT /users/:id', () => {
            it('should return the updated message', function (done) {
                    let user = {
                        username: "austin",
                        password: "654321",
                        usertype:"user"
                    };
                    chai.request(server)
                        .get('/users')
                        .end(function (err, res) {
                            const userId = res.body[3]._id;
                            chai.request(server)
                                .put('/users/'+userId)
                                .send(user)
                                .end(function (err, res) {
                                    expect(res).to.have.status(200);
                                    expect(res.body).to.have.property('message').equal('User Successfully UpDated!');
                                    done();
                                });
                        });
                });
                after(function (done) {
                    chai.request(server)
                        .get('/users')
                        .end(function (err, res) {
                            let result = _.map(res.body, (user) => {
                                return {
                                    username: user.username,
                                    password: user.password,
                                    usertype:user.usertype
                                };
                            });
                            expect(result).to.include( {  username: "john",
                                password: "654321",
                                usertype:"user"
                            } );
                            done();
                        });
                });
            });
            describe('when id is wrong', function (done) {
                it('should return a 404 and a message for invalid user id', function (done) {
                    chai.request(server)
                        .put('/users/1100001')
                        .end(function (err, res) {
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message', 'User NOT Found!');
                            done();
                        });
                });
            });
        });*/

        describe('DELETE /users/:id', () => {
            it('should return delelte message and update datastore', function (done) {
                chai.request(server)
                    .get('/users')
                    .end(function (err, res) {
                        const userId = res.body[3]._id;
                        chai.request(server)
                            .delete('/users/' + userId)
                            .end(function (err, res) {
                                expect(res).to.have.status(200);
                                expect(res.body).to.have.property('message').equal('User Successfully Deleted!');
                                done();
                            });
                    });
            });

            after(function (done) {
                chai.request(server)
                    .get('/users')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(3);
                        let result = _.map(res.body, (user) => {
                            return {
                                username: user.username,
                                password: user.password,
                                usertype:user.usertype
                            }
                        });
                        expect(result).to.include({
                            username: "theo",
                            password: "123456",
                            usertype: "user"
                        });
                        expect(result).to.include({
                            username: "justin",
                            password: "123456",
                            usertype: "user"
                        });
                        expect(result).to.include({
                            username: "zoe",
                            password: "123456",
                            usertype: "admin"
                        });
                        done();
                    });
            });
                it('should return a 404 and a message for invalid user id', function (done) {
                    chai.request(server)
                        .delete('/user/1100001')
                        .end(function (err, res) {
                            expect(res).to.have.status(404);
                            //expect(res.body).to.have.property('message','User NOT DELETED!' ) ;
                            //expect(res.body).to.have.property('message').equal('User NOT DELETED!');
                            done();
                        });
                });
            });


})
