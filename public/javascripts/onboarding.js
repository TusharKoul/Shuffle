$(document).ready(function(){
	$('#sel2').hide();

	handleDropdown1Selection();
    handleNextClicked();

});

function handleDropdown1Selection() {
    $('#sel1').change(function () {
        var selectedText = $(this).find("option:selected").text();

        if(selectedText === "I am"){
            $('#sel2').hide();
            $('#sel3').show();
        }
        else if(selectedText === "We are") {
            $('#sel3').hide();
            $('#sel2').show();
        }
    });
}

function handleNextClicked() {
    $('.float-button').on('click', function (event) {
        if ($(this).hasClass('float-button-disabled')) {
            return;
        }

        window.location.href='/genreselection';
    })
}
