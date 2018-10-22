let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));

describe('Books', function (){
    describe('GET /books',  () => {
        it('should return all the books in an array', function(done) {
            chai.request(server)
                .get('/books')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(5);
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
                    expect(result).to.include( {  name: 'Multi-objective Decision Analysis' ,
                        author: "Brownley, Clinton W.",
                        publisher: "Business Expert Pr",
                        category:"software engineering",
                    } );
                    done();
                });
        });
    });
});