$ = require("jquery")
_ = require("underscore")
Hexes = require("libs/hexes")

noTransTimeout = null

window.Home = {
  register: ->
    $(window).on("load", ->
      Home.init()
      $(".site").addClass("isLoaded")
      $(window).trigger("resize")
      $(window).trigger("scroll")
    )

  init: ->
    @Data = {
      onScrolls: []
      onResizes: []
      window: {
        scrollTop: 0
        height: 0
        width: 0
      }
    }

    @Dom = {
      body: $("body")
      header: $(".site-header")
      hexes: $(".intro-hexes")
      projects: $(".project")
      scrollers: $("[data-scroll-trigger]")
      smoothAnchors: $("[data-smooth-anchor]")
      lazyBgs: $("[data-lazy-bg]")
    }

    setTimeout( =>
      ###
      Replacements, in order of cool:
      http://codepen.io/isuttell/pen/OPVELL
      http://codepen.io/katydecorah/pen/fFlpk
      http://codepen.io/podrivo/pen/EBtpk
      http://codepen.io/magnus16/pen/rhEIl

      @Data.hexes = new Hexes(@Dom.hexes, {
        length: 60
        count: 25
        speed: 45.0
        dieChance: 0.03
        background: '43, 45, 66'
      })
      window.hexes = @Data.hexes
      ###
    , 1000)

    @bind()

  bind: ->
    $window = $(window)
    @Data.window.scrollTop = $window.scrollTop()
    @Data.window.height = $window.height()
    @Data.window.width = $window.width()

    $(window).on("resize focus", (ev) =>
      @Dom.body.addClass("notransition")
      $window = $(window)
      @Data.window.scrollTop = $window.scrollTop()
      @Data.window.height = $window.height()
      @Data.window.width = $window.width()
      for fn in @Data.onResizes
        fn(ev)

      clearTimeout(noTransTimeout)
      noTransTimeout = setTimeout( =>
        @Dom.body.removeClass("notransition")
      , 40)
    )
    $(window).on("scroll", (ev) =>
      $window = $(window)
      @Data.window.scrollTop = $window.scrollTop()
      for fn in @Data.onScrolls
        fn(ev)
    )

    @bindHeader()
    @bindHeaderLinks()
    @bindSmoothAnchors()
    @bindScrollers()


  # Mark header as transparent or not based on scroll.
  bindHeader: ->
    fn = =>
      target = @Data.window.height / 2
      @Dom.header.toggleClass("isTransparent", @Data.window.scrollTop < target)

    @Data.onScrolls.push(fn)
    @Data.onResizes.push(fn)


  # Mark links as active or not based on scroll.
  bindHeaderLinks: ->
    activeLink = null
    headerLinks = []
    @Dom.header.find("[data-smooth-anchor]").each((idx, el) ->
      $target = $(el.hash)
      return if !$target.length
      headerLinks.push({
        el: $(el)
        target: $target
      })
    )

    retargetHeaderLinks = =>
      for link in headerLinks
        link.scrollTop = link.target.offset().top - @Data.window.height / 2

    markActiveLink = =>
      for link in headerLinks
        if @Data.window.scrollTop > link.scrollTop
          return if activeLink == link.el
          activeLink?.removeClass("isActive")
          activeLink = link.el
          activeLink.addClass("isActive")
          return
      activeLink?.removeClass("isActive")

    retargetHeaderLinks()
    @Data.onScrolls.push(markActiveLink)
    @Data.onResizes.push(retargetHeaderLinks)
    @Data.onResizes.push(markActiveLink)


  # Clicking on # hrefs will scroll to them, not jump.
  bindSmoothAnchors: ->
    @Dom.smoothAnchors.on("click", (ev) =>
      return if !window.history
      $target = $(ev.currentTarget.hash)
      return if !$target.length

      ev.preventDefault()
      window.history.replaceState(null, null, ev.currentTarget.hash)

      $("html, body").animate({
        scrollTop: $target.offset().top - @Dom.header.height() + 1
      }, 600)
    )


  # Scroller functions automatically add / remove classes to elements
  # as they're scrolled past.
  bindScrollers: ->
    @cacheScrollers()

    @Data.onResizes.push(_.debounce( =>
      @cacheScrollers()
    , 100))

    @Data.onScrolls.push( =>
      @checkScrollers()
    )

  cacheScrollers: ->
    @Data.scrollers = []
    @Data.lazyBgs = []

    @Dom.scrollers.each((idx, el) =>
      $el = $(el)
      trigger = $el.offset().top + ($el.height() / 2) - (@Data.window.height / 2)

      @Data.scrollers.push({
        trigger: trigger
        toggle: $el.is("[data-scroll-toggle]")
        el: $el
      })
    )

    @Dom.lazyBgs.each((idx, el) =>
      $el = $(el)
      trigger = $el.offset().top - @Data.window.height * 1.4
      @Data.lazyBgs.push({
        trigger: trigger
        bg: $el.data("lazy-bg")
        el: $el
      });
    )

  checkScrollers: ->
    for scroller in @Data.scrollers
      if @Data.window.scrollTop >= scroller.trigger
        scroller.el.addClass("isScrolled")
      else if scroller.toggle
        scroller.el.removeClass("isScrolled")

    for lazyBg in @Data.lazyBgs
      continue if lazyBg.loading
      if @Data.window.scrollTop >= lazyBg.trigger
        lazyBg.loading = true
        @loadBg(lazyBg.el, lazyBg.bg)



  loadBg: (el, bg) ->
    img = new Image()
    img.onload = ->
      el.css("background-image", "url('#{bg}')")
      el.addClass("isLoaded")
    img.src = bg
}
