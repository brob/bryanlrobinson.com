---
layout: layouts/post.njk
title: Modern CSS: Four Things Every Developer and Designer Should Know About CSS
categories:
  - development
  - design
  - CSS
featuredImg: /images/modern-css-promo.png
featuredLarge: true
baseLayout: container--right
description: Contrary to popular belief, CSS is an absolute delight. Many developers I talk to think the phrase "Modern CSS" is an oxymoron. If you haven’t been watching the growth and maturity of CSS in the past 5 years, you’re doing yourself a disservice. 
grid-size: large
---

## Contrary to popular belief, CSS is an absolute delight. 

Many developers I talk to think the phrase "Modern CSS" is an oxymoron. If you haven’t been watching the growth and maturity of CSS in the past 5 years, you’re doing yourself a disservice. 

In this article, I’ll outline the four things that excite me every day about the state of CSS in 2018.

## Layout is no longer hard with CSS Grid and Flexbox

Welcome to the new world order. Gone are the days of float-based layouts. Gone are the headaches of width calculations and hacks.

Unlike floats, the Flex and Grid specifications were written specifically for complex and fluid designs. 

### Flexbox

The Flexible Box Module is a CSS Specification intended for fluid user interfaces. Take for example, the beginning of the Abstract from the specification:

> `The specification describes a CSS box model optimized for user interface design. In the flex layout model, the children of a flex container can be laid out in any direction, and can "flex" their sizes, either growing to fill unused space or shrinking to avoid overflowing the parent.`

Flex makes layout of boxes in one direction uncomplicated. Beyond that, it codifies many of the design patterns we had used floats for. 

Want your three promotional spaces to always be the same height? The default value for `align-items` is `stretch` and makes this happen in zero lines of code.

**Resources**

