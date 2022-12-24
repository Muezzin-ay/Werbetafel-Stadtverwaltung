

$.holdReady( true );
$.ajax({
    url: "api/sequence",
    success: function(settings) {
        let data = settings.sequence;
        let hidden = settings.hidden;
        for (let file of data) {
            if (!(hidden.includes(file))) {
                $(".slides").append('<section data-background="/slides/' + file + '.JPG"></section>');
            }
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
