---
layout: layouts/post.njk
title: Refactoring CSS into a Sass mixin
categories:
  - development
  - CSS
baseLayout: container--right
description: It struck me recently as I was writing a new Sass mixin that there may be designers and developers out there that haven't translated vanilla CSS into a Sass function. In this article, I want to show how to take often-used CSS and convert it into a DRY (Don't Repeat Yourself) Sass mixin.
featuredImg: /images/uploads/refactoring-css-to-sass.png
featuredLarge: true
adSpace: 
  image: /images/common-grid-promo.jpg
  headline: Free ebook - Common CSS Grid Patterns
  description: CSS Grid is a revolution in web layout. With this ebook, I cover 3 design patterns that Grid solves easier, better and more creatively to help push our designs in better directions.
  linkText: Download Now!
  linkUrl: https://store.codecontemporary.com/solving-three-design-problems-with-css-grid/buy
---

![Graphic refactoring CSS to Sass](/images/uploads/refactoring-css-to-sass-post.png)

I've begun live-streaming office hours every week. In my first effort at it, I mostly just worked on this site's code. I decided to create a new promo style for articles and realized I needed to refactor some of my Sass. 

It struck me as I was writing a new Sass mixin that there may be designers and developers out there that haven't translated vanilla CSS into a Sass function. In this article, I want to show how to take often-used CSS and convert it into a DRY (Don't Repeat Yourself) Sass mixin.

<figure style="position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; margin-bottom: 1rem;">
      <iframe width="560" height="315" style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;" src="https://www.youtube.com/embed/6UxUuDZ_ujQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</figure>

## The Starting CSS

Usually when I talk about Sass mixins, I like to show the power on buttons. That's not always the most applicable use case, though. In this instance, we'll take the "interesting border" concept from my "[Top 3 uses of ::before and ::after](https://bryanlrobinson.com/blog/2018/08/07/top-3-uses-of-after-and-before-css-pseudo-elements/)" and convert it to a reusable Sass component.

In this case, we need to affect four main elements with our CSS. The parent element, a universal (*) set of elements inside the parent and a ::before and ::after pseudo-element.

