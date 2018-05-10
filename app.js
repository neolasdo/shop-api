// Simple Node.js API application using restify.
var express = require('express');
var app     = express();
var config = require('./config/config');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



// Include all routes here
var adminRoute = require('./routes/admin.js');
var appRoute = require('./routes/frontend.js');

app.use('admin/api/', adminRoute);
app.use('api/', appRoute);
app.use(function(req, res, next) {
    next(createError(404));
});
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Express app started on port '+port);
// Greeting endpoint.