---
layout: "layouts/post.njk"
title: "3 underused CSS features to learn for 2020"
categories:
  - development
  - design
  - css
baseLayout: container--right
description: "CSS has a whole lot of power. There are properties and values for any number of amazing designs. With all that power comes a lot to remember. If you don't know about all the tools in your toolbox, how will you find the right one for the job? In this post, we'll take a look at three lesser-used, but super useful tools for various jobs in CSS."
featuredImg: /images/css-features-featured-image.png
featuredLarge: True
adSpace: 
  image: /images/common-grid-promo.jpg
  headline: Free ebook - Common CSS Grid Patterns
  description: CSS Grid is a revolution in web layout. With this ebook, I cover 3 design patterns that Grid solves easier, better and more creatively to help push our designs in better directions.
  linkText: Download Now!
  linkUrl: https://store.codecontemporary.com/solving-three-design-problems-with-css-grid/buy
---

![Banner image featuring multi-column vector illustration with title "CSS Features for 2020"](/images/css-features-banner.svg)

CSS has a whole lot of power. There are properties and values for any number of amazing designs. With all that power comes a lot to remember.

If you don't know about all the tools in your toolbox, how will you find the right one for the job?

In this post, we'll take a look at three lesser-used, but super useful tools for various jobs in CSS.

## 1\. How to have readable line-lengths with the `ch` unit

There is a plethora of amazing length units in CSS, so why let `px` and `rem`s have all the fun?

[We've known for a long time](https://www.smashingmagazine.com/2014/09/balancing-line-length-font-size-responsive-web-design/) that line length has a lot to do with how easily a person can read content. We've had more issues determining the proper size with static lengths like pixels. Enter the `ch` length unit in CSS.

The definition of the `ch` unit is the width of the `0` character in the current font size. While not perfect, this allows us to specify a width for a column of content to be equal to an "ideal" number of characters. In the Smashing Magazine article linked above, the author indicates a comfortable line length to be between 45 and 85 characters wide. Instead of doing calculations and figuring out the proper amount of pixels, we can substitute the "character unit" to keep things balanced.

{% highlight css %}
.centered-column {
    width: 90vw;
    max-width: 75ch;
    margin-left: auto;
    margin-right: auto;
}
{% endhighlight %}

With this snippet, you now have a centered column that will never exceed a maximum recommendation.

If you adjust the font size at various breakpoints, the max-width of the column will expand or contract. If you decide to change fonts, the max-width will adjust.

The one caveat I'll throw in here is that you don't want to use this for precise measurements. This should always be approximations. Since the `ch` unit keys off of the `0` glyph in the font, greater or fewer characters may be on each line. Take this relatively simple example.

![Image showing four 0s side by side and a group of Ms where only 2 Ms fit next to each other](/images/ch-warning.svg)

In the image above, only two `M` characters fit side by side in the same space as four `0` characters. That's because each capital M is roughly 36 pixels wide; each 0 is 20 pixels. Combine this with each font having different glyphs and you get something not precise. Since our code example doesn't worry about precision and just wants the line length _around_ 75 characters wide, we're safe.

## 2\. How to simplify your CSS with CSS Attribute selectors

I'm not overly surprised that `ch` units don't have much popularity. They feel very tied in with design concerns. Attribute selectors, however, shock me in their lack of use. They're so versatile and feel very programatic.

At their core, Attribute selectors allow you to select an HTML element that has a specific attribute or has a certain value of an attribute.

One of my favorite new uses of the attribute selector comes from [Andy Bell's amazing new CSS reset](https://hankchizljaw.com/wrote/a-modern-css-reset/).

In his reset -- which is full of well-thought-out configurations -- he uses attribute selectors to remove margins and paddings only from `ul`s and `ol`s that have classes. The thinking being that if you set a class on the item, you probably are resetting the list's styles. If you don't have a class, you probably want a bulleted or numbered list.

{% highlight css %}
ul[class],  
ol[class] {  
   padding: 0;  
   margin: 0;
}
{% endhighlight %}

You could also apply this to anchor tags that have a `target` attribute. Use this in conjunction with an `::after` element to add a small icon for links that will take a user into a popup window.

{% highlight css %}
a[target] {
    padding-right: 2ch;
}

a[target]::after {
    background-image: url(icon.svg);
    width: 1.75ch;
    height: 1em;
    ...etc.
}
{% endhighlight %}

Using that same method for icons, you could apply a Twitter logo to any URLs that begin with Twitter's URL.

{% highlight css %}
a[href^="https://twitter.com"] {
    ...styles
}
{% endhighlight %}

This will target any anchor tag with an `href` that _starts_ with the string "https://twitter.com".

Conversely, you can also check the end of a string for perhaps `.pdf` to find all the links to PDFs on the page.

{% highlight css %}
a[href$=".pdf"] {
    ...styles
}
{% endhighlight %}

There are so many handy recipes you can concoct with the attribute selectors. I wish more people knew about them and used them.

## 3\. How to create multiple columns of flowing text or elements with CSS Multi-column

![Image of multicolumn in 3 columns at desktop and 2 at tablet](/images/multi-column-image.svg)

Even before CSS Grid became available, we could do some minor work in columns outside of tables. CSS Multi-column is a specification that allows us to have text and elements flow through multiple columns.

You can use it with any amount of text and give it either a specific number of columns or a column-width to match against.

This can create interesting interstitial layouts in the middle of a blog post.


{% highlight css %}

.column-content {
    column-width: 250px; /* Columns with max-width of 250px
/*  column-count: 2;   Always 2 columns */
    column-gap: 2rem;     /* Columns with 2rem of space in between */
}
{% endhighlight %}

There's even more you can do with things like `column-rule` for borders, and `column-span` to create breaks in your columns for new headers.

## A bright future for CSS with the past

While the second half of the 2010s has been amazing for new CSS (things like Flexbox and Grid), it's important to remember there are a lot of additional powers from the past.

The features mentioned in this post have been in browsers for years and don't get a lot of use. While experimenting with new cool toys this holiday season, don't forget to remember the past cool toys.

## Question: What CSS feature do you think is underutilized by the industry as a whole?

Send me a [Tweet to let me know](https://twitter.com/intent/tweet?url=https%3A%2F%2Fbryanlrobinson.com%2Fblog%2Fthree-underused-css-features-to-learn-for-2020%2F&text=My%20favorite%20underused%20CSS%20feature%20is%20...).
