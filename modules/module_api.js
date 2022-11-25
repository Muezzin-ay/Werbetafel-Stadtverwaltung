
// Imports
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');


// Own Modules
const handle_config = require('./handle_config');


// Constants
const api = express.Router();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended:true}))


const photoDest = './public/slides/';
const upload = multer({ dest:  photoDest})



api.get('/sequence', function(req, res) {
    try {
        settings = handle_config.loadConfig();
        res.json(settings.sequence)

    } catch (error) {
        res.status(500).send('Server is occured.')
        console.log(error);
    }
});


api.post('/sequence', function(req, res) {
    try {
        handle_config.saveConfig(req.body)
        console.log("[API] Configuration changed");

    } catch (error) {
        res.status(500).send('Server is occured.')
        console.log(error);
    }
});



/*

api.post('/fileupload', upload.array('photos', 12), function(req, res) {
    try {
        fs.readdir( photoDest, function(error, files) {  
            let totalFiles = files.length; // return the number of files
            let oldPath = photoDest + req.files[0].filename;
            let newPath = photoDest + totalFiles + '.jpg'
            fs.rename(oldPath, newPath, function () {
                res.send('Upload complete!')
            });
        });

    } catch (error) {
        res.status(500).send('Server is occured.')
        console.log(error);
    }
});

*/



module.exports = api;