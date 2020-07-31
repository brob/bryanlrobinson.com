---
layout: "layouts/post.njk"
title: "How to show your template code in 11ty blog posts"
categories:
  - Life
baseLayout: container--right
description: "If you write a technical blog and use 11ty as your static site generator of choice you might run into a conundrum: How do you show Liquid or Nunjucks template code in your code blocks."
featuredImg: /images/michigan-sanity.png
featuredLarge: true
templateEngineOverride: njk, md
adSpace: 
  image: /images/jamstack-pod-promo.svg
  headline: That's My JAMstack podcast
  linkText: Listen Now!
  linkUrl: https://thatsmyjamstack.com
---

If you write a technical blog and use 11ty as your static site generator of choice you might run into a conundrum: How do you show Liquid or Nunjucks template code in your code blocks.

Whether you use the official syntax highlighting plugin, a custom Prism plugin or something else you'll run into this issue. When you write template code in one of these highlight blocks, your template engine will attempt to render your code instead of displaying it as a string.

It's not readily obvious how to get around this. To make this work, you need to wrap the tags (or everything) in the `raw` paired shortcode.

## 11ty `raw` tag in action

Let's take a simple example of a showcasing a template loop.

{% highlight 'twig' %}
{% raw %}
{% for post in collections.posts %}
   {{ post.title }}
{% endfor %}
{% endraw %}
{% endhighlight %}

Without `raw` tags, 11ty will attempt to render the loop instead of printing it into our HTML.

{% highlight 'twig' %}
{% set postList = collections.posts | slice(3) %}
{% for post in postList %}
{{ post.data.title }}
{% endfor %}
{% endhighlight %}