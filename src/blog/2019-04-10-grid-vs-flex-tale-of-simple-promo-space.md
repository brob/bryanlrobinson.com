---
layout: layouts/post.njk
title: 'Grid vs. Flex: A Tale of a "Simple" Promo Space'
categories:
  - development
  - Grid
  - design
baseLayout: container--right
description: I love the new layout modes in CSS. Grid and Flexbox are both amazing features. They each have their place. What if I told you that if you used the "wrong" one, you could double your CSS and HTML? Let's take a look at what appears to be a simple promo grid.
featuredImg: /images/icons/icon-512x512.png
adSpace: 
  image: /images/practical-grid-heart.jpg
  headline: Practical CSS Grid - Learn about this revolution in Web design!
  description: Whether you're new to CSS Grid or have played with it, finding practical examples of this new layout mechanism is the best way to learn it's power. Sign up below for two hours of practical grid knowledge just for you!
  linkText: Start Learning Now!
  linkUrl: https://store.codecontemporary.com/practical-css-grid
---

I love the new layout modes in CSS. Grid and Flexbox are both amazing features. They each have their place. What if I told you that if you used the "wrong" one, you could double your CSS and HTML?

Let's take a look at what appears to be a simple promo grid.

![Image of a promo space with one 50% item spanning 2 row, 1 at the top right spanning 50% and 1 row and 2 spanning 25% and 1 row](/images/simple-promo-space.jpg)

In this example, we have 4 promotional items. This stems from my time working in an agency setting. Every client wants a rotator at the top of their page. We would use asymmetric promotional spaces like this to work multiple calls to action into one area. This would allow us to avoid a carousel that we knew wouldn't convert.

It's important to give a user a sense of hierarchy with the design. To do that, we used different sizes to denote importance.

The design was done in Photoshop. This is really easy to accomplish in a design program. 

At the time, we were still doing our primary layout in Flex. As it turns out, this is still quite complex in Flex.

{% include ad-space.html %}

## The code required for Flexbox

It requires a lot of additional markup and quite a bit of extra CSS that is specific to the markup and display. In other words, the code was bloated and inflexible.

{% highlight html %}
<div class="promos">
    <div class="left-column">
        <a href="#" class="promo">Promo Space 1</a>
    </div>
    <div class="right-column">
        <a href="#" class="promo">Promo Space 2</a>
        <div class="columns">
            <a href="#" class="promo">Promo space 3</a>
            <a href="#" class="promo">Promo space 4</a>
        </div>
    </div>
</div>
{% endhighlight %}

{% highlight css %}
.promo {
    background-image: url(https://images.unsplash.com/photo-1552297166-e1e2a9f945d4?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-color: lightblue;
    background-blend-mode: overlay;
}
.promos {
    display: flex;
    justify-content: space-between;
}
.promo {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 30vh;
}
.column {
    width: calc(50vw - .5rem);
    display: flex;
    flex-direction: column;
}
.columns {
    display: flex;
    justify-content: space-between;
}
.columns > .promo {
    flex: 1;
}
.columns > .promo:first-child {
    margin-right: 1rem;  
}
.right-column > .promo {
    margin-bottom: 1rem;
}
.left-column .promo {
    height: 100%;
}
{% endhighlight %}

Our line count is at 12 lines of HTML and 40 lines of layout-based CSS.

## The code required for Grid

Let's take a peek at what we need to make this layout work with Grid.

{% highlight html %}
<div class="promos">
    <a href="#" class="promo">Promo Space 1</a>
    <a href="#" class="promo">Promo Space 2</a>
    <a href="#" class="promo">Promo space 3</a>
    <a href="#" class="promo">Promo space 4</a>
</div>
{% endhighlight %}

No unnecessary nesting. Just four promo spaces inside of one container. This is the ideal amount of markup for this layout.

Because Grid allows us to specify our layout and flow our content into the layout, we're saved many hacks that require additional markup.

The HTML line count is at six. Exactly half the line count of our flex example. Our CSS line count is at 20\. Exactly half our CSS line count!

In this case, we use grid-gap to keep our margins clean, grid-template-columns to specify our column sizes and grid-template-areas to define areas we can place our content in.

{% highlight css %}
.promos {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-areas: "main second second"
                         "main third  fourth";
    grid-auto-rows: minmax(20vh, 1fr);
    grid-gap: 1rem;
}
.promo:first-child {
    grid-area: main;
}
.promo:nth-child(2) {
    grid-area: second;
}
.promo:nth-child(3) {
    grid-area: third;
}
.promo:nth-child(4) {
    grid-area: fourth;
}
{% endhighlight %}

Each promo gets its own named area with the grid-area property and that's it. No more code necessary. This isn't a hack. This isn't the combination of layout tricks with additional markup. This is layout as a first-class citizen of the web.

## Conclusion

Both these versions will work. Flexbox still has the edge in support. Think about this, though. If all things are equal, half the code with fewer hacks is much better to maintain long term. It's all about picking the right tool for the job.

It's an amazing time to be doing web design work. Things that weren't possible before are. Things that were annoyingly difficult before are mind-bogglingly simple now.

What are some design patterns that were more annoying than they should have been that Grid makes super simple.