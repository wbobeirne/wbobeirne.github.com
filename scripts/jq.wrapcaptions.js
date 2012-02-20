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
		console.log($(this).parent().attr('class'));
		if($(this).parent().attr('class') != 'imgpost'){ 
			$(this).wrap("<div class='imgpost'></div>");
		}
		$(this).load(function(){
			if(this.title){
				var style = "style=\"width: " + this.clientWidth + "px;\"";
				$(this).parent().append("<div class='thecaption' " + style + ">" + captiontext + "</div>");
				$(this).parent().height(this.clientHeight);
			}
		});
	}
});