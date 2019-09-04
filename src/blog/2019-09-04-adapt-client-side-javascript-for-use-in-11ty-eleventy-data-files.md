---
layout: "layouts/post.njk"
title: "Adapt client-side JavaScript for use in 11ty (Eleventy) data files"
categories:
  - development
  - javascript
  - 11ty
  - JAMstack
baseLayout: container--right
description: "I love JavaScript, but I love rendered HTML much more, so I challenged myself to convert James' client-side JS code to something that rendered HTML. I wanted to do it as quickly and as concisely as possible."
featuredImg: /images/icons/icon-512x512.png
adSpace: 
  image: /images/practical-grid-heart.jpg
  headline: Practical CSS Grid - Learn about this revolution in Web design!
  description: Whether you're new to CSS Grid or have played with it, finding practical examples of this new layout mechanism is the best way to learn its power. Sign up below for two hours of practical grid knowledge just for you!
  linkText: Start Learning Now!
  linkUrl: https://store.codecontemporary.com/practical-css-grid
---

My good friend James Q. Quick recently wrote an awesome post describing interacting with APIs without a framework. He used the Pokémon API [PokeAPI](https://pokeapi.co/). He hooked me and I had to put my own spin on it!

Before we go any further, you need to head over to his site and [read the original post](https://www.jamesqquick.com/blog/build-a-pokedex-with-vanilla-javascript)! I won't be going into details on what he did and it's necessary to understanding what's happening in this post.

You can even watch it embedded right here! Go ahead, I'll wait.

{% youtube "T-VQUKeSU1w" %}

## My Challenge: Take James' client-side JS and convert it to a build process to build HTML

I love JavaScript, but I love rendered HTML much more, so I challenged myself to convert James' client-side JS code to something that rendered HTML. I wanted to do it as quickly and as concisely as possible.

I did what I usually do in a situation like this and reached for my favorite static site tool: [11ty](https://11ty.io). 11ty brings [JavaScript data files](/blog/using-eleventys-javascript-data-files/) and simple templating to the party. I thought about keeping in the spirit of James' piece and trying to go framework-free, but I'm not that good a developer.

## Step 0: Set up 11ty dependency

Since we'll be using 11ty, we need to create our `package.json` and install 11ty into our project.

Run the following to get this set up:

Initial your `package.json` with the basics.

{% highlight bash %}
npm init -y
{% endhighlight %}

Then install 11ty:

{% highlight bash %}
npm install --save @11ty/eleventy
{% endhighlight %}

Once the install is done, you should be able to run `npx eleventy --serve` and 11ty will start serving your site. 

## Step 1: Get only the necessary functionality

In James' code, he's got two main JavaScript functions: `fetchPokemon()` and `displayPokemon()`. Our display concerns will be handled by our template, so we can get rid of that function. 

The main functionality of the `fetchPokemon()` function is to create an array of Promises and build out a data array when all the Promises resolve. He runs through these to get additional data on each Pokemon to display instead of the base details the API would normally give. After he builds that data array, he invokes his `displayPokemon` function to handle the building of the HTML.

In our case, this JavaScript needs to just return that array to 11ty.

Here's the modified code: 

{% highlight js %}
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    return Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        return pokemon;
    });
};
{% endhighlight %}

In the file structure of our project, we need to have a folder to contain our data files. I'm keeping this barebones with configuration, so we'll name our folder `_data` which is the 11ty default.

We'll put our data fetcher file in here. Whatever you name the file will be the variable you get in your templates. In this case, I named mine `pokemon.js`. Put our function in the top of this file. 11ty's data files are node modules, so we need to export our data.

{% highlight js %}
module.exports = async function() {
    return await fetchPokemon();
}
{% endhighlight %}

That `await` in the export is very important. Otherwise, 11ty will finish building the site before the data has returned.

The discerning eye might notice that James is using a powerful new browser API to get his data: The Fetch API! This is an amazing API, but we don't have a browser in our build process. In our case, this will break. We need to import a package to cover this. You could convert this code over to Node's native `https` module, but I'm putting this together and rewriting as little code as possible. I'll opt to use the lovely `node-fetch` module which has similar syntax and style.

Install the package:

{% highlight bash %}
npm install --save node-fetch
{% endhighlight %}

Require the package at the top of your file:

{% highlight js %}
const fetch = require('node-fetch');
{% endhighlight %}

From here, our data file should work when 11ty is building or serving the site.

## Step 2: Rework the display to use an HTML template instead of a JavaScript function

Next, we'll need to add a basic HTML template that uses this variable.

For my purposes, I blatantly borrowed James' HTML and CSS, and worked a template loop around his `<li>` for each Pokemon.

{% highlight html %}
<div class="container">
    <h1>Robinson's Pokedex</h1>
    <ul id="pokedex">
        {% for pokemon in pokemon %}
            <li class="card">
                <img class="card-image" src="{{ pokemon.image }}"/>
                <h2 class="card-title">{{ pokemon.id }}. {{ pokemon.name }}</h2>
                <p class="card-subtitle">Type: {{ pokemon.type }}</p>
            </li>
        {% endfor %}
    </ul>
</div>
{% endhighlight %}

## Step 3: Add some styles

By default, 11ty won't pass through your static assets. In this case, our `style.css` file.

We need to add a minimal piece of configuration to take care of this.

We'll create an `.eleventy.js` file in the root of our project.

In that file, we'll export one line that sets 11ty to pass any root-level CSS into our final distribution directory.

{% highlight js %}
module.exports = function(eleventyConfig) {  
   eleventyConfig.addPassthroughCopy("*.css");  
};
{% endhighlight %}

## That's it!

If you've been running the 11ty server this entire time, you may need to restart it. When it restarts, you'll have a functioning, "server rendered" version of James' Pokedex! Push it up to GitHub, host it on Netlify and pat yourself on the back!

You can find the 11ty code [here](https://github.com/brob/pokedex-11ty) and James' initial post [here](https://www.jamesqquick.com/blog/build-a-pokedex-with-vanilla-javascript).