{% highlight css %}
.article-promo {
    position: relative;
    padding: 20px;
}
.article-promo > * {
    z-index: 100;
    position: relative;
}
.article-promo::before {
    background-color: white;
    content: "";
    display: block;
    position: absolute;
    top: 10px;
    left: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    z-index: 0;
}
.article-promo::after {
    background-image: linear-gradient(120deg, #eaee44, #33d0ff);
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    mix-blend-mode: screen;
}
{% endhighlight %}

Taking a look at this code, you can see that it would be a lot to create by hand every time we wanted to do a different gradient border.

{% include ad-space.html %}

## Step 1: Identify potential Sass variables

One of the best reasons to start using Sass is its variables. In this case, we're going to use variables to create customizable properties for our border.

I'll start by finding things I want to change on a per-implementation.

For a gradient border, I'll want to adjust the "border size," the start color, the end color, original background color and the direction of the gradient.

Let's move those values out into variables at the top of our CSS.

{% highlight scss %}
$border-size: 10px;
$original-background-color: white;  
$gradient-start-color: #eaee44;  
$gradient-end-color: #33d0ff;  
$gradient-direction: 120deg;
{% endhighlight %}

Where we were originally using static values, we'll now replace those with the variables.

{% highlight scss %}

.article-promo::before {
    ...
    background-color: $original-background-color;
    top: $gradient-size;
    left: $gradient-size;
    width: calc(100% - #{$gradient-border-size * 2});
    height: calc(100% - #{$gradient-border-size * 2});
    ...
}

.article-promo::after {
     background-image: linear-gradient($gradient-direction, $gradient-start-color, $gradient-end-color);
}
{% endhighlight %}

Note the `#{}` syntax in our `calc()` function in this example. This is a use case of a concept called variable interpolation. Most languages have some form of this.

In the case of Sass, we use that syntax mostly when inside of a CSS function. In this case, Sass sees the `calc()` function and intends to compile the entire thing as one string to your CSS. The `#{}` syntax causes Sass to pause its compile and render the value into that string instead.

## Step 2: Identify and refactor repeated code with @extends

In our example, we have two absolutely positioned pseudo-elements. These come with four properties that are identical: `content`, `display`, `position` and `z-index`.

We'll use Sass's `@extend` method to refactor this into a concise bit of compiled CSS.

Side Note: Why use `@extend` instead of creating a mixin and using `@include` here? `@extend` will create one rule set in CSS for multiple selectors; `@include` will insert the same rule set into the compiled CSS. Extending in Sass is a great way to reduce complexity and size of compiled CSS. [Here are the docs on extending](https://sass-lang.com/guide#topic-7).

We'll start by creating a "dummy" selector for our properties.

{% highlight scss %}

%pseudo-properties {
    content: "";  
    display: block;  
    position: absolute;
    z-index: 0;
}

{% endhighlight %}

Note that `%` in there. That's not standard CSS. We use that so that we don't generate the CSS until it's called. This keeps selector bloat down a little bit.

We can then reference that fake selector with the `@extend` method on our pseudo elements.

{% highlight scss %}
.article-promo::before {  
   @extend %pseudo-properties;
    ...
}

.article-promo::after {  
   @extend %pseudo-properties;
    ...
}
{% endhighlight %}

The compiled CSS will look like this: 

{% highlight css %}
.article-promo::before, .article-promo::after {
    content: "";
    display: block;
    position: absolute;
    z-index: 0;
}
{% endhighlight %}

The other code in your definition block for `::before` or `::after will be compiled into its own selector later. You can keep your code together this way and not worry about bloat.

## Step 3: Nest your selectors for easier abstraction

We can use Sass's nesting abilities to clean up our code a little. 

This will also help as we extend the functionality to any other selector than our current one.

{% highlight scss %}
.article-promo {
    position: relative;
    padding: $border-size * 2;
    > * {
        z-index: 100;
        position: relative;
    }
    &::before {
        @extend %pseudo-properties;
        background-color: $original-background-color;
        top: $gradient-size;
        left: $gradient-size;
        width: calc(100% - #{$gradient-border-size * 2});
        height: calc(100% - #{$gradient-border-size * 2});
    }
    &::after {
        @extend %pseudo-properties;
        background-image: linear-gradient($gradient-direction, $gradient-start-color, $gradient-end-color);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        mix-blend-mode: screen;
    }
} 
{% endhighlight %}

## Step 4: Move border functionality into a mixin

Here's the big move. We'll take everything that we've written inside our main selector and move it into an `@mixin` declaration.

We don't need the main selector because that's where we'll apply our mixin. We don't need the variables, because they will be arguments in our mixin.

{% highlight scss %}

@mixin gradient-border() {
    position: relative;
    padding: $border-size * 2;
    > * {
        z-index: 100;
        position: relative;
    }
    &::before {
        @extend %pseudo-properties;
        background-color: $original-background-color;
        top: $gradient-size;
        left: $gradient-size;
        width: calc(100% - #{$gradient-border-size * 2});
        height: calc(100% - #{$gradient-border-size * 2});
    }
    &::after {
        @extend %pseudo-properties;
        background-image: linear-gradient($gradient-direction, $gradient-start-color, $gradient-end-color);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        mix-blend-mode: screen;
    }
}

{% endhighlight %}

Just like in a function definition in JavaScript, we'll pass our variables into the parentheses.

You can even specify default values. In my case, I'm keeping a consistent border with small tweaks, so I opted for default values.

{% highlight scss %}
@mixin gradient-border($border-size: 10px, $original-background-color: white, $gradient-start-color: #eaee44, $gradient-end-color: #33d0ff, $gradient-direction: 120deg) {
    ...
}
{% endhighlight %}

## Step 5: Declare the mixin in the selectors you need it

Finally, we have a mixin that we can use. We'll use the Sass `@include` method. Here are a few examples.

{% highlight scss %}
.article-promo {  
   @include gradient-border; // Gives all defaults
}
.big-border {
    @include gradient-border(50px); // If declared in order, you don't have to label your arguments
}
.red-gradient {
    @include gradient-border($gradient-start-color: red, $gradient-end-color: darkred);
}

.vertical-gradient {
    @include gradient-border($gradient-direction: to bottom);
}
{% endhighlight %}

## Using this for other examples

This direction will work for any CSS you want to refactor. Sass gives us a lot of power and flexibility. It can either be something that becomes easy to maintain or a nightmare of redeclared variables and nesting. 

Creating reusable components is at the heart of any maintanence strategy. Follow this path and you can create components throughout any project.

1.  Identify reusable components
2.  Find pieces that need to be changed regularly
3.  Nest selectors for simplicity
4.  Use `@extend` to keep your compiled CSS smaller

What component will you start with?