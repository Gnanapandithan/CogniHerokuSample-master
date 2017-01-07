var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookModel = new Schema({
    //document structure you are defining- We can define structure for document
    //get we do on collection so structure is not coming into picture -
    'title': { type: String },
    'genre': { type: String },
    'author': { type: String },
    'read': { type: Boolean, default: false }
});

//model - book - collection
module.exports = mongoose.model('book', bookModel);