*   [CSS-Tricks' A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - This is the definitive visual guide for what all the terms and properties mean. When I learned, I played with code and referenced this page.
*   [How Flexbox works — explained with big, colorful, animated gifs](https://medium.freecodecamp.org/an-animated-guide-to-flexbox-d280cf6afc35) - A simple visual introduction.
*   [Flexbox Froggy](http://flexboxfroggy.com/) - Flexbox Froggy is a fun and free game that teaches the core concepts of flex. This is a great start for those looking to learn via play.
*   [Flexbox Zombies](https://geddski.teachable.com/p/flexbox-zombies) - Flexbox Zombies has a little more production value than Froggy and a cool motif. This course used to be a paid resource, but now is free.
*   [Flexbox: Let's start simple](https://bryanlrobinson.com/blog/2016/05/02/flexbox-lets-start-simple/) - My starting point blog post for folks looking to learn flex.

### CSS Grid

In 2017, our industry saw one of the fastest and most streamlined implementations of a new browser feature. CSS Grid went from zero support to 100% modern browser support in under a year. This is huge.

CSS Grid is a layout specification meant work together with Flexbox.

Where Flexbox works from the content out, Grid works from the layout in.

For the first time ever, we can specify a layout mode on the page and have our content reliably enter across TWO dimensions.

It's little secret that I love CSS Grid. The majority of the posts I make on this site are about it. 

If you've ever wanted to stretch content across multiple rows without additional markup, this is your time. 

If you've ever wanted to place content in specific areas without the drawbacks of absolute positioning, this is your time.

If you've ever wanted to create refreshing, unique layouts, this is absolutely the time to be doing web design.

**Resources**

*   [CSS Tricks' A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) - Much like their guide to Flexbox, this is a great representation of Grid's properties and values.
*   [Grid by Example](https://gridbyexample.com/) - Rachel Andrew's Grid by Example is a great resource for learning Grid ... by examples.
*   [Five Design Fears to Vanquish with CSS Grid](https://css-tricks.com/five-design-fears-vanquish-css-grid/) - My article on CSS Tricks for the design promise of Grid.
*   [Learn CSS Grid](http://jensimmons.com/post/feb-27-2017/learn-css-grid) - An older collection of resources on CSS Grid compiled by the amazing Jen Simmons.
*   [Grid Garden](http://cssgridgarden.com/) - Learn the syntax of Grid with this fun browser game.
*   [Grid Critters](https://gridcritters.com/p/gridcritters) - Back for more from Flexbox Zombies, Dave Geddes created Grid Critters - a sci-fi grid mastery game. If you have an education budget, this is where you should spend it.

## Graphical Manipulation is possible with filters and blend modes

Colors and effects used to be the purview of Photoshop or JavaScript. Now they're a first-class citizen of CSS with filters and blend modes.

With CSS Blend Modes, web developers now have an opportunity to use image manipulation blend modes such as multiply and screen.

There are a lot of practical applications to this. There are also a lot of applications that will make designers very, very happy.

While writing this post, I got sidetracked and made this fun little example:

<iframe style="grid-column-start: 1;" height='400' scrolling='no' title='Fun with blend-mode use' src='//codepen.io/brob/embed/pLRJgm/?height=300&theme-id=26704&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/brob/pen/pLRJgm/'>Fun with blend-mode use</a> by Bryan Robinson (<a href='https://codepen.io/brob'>@brob</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
<br>

CSS Filters give developers a load of image manipulation options. Some of my favorites are contrast and hue-rotate.

From a practical perspective, there are quite a few hover state or overlay applications.

I was tempted and made a fun hover state for an image in a few lines of code:

<iframe height='400' scrolling='no' title='Animate blur' src='//codepen.io/brob/embed/ZxLywv/?height=300&theme-id=26704&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/brob/pen/ZxLywv/'>Animate blur</a> by Bryan Robinson (<a href='https://codepen.io/brob'>@brob</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
<br>

**Resources**

*   [Art the Web](http://arttheweb.com/) - A collection of tutorials, articles and talks about mixing blend modes and filters from the amazing mind of Una Kravets.
*   [Compositing and Blending in CSS](https://www.sarasoueidan.com/blog/compositing-and-blending-in-css/) - Sara Soueidan's article on the art and science of using these tools.
*   [Basics of  CSS Blend Modes](https://css-tricks.com/basics-css-blend-modes/) - Chris Coyier's primer on blend modes.

## Guard against the cascade, but don’t forsake it

There are many thought pieces written about CSS. Many of them center around the global nature of the cascade (the "C" in "CSS).

There's a growing faction of developers who feel that the cascade has become a liability. It's too easy for styles to bleed between components. I won't argue that it IS easy for styles to leak in a global way, but the cascade is your friend.

It's sometimes your friend that gets you into trouble, but that can make the most memories.

I won't add to the thought piece clutter, except to say this:

> Using the cascade for sensible global styles is at the forefront of a maintainable website. Encapsulated styles for components that don't depend on global styles is also extremely important.

Finding the appropriate mix of global and scoped is the key. It's also the key in many programming languages. 

I use a mix of strong, sensible global styles and BEM in my CSS. Other's mileage may vary. Just remember, "Cascade" is not a dirty word.

**Resources**

*   [CSS Inheritance, the Cascade and Global Scope](https://www.smashingmagazine.com/2016/11/css-inheritance-cascade-global-scope-new-old-worst-best-friends/) - I don't agree with EVERYTHING in this post, but many of the points are what I try to drive home regularly.
*   [BEM's site](http://getbem.com/)

## CSS Selectors are more powerful than you know

I was chatting with a developer friend of mine a few months back. He was working through an issue in his CSS. Someone who is a great developer and quite good at CSS.

He wanted the ability in SASS to specify that an element didn't meet a certain criteria.

"You know if this element is a .X but NOT .Y," he said.

I looked at him a little confused. "What do you mean?"

He explained again. 

"Well, I don't know about SASS on this, but have you tried a CSS :not selector?"

All this to say CSS is a HUGE area of expertise and even talented developers miss functionality.

In 2018, CSS selectors are more than element selectors, ID selectors and class selectors.

The :not selector is a great exclusionary selector. When you want all list items that are NOT active

{% highlight css %}
li:not(.active) {
    color: red;
}
{% endhighlight %}

Sibling selectors are also quite powerful. There are adjacent siblings (siblings next to each other in the source) and general siblings (may be seperated by other siblings).

I use sibling selectors in this [example of a CSS-only mobile navigation](https://bryanlrobinson.com/blog/2017/08/02/css-only-mobile-slide-out-navigation/). Adjacent siblings are the basis for the "lobotomized owl" reset pattern `* + *`

If you're only using classes to select you're missing out on some fun.

**Resources**

*   [CSS Diner](https://flukeout.github.io/) - A fun learning game for all the CSS selector types.
*   [CSS Tricks Almanac](https://css-tricks.com/almanac/) - The CSS Tricks Almanac has a page for every single selector.
*   [Useful :nth-child Recipes](https://css-tricks.com/useful-nth-child-recipies/) - I use :nth-child a LOT. This handy article gives some typical patterns to use.

## CSS is Wonderful

CSS in 2018 is fun. It's wonderful. If you're not enjoying CSS right now, you're not having enough fun in your work.

What are your favorite pieces of Modern CSS?