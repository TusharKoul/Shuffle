var currentUserId = 1;
var currentSongwaveDict = {};
$(document).ready(function(){

    setupSlider();
    handleSliderEvents();

    setupSongsForUser(currentUserId);
    setupLikeHandler();
    setupPlayPauseHandler();


    var chatButton = $('.progress-button');
    chatButton.on("click",function(event) {
        event.preventDefault();
        var id = $(this).attr('id');
        if($(this).hasClass('finished')) {
            console.log('Can chat');
        }
        else {
            console.log(id + ' Can NOT chat');
        }
    });
});


// SLIDER RELATED METHODS
// **************************

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
    $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        if (nextSlide == currentSlide) { /* NO OPERATION */return }
        destroyCurrentSongwaves();
        currentUserId = nextSlide + 1;
        setupSongsForUser(currentUserId);
    });
}


// SONG CONTAINER RELATED METHODS
// ******************************


function setupSongsForUser(userId) {
    $('.songlist').html(getLoadingHtml(true,5));
    
    // setTimeout(function () {
        $.get('/songsjson/' + userId, function(songlist) {

            // Clear song list container element
            $('.songlist').html('');

            // Adding individual songs containers
            var htmlStr = '';
            var likedCount = 0;
            for(i = 0; i< songlist.length; i++) {
                htmlStr = getSongContainerHtml(songlist[i]);
                $('.songlist').append(htmlStr);

                setupSongwaves(songlist[i]);

                if (songlist[i].liked) {
                    likedCount += 1;
                }
            }

            // Based on 'likes' setup chat button loading ratio
            var chatButton = $('#chatButton'+userId);
            chatButton.progressSet(likedCount*34);
        });
    // },1200);
}


function getSongContainerHtml(songJson) {
    var liked = songJson.liked;
    var songname = songJson.songname;
    var str = '<div class="message-container">';
    str += '<div class="song-container">';
    str += '<div class="songwaves-container">';

    str += '<div id="song-playpause'+ songJson.songid +'"' + ' class="glyphicon glyphicon-play"></div>';
    str += '<div id="song-waveform'+ songJson.songid +'"' + ' class="song-waveform"></div>';

    str += '</div>';

    str += '<div class="songname-container">';
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

function getLoadingHtml(withContainer,len) {
    var str = '';
    if(withContainer) {
        str += '<div class="spinner-container">'
    }
    str += '<div class="spinner">';
    for(var i=0; i<len; i++) {
        str += '<div class="rect' + (i+1) + '"></div>';
    }
    str += '</div>';
    if(withContainer) {
        str += '</div>';
    }
    return str
}


// SONG LIKE RELATED METHODS
// ******************************


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

function incrementChatProgress(userId) {
    var chatButton = $('#chatButton'+userId);
    chatButton.progressIncrement();
}

function decrementChatProgress(userId) {
    var chatButton = $('#chatButton'+userId);
    chatButton.progressDecrement();
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


// SONG PLAY-PAUSE RELATED METHODS
// *******************************


function setupPlayPauseHandler() {
    $(document).on("click", ".glyphicon-pause", function(event){
        $(this).toggleClass("glyphicon-pause glyphicon-play");
        var songid = $(this).attr('id').replace('song-playpause','');
        togglePlayPause(songid);
    });

    $(document).on("click", ".glyphicon-play", function(event){
        $(this).toggleClass("glyphicon-pause glyphicon-play");
        var songid = $(this).attr('id').replace('song-playpause','');
        togglePlayPause(songid);
    });
}

function togglePlayPause(songid) {
    var songwave = currentSongwaveDict[songid];
    songwave.playPause();
}


// SONG WAVEFORM RELATED METHODS
// *******************************


function setupSongwaves(songJson) {
    var songwaveid = '#song-waveform' + songJson.songid;

    showLoadingSoundwave(songwaveid);

    var wavesurfer = WaveSurfer.create({
        container: songwaveid,
        height : 80,
        barWidth : 4,
        cursorWidth : 2,
        // waveColor : '#2a4764',
        // waveColor : '#787fa8',
        // waveColor: '#294764',
        cursorColor: 'white',
        progressColor: '#dd3346'
    });

    wavesurfer.on('ready', function () {
        removeLoadingSoundwave();
        currentSongwaveDict[songJson.songid] = wavesurfer;
    });


    $(document).on("destroy-songwaves", function () {
        wavesurfer.destroy();
        delete currentSongwaveDict[songJson.songid];
    });

    // Hard coding song for now
    wavesurfer.load('../assets/song1.mp3');
}

function showLoadingSoundwave(songwaveid) {
    $(songwaveid).html(getLoadingHtml(false,8));
}

function removeLoadingSoundwave() {
    $('.spinner-container').remove();
    $('.spinner').remove();
}

function destroyCurrentSongwaves() {
    $.event.trigger({
        type: "destroy-songwaves"
    });
}