
animate = ->
  window.context.fillStyle = 'rgba(0, 0, 0, 0.05)'
  window.context.fillRect 0, 0, window.canvas.width, window.canvas.height
  window.setTimeout animate

ellipse = (x,y)->
  window.context.strokeStyle = '#ffffff'
  window.context.beginPath()
  window.context.arc x, y, 10, 0, Math.PI * 2, false
  window.context.closePath()
  context.stroke()

drawtouch = (touch, count, array)->
  ellipse touch.pageX, touch.pageY
  window.context.moveTo(touch.pageX, touch.pageY)
  if count is array.length - 1
    window.context.lineTo(array[0].pageX, array[0].pageY)
  else
    window.context.lineTo(array[count + 1].pageX, array[count + 1].pageY)
  window.context.stroke()

window.onresize = (e)->
  window.canvas.width = window.canvas.offsetWidth = window.innerWidth
  window.canvas.height = window.canvas.offsetHeight = window.innerHeight

window.onload = ->
  window.canvas = (document.getElementById 'view')
  window.context = window.canvas.getContext '2d'
  window.mouseIsDown = false
  
  window.canvas.ontouchmove = (e)->
    e.preventDefault();
    drawtouch(touch, count, e.touches) for touch, count in e.touches
  
  window.canvas.onmousedown = (e)-> window.mouseIsDown = true
  
  window.canvas.onmouseup = (e)-> window.mouseIsDown = false

  window.canvas.onmousemove = (e)->
    ellipse e.pageX, e.pageY if window.mouseIsDown
  
  window.canvas.width = window.canvas.offsetWidth
  window.canvas.height = window.canvas.offsetHeight
  animate()

