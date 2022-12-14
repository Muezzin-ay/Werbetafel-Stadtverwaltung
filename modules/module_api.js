
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
        res.json(settings);

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


api.post('/setVisibility', (req, res) => {
    try {
        let id = req.body.id;
        console.log(`[API] Changing visibility of slide "${id}"`);
        if (req.body.setHidden == "true") {
            handle_config.setHidden(id);
        }
        else {
            handle_config.setVisible(id);
        }
    } catch (error) {
        res.status(500).send('Server is occured.');
        console.log(error);
    }
});

api.post('/fileupload', upload.single('uploadedFile'), function(req, res) {
    try {
        fs.readdir(slideDest, function(error, files) {
            let oldPath = slideDest + req.file.filename;
            let newPath = slideDest + req.file.originalname;
            fs.rename(oldPath, newPath, function () {
                let imageOut = slideDest + "out/"
                convert.convertPP(newPath, imageOut, function () {
                    fs.unlinkSync(newPath); //Delete powerpoint file
                    handle_config.moveSlides();
                    res.redirect('/panel.html'); //Redirect to Startpage
                });
            });
        })
    } catch (error) {
        res.status(500).send('Server is occured.')
        console.log(error);
    }
});
api.post('/deleteSlide', function (req, res) {
    try {
        console.log(`[API] Removing File "${req.body.id}"`);
        handle_config.deleteSlide(req.body.id, () => {
        });
    } catch (error) {
        res.status(500).send('Server is occured.')
        console.log(error);
    }
});



module.exports = api;