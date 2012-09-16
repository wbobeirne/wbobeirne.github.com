/* 
$name:		JQ Captions
$version:	1.0
$filename:	jq.captions.js
$author:	ben@igoo
$modified:	2008/07/04 17:10
*/

/*
Modified by William O'Beirne for proper image centering
*/

$(document).ready(function(){
	$("img.captionme").load(addCaption).each(addCaption);
	
	function addCaption(){
		var captiontext = $(this).attr('title');
		if($(this).parent().attr('class') != 'imgpost'){ 
			$(this).wrap("<div class='imgpost'></div>");
		}
		$(this).load(function(){
			if(this.title){
				var width = $(this).parent().width() - $(this).width();
				width = width / 2 - 37; //Divide by 2 since it's only accounting for one side, 37 for the image width.
				var style = 'style="width: ' + this.clientWidth + 'px; left: '+width+'px;"';
				$(this).parent().append("<div class='thecaption' " + style + ">" + captiontext + "</div>");
			}
		});
	}
});