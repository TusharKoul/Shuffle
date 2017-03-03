$(document).ready(function(){
	$('#sel2').hide();

	$('#sel1').change(function () {
	    var selectedText = $(this).find("option:selected").text();
	    console.log(selectedText);

	    if(selectedText === "I am"){
	        $('#sel2').hide();
	        $('#sel3').show();
	    }
	    else if(selectedText === "We are") {
	    	$('#sel3').hide();
		    $('#sel2').show();
	    }    	
	});
});
