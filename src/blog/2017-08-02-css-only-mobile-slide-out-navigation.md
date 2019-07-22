---
title: How To&#58; A CSS-Only Mobile Off Canvas Navigation
categories:
- CSS Can Do What
- Development
- Design
- CSS
- Tutorial
layout: layouts/post.njk
description: Mobile navigation and the "hamburger nav" pattern aren't going away. In this tutorial, I'll walk you through creating a mobile off-canvas navigation with only CSS and HTML.
featuredImg: /images/blog/mobile-nav/mobile-nav-static.png
featuredLarge: True
baseLayout: container--right
adSpace: 
  image: /images/common-grid-promo.jpg
  headline: Free ebook - Common CSS Grid Patterns
  description: CSS Grid is a revolution in web layout. With this ebook, I cover 3 design patterns that Grid solves easier, better and more creatively to help push our designs in better directions.
  linkText: Download Now!
  linkUrl: https://store.codecontemporary.com/solving-three-design-problems-with-css-grid/buy
---

Before we get started, I'd like to state for the record: I like JavaScript. There's nothing wrong with using the third language of the browser. It's a great tool for many solutions. But for simple interactions, why complicate matters?

There's so much HTML and CSS can do on their own for presentation. Take for instance, the mobile nav icon and slide-out navigation. The "Hamburger" nav design pattern. 

There is a lot of writing on the usability side of things. For development, though, we see things happening the same way over and over again. 

Click events and state management being built in JavaScript.

That's not unusual. These tasks are perfect for JavaScript. If we're hiding the navigation on mobile, though, should we be adding another dependency to the page to display it?

Why don't we go old school? The only thing keeping us from a JavaScriptless mobile navigation is state management. How can we trigger a "show" state on tap or click, right? 

{% include ad-space.html %}

## The original "stated" element

As it turns out, we have states in HTML that are accessible by CSS. `<input type="checkbox">` has a checked and unchecked state. This functionality has been in the browser since HTML 2.

We need to structure our HTML to make the best use of out CSS. 

<div class="pull-1">
{% highlight html %}
<nav class="navigation">
    <input type="checkbox" id="nav-toggle">
    <label for="nav-toggle">Menu</label>

    <ul class="nav-list">
        <li><a href="#">Nav Item 1</a></li>
        <li><a href="#">Nav Item 2</a></li>
        <li><a href="#">Nav Item 3</a></li>
    </ul>

</nav>
{% endhighlight %}
</div>

First, it's imporant for our label to have a "for" attribute. This will allow it to function in place of the checkbox itself later. Also notice in this example, our `<ul>` for our navigation is a sibling to our #nav-toggle checkbox. We're going to use this relationship to select it in CSS.

## Reading the State in CSS

![Gif of checkbox toggling state](/images/blog/mobile-nav/simple-toggle.gif)

Now that we've got a stated element on the page, we need to read that in CSS.

Here's the simplest CSS example to use the state:

We start with our initial state. In the case of a mobile nav it shouldn't be shown. So .nav-list is display: none. When we select .nav-list, we want to couple it to its stateful element. In this case, we'll use the CSS sibling selector ~.

To check the state of #nav-toggle, we'll use the :checked pseudo class.

{% highlight scss %}
#nav-toggle ~ .nav-list {
    display: none; // Initial state
}
#nav-toggle:checked ~ .nav-list {
    display: block; // Toggled State using the :checked pseudo-class
}
{% endhighlight %}

Now, we have state built into our CSS for our navigation. All we have left is to style elements to look like we expect a mobile navigation to look.

This is where the "for" attribute on the label comes in handy. I've never seen a mobile navigation button with a checkbox. So first, we'll hide the checkbox and do our main styling on the label. This work is usually done on an anchor tag.

This is where preference you can deviate. Make it the mobile nav style you like best. You will need to change the `<label>`'s display property from "inline" to "block." Past that, I put my money on the word "Menu" and not a hamburger Icon, with a simple border style.

{% highlight scss %}
#nav-toggle ~ label {
    display: block;

    // Styling
    background-color: white;
    padding: 15px 0;
    border: 1px solid grey;
    border-radius: 3px;
    width: 100px;
    text-align: center;
}
{% endhighlight %}

## "Off-canvas" Navigation

While a show/hide navigation would work, "off-canvas" navigation is still in vogue. So, we'll take our actual navigation and move it to the right out of the visible viewport.

{% highlight scss %}
.nav-list {
    position: fixed; // Absolute positioning would work as well
    right: -100%;
    top: 0;

    height: 100%;
    width: 250px; // In most sites, I’d use a VW instead of a hard pixel value
}
{% endhighlight %}

## Animating

![Gif of nav toggling](/images/blog/mobile-nav/nav-styled.gif)


I'm not great with animation, but I know animation is key to a good user interface. Instead of having the off-canvas nav magically show up on page, we'll have it slide in.

To do this, we'll use CSS transform's translateX function and a nice bouncy transition. For consistency, you'll want to use the same movement and transition on the label AND .nav-list.

{% highlight scss %}
#nav-toggle ~ .nav-list, #nav-toggle ~ label {
	// Nice bouncy transition
    transition: .5s transform;
    transition-timing-function: cubic-bezier(.38,.52,.37,1.27);
}

#nav-toggle:checked ~ .nav-list, #nav-toggle:checked ~ label {
    transform: translateX(-$flyout);
}
{% endhighlight %}

## Finished Product

That's it. You now have a functioning mobile navigation with no JavaScript necessary.

<p data-height="400" data-theme-id="26704" data-slug-hash="oeNdbg" data-default-tab="css,result" data-user="brob" data-embed-version="2" data-pen-title="Mobile Nav no JS" class="codepen">See the Pen <a href="https://codepen.io/brob/pen/oeNdbg/">Mobile Nav no JS</a> by Bryan Robinson (<a href="https://codepen.io/brob">@brob</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
<br>
I created the mobile navigation on this site that way. [Una Kravets' "Power of CSS" slides](https://codepen.io/una/full/Wjvdqm) and [youmightnotneedjs.com](http://youmightnotneedjs.com/) inspired me to create this for my site and share the process.
