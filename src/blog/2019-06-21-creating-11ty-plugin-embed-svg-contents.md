---
layout: layouts/post.njk
title: Creating an 11ty Plugin - SVG Embed Tool
categories:
  - development
  - design
  - 11ty
  - JAMstack
baseLayout: container--right
description: In the sites I’ve built with Eleventy (11ty) recently, I’ve found myself reusing a couple filters. This has involved me copying and pasting the code a lot. The solution? Create an 11ty Plugin.
featuredImg: /images/eleventy-plugin-banner@2x.jpg
featuredLarge: true
adSpace: 
  image: /images/practical-grid-heart.jpg
  headline: Practical CSS Grid - Learn about this revolution in Web design!
  description: Whether you're new to CSS Grid or have played with it, finding practical examples of this new layout mechanism is the best way to learn its power. Sign up below for two hours of practical grid knowledge just for you!
  linkText: Start Learning Now!
  linkUrl: https://store.codecontemporary.com/practical-css-grid
---

![11ty Plugin banner image where a plug is coming out of the 11ty logo](/images/eleventy-plugin-banner@2x.jpg)

It's [well documented](/blog/2019/06/10/routing-contact-form-submissions-to-different-addresses-with-netlify-zapier-and-sendgrid/) that [I love the JAMstack](/blog/2019/04/26/client-work-and-the-jamstack/). It's also [well documented](/blog/2019/05/31/create-11ty-theme-from-static-html-template/), that I'm a fan of the JavaScript static site generator [11ty (Eleventy)](https://11ty.io). In the sites I've built with it recently, I've found myself reusing a couple filters. This has involved me copying and pasting the code a lot. The solution? Create an 11ty Plugin.

I honestly thought this was a relatively new feature, but it turns out, it's been around since v0.2.13! Look at that pie on my face!

> Don't care about creating the filter or plugin and just want to embed an SVG in your template? Run `npm install --save eleventy-plugin-svg-contents` and [read the usage here](https://www.npmjs.com/package/eleventy-plugin-svg-contents).

## What is an 11ty plugin?

An 11ty plugin is an NPM package that exports additions to your 11ty configuration. So all you have to do to add one to your site is to `npm install` the package and then add the plugin to your configuration. 

At that point you have access to anything the plugin offers. Most plugins are adding custom filters, tags or shortcodes. This can be handy for a lot of uses. Some of the plugins offered on [the official documentation](https://www.11ty.io/docs/plugins/) give you handy [filters for RSS feeds](https://www.npmjs.com/package/@11ty/eleventy-plugin-rss), [give estimated reading times for your blog posts](https://www.npmjs.com/package/eleventy-plugin-reading-time), and even [lint your blog posts based on inclusive language](https://www.npmjs.com/package/@11ty/eleventy-plugin-inclusive-language)!

## New Plugin: Embed an SVG from a file

In my projects, I like to have SVG files embedded in the HTML whenever possible to allow for using CSS to control various aspects of them. I could potentially use a template `include` to put the the code into my template. The drawback for that would be if I want to use a CMS to upload the image or use an SVG optimizer in my build process.

This allows me to upload SVGs to my images directory and still embed them easily in my template.

Let's start with how the filter itself works.

## The svgContents filter

The logic behind the filter is as basic as I could make it.

1\. Accept a string of a file path

2\. Find that file in the project.

3\. Get the contents of the file

4\. Return the contents encoded to utf-8

In 11ty, we add our custom filters in our `.eleventy.js` config file, but we can house those filters elsewhere.

My config file looks like this:

{% highlight js %}
module.exports = function(config) {  
   config.addFilter("svgContents", require("./filters/svgContents.js"));
   // The rest of my config down here
}
{% endhighlight %}

Then, I put the filter itself in the `contents.js` file as a `module.export`.

{% highlight js %}
const fs = require('fs');  

module.exports = function(file) {  
  let relativeFilePath = `.${file}`  

  let data = fs.readFileSync(relativeFilePath, function(err, contents) {  
    if (err) return err  
    return contents  
  });

  return data.toString('utf8')  
}

{% endhighlight %}

To use our filter in the template, we'll use the following syntax (in Nunjucks and Liquid): 

{% highlight html %}
{{ "/string/to/svg.svg" | svgContents }}
{% endhighlight %}

By default, 11ty will accept the value of our variable in the template as the first argument of our function.

We then pass that string to the Node file-system `readFile` method. This will return the contents of the file. We'll then return out of our filter method with a value of our contents encoded to UTF-8 for our template.

That's it for the filter. It's pretty lightweight. If you wanted, you could copy and paste that code into your project and embed any SVG you want. Like I said above, though, I got tired of copying and pasting. Let's take a look at what it takes to make this a plugin!

## Creating a plugin for 11ty

A plugin for 11ty is a JavaScript module at its heart. In the case of making it shareable, it's specifically an NPM package.

There are better people than me to explain the intricacies of a proper setup for a package.json for an NPM module, but the important thing here, is that the main file for our module is its own `.eleventy.js` config file.

The contents of our 11ty config file should look very similar:

{% highlight js %}
const svgContents = require("./src/getSvgContents");  

module.exports = function(eleventyConfig) {  
    eleventyConfig.addFilter("svgContents", svgContents);  
};
{% endhighlight %}

The file paths have changed, but the theory is still the same. We add our filter to the `eleventyConfig` object. The contents of our our module will be injected into the main 11ty config file in the final use.

While we're making small changes, let's add a few protections for the code: 

{% highlight js %}
const fs = require('fs');  
const path = require('path');  

module.exports = function(file) {  
    let relativeFilePath = `.${file}`  
    if (path.extname(file) != '.svg') {  
        throw new Error("eleventy-plugin-svg-contents requires a filetype of svg");  
    }  
    let data = fs.readFileSync(relativeFilePath, function(err, contents) {    
        if (err) {  
            throw new Error(err)  
        }  
        
        return contents  
    });  
    return data.toString('utf8')  
}
{% endhighlight %}

We've added an error check early in the process. If the file extension isn't `.svg`, we'll exit with an error that will show up in the console. It's always helpful to know why your site build fails. 

Later in the code, we use the `fs.readFile` API's error condition like we did in the initial filter, but convert it over to a full-fledged error.

That's it. We publish this to NPM and we can now install it in our project.

## Installation of the plugin

### 1\. Install the package

{% highlight bash %}
npm install --save eleventy-plugin-svg-contents
{% endhighlight %}

### 2\. Require the package in our config file

{% highlight js %}
const svgContents = require("eleventy-plugin-svg-contents");
{% endhighlight %}

### 3\. Register the plugin

{% highlight js %}
module.exports = function(config) {  
   config.addPlugin(svgContents);  

// Everything else
}
{% endhighlight %}

### 4\. Use the filter in our templates

In any Nunjucks or Liquid template, use a variable notation: 

{% highlight html %}
{{ "/string/to/svg.svg" | svgContents }}
{% endhighlight %}
## 11ty makes this super easy and fun

If you've made an 11ty filter or custom tag, you can abstract them out to package to bring your favorite configuration options with you between projects.

You don't need an SVG embed filter anymore, I've got you covered on that. What other filters would you like to create? If you're not up to creating a custom filter or tag, what are your most used filters and plugins and could you create your own package to bundle them up and give yourself a great headstart on any new project?

Let me know in the comments!

{% include ad-space.html %}
