

/******** Functions ********/ 

// Upload a file to the server
function uploadFile(file) {
    let url = '/api/fileupload'
    let formData = new FormData();
  
    formData.append('photos', file);
  
    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(() => { /* Done. Inform the user */ })
    .catch(() => { /* Error. Inform the user */ });
};


//Do that for every file that the user wants to upload
function handleFiles(files) {
    files = [...files];
    files.forEach(uploadFile);
    files.forEach(previewFile);
};


//Preview of the uploaded images
function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        let img = document.createElement('img');
        img.src = reader.result;
        document.getElementById('gallery').appendChild(img);
    };
};


/******** Setup Code ********/ 

$(document).ready(function () {

    // Drag and Drop Requirement -> Prevents Browsers standart behavior
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    };
    
    // Drag and Drop Setup
    let dropArea = document.getElementById('container-drop-area')
    
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
    })
    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
    })
    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    })
    function highlight(e) {
        dropArea.classList.add('highlight')
    };
    function unhighlight(e) {
        dropArea.classList.remove('highlight')
    };
      
    //Drag and Drop Upload
    dropArea.addEventListener('drop', handleDrop, false)    
    function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;
    
        handleFiles(files);
    };
      
});