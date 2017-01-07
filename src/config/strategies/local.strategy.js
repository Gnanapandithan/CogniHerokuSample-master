var passport = require('passport');
var localStrategy = require('passport-local');
var mongodb = require('mongodb').MongoClient;

var strategyFunction = function() {
    passport.use(new localStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function(usernameInput, passwordInput, done) {
            //Sign In
            var url = 'mongodb://localhost:27017/booksAPI'
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('users');
                collection.findOne({ username: usernameInput }, function(err, results) {
                    if (results.password === passwordInput) {
                        done(null, results);
                    } else {
                        done(null, false)
                    }
                })
            })
        }
    ))
}

module.exports = strategyFunction;