$(document).ready(function(){

  // Constants
  var MAX_NUM = 100;
  var NUM_TRIES = 10;
  var SPEED = 600;
  
  //Form items
  messages = $('.messages');
  submit = $('#submit');
  reset = $('#reset');
  guess = $('#guess');
  form = $('#guess-form');
  
  // Vars
  var randomNum = 0;
  var tries = 0;
  
  // Event handlers
  $(reset).click(function() {
    gameReset();
  });
  
  $(submit).click(function() {
    var value = parseInt($(guess).val());
    processGuess(value);
    
    if (tries >= NUM_TRIES) {
      addMessage("You've run out of guesses! The number was " + randomNum + ". Play again?", 'error');
      $(submit).attr('disabled', 'disabled');
      $(guess).attr('disabled', 'disabled');
    }
  });
  
  $(form).submit(function(e) {
    e.preventDefault();
  });
  
  
  // Initialization
  gameReset();
  
  
  // Functions
  function gameReset() {
    $(submit).removeAttr('disabled');
    $(guess).removeAttr('disabled');
    messages.html('');
    randomNum = Math.ceil(Math.random() * MAX_NUM);
    tries = 0;
    $(submit).val('Submit guess (' + NUM_TRIES + ')');
    addMessage('A random number between 1 and ' + MAX_NUM  + ' has been generated. Can you guess it? You have ' + NUM_TRIES + ' tries.');
  }
  
  function addMessage(msg, status) {
    if(typeof(status)==='undefined') status = '';
    message = '<li class="message ' + status + '">' + msg + '</li>';
    $(message).prependTo(messages).hide().fadeIn(SPEED);
  }
  
  function incrementTries() {
    tries++;
    $(submit).val('Submit guess (' + (NUM_TRIES - tries) + ')');
  }
  
  function processGuess(value) {
    if (isNaN(value) || value === '') {
      addMessage("Hey, that's not a number! Try again.", 'error');
    }
    else {
      if (value % 1 != 0) {
        value = Math.floor(value);
        addMessage('No need for decimals! Your guess has been rounded to ' + value + '.', 'warning');
      }
      
      if (value > 100 || value < 1) {
        addMessage("You may want to try a number between 1 and 100.", 'error');
      }
      
      else if (value !== randomNum) {
        if (value > randomNum) {
          addMessage(value + " is a bit high, try again.", 'warning');
        }
        else {
          addMessage(value + " is a bit low, try again.", 'warning');
        }
        incrementTries();
        $(guess).select();
      }
      else {
        addMessage("Well done! The number was " + randomNum + ". Play again?", 'success');
        $(submit).attr('disabled', 'disabled');
        $(guess).attr('disabled', 'disabled');
      }
    }
  }
  
});