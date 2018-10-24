/*const books = [
    {   id: 1000000,
        name: 'INTRODUCTION TO QUANTUM COMPUTERS',
        author: 'Gary D. Doolen，Ronnie Mainieri，Vldimir I. Tsifrinovich，Gennady P. Berman',
        publisher:'Southeast University Press',
        category:'Computing Science',
        upvotes: 23

    },
    {   id: 1000001,
        name: 'Building Web Sites All-in-One Desk Reference For Dummies',
        author: 'Doug Sahlin',
        publisher:'John Wiley & Sons',
        category:'Computing Science',
        upvotes: 169
    },
    {
        id: 1000002,
        name: 'Digital Portrait Photography For Dummies',
        author: 'Doug Sahlin',
        publisher: 'John Wiley & Sons',
        category:'Photography',
        upvotes: 59
    },
    {
        id: 1000003,
        name: 'Foundations for Analytics with Python',
        author: 'Brownley, Clinton W.',
        publisher: 'Southeast University Press',
        category:'Computing Science',
        upvotes: 3827
    },
    {
        id:1000004,
        name: "Multi-objective Decision Analysis",
        author: "Brownley, Clinton W.",
        publisher: "Business Expert Pr",
        category: "software engineering",
        upvotes: 0
    }

];

module.exports = books;*/

let mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
        name: String,
        author: String,
        publisher: String,
        category: String,
        upvotes: {type: Number, default: 0}
    },
    { collection: 'booksdb' });

module.exports = mongoose.model('Book', BookSchema);