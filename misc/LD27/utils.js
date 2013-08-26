// Collection of utilities for our game.

// =======
// Utility
// -------

// Run any visually based nnumbers through this function. Handles delta and timescaling.
function scale(val, ignoreTimescale) {
  var diff = tickDelta / createjs.Ticker.getInterval();
  val = val * diff;
  if (!ignoreTimescale) {
    val *= timeScale;
  }

  return val;
}

// Get a number to approach zero, by some reduction
function approachZero(val, reduce) {
  if (val === 0) {
    return val;
  }

  dir = val > 0 ? 1 : -1;
  val = (Math.abs(val) - reduce);
  if (val < reduce) {
    val = 0;
  }
  else {
    val = val * dir;
  }

  return val;
}

// Min with absolute value.
function absMin(val, min) {
  if (val > min) {
    return min;
  }
  if (val < min * -1) {
    return min * -1;
  }
  return val;
}

// Credit to techfoobar
// http://stackoverflow.com/questions/16360533/calculate-color-hex-having-2-colors-and-percent-position
function colorBetween(c1, c2, pct) {
  var r = Math.ceil(parseInt(c1.substring(0,1), 16) * pct + parseInt(c2.substring(0,1), 16) * (1-pct));
  var g = Math.ceil(parseInt(c1.substring(2,3), 16) * pct + parseInt(c2.substring(2,3), 16) * (1-pct));
  var b = Math.ceil(parseInt(c1.substring(4,5), 16) * pct + parseInt(c2.substring(4,5), 16) * (1-pct));

  return hex(r) + hex(r) + hex(g) + hex(g) + hex(b) + hex(b);
}
function hex(x) {
  x = x.toString(16);
  return x;
};

function generateAngle(x1, x2, y1, y2) {
  return Math.atan2(x2 - x1, y2 - y1);
}

function moveTo(obj, target, speed) {
  var angle = generateAngle(obj.x, target.x, obj.y, target.y);
  moveAngle(obj, angle, speed);
}

function moveAngle(obj, angle, speed) {
  obj.x += scale(speed * Math.sin(angle));
  obj.y += scale(speed * Math.cos(angle));
}


// ====================
// Debug / logging shit
// --------------------
function logVal(val, id) {
  var elem = $('#' + id);
  if (elem.length == 0) {
    $('#log #vars').append('<div class="value" id="' + id + '"></div>');
    elem = $('#' + id);
  }

  elem.html(id + ': ' + val);
}

function logMsg(msg) {
  var date = new Date();
  var seconds = date.getSeconds();
  var dateStr = date.getHours() + ":" + date.getMinutes() + ":" + (seconds < 10 ? '0' + seconds : seconds);
  $('#log').append('<div class="message"><span class="timestamp">[' + dateStr + ']</span>' + msg + '</div>');
}

// ===================
// Collision detection
// -------------------

function checkRectIntersection(rect1, rect2) {
  if ( rect1.x - rect1.width / 2 >= rect2.x + rect2.width / 2
    || rect1.x + rect1.width / 2 <= rect2.x - rect2.width / 2
    || rect1.y - rect1.height / 2 >= rect2.y + rect2.height / 2
    || rect1.y + rect1.height / 2 <= rect2.y - rect2.height / 2 )
      return false;
 
  return true;
};