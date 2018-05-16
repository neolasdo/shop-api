// Simple Node.js API application using restify.
var express = require('express');
var app     = express();
var config = require('./config/config');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Include all routes here
app.all('*', function(req, res, next) {
     var origin = req.get('origin'); 
     res.header('Access-Control-Allow-Origin', origin);
     res.header("Access-Control-Allow-Methods", "GET,DELETE,OPTIONS,POST,PUT");
     res.header('Access-Control-Allow-Headers', 'X-Requested-With');
     res.header('Access-Control-Allow-Headers', 'Origin');
     res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
     res.header('Access-Control-Allow-Headers', 'Authorization');
     next();
});
var apiRoute = require('./routes/api');
app.use(morgan('combined'));
app.use('/api', apiRoute);
app.use('*', (req, res, next) => {
    next(createError(404));
});


var port = process.env.PORT || 8080;
app.listen(port);
console.log('Express app started on port '+port);
// Greeting endpoint.