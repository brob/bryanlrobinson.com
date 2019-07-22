---
title: How To&#58; Use CSS Grid Layout to Make a Simple, Fluid Card Grid
categories:
- Development
- Design
- Grid
- Tutorial
- CSS
layout: layouts/post.njk
description: In this tutorial, I'm going to show you how to take one of the most common tropes of web design -- the card grid -- and make it fluid. 
featuredImg: /images/blog/fluid-grid/featured-grid.png
featuredLarge: True
baseLayout: container--right
updated: 14 Aug, 2018
adSpace: 
  image: /images/common-grid-promo.jpg
  headline: Free ebook - Common CSS Grid Patterns
  description: CSS Grid is a revolution in web layout. With this ebook, I cover 3 design patterns that Grid solves easier, better and more creatively to help push our designs in better directions.
  linkText: Download Now!
  linkUrl: https://store.codecontemporary.com/solving-three-design-problems-with-css-grid/buy
---

In this tutorial, I'm going to show you how to take one of the most common tropes of web design -- the card grid -- and make it fluid. 

We could build this via a float- or flex-based grid and a handful of breakpoints. Why deal with breakpoints if Grid Layout can handle everything for us?

Grid can do so much more than recreating old design patterns. If you're looking for a good place to start, though, this is the best introduction to its power.

## Video: For those who learn by watching
<div class="" style="position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; margin-bottom: 1rem;">
<iframe style="position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;" width="560" height="315" src="https://www.youtube.com/embed/5fUKd2kDTzc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

## Step 1: Create your markup

In this example, I've got a simple card with a title, photo, description and link. I've duplicated this markup 10 times to have content to show the grid in action.

Place all the .card items inside a .card-container element.

<div class="pull-1">
{% highlight html %}
<section class="card-container">
    <article class="card">
        <header class="card__title">
            <h3>Hello World</h3>
        </header>
        <figure class="card__thumbnail">
            <img src="http://placekitten.com/700/287">
        </figure>
        <main class="card__description">
            Lorem Ipsum dolor amet sun Lorem Ipsum dolor amet sun Lorem Ipsum dolor amet sun
        </main>
        <a href="#" class="button">Call to Action</a>
    </article>
</section>
{% endhighlight %}
</div>

{% include ad-space.html %}

## Step 2: Visually style your cards

In this case, I chose very simple style elements. You can style your cards however you would like. Keep in mind that your styles and cards should work at multiple sizes, as we're building a fluid grid. Don't use direct pixel values to avoid odd spacing.

{% highlight css %}
.card {
    box-shadow: 0px 1px 5px #555;
    background-color: white;
}
.card__title {
    font-size: 2rem;
    padding: .5rem;
}
.card__description {
    padding: .5rem;
    line-height: 1.6em;
}
.button {
    display: block;
    background-color: tomato;
    padding: 10px 20px;
    color: white;
    text-decoration: none;
    text-align: center;
    transition: .3s ease-out;
}
{% endhighlight %}

## Step 3: Define your Grid

We'll start by changing the display value of our .card-container from "block" to "grid." This will create the grid context for the cards.

Using that context, we'll define our "grid-template-columns." This is where the fun begins. We could specify a finite number of columns, but then we'd be in the same situation as a flex or float grid.

Instead, we'll use the power of some special keywords to create a fluid amount of columns per row.

### 3A: repeat(repeat value, size value)

First, we'll use the "repeat()" function. repeat() takes two arguments: number of times to repeat and the value to repeat.

For Example:
{% highlight css %}grid-template-columns: repeat(3, 100px){% endhighlight %}
will compute to
{% highlight css %}grid-template-columns: 100px 100px 100px{% endhighlight %}

### 3B: auto-fit

Next, instead of specifying a finite number of times to repeat, we'll use the "auto-fit" keyword. This will tell the browser to have as many columns as will work based on the size specified in the repeat syntax. There's also "auto-fill" which works the same. The difference between the two is what happens with extra tracks ([see Rachel Andrews' Grid By Example](https://gridbyexample.com/examples/example37/)).

### 3C: minmax(smallest size, largest size)

Replacing the size value in our repeat() function will be a minmax() function. minmax() allows you to specify the smallest and largest you want a track to be.

In our example, we want our cards to be able to size down to fit in mobile (I use 320px for this) and size up to be a fraction of the space available. Thus, our minmax() function will be

{% highlight css %}
minmax(320px, 1fr)
{% endhighlight %}

Put all this together and you get a CSS declaration block that looks like this:

{% highlight css %}
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}
{% endhighlight %}

## Step 4: Spacing

We now have a fluid grid, but all our cards are jammed together. Instead of reaching for our old stand-by "margin," we'll use another new property: grid-gap.

Grid-gap will place a space between the tracks of our grid (columns and rows). This doesn't add space around the grid, so we'll couple that with some padding of our container. Our CSS is now complete and looks like this:

{% highlight css %}
.card-container {
    display: grid;
    padding: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 1rem;
}
{% endhighlight %}


And voila! A fluid, responsive grid created with no breakpoints.

 
Below is the [CodePen](https://codepen.io/brob/pen/MvwbMa?editors=1100) that contains this example in its entirety. If you have any questions, post them in the comments or feel free to contact me [on Twitter](http://twitter.com/brob/). If you're interest in implementing Grid and still supporting older browsers, [take a look at this post](/blog/2017/01/18/your-code-should-fall-forward/).

<p data-height="500" data-theme-id="26704" data-slug-hash="MvwbMa" data-default-tab="result" data-user="brob" data-embed-version="2" data-pen-title="MvwbMa" class="codepen">See the Pen <a href="https://codepen.io/brob/pen/MvwbMa/">MvwbMa</a> by Bryan Robinson (<a href="https://codepen.io/brob">@brob</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

### Next Up: [Learn how to mix and match design patterns for each screen size](/blog/2018/06/13/how-to-use-css-grid-to-mix-and-match-design-patterns/)
![Various design patterns per screen size using grid](/images/responsive-grid-break-design.jpg)

See the power of grid in creating different layouts for different screen sizes with the simplest media queries.

[See it in action &raquo;](/blog/2018/06/13/how-to-use-css-grid-to-mix-and-match-design-patterns/)