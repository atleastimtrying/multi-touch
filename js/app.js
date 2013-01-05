(function() {
  var App;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App = (function() {

    function App() {
      this.touchMove = __bind(this.touchMove, this);
      this.mouseMove = __bind(this.mouseMove, this);
      this.mouseUp = __bind(this.mouseUp, this);
      this.mouseDown = __bind(this.mouseDown, this);
      this.resize = __bind(this.resize, this);
      this.animate = __bind(this.animate, this);      this.canvas = document.getElementById('view');
      this.context = this.canvas.getContext('2d');
      this.mouseIsDown = false;
      this.bindEvents();
      this.resize();
      this.animate();
    }

    App.prototype.bindEvents = function() {
      window.onresize = this.resize;
      this.canvas.ontouchmove = this.touchMove;
      this.canvas.onmousemove = this.mouseMove;
      this.canvas.onmousedown = this.mouseDown;
      return this.canvas.onmouseup = this.mouseUp;
    };

    App.prototype.animate = function() {
      this.context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      return window.setTimeout(this.animate);
    };

    App.prototype.ellipse = function(x, y) {
      this.context.strokeStyle = '#ffffff';
      this.context.beginPath();
      this.context.arc(x, y, 10, 0, Math.PI * 2, false);
      this.context.closePath();
      return this.context.stroke();
    };

    App.prototype.drawTouch = function(touch, count, array) {
      this.ellipse(touch.pageX, touch.pageY);
      this.context.moveTo(touch.pageX, touch.pageY);
      if (count === array.length - 1) {
        this.context.lineTo(array[0].pageX, array[0].pageY);
      } else {
        this.context.lineTo(array[count + 1].pageX, array[count + 1].pageY);
      }
      return this.context.stroke();
    };

    App.prototype.resize = function(e) {
      this.canvas.width = this.canvas.offsetWidth = window.innerWidth;
      return this.canvas.height = this.canvas.offsetHeight = window.innerHeight;
    };

    App.prototype.mouseDown = function(e) {
      return this.mouseIsDown = true;
    };

    App.prototype.mouseUp = function(e) {
      return this.mouseIsDown = false;
    };

    App.prototype.mouseMove = function(e) {
      if (this.mouseIsDown) return this.ellipse(e.pageX, e.pageY);
    };

    App.prototype.touchMove = function(e) {
      var count, touch, _len, _ref, _results;
      e.preventDefault();
      _ref = e.touches;
      _results = [];
      for (count = 0, _len = _ref.length; count < _len; count++) {
        touch = _ref[count];
        _results.push(this.drawTouch(touch, count, e.touches));
      }
      return _results;
    };

    return App;

  })();

  window.onload = function() {
    var app;
    return app = new App();
  };

}).call(this);
