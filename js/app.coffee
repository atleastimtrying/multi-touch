class App
  constructor: ->
    @canvas = (document.getElementById 'view')
    @context = @canvas.getContext '2d'
    @mouseIsDown = false
    @bindEvents()
    @resize()
    @animate()

  bindEvents: ->
    window.onresize = @resize
    @canvas.ontouchmove = @touchMove
    @canvas.onmousemove = @mouseMove
    @canvas.onmousedown = @mouseDown
    @canvas.onmouseup = @mouseUp

  animate: =>
    @context.fillStyle = 'rgba(0, 0, 0, 0.05)'
    @context.fillRect 0, 0, @canvas.width, @canvas.height
    window.setTimeout @animate

  ellipse: (x,y)->
    @context.strokeStyle = '#ffffff'
    @context.beginPath()
    @context.arc x, y, 10, 0, Math.PI * 2, false
    @context.closePath()
    @context.stroke()

  drawTouch: (touch, count, array)->
    @ellipse touch.pageX, touch.pageY
    @context.moveTo(touch.pageX, touch.pageY)
    if count is array.length - 1
      @context.lineTo(array[0].pageX, array[0].pageY)
    else
      @context.lineTo(array[count + 1].pageX, array[count + 1].pageY)
    @context.stroke()
  
  resize: (e)=>
    @canvas.width = @canvas.offsetWidth = window.innerWidth
    @canvas.height = @canvas.offsetHeight = window.innerHeight
  
  mouseDown: (e)=> 
    @mouseIsDown = true
  
  mouseUp: (e)=> 
    @mouseIsDown = false
  
  mouseMove: (e)=> 
    @ellipse(e.pageX, e.pageY) if @mouseIsDown

  touchMove: (e)=>
    e.preventDefault()
    @drawTouch(touch, count, e.touches) for touch, count in e.touches

window.onload = ->
  app = new App()

    


