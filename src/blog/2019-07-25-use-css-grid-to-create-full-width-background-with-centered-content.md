---
layout: "layouts/post.njk"
title: Use CSS Grid to create a self-centering full-width element
categories:
  - development
  - design
baseLayout: container--right
description: In this tutorial, use CSS Grid to create a self-centering full-width element. Traditionally, this required extra markup, but with CSS Grid, we won't need it!
featuredImg: /images/icons/icon-512x512.png
adSpace: 
  image: /images/practical-grid-heart.jpg
  headline: Practical CSS Grid - Learn about this revolution in Web design!
  description: Whether you're new to CSS Grid or have played with it, finding practical examples of this new layout mechanism is the best way to learn its power. Sign up below for two hours of practical grid knowledge just for you!
  linkText: Start Learning Now!
  linkUrl: https://store.codecontemporary.com/practical-css-grid
---

![Self Centering Grid with firefox grid inspector lines showing one column centered](/images/self-center-grid.png)

Sometimes an idea strikes you so hard that you have no idea why you've never thought of it. CSS Grid excels at [creating new types of layouts](/blog/2019/04/10/grid-vs-flex-tale-of-simple-promo-space/). It's also amazing at simplifying the code for old design patterns.

An idea snuck up on me when I was creating a centered column of text inside of a stripe with a full width background color.

Traditionally, this would be solved with adding an additional `<div>` in our markup. The HTML would look like this.

{% highlight html %}
<section class="stripe">
    <div class="stripe__content">
        <h1>Hello Stripe world</h1>
        <p>More stripe content can go here ...</p>
    </div>
</section>
{% endhighlight %}

We use the outside `<section>` to apply the background color and the interior `<div>` to size and center the content. This is by no means a crisis of markup. The CSS is relatively clean, as well.

{% highlight css %}
.stripe {
    background-color: lavender;
    padding: 2rem 0;
}
.stripe__content {
    width: 90vw;
    max-width: 1200px;
    margin: auto;
}
{% endhighlight %}

Because this wasn't a large transgression, I'd never thought about utilizing CSS Grid for this purpose. I've used Grid to create full-width stripes inside of other designs, but never for somethign this simple.

The lightning bolt of this application caught me completely off guard. Even though the property is `grid-template-columns`, we can use it for a single column. Pair that with  `justify-content` and a small touch of padding, and voila!

A colored stripe, with a width-restricted set of content with no additional markup!

{% highlight html %}
<section class="stripe">
    <h1>Hello Stripe world</h1>
    <p>More stripe content can go here ...</p>
</section>
{% endhighlight %}

{% highlight css %}
.stripe {
    display: grid;
    grid-template-columns: minmax(auto, 1200px);
    justify-content: center;

    background-color: lavender;
    padding: 2rem 1rem;
}
{% endhighlight %}

This method creates one column for our grid. It has a minumum size of `auto` to allow it to shrink based on its content and a maximum size of 1200px. This creates the appropriately sized elements. We use `justify-content` instead of dealing with `auto` margins. In this method, we need a left/right padding for our mobile widths.

From a box-model perspective, this makes good sense. Padding is for internal spacing. In our old way, we're using margins which has always felt a little hacky.

I never thought about this use case, but it made so much sense when it dawned on me. As we approach a future where Grid is one of our main layout mechanisms, we'll see more applications like this.

Grid isn't just for complex layouts, it's also for making resilient simple layouts, as well.

<p class="codepen" data-height="300" data-theme-id="26704" data-default-tab="html,result" data-user="brob" data-slug-hash="eqdZdm" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Centered Content with Grid">
<span>See the Pen <a href="https://codepen.io/brob/pen/eqdZdm/">
Centered Content with Grid</a> by Bryan Robinson (<a href="https://codepen.io/brob">@brob</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>