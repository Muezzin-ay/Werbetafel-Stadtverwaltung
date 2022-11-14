



$(document).ready(function () {

    function getSlideCount() {
        let strUrl = "", strReturn = "";
        $.ajax({
            url: "api/slideCount",
            success: function(data) {
            strReturn = data.count;
            },
            async:false
        });
        return strReturn;
    };
    
  
    count = getSlideCount();
    for (let i=1; i<=count; i++) {
        $(".slides").append('<section data-background="/slides/' + i + '.jpg"></section>');
    };

    Reveal.initialize({
        autoSlide: 4000,
        loop: true,
        controls: false,
        progress: false,
        controlsTutorial: false,
    });
  
});