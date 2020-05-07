---
layout: "layouts/post.njk"
title: "Using Nunjucks 'If Expressions' in 11ty to create a simple active navigation state"
categories:
  - development
  - JAMstack
  - 11ty
baseLayout: container--right
description: "In this tutorial, we'll set up a simple navigation, identify what page navigation item we need to activate based on URL parts and add an active class to that element with no need of an if tag"
featuredImg: /images/if-expression.png
featuredLarge: true
adSpace: 
  image: /images/jamstack-pod-promo.svg
  headline: That's My JAMstack podcast
  linkText: Listen Now!
  linkUrl: https://thatsmyjamstack.com
---


![Promo Graphic: Lists code we'll see later with conditional expression and the words: Nunjucks If Expressions: A simple way to create an active navigation state in 11ty](/images/if-expression.png)

Creating active states in your navigation is important for guiding a user through your site. It gives them a sense of place and let's them know how to navigate from page to page.

Setting active states in your templates isn't alway easy. Often, it requires setting a variable on each page to let that page know what navigation item to activate. It can also involve more template tags in your markup to set the proper CSS classes with a conditional.

In this tutorial, we'll set up a simple navigation, identify what page navigation item we need to activate based on URL parts and add an active class to that element with no need of an `{% raw %}{% if %}{% endraw %}` tag.

### Prerequisites

* A working understanding of CSS
* A working understanding of 11ty
* A working understanding of basic Nunjucks syntax

## Creating our navigation

In this example, we'll keep the markup free from distractions. We'll have a very small base template that each of our pages will use.

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
</head>
<body>
    {% include "header.njk" %}
    {{ content | safe }}
</body>
</html>
{% endhighlight %}

This is a fairly typical early base template. It has our general page metadata as well as includes for our header and footer and a spot open for our content.

Our navigation has been abstracted out to be used in our `header.njk` file. Let's look in there.

{% highlight html %}
<nav>
    <a href="/">Home</a>
    <ul class="nav-items">       
        <li><a class="nav__item" href="/blog">Blog</a></li>
        <li><a class="nav__item" href="/work-with-bryan">Work</a></li>
        <li><a class="nav__item" href="/about">About</a></li>
        <li><a class="nav__item" href="/contact">Contact</a></li>
    </div>
</nav>
{% endhighlight %}

Mostly just raw HTML! A nav element with some lists of pages and anchor tags that take us to those pages.

## Setting up our active state

The base of our active state will be a class applied to each navigation item when it's active. When a user lands on our "About" page, it should have an `active` class applied to its anchor tag.

{% highlight html %}
  <li><a class="nav__item active" href="/about">About</a></li>
{% endhighlight %}

This class-based idea works well, but requires us to manipulate our markup per page to make it work. The whole idea of a templating engine is to manipulate as little custom markup on each page as possible.

In the past, I've made active states work in a couple different ways:

* A block for each link that can be overridden on a child template
* A variable that can be set in frontmatter to select which nav item to be active

Both of these methods requires touching individual pages to make this happen. Either adding the block to the page and putting in a class name or adding a variable to frontmatter. I'd rather this happen automatically.

## Solution: Use Nunjuck's conditional expressions to add the active state based on URL

The first thing we need to do is figure out our conditional logic.

As it turns out, we have two things in our favor for creating the logic. 11ty ships with a `page.url` variable for accessing a current page's URL, and Nunjucks has an `in` operator that works in conditionals.

So our conditional would look something like this:

{% highlight html %}
{% if '/blog' in page.url %}active{% endif %}
{% endhighlight %}

This conditional will check to see if the string `/blog` exists inside of the string contained in the variable `page.url`. In the case of a blog, this is especially handy at checking if the current URL is a child page such as `/blog/blog-post-slug-url-goes-here`. Both `/blog` and our post URL will match that conditional.

Now, that conditional isn't too complex, but we had to use our shift key a lot. I don't know about you, but my pinkies get tired just looking at that code block above.

Nunjucks has just the feature to fix that. It's called the "if expression." Instead of a conditional, you can give a conditional state inside of an expression.

> Quick aside: I discovered this functionality while researching what various template engines call content inside `{% raw %}{{ }}{% endraw %}`. Liquid calls them variables, Nunjucks calls them expressions. As I was scrolling through I saw "if expression" listed as a jump link. Color me intrigued!

The basic syntax for an if expression is this: `{% raw %}{{ expression-to-echo if expression-to-match operator value [ else else-expression-here ] }}{% endraw %}`. In other words, display the first expression - usually a variable or string - if the condition after it is matched. The operator can be any of the conditional operators available to Nunjucks. If you leave off the operator/value combination, it just checks the truthiness of the `expression-to-match`. 

In our case, we'll echo `active` as a string if our condition that we built above is evaluated to true.

{% highlight html %}
<li><a class="nav__item {{ 'active' if '/blog' in page.url }}" href="/blog">Blog</a></li>  
{% endhighlight %}

This syntax functions the same way as the conditional statement above, but with a more concise syntax. The Nunjucks documentation refer to this as similar functionality to the ternary operator in JavaScript. The syntax is a bit better, allowing your condition to have an optional `else` case instead of requiring it.

No matter how much I learn about the technologies I'm passionate about, there's always something new to find. I'll be using "if expressions" in other new ways in the future now that I know they exist.