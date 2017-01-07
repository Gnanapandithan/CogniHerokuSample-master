var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('views', 'src/views');
app.set('view engine', 'ejs')

var mongoose = require('mongoose');
mongoose.connect('mongodb://vishalgcogni:river808@ds127988.mlab.com:27988/booksapi');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var bookModel = require('./src/models/bookModel')

var bookRouter = require('./src/Routes/bookRoutes')(bookModel);
app.use('/api', bookRouter);

var adminRouter = require('./src/Routes/adminRoutes')();
app.use('/Admin', adminRouter);

// authentication
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({
    secret: 'library',
    resave: true,
    saveUninitialized: true

}))
require('./src/config/passport')(app);

var authRouter = require('./src/Routes/authRoutes')();
app.use('/auth', authRouter)


app.get('/', function(req, res) {
    res.render('index', {
        nav: [{
                Link: '/api/Books',
                Text: 'Books'
            },
            {
                Link: '/Admin/addBooks',
                Text: 'Admin'
            }
        ]
    })
})



app.listen(port, function(err) {
    console.log('Running on port ' + port);
})