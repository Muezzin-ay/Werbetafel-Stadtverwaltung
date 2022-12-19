
const convertapi = require('convertapi')('DpHcMRRXg49vUJDQ');
const fs = require('fs');

// './Screnndesign__MüllerCl_GrabherLi_TGG12.pptx'
module.exports = {
    convertPP : function(file, out, func) {
        if (!(fs.existsSync(out))) {
            fs.mkdirSync(out);
        };
        convertapi.convert('jpg', {
            File: file,
            ImageResolutionH: '300',
            ImageResolutionV: '300',
            ImageWidth: '3840',
            ImageHeight: '2160',
            ScaleImage: 'true',
            TextAntialiasing: '4',
            GraphicsAntialiasing: '4',
            ImageInterpolation: 'true',
        },
        'pptx').then(function(result) {
            result.saveFiles(out);
        });

        func();
    }    
}