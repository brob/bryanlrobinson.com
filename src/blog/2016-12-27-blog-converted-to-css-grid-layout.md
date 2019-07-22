---
title: I Converted My Blog to CSS Grid Layout and Regret Nothing
categories:
- Design
- Grid
- CSS
layout: layouts/post.njk
description: With the death of Lella Vignelli last week (Dec. 21, 2016), I read for the first time The Vignelli Canon. The layout of the pages inspired me. I knew that I wanted to give a quick update to some of my blog posts to mirror some of the design from that book -- a book that talks about grids, as well.
updated: 15 May, 2017
---

<div class="reference">
    <h2 style="font-size: 1.3em;">Update May 15, 2017</h2>
    <p>Since I published this piece, I've since converted even more of my site over to CSS Grid. If you're interested in my take on how to "Fallback" with CSS Grid, check out my post <a href="/blog/2017/01/18/your-code-should-fall-forward/" title="Falling Forward — Rethinking Progressive Enhancement, Graceful Degradation and Developer Morality">Falling Forward — Rethinking Progressive Enhancement, Graceful Degradation and Developer Morality</a> from January.</p>
</div>

With the death of Lella Vignelli last week (Dec. 21, 2016), I read for the first time The Vignelli Canon.

<aside class="reference">
    <p>The Vignelli Canon is amazing for a whole host of reasons other than just it's simple layout. If you're interested at all in design, <a href="http://www.vignelli.com/canon.pdf">please read it</a>.</p>
</aside>

The layout of the pages inspired me. I knew that I wanted to give a quick update to some of my blog posts to mirror some of the design from that book -- a book that talks about grids, as well.

To do this, I decided to convert my blog posts to CSS Grid Layout.

With the release of this blog post, I'm also releasing the updated code into the wild.

<aside class="reference">
    <p>Author's Note: This is no longer an issue. This was a problem of a percentage width being set on my right-side content. Apparently, percentage widths are not friendly toward grid height calculation.</p>
</aside>

This is a super simple implementation <span style="text-decoration: line-through">and doesn't look quite right in the Firefox Developer build, due to height bugs</span> <span style="font-size: .7em;">(more in author's note)</span>, but it's really nice in other experimental browsers -- such as Chrome with the experimental flag checked.


I've only converted one other blog post to the new layout at this point. Fittingly, it's my post on [Grid and Feature Queries](/blog/2016/12/17/feature-queries-on-the-rise/).

<aside class="reference">
    <p>If you're looking at this and all you see is a centered column, your browser doesn't support Grid yet. <a href="https://developers.google.com/web/updates/2014/03/Get-on-the-CSS-Grid">Find out how to enable Grid to see this as intended</a>.</p>
</aside>

I won't dive into too many details, but here's a snippet of some of the CSS I'm using to accomplish this layout.

<aside class="reference">

<p>If you're interested in more, <a href="http://codepen.io/brob/pen/ZBZqOQ">here's a CodePen where I'm experimenting more with layout</a>. This is also where I started laying this out.</p>

</aside>

{% highlight scss %}

.post {
    /* Sets this to be a grid,
    defines the columns and adds margin between rows */

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-row-gap: calc(.8rem + .5vw);
}

.post > p, .post > iframe, .post > .highlight {
    /* Sets my blog content to span the last 3 columns
    (using > p instead of a class
    to make my life easy with markdown) */

    width: 100%;
    grid-column: 3 / span 3;
}

aside {
    /* Sets asides to start at the first column line
    and spans the aside 2 columns */
    grid-column: span 2;
}

{% endhighlight %}

<aside class="subhead">
    <h2>A couple example posts</h2>
</aside>

For those that don't want to deal with adjusting the flags in their browsers to see both versions, here are two side-by-side examples of the differences in the blog posts.


<aside class="reference">
    <p>This post's implementation. On the left: CSS Grid. On the right: Fallback to non-supported browsers</p>
</aside>
![Example Grid Layout Number 1](/images/blog/grid/side-by-side2.jpg)

<aside class="reference">
    <p><a href="/blog/2016/12/17/feature-queries-on-the-rise/">My post on Feature Queries</a>. On the left: CSS Grid. On the right: Fallback to non-supported browsers</p>
</aside>

![Example Grid Layout Number 1](/images/blog/grid/side-by-side.jpg)

<aside class="subhead">
    <h2>Update</h2>
    <p>Jan. 11, 2017</p>
</aside>

Edge supports Feature Queries, unlike its predecessor. So, it was able to see my Grid declarations. To fix this for my Edge viewers -- since Edge has a VERY broken implementation of Grid -- I implemented a second level of Feature Query to account for browsers that support Grid (which Edge TECHNICALLY does) but also don't support -ms-grid (which Edge does, as well) to keep Edge from seeing display: grid.

The Feature Query now looks like this (could be more elegant, but my libsass doesn't like compound Feature Queries right now):

<aside class="subhead">
    <h2>Update</h2>
    <p>May 24, 2017</p>
    <p>Thanks to the excellent <a href="https://twitter.com/gregwhitworth" title="Greg Whitworth's twitter account">@gregwhitworth</a> on Twitter, I have a much better feature query that will allow Edge to see the Grid when the newest version releases. Updated to the right. </p>
</aside>

{% highlight scss %}

@supports (grid-auto-rows: 1px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-row-gap: calc(.8rem + .5vw);
    > p, iframe, .highlight {
        grid-column: 3 / span 3;
        width: auto;
    }
}

{% endhighlight %}

I originally ended the post by sarcastically saying "Thanks Microsoft." As it turns out, this isn't the worst thing in the world with the May 24th @supports update. So, "Thanks Microsoft for having someone looking out for us."
