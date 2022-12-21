

function genRegularSlide (id) {
    let element =  
        `
        <li class="slide-item list-group-item" id="${id}">
            <div class="container-img">
                <img src="/slides/${id}.JPG" width="192" height="108">
            </div>
            <div class="container-description">
                <h2>This is Advertise number ${id}</h2>
                <h3></h3>
            </div>

            <button class="btn btn-danger delete-button" onclick=removeSelf(this)><i class="fa fa-trash"></i></button>
            
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
                <h2>This is Advertise number ${id}</h2>
                <h3></h3>
            </div>

            <button class="btn btn-danger delete-button" onclick=removeSelf(this)><i class="fa fa-trash"></i></button>
            
        </li>
        `
    return element;
}