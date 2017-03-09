var selectedgenres = [];
$(document).ready(function() {
    handleGenreSelection();
    handleNextClicked();
});


function handleGenreSelection() {
    $(document).on("click", ".genre-button", function(event) {
        var genreId = $(this).attr('id');
        var indexOfGenre = $.inArray(genreId, selectedgenres);

        if(indexOfGenre > -1) {
            // Item found in selected array, remove it
            selectedgenres.splice(indexOfGenre,1);
        }
        else {
            selectedgenres.push(genreId);
        }

        if (selectedgenres.length > 0) {
            $('.float-button').removeClass('float-button-disabled');
        }
        else {
            $('.float-button').addClass('float-button-disabled');
        }

        $(this).toggleClass("genre-button-selected");

        console.log($(this).text);
        ga("send", "event", "selected", "click" );
    });
}

function handleNextClicked() {
    $('.float-button').on('click', function (event) {
        if ($(this).hasClass('float-button-disabled')) {
            return;
        }

        window.location.href='/loading';

    })
}