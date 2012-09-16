$(window).ready(function() {
  var menu       = $("#slidingMenu");
  var selected   = getCurrentMenuItem(menu);
  var moving     = $('<li />');
  
  $(moving).addClass('move')
  $(moving).css('top', selected[0].offsetTop-5 + 'px');
  $(moving).css('width', selected[0].offsetWidth + 'px');

  /**
  * append the absolute div to the menu;
  * when we mouse out from the menu
  * the absolute div moves to the top (like initially);
  * when hovering the items of the menu, we move it to its position
  */
  menu.bind('mouseleave',function(){
    moveTo(selected,350);
  })
  .append(moving)
  .find('li')
  .not('.move')
  .bind('mouseenter',function(){
    moveTo($(this),350);
  });

  function moveTo(elem, speed){
    moving.stop(true).animate({
      top     : elem[0].offsetTop-5 + 'px',
      width   : elem[0].offsetWidth + 'px'
    }, speed, 'swing');
  }
  
  function getCurrentMenuItem(menu){
    var selected = menu.find('li:first');
    menu.find('a').each(function(){
      var path = location.href.split('/');
      path = path.slice(3);
      if($(this).attr('href') == '/' + path){
        selected = $(this).parent();
      }
    });
    
    return selected;
  }
  
  //Sticky the sidebar
  $(window).scroll(function(){
    if($(window).innerWidth > 600){
      $('#slidingMenu').toggleClass('docked', $(window).scrollTop() >= 90);
    }
  });

  //Resize the bar thingy on resize
  $(window).resize(function(){
    moveTo(getCurrentMenuItem(menu, 100));
  });

  $('#slidingMenu li a').textShadow();
});