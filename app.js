

var http = require('http');
var express = require('express');

// Own modules
const api = require('./modules/module_api')

// Settings
const PORT = 8084;

var app = express();

app.use(function(req, res, next){
    next();
});

// Backend connection
app.use('/api', api);

// Frontend 
app.use('/', express.static(__dirname + "/public"))

var server = http.createServer(app).listen(PORT);
console.log('[SERVER] Listening on Port ' + PORT);