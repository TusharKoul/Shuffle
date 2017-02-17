$(document).ready(function(){
    setupSlider();


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
                    centerPadding: '45px',
                    slidesToShow: 1
                }
            }
        ]
    });
}