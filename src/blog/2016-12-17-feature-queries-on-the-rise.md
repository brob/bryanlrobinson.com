---
title: Feature Queries are on the Rise
date: 2016-12-17 00:00:00 Z
categories:
- Design
- Tutorial
- CSS
layout: layouts/post.njk
description: Since the Web became a more beautiful place with the advent of CSS, there’s
  always been a struggle in the use of more modern features of CSS with browsers who
  are either slower to adopt or more cautious in the way the implement features. There
  have been many potential solutions for this issue.
---

<aside class="subhead">
    <h2>Does CSS have to be this way?</h2>
</aside>

Since the Web became a more beautiful place with the advent of CSS, there’s always been a struggle in the use of more modern features of CSS with browsers which are either slower to adopt or more cautious in the way the implement features.

There have been many potential solutions for this issue.

First, baked directly into the CSS specification and the browser implementations is the fact that if a browser doesn’t understand a property, it will ignore it instead of sending the user an error. Silently failing means we can progressively enhance web applications without worrying about unsightly error messages being displayed.

Then, Internet Explorer — a long-time culprit of compatibility issues — implemented the idea of conditional stylesheets. You could now build your site the way you wanted it and when things broke (such as z-index in IE7 or float and width issues in IE6) you could specify fixes for them in stylesheets only accessible by those specific versions of Internet Explorer. This means we can gracefully degrade the experience for out-of-date browsers.

<aside class="reference">
    <p>More examples of conditional stylesheets <a href="https://css-tricks.com/how-to-create-an-ie-only-stylesheet/">over on CSS Tricks</a></p>
</aside>

{% highlight html %}

<!-- Main CSS -->
<link rel="stylesheet" type="text/css" href="style.css" />

<!-- Just IE 7 overrides for style.css -->
<!--[if IE 7]>
	<link rel="stylesheet" type="text/css" href="ie7.css">
<![endif]-->

<!-- Less than IE 7 overrides for ie7.css and style.css -->
<!--[if lt IE 7]>
	<link rel="stylesheet" type="text/css" href="less-than-ie7.css" />
<![endif]-->

{% endhighlight %}


Then, in 2009, came [the Modernizr javascript library by Faruk Ates](https://modernizr.com/). This was a huge step forward in allowing you to target features not browsers in your code.

The Modernizr library uses User Agent “sniffing” to find out what a user’s browser is capable of and then provides that information in a few ways for the developer to access. A dev can utilize the library in their javascript to test both CSS features and JS features. Modernizr also can provide your application with features dumped out in a string of class names on the <html> element on the page. Meaning your css can target browsers that support flexbox or browsers that DON’T support flexbox in new and powerful ways.


{% highlight html %}

<html class="js no-flexbox canvas canvastext no-webgl no-touch geolocation postmessage no-websqldatabase no-indexeddb hashchange no-history draganddrop no-websockets rgba hsla multiplebgs backgroundsize no-borderimage borderradius boxshadow no-textshadow opacity no-cssanimations no-csscolumns no-cssgradients no-cssreflections csstransforms no-csstransforms3d no-csstransitions fontface generatedcontent video audio localstorage sessionstorage no-webworkers no-applicationcache svg inlinesvg smil svgclippaths">

{% endhighlight %}

This allows for a lot of flexibility, but is also odd bloat that appears in your <html> DOM node.

<aside class="reference">
    <p>View full details on the <a href="https://www.w3.org/TR/css3-conditional/#at-supports">Conditional Rules Module Level 3 Spec</a></p>
</aside>

All of these methods are great, but they aren’t native citizens of the specification. In the CSS Conditional Rules Module specification — the module that contains the media queries we all know and love for responsive design — the humble Feature Query also lives. A first-class citizen of CSS, the feature query allows for feature detection built right in and built with a syntax designers will already be familiar with based on years of building responsive sites using media queries.

The syntax is relatively easy:

{% highlight css %}

@supports (css-property: value) or (css-property: value) {
	.class {
		…
	}

}

{% endhighlight %}


Here’s a concrete example using CSS Grid -- an amazing new layout property that isn’t in even modern browsers until March or April 2017.

<aside class="subhead">  
    <h2>No Feature Query</h2>
</aside>

Here's what the example looks like with no feature query. If you're in a browser that supports Grid Layout -- which you're probably not -- then you'll see a great grid layout. If you're not, you'll see full-width block-level divs with images with no explanation.

<iframe height='500' scrolling='no' title='CSS Grid Example - No Feature Query' src='//codepen.io/brob/embed/ENwbPK/?height=500&theme-id=26704&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true'>See the Pen <a href='http://codepen.io/brob/pen/ENwbPK/'>CSS Grid Example - No Feature Query</a> by Bryan Robinson (<a href='http://codepen.io/brob'>@brob</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

<aside class="subhead">  
    <h2>Feature Query Showing Lack of Support</h2>
</aside>


In this example, we simply hide the alert message from all browsers that DO support Grid layout and allow every other browser to use the default value set in the CSS for the bar allowing it to be visible.

<iframe height='500' scrolling='no' title='Feature Query - Show alert box' src='//codepen.io/brob/embed/QGqOjo/?height=500&theme-id=26704&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true'>See the Pen <a href='http://codepen.io/brob/pen/QGqOjo/'>Feature Query - Show alert box</a> by Bryan Robinson (<a href='http://codepen.io/brob'>@brob</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

<aside class="subhead">  
    <h2>Feature Query to Progressively Enhance to Grid</h2>
</aside>


In this example, we build a nice layout utilizing the Flexbox property of CSS — which has support in all modern browsers — and then utilize Feature Queries to rebuild the grid using the Grid Layout properties.

<iframe height='500' scrolling='no' title='Feature Query to use Flexbox instead' src='//codepen.io/brob/embed/oYGobW/?height=500&theme-id=26704&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true'>See the Pen <a href='http://codepen.io/brob/pen/oYGobW/'>Feature Query to use Flexbox instead</a> by Bryan Robinson (<a href='http://codepen.io/brob'>@brob</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

This way you get a nice layout either way and for those that have enabled the use of CSS Grid, they get a really nice layout.

There are loads of methods for progressively enhancing your site, but CSS Feature Queries are by far one of the cleanest ways of doing it that we’ve ever had.

You can view all three codepens together in my [CodePen Feature Query Collection](http://codepen.io/collection/DdpPGk/)

*If you have any questions, I'd be more than happy to answer in the comments or [on Twitter](http://twitter.com/brob/).*
