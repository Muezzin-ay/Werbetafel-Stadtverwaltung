

function slist (target) {
    // (A) SET CSS + GET ALL LIST ITEMS
    target.classList.add("slist");
    let items = target.getElementsByTagName("li"), current = null;
  
    // (B) MAKE ITEMS DRAGGABLE + SORTABLE
    for (let i of items) {
      // (B1) ATTACH DRAGGABLE
      i.draggable = true;
      
      // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
      i.ondragstart = (ev) => {
        current = i;
        for (let it of items) {
          if (it != current) { it.classList.add("hint"); }
        }
      };
      
      // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
      i.ondragenter = (ev) => {
        if (i != current) { i.classList.add("active"); }
      };
  
      // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
      
      i.ondragleave = () => {
        i.classList.remove("active");
      };
      
  
      // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
      i.ondragend = () => { for (let it of items) {
          it.classList.remove("hint");
          it.classList.remove("active");
      }};
   
      // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
      i.ondragover = (evt) => { evt.preventDefault(); };
   
      // (B7) ON DROP - DO SOMETHING
      i.ondrop = (evt) => {
        evt.preventDefault();

        $('#apply-config').show(); //Show the Apply Config button when something was changed
        //saveConfig();

        if (i != current) {
          let currentpos = 0, droppedpos = 0;
          for (let it=0; it<items.length; it++) {
            if (current == items[it]) { currentpos = it; }
            if (i == items[it]) { droppedpos = it; }
          }
          if (currentpos < droppedpos) {
            i.parentNode.insertBefore(current, i.nextSibling);
          } else {
            i.parentNode.insertBefore(current, i);
          }
        }
      };
    }
}




function loadSlidePreview() {
    $.get("/api/sequence", function(data) {
        for (i of data) {
            let element = 
            `
            <li class="slide-item list-group-item" id="${i}">
                <div class="container-img">
                    <img src="/slides/${i}.jpg" width="192" height="108">
                </div>
                <div class="container-description">
                    <h2>This is Advertise number ${i}</h2>
                    <h3></h3>
                </div>

                <button class="btn btn-primary" onclick=removeSelf(this)>Trash</button>
                
            </li>
            `
            $('#slide-preview').append(element);
        };
        $.holdReady( false );
    });
};


function removeSelf(el) {
    $(el).closest('.slide-item').remove();
    $.ajax({
        url: '/api/deleteSlide',
        type: "POST",
        data: {'id': "" + id},
        success: function(d) {
            alert("Success: "+ JSON.stringify(d));
        }
    });


}


function saveConfig() {
    let configData = {'sequence' : []};

    let slidePreview = $('#slide-preview').children('li');
    for (slide of slidePreview) {
        configData['sequence'].push("" + $(slide).attr('id'))
    }

    $.ajax({
        url: '/api/sequence',
        type: "POST",
        data: configData,
        success: function(d) {
            alert("Success: "+ JSON.stringify(d));
        }
    });

    $('#apply-config').hide(); //Hide Button after the config was saved
};


// Startup
$.holdReady( true );
$(window).load(loadSlidePreview);


// Run
$(document).ready(function () {
    //Apply config button for when settings are changed
    $('#apply-config').hide();
    $('#apply-config').click(saveConfig);

    slist(document.getElementById("slide-preview"));
});