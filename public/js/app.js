(function() {
  var animate, drawtouch, ellipse;

  animate = function() {
    window.context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    window.context.fillRect(0, 0, window.canvas.width, window.canvas.height);
    return window.setTimeout(animate);
  };

  ellipse = function(x, y) {
    window.context.strokeStyle = '#ffffff';
    window.context.beginPath();
    window.context.arc(x, y, 10, 0, Math.PI * 2, false);
    window.context.closePath();
    return context.stroke();
  };

  drawtouch = function(touch, count, array) {
    ellipse(touch.pageX, touch.pageY);
    window.context.moveTo(touch.pageX, touch.pageY);
    if (count === array.length - 1) {
      window.context.lineTo(array[0].pageX, array[0].pageY);
    } else {
      window.context.lineTo(array[count + 1].pageX, array[count + 1].pageY);
    }
    return window.context.stroke();
  };

  window.onresize = function(e) {
    window.canvas.width = window.canvas.offsetWidth = window.innerWidth;
    return window.canvas.height = window.canvas.offsetHeight = window.innerHeight;
  };

  window.onload = function() {
    window.canvas = document.getElementById('view');
    window.context = window.canvas.getContext('2d');
    window.mouseIsDown = false;
    window.canvas.ontouchmove = function(e) {
      var count, touch, _len, _ref, _results;
      e.preventDefault();
      _ref = e.touches;
      _results = [];
      for (count = 0, _len = _ref.length; count < _len; count++) {
        touch = _ref[count];
        _results.push(drawtouch(touch, count, e.touches));
      }
      return _results;
    };
    window.canvas.onmousedown = function(e) {
      return window.mouseIsDown = true;
    };
    window.canvas.onmouseup = function(e) {
      return window.mouseIsDown = false;
    };
    window.canvas.onmousemove = function(e) {
      if (window.mouseIsDown) return ellipse(e.pageX, e.pageY);
    };
    window.canvas.width = window.canvas.offsetWidth;
    window.canvas.height = window.canvas.offsetHeight;
    return animate();
  };

}).call(this);
