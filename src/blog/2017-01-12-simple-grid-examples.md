---
title: Start Exploring the Magic of CSS Grid Layout
categories:
- Design
- Grid
- Tutorial
- CSS
layout: layouts/post.njk
description: Grid is an amazing new CSS Specification coming to major browsers in 2017. When it’s ready for use in production, it’s going to drastically change the way we do layout on the web. Currently, there’s no real browser support. Edge and IE10/11 "support" grid, but they implemented an early version of the specification and it’s significantly broken.
---

Grid is an amazing new CSS Specification coming to major browsers in 2017. When it’s ready for use in production, it’s going to drastically change the way we do layout on the web.

<aside class="reference">
    <p>If you're worried about browser support, <a href='/blog/2017/01/18/your-code-should-fall-forward/'>don't have a "fallback," "fall forward" into Grid</a>.</p>
</aside>

Currently, there’s no real browser support. Edge and IE10/11 "support" grid, but they implemented an early version of the specification and it’s significantly broken.

<aside class="reference">

    <p>This may be a bit of a strawman, but I've heard these three things multiple times now. I promise, the "amazing" team will eventually convince all the nay-sayers.</p>

</aside>

To my way of thinking, there are currently three camps in the discussions around CSS Grid Layout: "I think this is amazing," "I don’t see the use case, I’ll stick with flexbox" and "That’s great, but I won’t be able to use it for the next 5 years so what’s the point?" I hope this will begin to chip away at the two negative points of view to take a deeper look into Grid and provide my buddies in the "amazing" crowd with some basics to start playing with the specification themselves.

<aside class="subhead">
    <h2>Why Grid and not Flexbox?</h2>
    <aside class="reference"><p>— <a href="http://lists.w3.org/Archives/Public/www-style/2013May/0114.html">Tab Atkins on the CSS W3C mailing list</a> about the importance of set of complimentary layout specifications</p> </aside>
</aside>

"Flexbox is for one-dimensional layouts - anything that needs to be laid out in a straight line (or in a broken line, which would be a single straight line if they were joined back together). Grid is for two-dimensional layouts. It can be used as a low-powered flexbox substitute (we’re trying to make sure that a single-column/row grid acts very similar to a flexbox), but that’s not using its full power."

For simple rows of content, Flexbox is still what you want to use. It works really well for flexible content flowing in one direction. Grid comes in when you want to place and stretch content blocks across both the horizontal and vertical axes.

Let’s walk through a very simple implementation to see the difference.

<aside class="subhead">
    <h2>As Simple as it can get</h2>
    <aside class="reference"><p>You can view this example on CodePen <a href="http://codepen.io/collection/AxZgro/">in my collection on CSS Grid Simple Examples</a>.</p> </aside>
</aside>

<iframe width="853" height="480" src="https://www.youtube.com/embed/euhahD_lD2I?rel=0" frameborder="0" allowfullscreen></iframe>

In this video, I take some very simple markup and apply a very simple grid layout to it, emphasizing the concept of multi-dimensional layout.

With very simple styling, we can make a div span across not just horizontal borders, but across vertical as well. Something that requires much more markup for Flexbox to accomplish.

<aside class="subhead">
    <h2>A bit more complex</h2>
</aside>

<iframe width="853" height="480" src="https://www.youtube.com/embed/MX6qkMKrtoY?rel=0" frameborder="0" allowfullscreen></iframe>

If you're looking for a little more spice to your layout or wanting to do mosaic tiling -- in the sense of a "Pinterest" layout -- you can use a few more properties and create various sized divs that automatically have any holes in the layout backfilled by a placement algorithm that's now going to be built into the browser.

Instead of relying on JavaScript libraries like Masonry, we can handle all of this in CSS by using the grid-auto-flow property and setting it to 'dense.'

This is just the tip of the iceberg when it comes to Grid Layout and the fun really begins when you start placing real content on the page.

Take a look at this simple banner concept done in Grid on CodePen. It would require three more container divs to truly make this design work in just Flexbox. I wouldn't even attempt this layout with floats, personally.

<aside class="reference">

    <p>If you're not seeing an awesome layout over there in that CodePen, you don't have Grid supported. <a href="https://developers.google.com/web/updates/2014/03/Get-on-the-CSS-Grid">Find out how to enable it in your browser here &raquo;</a></p>

</aside>

<iframe height='717' scrolling='no' title='Simple Banner area Grid concept' src='//codepen.io/brob/embed/EZPWdK/?height=717&theme-id=26704&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/brob/pen/EZPWdK/'>Simple Banner area Grid concept</a> by Bryan Robinson (<a href='http://codepen.io/brob'>@brob</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

If you don't have Grid enabled yet, here's an image to see what's interactive in the screen above:

![An Image in case you don't want to turn on your Grid flag](/images/blog/grid-example/banner-grid-layout.png)

Grid is going to allow us to have cleaner, more semantic markup and change layout on the fly much easier in CSS without having to reorder elements on the page.

<br>
