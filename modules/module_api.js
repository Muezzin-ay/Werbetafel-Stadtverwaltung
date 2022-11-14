
const express = require('express');
const { METHODS } = require('http');
const multer = require('multer');
const fs = require('fs');


const photoDest = './public/slides/';

const api = express.Router();
const upload = multer({ dest:  photoDest})


api.get('/slideCount', function(req, res) {
    try {
        length = fs.readdirSync('./public/slides').length
        res.json({count: length})

    } catch (error) {
        res.status(500).send('Server is occured.')
        console.log(error);
    }
});

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



module.exports = api;