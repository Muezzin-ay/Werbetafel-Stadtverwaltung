

var convertapi = require('convertapi')('DpHcMRRXg49vUJDQ');

convertapi.convert('jpg', 
{
    File: './Screnndesign__MüllerCl_GrabherLi_TGG12.pptx',
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
    result.saveFiles('./out/');
});