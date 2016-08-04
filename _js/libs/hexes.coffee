BASE_RAD = Math.PI * 2 / 6

class Hexes
  playing: false
  lastTime: 0
  canvas: null
  context: null

  width: 0
  height: 0
  centerX: 0
  centerY: 0
  dieW: 0
  dieH: 0


  constructor: (el, config = {}) ->
    # Initialize config
    @lines = []
    @config = {
      length: 20
      count: 50
      baseTime: 10000
      addedTime: 10000
      dieChance: 0.05
      speed: 80.0
      lineSize: 3

      spawnChance: 1
      sparkChance: 0.10
      sparkDistance: 15
      sparkSize: 3

      background: '0, 0, 0'
      color: 'hsl(hue,100%,light%)'
      repaintAlpha: 0.04
      hueChange: 5

      baseLight: 50
      addedLight: 10
      timeShadowRatio: 6
      baseLightMultiplier: 0.01
      addedLightMultiplier: 0.02
    }
    for attr, val of config
      @config[attr] = val if @config[attr]?

    @updateCanvas(el)
    @start()

    window.addEventListener('resize', =>
      if @playing then @updateCanvas(@canvas)
    )

    return @

  start: ->
    @playing = true
    window.requestAnimationFrame(@draw.bind(@))
    return @


  stop: ->
    @playing = false
    return @


  draw: (time) ->
    return if !@playing

    delta = 0
    if @lastTime
      delta = time - @lastTime
    delta = delta * @config.speed

    @context.globalCompositeOperation = "source-over"
    @context.shadowBlur = 0
    @context.fillStyle = "rgba(#{@config.background}, #{@config.repaintAlpha})"
    @context.fillRect(0, 0, @width, @height)
    @context.globalCompositeOperation = "lighter"

    if @lines.length < @config.count && Math.random() < @config.spawnChance
      @lines.push(new HexLine(@))

    for line, i in @lines
      line.draw(delta, i)

    @lastTime = time
    window.requestAnimationFrame(@draw.bind(@))
    return @

  updateCanvas: (el) ->
    if el.jquery
      el = el.get(0)

    rect = el.getBoundingClientRect()
    el.width = rect.width
    el.height = rect.height
    @canvas = el
    @context = el.getContext("2d")
    @width = el.width
    @height = el.height

    @centerX = @width / 2
    @centerY = @height / 2

    @dieX = @centerX / 2 / @config.length
    @dieY = @centerY / 2 / @config.length
    return @


class HexLine
  constructor: (parent) ->
    @parent = parent
    @reset()

  draw: (delta, i) ->
    if @stepLifetime >= @targetLifetime
      @begin()

    cfg = @parent.config
    prop = @stepLifetime / @targetLifetime
    wave = Math.sin(prop * Math.PI / 2)
    x = @addedX * wave
    y = @addedY * wave
    drawX = @parent.centerX + (@x + x) * cfg.length
    drawY = @parent.centerY + (@y + y) * cfg.length
    lightMultiplier = Math.sin(@lifetime * @lightMultiplier)
    light = cfg.baseLight + cfg.addedLight * lightMultiplier

    @parent.context.shadowBlur = prop * cfg.timeShadowRatio
    @parent.context.fillStyle = @color.replace("light", light)
    @parent.context.shadowColor = @parent.context.fillStyle
    @parent.context.fillRect(drawX, drawY, cfg.lineSize, cfg.lineSize)

    if Math.random() > cfg.sparkChance
      @parent.context.fillRect(
        @getRandomCoord(drawX, cfg.sparkSize, cfg.sparkDist),
        @getRandomCoord(drawY, cfg.sparkSize, cfg.sparkDist),
        cfg.sparkSize, cfg.sparkSize
      )

    @lifetime += delta
    @stepLifetime += delta


  reset: ->
    @lifetime = 0
    @x = 0
    @y = 0
    @addedX = 0
    @addedY = 0
    @rad = 0
    @color = @parent.config.color.replace("hue", @parent.lastTime * @parent.config.hueChange / 1000)
    @lightMultiplier = @parent.config.baseLightMultiplier * @parent.config.addedLightMultiplier
    @begin()


  begin: ->
    @x += @addedX
    @y += @addedY
    @stepLifetime = 0
    @targetLifetime = @parent.config.baseTime + @parent.config.addedTime * Math.random()

    @rad += BASE_RAD * (if Math.random() < .5 then 1 else -1)
    @addedX = Math.cos(@rad)
    @addedY = Math.sin(@rad)

    if Math.random() < @parent.config.dieChance
      @reset()
    else if @x > @parent.config.dieX || @x < -@parent.config.dieX
      @reset()
    else if @y > @parent.config.dieY || @y < -@parent.config.dieY
      @reset()


  getRandomCoord: (seed, size, mult) ->
    dir = if Math.random() < .5 then 1 else -1
    return seed + Math.random() * mult * dir - size / 2


module.exports = Hexes
