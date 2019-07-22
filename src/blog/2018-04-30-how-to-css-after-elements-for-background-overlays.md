---
layout: layouts/post.njk
title: Use CSS &#58;&#58;before and &#58;&#58;after for simple, spicy image overlays
categories:
  - design
  - CSS
  - tutorial
featuredImg: /images/overlay-finished.jpg
featuredLarge: true
baseLayout: container--right
description: Use &#58;after elements to create the simplest HTML possible to render useful and fun overlays on top of background images. Then extend them with blend-modes!
grid-size: large
updated: 05 March, 2019
adSpace: 
  image: /images/common-grid-promo.jpg
  headline: Free ebook - Common CSS Grid Patterns
  description: CSS Grid is a revolution in web layout. With this ebook, I cover 3 design patterns that Grid solves easier, better and more creatively to help push our designs in better directions.
  linkText: Download Now!
  linkUrl: https://store.codecontemporary.com/solving-three-design-problems-with-css-grid/buy
---

<aside class="reference">
    <p>Looking for more uses of ::after and ::before? <a href="/blog/2018/08/07/top-3-uses-of-after-and-before-css-pseudo-elements/">Read my Top 3 Uses beyond the overlay</a></p>
</aside>

<figure style="position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; margin-bottom: 1rem;">
        <iframe style="position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;" width="560" height="315" src="https://www.youtube.com/embed/SXQ9l0ScDEA?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </figure>


More and more in web design, we find ourselves putting text on top of images. More often than not, this is a dangerous game. Images have dynamic color and lighting and text for the most part is one color. This is often a nightmare for readability and accessibility.

This means we want to introduce an overlay to sit between the image and the text. Sometimes this darkens the background image enough for readability. Other times it's a branding opportunity. Either way we need a simple CSS technique to introduce this sort of overlay.

Since I prefer not to introduce new markup for an embelishment, we'll use the CSS `::after` pseudo-element.

The process looks something like this:

1. Create the simplest HTML for your area
1. Use a `::before` or `::after` element to create your banner
1. Fix `z-index` issues caused by absolute positioning
1. Experiment with `mix-blend-mode` for fun and profit

{% include ad-space.html %}

### Step 1: All the markup you need, none of the bloat
<figure style="grid-column: 1 / 3; grid-row: span 2;"><img src="/images/overlay-starting-point.jpg" alt="Grid Love"></figure>

In a banner, all we really want is the banner's container and any content that banner needs to contain.


{% highlight html %}

<section class="banner">
    <h1>Hello World</h1>
</section>

{% endhighlight %}

In this example, we'll just utilize a section container and an `<h1>`. If you added more content, it could be siblings to the `<h1>` or you could place all of your content in a content container of some sort to do any positioning. 

A little CSS magic is happening here for the added height of the banner as well as the centering of the text. That's not important for this demo, but if you're curious, it exists in the CodePen.

### Step 2: Add the overlay element dynamically with ::after

Natively, CSS gives us the powerful `::before` and `::after` elements for adding stylistic content to the page that shouldn't affect markup.

By apply `::before` or `::after` to an element, you can insert a dynamic element into the DOM before or after the selected elements children.

One important note, all pseudo-elements require a `content` CSS property to display. In our case, this will just be a blank string.

<figure style="grid-column: 1 / 3; grid-row: span 2;"><img src="/images/overlay-somethings-not-right.jpg" alt="Grid Love"></figure>

