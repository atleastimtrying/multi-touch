
  window.sketch = function(p5) {
    p5.setup = function() {
      p5.colorMode(p5.HSB, 300, 10, 10, 10);
      p5.size(window.innerWidth, window.innerHeight);
      p5.smooth();
      return p5.background(0);
    };
    return p5.draw = function() {
      p5.noStroke();
      p5.fill(0, 0, 0, 0.8);
      p5.rect(0, 0, p5.width, p5.height);
      return p5.stroke(255);
    };
  };

  window.drawdot = function(touch, first) {
    window.processing.ellipse(touch.pageX, touch.pageY, 30, 30);
    return window.processing.line(touch.pageX, touch.pageY, first.pageX, first.pageY);
  };

  window.touches = function(e) {
    var touch, _i, _len, _ref, _results;
    e.preventDefault();
    _ref = e.originalEvent.touches;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      touch = _ref[_i];
      _results.push(window.drawdot(touch, e.originalEvent.touches[0]));
    }
    return _results;
  };

  $(function() {
    var canvas;
    canvas = $("canvas");
    window.processing = new Processing(canvas[0], window.sketch);
    $(window).resize(function() {
      $("canvas").css({
        height: $(window).height(),
        width: $(window).width()
      });
      return processing.size($(window).width(), $(window).height());
    });
    return $("canvas").bind('touchmove', window.touches);
  });
