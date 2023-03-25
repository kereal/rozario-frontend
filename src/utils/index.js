export function scrollToSmoothly(pos, time) {
  /*Time is only applicable for scrolling upwards*/
  /*Code written by hev1*/
  /*pos is the y-position to scroll to (in pixels)*/
  if (isNaN(pos)) {
    throw "Position must be a number";
  }
  if (pos < 0) {
    throw "Position cannot be negative";
  }
  let currentPos = window.scrollY || window.screenTop;
  if (currentPos < pos) {
    var t = 10;
    // change i for speed
    for (let i = currentPos; i <= pos; i += 10) {
      t += 10;
      setTimeout(function () {
        window.scrollTo(0, i);
      }, t / 2);
    }
  } else {
    time = time || 2;
    var i = currentPos;
    var x;
    x = setInterval(function () {
      window.scrollTo(0, i);
      i -= 30;
      if (i <= pos) {
        clearInterval(x);
      }
    }, time / 2);
  }
}
