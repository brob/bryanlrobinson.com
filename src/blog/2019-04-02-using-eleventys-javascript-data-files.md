---
layout: layouts/post.njk
title: Using Eleventy's (11ty) JavaScript Data Files
categories:
  - development
baseLayout: container--right
description: I enjoy building workflows for pure static sites. I enjoy ingesting data into my build process instead of loading my client-side with fetches. In this example, we'll use Eleventy's ability to use a JavaScript file, to execute code to fetch data on site build, negating the need for task runners like Gulp.
featuredImg: /images/icons/icon-512x512.png
adSpace: 
  image: /images/practical-grid-heart.jpg
  headline: Practical CSS Grid - Learn about this revolution in Web design!
  description: Whether you're new to CSS Grid or have played with it, finding practical examples of this new layout mechanism is the best way to learn it's power. Sign up below for two hours of practical grid knowledge just for you!
  linkText: Start Learning Now!
  linkUrl: https://store.codecontemporary.com/practical-css-grid
sidebarOverride: "15"
---

I enjoy building workflows for pure static sites. I enjoy ingesting data into my build process instead of loading my client-side with fetches. 

I've been doing this for a while in [Jekyll](https://jekyllrb.com/) using [Gulp](https://gulpjs.com/) to run a fetch task. After the data is fetched, I can use Node's File System module to write a new data file that Jekyll can parse and put into my templates.

This works. It's served me well. I've been working on converting sites over to [Eleventy (11ty)](https://11ty.io). With this conversion, I get all my favorite JavaScript syntax for fetching data directly in my data files.

This removes complexity from my Gulp tasks -- which I still use to build and serve my sites. A simpler build will help me to understand these projects when I come back to them after months away.

#### Want a video version? 

Here's a live tutorial session based on using Eleventy's data files or [skip to the text tutorial](#data-files-in-eleventy).

<figure style="position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; margin-bottom: 1rem;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/JpK0G4vQjZI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"  style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;" allowfullscreen></iframe>
</figure>

## Data Files in Eleventy

Eleventy [handles data](https://www.11ty.io/docs/data/) a little more flexible than Jekyll. You can store global data in your _data directory or store section, page or post data in folders dedicated to those items.

In this example, we want a global set of data, so we'll store it in a `_data` directory.

In Jekyll, you can create JSON files in a data directory to use that data anywhere in your site. 11ty is much the same. It will accept a JSON file no problem.

In my old flow, Gulp would spit the data out into a JSON object in a file that Node.fs would write.

11ty introduces the ability to use native JavaScript files. At its simplest, you create a JS file with that exports your data.

{% highlight js %}
module.exports = {
    data1: "Some string,
    data2: ["peaches", "plums"]
}
{% endhighlight %}

What makes this super handy, though, is that you can execute any JavaScript you want inside this file. This gives you lot of possibilities when it comes to fetching and storing data.

I've been working on a starter template for tech user groups to use to build their websites, so let's use the Meetup API for our example.

## Preparing Meetup's API

The reason I like to use Meetup as an example is that the API is relatively simple and they have a great interactive console for experimenting.

If you want to look at all the data you can fetch for your meetup group, just head on over to [their API documentation](https://secure.meetup.com/meetup_api/console/). It's also handy that the next tab over contains your API key to make the request.

We're going to use environment variables for storing our API key and meetup group ID. You can hardcode your group ID if you'd like, but you should keep your API key hidden by using the environment variable.

Locally, you can use the NPM package `dotenv` to access environment variables that you set in a .env file in the root of your project. Make sure to add your .env file to your .gitignore!

Most static site hosts will give you the ability to set environment variables. Netlify's can be accessed in your project's "Build and Deploy" settings.

## Writing the function to grab events

To make our GET request, we'll use the NPM package `axios`. It's handy for making simple requests to APIs. It's also Promise based, which means it won't hang up your build process while the data is fetched.

To bring this into your project, run `npm install --save axios`. Then, require the package at the top of your file.

The `axios.get()` method expects a URL, so we'll build that with JavaScript's template literals to bring in our environment variables. The Meetup API also lets you specify how many events to return. In this example, I'm returning 20, but this could be adjusted for your needs.

{% highlight js %}
module.exports = async function() {
    let url = `https://api.meetup.com/${process.env.MEETUP_URL }/events?photo-host=public&page=20&sig_id=${process.env.MEETUP_KEY}`;
}
{% endhighlight %}

After we've built that, we'll return with our axios call. The response we get back has more than just the data we want, so in our axios function, we'll grab the `data` property off the response and return that.

{% highlight js %}

var axios   = require('axios');

module.exports = async function() {
  let url = `https://api.meetup.com/${process.env.MEETUP_URL }/events?photo-host=public&page=20&sig_id=${process.env.MEETUP_KEY}`;
  
  return axios.get(url)
      .then(function (response) {
          return response.data;
      })
      .catch(function(error) {
          console.log(error);
      });
}
{% endhighlight %}

From here, Eleventy will take over and build the data when the site is generated or served. It will also display any console.log calls in the command line. If you're unsure of what's going wrong, this can be extremely helpful.

## Use the data in your templates

So, Eleventy has access to the data. Now what?

This data is now a first-class citizen in your Eleventy site. You can loop through it in any template to create a list of meetups.

What this looks like at its most basic:

{% highlight html %}
{% raw %}
<ul>  
  {% for meetup in meetups %}  
  <li>
    <a href="{{ meetup.link }}">{{ meetup.name }}</a>
  </li>  
  {% endfor %}  
</ul>
{% endraw %}
{% endhighlight %}

Any property on the the meetup object is accessible. Other handy properties include `description`, `local_date`, and `venue`.

## Create a custom filter to lookup meetups by name

Eleventy allows you to write custom template filters, as well. If you want to do a lookup and only display certain meetups based on a string lookup in the events name, you can create a custom filter.

The Eleventy documentation has you add filters in your `.eleventy` config file. I like to move them out into their own directory and require them in my configuration.

In our example, my configuration looks like this:

{% highlight js %}

   config.addFilter("lookup", require("./filters/lookup.js"));  
{% endhighlight %} 

Just like before, our code will be in an export. In this case, we'll export an anonymous function with two arguments: `array` and `filterString`. The array is the data in the template tag. `filterString` is a variable passed into the filter. 

{% highlight html %}
{% raw %}
{% assign filteredMeetup = meetups | lookup: "filterString goes here" %}

<ul>  
  {% for meetup in filteredMeetup %}  
  <li>
    <a href="{{ meetup.link }}">{{ meetup.name }}</a>
  </li>  
  {% endfor %}  
</ul>
{% endraw %}
{% endhighlight %}

From there, our code will take the array data and in this example use the array.filter method to filter based on the items name including our filterString. We then return the array at the end.

{% highlight js %}

module.exports = function(array, filterString) {  
   array = array.filter(item => {  
       console.log(item.name);  
return item.name.includes(filterString);  
   });  
return array  
}

{% endhighlight %}

## Extend the functionality

Any API can be consumed this way. It can provide data to your templates. This reduces the amount of requests a browser has to make, gives you data in the context of your templates and lets you manipulate the data however you need to.

From here, take these simple examples and remix them! This can be useful for many projects and client requests.

You can see this in action on my [user group skeleton project site](https://netlify-meetup.netlify.com/). [You can view the code here](https://github.com/brob/static-meetup-skeleton).

{% include ad-space.html %}
