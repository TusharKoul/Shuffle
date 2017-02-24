var currentUserId = 1;
$(document).ready(function(){

    setupSlider();
    handleSliderEvents();

    setupSongsForUser(currentUserId);
    setupLikeHandler();
});

function incrementChatProgress(userId) {
    var chatButton = $('#chatButton'+userId);
    chatButton.progressIncrement();
}

function decrementChatProgress(userId) {
    var chatButton = $('#chatButton'+userId);
    chatButton.progressDecrement();
}

function setupSongsForUser(userId) {
    // var url = '/songs/' + userId;
    // $.get(url, function(result){
    //     $('.songlist').html(result);
    // });
    var url = '/songsjson/' + userId;
    $.get(url, function(songlist){
        var htmlStr = '';
        var likedCount = 0;
        for(i = 0; i< songlist.length; i++) {
            htmlStr += getSongContainerHtml(songlist[i]);
            if (songlist[i].liked) {
                likedCount += 1;
            }
        }
        $('.songlist').html(htmlStr);
        var chatButton = $('#chatButton'+userId);
        chatButton.progressSet(likedCount*34);
    });
}

function setupLikeHandler() {
    $(document).on("click", ".glyphicon-heart-empty", function(event){
        $(this).toggleClass("glyphicon-heart-empty glyphicon-heart");
        postToggleLikeOnSong($(this).attr('id'),1);
        incrementChatProgress(currentUserId);
    });

    $(document).on("click", ".glyphicon-heart", function(event){
        $(this).toggleClass("glyphicon-heart-empty glyphicon-heart");
        postToggleLikeOnSong($(this).attr('id'), 0);
        decrementChatProgress(currentUserId);
    });
}

function postToggleLikeOnSong(songid,liked) {
    $.ajax({
        url: '/togglelike',
        type: 'PUT',
        data: {songid: songid, liked : liked},
        success:function(data){
            console.log('put success' + data);
        }
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
        currentUserId = nextSlide + 1;
        setupSongsForUser(currentUserId);
    });
}



function getSongContainerHtml(songJson) {
    var playing = songJson.playing;
    var liked = songJson.liked;
    var songname = songJson.songname;
    var str = '<div class="message-container">';
    str += '<div class="song-container">';
    str += '<div class="songwaves-container">';
    if(playing) {
        str += '<span id="'+ songJson.songid +'"' + ' class="glyphicon glyphicon-pause"></span>';
    }
    else {
        str += '<span id="'+ songJson.songid +'"' + ' class="glyphicon glyphicon-play"></span>';
    }
    str += '</div>';

    str += '<div class="songname-container songname-container-recieved">';
    str += songname;
    str += '</div>';
    str += '</div>';

    str += '<div class="heart-container">';
    if(liked) {
        str += '<span id="'+ songJson.songid +'"' + ' class="glyphicon glyphicon-heart"></span>';
    }
    else {
        str += '<span id="'+ songJson.songid +'"' + ' class="glyphicon glyphicon-heart-empty"></span>';
    }

    str += '</div>';
    str += '</div>';

    return str;
}