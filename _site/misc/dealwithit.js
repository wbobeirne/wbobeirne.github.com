$(document).ready(function(){
  $('#text').hide();
  $('#glasses').animate({
    top: '240px',
  }, 4000, 'linear', function(){
    $('#text').show();
  });
});