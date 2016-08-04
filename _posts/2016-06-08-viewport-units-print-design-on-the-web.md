---
layout:   post
title:    "Viewport Units: Print Designs on the Web"
subtitle: "and how to make them less of a headache with mixins"
date:     2016-06-08 01:31:14 -0500
---

Responsive design has come a long way over the past few years with things like
media queries, flexbox, and a whole slew of templates and packages for making
a responsive grid layout. But certain design requirements have continued to be
a problem for web developers.

There are 11,500 results for a search of "responsive text"
on stack overflow, and 2,645 results for "maintain aspect ratio". These are
problems that I think come from the print world, where everything is laid out
exactly so on the page, and there's no concern of the user having a different
shaped magazine, or a newspaper that's in landscape mode.

While the web as a whole should adopt the idea of looking good everywhere,
rather than clinging on to the ideals of a bygone medium, there are plenty of
use cases on the web for a curated and well-defined experience. For me, I had
just such a case with the [okcupid about page](https://www.okcupid.com/about)
which inspired me to develop a technique to allow for that print-like
consistency, while not fussing with complicated units or javascript libraries.


## The Viewport Unit

Along came the viewport units, `vw`, `vh`, `vmin`, and `vmax`. These units
represent a percentage of the viewport's width, height, smaller of the two, and
larger of the two respectively. These seemed like great candidates for
maintaining consistency across devices because unlike traditional units that
determine the size of something regardless of its display, these units are
informed solely by the size of the viewport.

This lends itself to some pretty cool shortcuts. Instead of worrying about how
to make your element full width inside of a fixed width container, you just
add `width: 100vw;` and you're good to go. You can mix and match percentages
or pixels too, so if you wanted something to only be the size of its container,
you're free to use `width: 100%;` inside of a container thats width is in `vw`
units.

<div class="fauxquote onRight">
  <div class="fauxquote-quote">
    100% screen width elements inside of a fixed width relative parent? Sure,
    and I'll bet you can round corners without images too.
  </div>
  <div class="fauxquote-attribution">
    - Web Developer, circa '04
  </div>
  <div
    class="fauxquote-portrait"
    style="background-image: url('/img/misc/perplexed-old-man-4tone.png');"
  ></div>
</div>

But it gets a little tricky when you're trying to apply a design to viewport
units. Sure, those images may measure to be 280px in your mockup, but what
does that mean as compared to the viewport? You could measure it against the
size of the document as a whole, see that it's ~24.13% the size of the 1160px
window you're targeting, and set the element to `width: 24.13vw;`, and move on
to the next thing, but that's slow. We tend to always think of things in pixels,
and if you're an American who's ever tried to adjust to the metric system or a
24 hour clock, you know it's not easy to try to convert from a unit you're ever
so familiar with, and have a lot of tooling built around it, and change it in
to something unfamiliar.

<div class="fauxquote onLeft">
  <div class="fauxquote-quote">
    Oh god, it doesn't divide evenly. IT DOESN'T DIVIDE EVENLY!
  </div>
  <div class="fauxquote-attribution">
    - Developer, hand calculating vw's
  </div>
  <div
    class="fauxquote-portrait"
    style="background-image: url('/img/misc/perplexed-old-man.png');"
  ></div>
</div>

So wouldn't it be great if we could still think, speak, and design in pixels,
but have our code deal in viewport units?


## The Solution

If you're not using some kind of CSS preprocessor like Sass, Less, or something
of that vain, you'll probably want to start there. The important thing to note
is that we're going to be talking about a mixin (Think functions that can take
arguments to apply CSS rules intelligently) that will transform your pixels in
to viewport units.