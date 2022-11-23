

$.holdReady( true );
$.ajax({
    url: "api/sequence",
    success: function(data) {
        for (let file of data) {
            $(".slides").append('<section data-background="/slides/' + file + '.jpg"></section>');
        };
        $.holdReady( false );
    },
});


$(document).ready(function () {
    
    Reveal.initialize({
        autoSlide: 4000,
        loop: true,
        controls: false,
        progress: false,
        controlsTutorial: false,
    });

});
