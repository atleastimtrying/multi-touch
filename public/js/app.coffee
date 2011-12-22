window.onload = ->
  window.processing = new Processing document.getElementById('view'), window.sketch
  document.getElementById('view').ontouchmove = window.touches
  

window.sketch = (p5) ->
  p5.setup = ->
    p5.colorMode p5.HSB, 300, 10, 10, 10
    p5.size window.innerWidth, window.innerHeight
    p5.smooth()
    p5.background 0
  p5.draw = ->
    p5.noStroke()
    p5.fill 0, 0, 0, 0.8
    p5.rect 0, 0, p5.width, p5.height
    p5.stroke 255

window.drawdot = (touch, count, array)->
  window.processing.ellipse touch.pageX, touch.pageY, 30, 30
  if count is array.length - 1
    window.processing.line(touch.pageX, touch.pageY, array[0].pageX, array[0].pageY)
  else
    window.processing.line(touch.pageX, touch.pageY, array[count + 1].pageX, array[count + 1].pageY)

window.touches = (e)->
  e.preventDefault();
  window.drawdot(touch, count, e.touches) for touch, count in e.touches

window.onresize = (e)->
  (document.getElementById 'view').style.width = window.innerWidth
  (document.getElementById 'view').style.height = window.innerHeight
  window.processing.size window.innerWidth, window.innerHeight