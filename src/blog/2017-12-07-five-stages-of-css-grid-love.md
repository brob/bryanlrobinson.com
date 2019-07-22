---
title: The 5 Stages of Grid Love
categories:
- Development
- Grid
- CSS
layout: layouts/post.njk
description: Looking back on the past year, I've identified the five stages of my love with the CSS Grid Specification.
featuredImg: /images/grid-love-featured.jpg
featuredLarge: True
baseLayout: container--right
adSpace: 
  image: /images/common-grid-promo.jpg
  headline: Free ebook - Common CSS Grid Patterns
  description: CSS Grid is a revolution in web layout. With this ebook, I cover 3 design patterns that Grid solves easier, better and more creatively to help push our designs in better directions.
  linkText: Download Now!
  linkUrl: https://store.codecontemporary.com/solving-three-design-problems-with-css-grid/buy
---
<figure style="grid-column: 1 / 3; grid-row: 1 / 8;"><img src="/images/grid-love.jpg" alt="Grid Love"></figure>

December represents the month the I first fell in love with the CSS Grid specification. I redesigned my blog to use CSS Grid in December 2016 (before Grid was in browsers). Looking back on the past year, I've identified the five stages of my love with this specification.

## 1\. Some very smart people I respect are proponents

If you follow any CSS news, you'll know that 2017 was the year of Grid. However, two technology luminaries paved the way for Grid's adoption: Jen Simmons and Rachel Andrew.

At the time I learned about Grid, I was teaching an HTML/CSS course to college journalism students. Mid-way through each semester, I would show Jen Simmons' talk "[Modern Layouts: Getting Out of Our Ruts](http://jensimmons.com/presentation/modern-layouts-getting-out-our-ruts)."

In this talk, she mentioned lots of ways to change the way we design for the web. There's only a little bit of time spent on Grid, but it was enough to pique my interest. Watching this talk was my first introduction to Rachel Andrew's work.

If you're talking about Rachel Andrew and Grid, you're talking about [Grid by Example](http://gridbyexample.com). This is a great set of resources for learning the basics of how Grid works.

## 2\. A Simple Grid

Once you get past the basic examples, it's time to format your first grid.

The very first practical code you will write will be a simple grid with uniform columns.

This will blow. your. mind. It blew mine. The amount of design power that three lines of CSS will grant you is amazing.

{% highlight css %}

display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
grid-template-rows: 1fr 1fr 1fr 1fr 1fr;

{% endhighlight %}

I wrote a blog post -- [Make a More Flexible Cover Screen with CSS Grid](/blog/2017/03/21/grid-and-cover-pages/) -- that illustrates exactly what this is capable of.

## 3\. A Responsive Grid with No Breakpoints?!

Next you learn about the repeat() function and minmax().

With these two methods, you can replace a dozen lines of code with only three. Tutorial: [How To: Use CSS Grid Layout to Make a Simple, Fluid Card Grid](/blog/2017/07/26/howto-css-grid-layout-to-make-a-simple-fluid-card-grid/).

Trust me, you'll want to use this everywhere.

## 4\. Named Grid Areas

This feels like the future. I can create a string representation of my grid's areas and then assign my HTML elements to that area.

{% highlight css %}
    display: grid;
    grid-template-columns: 300px 50px 1fr;
    grid-template-areas: "header header header"
                         "sidebar  .    main"
                         "footer footer footer";
{% endhighlight %}

## 5\. Named Grid Lines

While named Grid Areas is nice, it's amazing how flexible you can make a design by naming grid lines.

In fact, every grid line can have multiple names. This allows for a designer to change an elements location on the fly. Instead of changing the entire grid for mobile, you can adjust how elements flow into the grid. You can do this in small ways as well as large.

I've played a lot with this functionality, but this blog post by Tyler Sticka is a great, simple primer on it: [Breaking out with CSS Grid Layout](https://cloudfour.com/thinks/breaking-out-with-css-grid-layout/)

## And much more

Of course, there's much more to love in Grid, but these stages feel like how adoption goes. 

1\. This looks neat

2\. Oh, yeah, I can do Bootstrap stuff on my own. This is neat

3\. Wait... wait. This is awesome for making simple grids... Like really awesome!

4\. Oh my God, my entire layout needs just got simplified!

5\. Power! Unimaginable Power! 

Yeah... that's how I feel. So much layout power.

How did you learn to love Grid? What are the killer features or workflows that you use?

{% include ad-space.html %}