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

If you write a technical blog and use 11ty as your static site generator of choice you might run into a conundrum: *How do you show Liquid or Nunjucks template code in your code blocks?*

Whether you use the official syntax highlighting plugin, a custom Prism plugin or something else you'll run into this issue. When you write template code in one of these highlight blocks, your template engine will attempt to render your code instead of displaying it as a string.

It's not readily obvious how to get around this. To make this work, you need to wrap the tags (or everything) in the `raw` paired shortcode.

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