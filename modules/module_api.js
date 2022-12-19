
// Imports
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');


// Own Modules
const handle_config = require('./handle_config');
const convert = require('./convert');

// Constants
const api = express.Router();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended:true}));


const slideDest = './public/slides/';
const upload = multer({ dest:  slideDest})



api.get('/sequence', function(req, res) {
    try {
        settings = handle_config.loadConfig();
        res.json(settings.sequence);

    } catch (error) {
        res.status(500).send('Server is occured.');
        console.log(error);
    }
});


api.post('/sequence', function(req, res) {
    try {
        handle_config.saveSequence(req.body.sequence);
        console.log("[API] Configuration changed");

    } catch (error) {
        res.status(500).send('Server is occured.');
        console.log(error);
    }
});




api.post('/fileupload', upload.single('uploadedFile'), function(req, res) {
    try {
        fs.readdir(slideDest, function(error, files) {
            let oldPath = slideDest + req.file.filename
            let newPath = slideDest + "power" + '.pptx'
            fs.rename(oldPath, newPath, function () {
                convert.convertPP(newPath, slideDest + "power/");
                res.sendStatus(200);
            });
        })
        /*
        fs.readdir( slideDest, function(error, files) { 

            let config = handle_config.loadConfig();
            config.registered += 1;
            config.sequence.push(config.registered.toString());
            handle_config.saveConfig(config);
            
            let oldPath = slideDest + req.file.filename
            let newPath = slideDest + config.registered + '.jpg'
            fs.rename(oldPath, newPath, function () {
                res.status(200).send('All good');
            });
        });
        */

    } catch (error) {
        res.status(500).send('Server is occured.')
        console.log(error);
    }
});



module.exports = api;