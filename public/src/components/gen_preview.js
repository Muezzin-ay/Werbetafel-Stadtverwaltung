

function genRegularSlide (id) {
    let element =  
        `
        <li class="slide-item list-group-item" id="${id}">
            <div class="container-img">
                <img src="/slides/${id}.JPG" width="192" height="108">
            </div>
            <div class="container-description">
                <h2>${id}</h2>
                <h3></h3>
            </div>

            <button class="btn btn-danger delete-button" onclick=removeSlide(this)><i class="fa fa-trash"></i></button>
            <button class="btn btn-danger hide-button" onclick=changeSlideVisbility(this)><i class="fa-solid fa-eye-slash"></i></button>
            
        </li>
        `
    return element;
}

function genHiddenSlide(id) {
    let element =  
        `
        <li class="slide-item list-group-item hidden-slide" id="${id}">
            <div class="container-img">
                <img src="/slides/${id}.JPG" width="192" height="108">
            </div>
            <div class="container-description">
                <h2>${id}</h2>
                <h3></h3>
            </div>

            <button class="btn btn-danger delete-button" onclick=removeSlide(this)><i class="fa fa-trash"></i></button>
            <button class="btn btn-secondary hide-button" onclick=changeSlideVisbility(this)><i class="fa-solid fa-eye"></i></button>
            
        </li>
        `
    return element;
}