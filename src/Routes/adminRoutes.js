var express = require('express');
var mongodb = require('mongodb').MongoClient;

var routes = function() {

    var books = [{
            "title": "My My MY title",
            "genre": "Science Fiction",
            "author": "Jules Verne",
            "read": false
        },
        {
            "title": "The Dark World",
            "genre": "Fantasy",
            "author": "Henry Kuttner",
            "read": false
        },
        {
            "title": "The Wind in the Willows",
            "genre": "Fantasy",
            "author": "Kenneth Grahame",
            "read": false
        },
        {
            "title": "Life On The Mississippi",
            "genre": "History",
            "author": "Mark Twain",
            "read": false
        },
        {
            "title": "Childhood",
            "genre": "Biography",
            "author": "Lev Nikolayevich Tolstoy",
            "read": false
        },
        {
            "title": "Sample Title",
            "genre": "Sample genre",
            "author": "Sample author",
            "read": false

        },

        {
            "genre": "Sample genre",
            "author": "Sample author",
            "read": false

        },

        {
            "mytitle": "Sample Title",
            "genre": "Sample genre",
            "author": "Sample author",
            "read": false

        },


        {
            "title": "My My MY title",
            "genre": "Sample genre",
            "author": "false",
            "read": false

        }

    ]

    var adminRouter = express.Router();

    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 'mongodb://vishalgcogni:river808@ds127988.mlab.com:27988/booksapi'
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function(err, results) {
                    res.json(results);
                    db.close();
                })
            })
        })

    return adminRouter;
}

module.exports = routes;