{% highlight scss %}
.banner::after {
    content: ""; // ::before and ::after both require content
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(120deg, #eaee44, #33d0ff);
    opacity: .7;
}
{% endhighlight %}

Now we have an element that is full-width and -height. To do this, we utilize absolute positioning, as we don't want to affect the content flow of the document. 

We make the overlay slightly transparent utilizing the `opacity` property.

In this example, I chose a fun gradient, but you could use a simple background color or even another image to overlay.

### Step 3: Fix z-index issues

The keen-eyed observer would notice that something isn't quite right in the example. Our friendly overlay is covering not just the background image, but also the text in the banner.

By using absolute positioning, we've actually put the overlay on top of the stacking context of our banner. To fix this, your overlay and your content will need to have a `z-index` applied to them. I usually give the overlay a 1 and my content 100.

{% highlight scss %}
.banner::after {
    ...
    z-index: 1;
}
.banner > * {
    z-index: 100;
}
{% endhighlight %}


#### And with that we have a finished overlay.

<figure style="grid-column: 2 / 7;"><img src="/images/overlay-finished.jpg" alt="Grid Love"></figure>


## Bonus step: Advanced overlays with blend modes

<figure style="grid-column: 1 / 3; grid-row: span 5;"><img src="/images/overlay-with-blend-mode.jpg" alt="Grid Love"></figure>

I've been toying with background blend modes for a little while now, but it blew me away when I discovered `mix-blend-mode`. This allows a developer to blend multiple elements together!

Use `mix-blend-mode` on your overlay and you've got some fun new combinations to try out.

{% highlight scss %}
.banner::after {
    /* opacity: .7; */
    mix-blend-mode: color;
    mix-blend-mode: hue;
    mix-blend-mode: hard-light;
}
{% endhighlight %}

The support for various blend modes are pretty weak in the Microsoft browsers, but you can still use them today with clever progressive enhancement. If you want them to be built in Edge, you can [let Microsoft know about your passion here](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer?query=blend). 

Until that time, let's use `@supports` queries to make sure our code still respects our friends using Edge and IE. The above code removes the transparency from our overlay and lets the blend mode do it for us. Instead of removing it, let's negate it behind a support query.

{% highlight scss %}
.banner::after {
    opacity: .7;

    @supports (mix-blend-mode: hue) {
        opacity: 1;
        mix-blend-mode: color;
        mix-blend-mode: hard-light;
        mix-blend-mode: hue;
    }
}
{% endhighlight %}

This way in browsers that don't support blend modes, we get our average, but nice overlay and in browsers that do, we get some really neat effects on our banner.


## Bonus Step 2: Turn the overlay's design to 11 with ::before and skew!

![Spinal Tap: This goes up to 11 gif](https://media.giphy.com/media/LJ8aM1wbV9Gko/source.gif)

So, we have a full width overlay. Then, we took it even further with blend modes. Can we turn it all the way up to 11?

As it turns out, we can add a _second_ overlay using a `::before` pseudo element, as well.

Starting with the code we have before, we're going to modify our original overlay to be skewed and centered.

Using a CSS transform, we can skew the element a number of degree or turns. In our example, we'll skew it 15 degrees using `transform: skew(15deg)`. You'll notice it now overflows the left and right sides of the container. To fix this, we'll do two things.

First, we'll apply `overflow: hidden` to our banner element. This will guarantee that we never have overflow from any transforms we do on our pseudo elements. Then, we'll adjust the width from 100% down to 75% to contain the element a little better.

![Image of the skew breaking outside the banner area](/images/skew-overlay-issue.jpg)

Those of you with a discerning eye will notice this is a little awkward still. The background isn't centered! Since this is an absolutely positioned item, we'll center it with a simple CSS trick. 

Instead of a `left` value of `0`, we'll use `50%`. That pushes the element over to start it's left edge from the 50% mark of the parent container. We can then use another transform value to pull the element back left: `translateX(-50%)`. When using the translate method, the percentages are based on the width of the element you're applying it to. In this case, it's 50% the width of the `::after` element. This creates a perfectly centered element that is `position: absolute;`. Handy!

Your code should now look like this: 

{% highlight scss %}
.banner {
    overflow: hidden;
}

.banner::after {
    content: "";  // :before and :after both require content
    position: absolute;
    width: 75%; // Makes the overlay smaller to accommodate the skew
    height: 100%;
    top: 0;
    left: 50%; // Push the element 50% of the container's width to the right
    transform: skew(15deg) // Puts the element on an angle
               translateX(-50%); // Moves the element 50% of its width back to the left
    background-image: linear-gradient(120deg,#eaee44,#33d0ff);
}
{% endhighlight %}

![Image of the Skew finished on the after element](/images/overlay-skew-finish.jpg)

This itself is a fun take on this design pattern, but we're going to move it one more step.

Let's create an identical pseudo element using `::before`. To do this, we're going to add the selector to our `::after` block.

Your selector should look like this:

{% highlight scss %}

.banner::after, .banner::before {
    ...
}
{% endhighlight %}

This will handle the creation, positioning, and base styles for the element.

Then, we override the specific pieces we need to override. In this case, we'll change our skew.

{% highlight scss %}
.banner::before {
    transform: skew(-15deg) 
               translateX(-50%);
}
{% endhighlight %}

When we do this, we also have to redeclare the `translateX` method. This is because we redeclared the whole `transform` property. If we didn't, the browser would assume we don't have a `translateX` for the `::before` due to the cascade. This is fixed in the latest transform specification, giving CSS individual transform properties, but that's not cross-browser compliant yet.

![Finished product of the overlapping overlays](/images/overlay-skew-overlap.jpg)

That's it. We now have two overlays that are creating an interesting geometric view at their intersection!

Here's the final code:

{% highlight scss %}
.banner::after, .banner::before {
    content: ""; 
    position: absolute;
    top: 0;
    left: 50%;
    transform: skew(15deg)
               translateX(-50%);
    width: 75%;
    height: 100%;
    background-image: linear-gradient(120deg,#eaee44,#33d0ff);
    background-color: #333;
    opacity: .7;
}

.banner::before {
    transform: skew(-15deg) 
               translateX(-50%);
}

.banner {
    overflow: hidden;
}
{% endhighlight %}

Overlays should be simple and clean and never bloat your HTML with additional markup. This is one of my favorite uses of `::after` elements. It just makes so much sense.

If you want to play with the code in this tutorial, the CodePens are embedded below:

<iframe height='400' scrolling='no' title='CSS ::after element overlays' src='//codepen.io/brob/embed/bMqBgb/?height=265&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; grid-column: 1 / 7'>See the Pen <a href='https://codepen.io/brob/pen/bMqBgb/'>CSS ::after element overlays</a> by Bryan Robinson (<a href='https://codepen.io/brob'>@brob</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
<br><br>
<iframe height='400' scrolling='no' title='CSS ::after element overlays with overlapping overlays' src='//codepen.io/brob/embed/gELMrm?height=265&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; grid-column: 1 / 7'>See the Pen <a href='https://codepen.io/brob/pen/bMqBgb/'>CSS ::after element overlays</a> by Bryan Robinson (<a href='https://codepen.io/brob'>@brob</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>