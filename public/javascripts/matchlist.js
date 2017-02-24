$(document).ready(function(){

    setupSlider();
    handleSliderEvents();

    setupSongsForUser(0);

    $(document).on("click", ".glyphicon-heart-empty", function(event){
        $(this).toggleClass("glyphicon-heart-empty glyphicon-heart");
        incrementChatProgress(0);
    });

    $(document).on("click", ".glyphicon-heart", function(event){
        $(this).toggleClass("glyphicon-heart-empty glyphicon-heart");
        decrementChatProgress(0);
    });
});

function incrementChatProgress(chatId) {
    console.log('increment chat progress');
    // var chatButton = $('#chatButton'+chatId);
    var chatButton = $('#chatButton');
    chatButton.progressIncrement();
}

function decrementChatProgress(chatId) {
    console.log('decrement chat progress');
    // var chatButton = $('#chatButton'+chatId);
    var chatButton = $('#chatButton');
    chatButton.progressDecrement();
}

function setupSongsForUser(userId) {
    var url = '/songs/' + (userId + 1).toString();
    console.log(url);
    $.get(url, function(result){
        $('.songlist').html(result);
    });
}


function setupSlider(){
    $('.slider').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        speed:500,
        focusOnSelect: true,
        swipeToSlide:true,
        touchMove:true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '55px',
                    slidesToShow: 1
                }
            }
        ]
    });
}

function handleSliderEvents() {
    // On before slide change
    $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        setupSongsForUser(nextSlide);
    });
}