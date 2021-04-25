---
layout: "layouts/post.njk"
title: "How to show your template code in 11ty blog posts"
categories:
  - jamstack
  - javascript
  - 11ty
baseLayout: container--right
description: "If you write a technical blog and use 11ty as your static site generator of choice you might run into a conundrum: How do you show Liquid or Nunjucks template code in your code blocks."
featuredImg: /images/raw-promo.png
featuredLarge: true
templateEngineOverride: njk, md
adSpace: 
  image: /images/jamstack-pod-promo.svg
  headline: That's My JAMstack podcast
  linkText: Listen Now!
  linkUrl: https://thatsmyjamstack.com
---
![How do you stop Liquid and Nunjucks tags from rendering? Raw](/images/raw-topper.png)

If you write a technical blog and use 11ty (or Jekyll ... or just use Liquid or Nunjucks) as your static site generator of choice you might run into a conundrum: *How do you show Liquid or Nunjucks template code in your code blocks?*

Whether you use the official syntax highlighting plugin, a custom PrismJS plugin or something else you'll run into this issue. You might think your PrismJS plugin is acting up. You might think 11ty is hiding content from you. You might not even know what to Google! I've been there and I've also helped a couple other people figure out the root cause and fix it.

It's not readily obvious what's causing this issue or how to fix it. The issue is that Liquid and Nunjucks are trying to interpolate and render the tags you put in your highlight block. To make this work, we need to tell the templating engine that it needs to *NOT* fetch the data and render.

To make this work, you need to wrap the tags (or everything) in the `raw` paired shortcode.

## The Default Behavior for Liquid and Nunjucks

Let's take a simple example of a showcasing a template loop. Either using markdown's built-in syntax for code blocks or using [the official syntax highlighting plugin](https://github.com/11ty/eleventy-plugin-syntaxhighlight), we get the same response. 

### A code block that looks like this:

{% highlight 'twig' %}
{% raw %}
{% highlight 'html' %}
    {% for currentPost in collections.posts | limit(3)  %}
       {{ post.title }}
    {% endfor %}
{% endhighlight %}
{% endraw %}
{% endhighlight %}

### Will render an output of this:

{% highlight 'twig' %}
{% for currentPost in collections.posts | limit(3)  %}
{{ currentPost.data.title }}
{% endfor %}
{% endhighlight %}

**WOOOOPS!**

That's not what we want! That's just a list of posts... but it *IS* what should be rendered by those tags... Imagine it were something less obvious. Imagine you had a conditional expression? It might not show anything. Imagine you had template syntax that didn't work in the current context. Your terminal would light up with errors and you might not know why.

## How do we fix a template engine like Liquid or Nunjucks from doing it's job?

We use a tag provided by both languages to fix this specific issue. The `Raw` tag will take any string and tell the templating engine that this is not to be rendered as a template tag or variable.

If we insert the `raw` tag, our code will render as a code block that contains template syntax, not a rendered list of post titles.

{% highlight 'twig' %}
    {% raw %}

{% raw %}
    {% highlight 'html' %}
        {% for currentPost in collections.posts | limit(3)  %}
           {{ post.title }}
        {% endfor %}
    {% endhighlight %}
{% endraw %}

    {% endraw %}

{% endhighlight %}

We now have exactly what we want! 

It took me a lot of research to figure this out when I first started having this issue. It's also, surprisingly a frequently asked question for me. It's a relatively small use case, so there's not a lot of content around it, so Googling isn't great. Hopefully folks will find this and not give up on technical blogging because of it!