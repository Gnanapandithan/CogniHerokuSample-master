var express = require('express');
var app = express();

var routes = function(bookModel) {

    var bookRouter = express.Router();
    bookRouter.route('/books')
        .get(function(req, res) {
            bookModel.find(function(err, books) {
                res.render('bookListView', { books: books })
            })

        })
        .post(function(req, res) {
            var book = new bookModel(req.body);
            book.save();
            res.send(book);

        })

    bookRouter.use('/books/:id', function(req, res, next) {
        var query = bookModel.findById(req.params.id);
        query.exec(function(err, book) {
            if (err) {
                res.send('middleware');
            }
            req.book = book;
            console.log('hello world again');
            next();
        })
    })

    bookRouter.route('/books/:id')
        .get(function(req, res) {
            res.render('bookView', { book: req.book })
        })
        .put(function(req, res) {
            req.book.title = req.body.title;
            req.book.genre = req.body.genre;
            req.book.author = req.body.author;
            req.book.read = req.body.read;

            req.book.save();
            res.json(req.book);

        })
        .patch(function(req, res) {
            req.book.title = req.body.title;
            if (req.body.genre) {
                req.book.genre = req.body.genre;
                req.book.author = req.body.author;
                req.book.read = req.body.read;
            }
            req.book.save();
            res.json(req.book);

        })
        .delete(function(req, res) {
            req.book.remove(function(err) {
                res.send('Removed');

            })

        })



    return bookRouter;
}

module.exports = routes;