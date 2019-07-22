---
title: Can CSS Grid open up interesting CMS Layout options?
categories:
- Development
- Design
- Grid
- CSS
layout: layouts/post.njk
description: I love hand crafting layout in CSS Grid. Ask my co-workers. They're tired of hearing about it. What about people who write no CSS, though? Can we use Grid to open up a world of new layout options to CMS users?
tags:
- Grid
featuredImg: images/blog/cms-grid/grid-card.jpg
adSpace: 
  image: /images/common-grid-promo.jpg
  headline: Free ebook - Common CSS Grid Patterns
  description: CSS Grid is a revolution in web layout. With this ebook, I cover 3 design patterns that Grid solves easier, better and more creatively to help push our designs in better directions.
  linkText: Download Now!
  linkUrl: https://store.codecontemporary.com/solving-three-design-problems-with-css-grid/buy
---

I love hand crafting layout in CSS Grid. Ask my co-workers. They're tired of hearing about it.

Nothing is going to stop me from hand-coding my CSS. What about people who write no CSS, though? Can we use Grid to open up a world of new layout options to CMS users?

That's not a rhetorical question. I want to hear opinions on this.

I've created a very simple prototype. To all my friends who write good JavaScript, I apologize. Don't look at the JS panel and you'll be happier. The [CodePen is here](http://codepen.io/brob/pen/QpqNVq/) and embedded at the bottom of the article.

In this example, there are three components on a six-column grid. The doesn't have rows specified, but is adjusting the implicit rows via grid-auto-rows.

{% include ad-space.html %}

With simple markup and ugly JavaScript, I created an interface to let a user select grid areas. Using this interface, a user can take this layout:

![The starting point for the grid](/images/blog/cms-grid/grid-start.jpg)

And change it to these layouts:

<img src="/images/blog/cms-grid/grid-cms.gif" alt="Changing the layout based on user input" style="width: 100%;">

As a CSS purist, I'm always wary of ceding my control over to JavaScript or a CMS database. Does this enable a CMS user more interesting controls than otherwise possible?

## Try it for yourself

Keep in mind, you'll need at least Firefox 52 or Chrome 57.

<p data-height="600" data-theme-id="26704" data-slug-hash="QpqNVq" data-default-tab="result" data-user="brob" data-embed-version="2" data-pen-title="Grid CMS Interface" class="codepen">See the Pen <a href="http://codepen.io/brob/pen/QpqNVq/">Grid CMS Interface</a> by Bryan Robinson (<a href="http://codepen.io/brob">@brob</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>


What do you think? Good idea? Bad idea? Overkill?

Keep in mind before answering, I know that Grid is in its infancy of support. These are important questions for the future.
