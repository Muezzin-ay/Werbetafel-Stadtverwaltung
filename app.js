

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

// Frontend Reveal 
app.use('/', express.static(__dirname + "/public/reveal"))

// Frontend Admin Panel
app.use('/panel', express.static(__dirname + "/public/panel"))

// Slides
app.use('/slides', express.static(__dirname + "/public/slides"))


var server = http.createServer(app).listen(PORT);
console.log('Server listening on Port ' + PORT);