window.sketch = (p5) ->
  p5.setup = ->
    p5.colorMode p5.HSB, 300, 10, 10, 10
    p5.size(window.innerWidth, window.innerHeight)
    p5.smooth()
    p5.background 0
  p5.draw = ->
    p5.noStroke()
    p5.fill 0, 0, 0, 0.8
    p5.rect 0, 0, p5.width, p5.height
    p5.stroke 255

window.drawdot = (touch, first)->
  window.processing.ellipse touch.pageX, touch.pageY, 30, 30
  window.processing.line touch.pageX, touch.pageY, first.pageX, first.pageY
window.touches = (e)->
  e.preventDefault();
  window.drawdot touch, e.originalEvent.touches[0] for touch in e.originalEvent.touches

$ ->
  canvas = $("canvas")
  window.processing = new Processing canvas[0], window.sketch
  $(window).resize ->
    $("canvas").css {
      height : $(window).height()
      width : $(window).width()
    }
    processing.size $(window).width(), $(window).height()
  $("canvas").bind 'touchmove', window.touches