$(document).ready(function(){
    var lastBlock = $("#a1");
    var maxWidth = 750;
    var minWidth = 50;	
	var dur = 300;
	
	var numEntries = $("#accordion-container").find(".accordion-entry").length;
	$("#accordion-container").css('width', ((numEntries-1) * minWidth + maxWidth) + 'px');
	console.log(((numEntries-1) * minWidth) + maxWidth);
	
    $(".accordion-entry").click(
      function(){
        $(lastBlock).animate({width: minWidth+"px"}, { queue:false, duration:dur });
		$(this).animate({width: maxWidth+"px"}, { queue:false, duration:dur });
		lastBlock = this;
      }
    );
});