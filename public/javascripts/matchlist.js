var currentUserId = 1;
var currentSongwaveDict = {};
$(document).ready(function(){

    setupSlider();
    handleSliderEvents();

    setupSongsForUser(currentUserId);
    setupLikeHandler();
    setupPlayPauseHandler();
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
    var url = '/songsjson/' + userId;
    $('.songlist').html('<p>LOADING ...</p>');
    $.get(url, function(songlist){
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
        destroyCurrentSongwaves();
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
        str += '<div id="song-playpause'+ songJson.songid +'"' + ' class="glyphicon glyphicon-pause"></div>';
    }
    else {
        str += '<div id="song-playpause'+ songJson.songid +'"' + ' class="glyphicon glyphicon-play"></div>';
    }

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


function setupSongwaves(songJson) {
    var songwaveid = '#song-waveform' + songJson.songid;

    var wavesurfer = WaveSurfer.create({
        container: songwaveid,
        height : 80,
        barWidth : 4,
        cursorWidth : 2,
        waveColor: '#938d2a',
        cursorColor: 'white',
        progressColor: 'red'
    });

    wavesurfer.on('ready', function () {
        console.log('ready');
        // wavesurfer.play();
        currentSongwaveDict[songJson.songid] = wavesurfer;
    });

    $(document).on("destroy-songwaves", function () {
        wavesurfer.destroy();
        delete currentSongwaveDict[songJson.songid];
    });

    // Hard coding song for now
    wavesurfer.load('../assets/song1.mp3');
}

function destroyCurrentSongwaves() {
    $.event.trigger({
        type: "destroy-songwaves"
    });
}