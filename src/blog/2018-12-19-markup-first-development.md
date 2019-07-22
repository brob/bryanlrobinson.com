---
layout: layouts/post.njk
title: 2019 The Year of Markup-First Development
categories:
  - development
  - css
  - html
baseLayout: container--right
description: The state of the web in 2018 has been heavy into the world of JavaScript. We've made amazing advancements in the way our sites work. Every site has the ability to feel like an application. Without HTML, though, our fancy future may have a dystopian layer right beneath the surface.
featuredImg: /images/uploads/year-of-markup-social.png
featuredLarge: true
adSpace: 
  image: /images/common-grid-promo.jpg
  headline: Free ebook - Common CSS Grid Patterns
  description: CSS Grid is a revolution in web layout. With this ebook, I cover 3 design patterns that Grid solves easier, better and more creatively to help push our designs in better directions.
  linkText: Download Now!
  linkUrl: https://store.codecontemporary.com/solving-three-design-problems-with-css-grid/buy
---

![Year of Markup Graphic](/images/uploads/year-of-markup.jpg)

All right, everyone. I'm calling it. 2019 will be the year of "Markup-first development." Not because we want it to be, but because we need it to be.

The state of the web in 2018 has been heavy into the world of JavaScript. We've made amazing advancements in the way our sites work. Every site has the ability to feel like an application. Smooth, fast transitions happen between states and pages. It definitely feels like the future of the web.

Without HTML, though, our fancy future may have a dystopian layer right beneath the surface.

## Why worry about the fate of HTML?

HTML is a simple authoring language. It's declarative, descriptive and easily analyzed. It fits nicely in the "[Rule of Least Power](https://blog.logrocket.com/what-the-rule-of-least-power-means-for-modern-developers-b846010a8595)" as described by Tim Berners-Lee.

Let's break the importance of that down a little more.

### HTML is Declarative

A declarative language is easy to understand. HTML was created to be an authoring language for content. 

It's structure is built in a way that non-technologists can learn quickly. I've taught HTML to college students and to 60-year old journalists. Across the board, it's never taken more than an hour to pass on the knowledge they need to create simple content.

Because of it's declarative nature, not only do humans author it easily, but machines can as well. There are dozens of WYSIWYG editors available that can create viable markup. That's not to say that machines can't author JavaScript. At the end of the day, though, it requires very little power and logic to create HTML from simple rules.

### HTML is Descriptive

HTML means what it says, by default. With no CSS and no JS, your page has additional meaning outside of your content. 

With no effort outside of your authoring, you are able to describe each piece of your content with important information. A paragraph is semantically a paragraph. An image is an image. 

### HTML can be easily analyzed

Because of its descriptive nature and simple declarative style, HTML is easy for any system to analyze. All of the information is matched together with the data about the information. It can be read by a system and remixed. 

It can be used by a browser, by a screen reader or by a bot.

If anything happens to its declarative and descriptive nature, it becomes much harder to analyze. This can have potentially crippling affects on your site and your users.

If a bot can't easily scrape your site, your search rankings will go down. If a screen reader doesn't understand your markup, a user won't be able to access your content. Write your content in something a browser doesn't understand and no one with that browser can access it.

So, why is it that more and more apps and websites look like this:

{% highlight html %}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My Awesome SPA site</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>

{% endhighlight %}

I think the simple answer is that we get a lot of power from new methods and don't want to have to think about old methods. That's a simplistic take, but it's not far from the mark.

So, how do we fix this epidemic in 2019?

## Write and think "Markup First"

Developers need to take a step back when writing the code for their application. They need to think and write in a markup-first mind set.

How can you do this with minimal effort (because let's face the facts, humans are lazy)? 

Here are my two simple steps to shipping accessible, analyzable, semantic code.

### Step 1: Put the HTML back in your HTML document

Shipping an HTML document with no content to the browser and praying to your JavaScript to finish the job is not a sound strategy.

Let's examine some potential issues:

*   A screen reader doesn't understand your JS
*   A bot doesn't understand your JS
*   Your JS doesn't get downloaded due to network issues
*   A user opts out of your JS (hey, it happens)

These aren't all the scenarios, but any of them can come up at any time. The more they happen, the more angry users you'll have not being able to consume your app.

Let's talk about two strategies for shipping real HTML.

First, there's the old standby: write your HTML and have your app replace it with JavaScript.

Most modern JavaScript frameworks want a single root element to completely overwrite. Might as well use that to your advantage.

Write your HTML inside of that element and then let the JS take it from there.

This method works well for small applications. As soon as you have more than a handful of states or routes, it becomes much more difficult to manage. You need an individual HTTP route for each of your JS routes.

#### That's where prerendering comes in.

The "simple" solution to pre-rendering is to use a third party. Prerender.io is a popular service that you can integrate with that will build and store static HTML for your app. It becomes a dependency of your code and you have API access to its functionality. 

Prerender is a third-party software as a service product. You may not want to pay a company to do this for you.

#### That's OK. There are other methods, as well.

One of the biggest trends in 2018 has been the resurgence of static hosting. You store your static HTML on a cheap, secure and lightning fast service. Since much of what we work with in front-end development doesn't require server-side code, we can use a service like [Netlify](https://netlify.com) or [Surge.sh](https://surge.sh) to host.

This gives us easy access to use our build process to create what we need for rendering HTML alongside our JS.

The great thing about this is that there are frameworks that do a lot of the heavy lifting for you.

Are you a React lover? Check out [Gatsby](https://www.gatsbyjs.org/). Prefer Vue? [NuxtJS](https://nuxtjs.org/) is where you want to look. 

These are amazing because the complexity is in the build. This means that you get the developer convenience of writing your application once with tools you enjoy and the user gets all the benefits of server rendering AND SPA-style pages.

### Step 2: Think about your markup

It's not enough to just render HTML in your HTML document. It also needs to be well constructed.

If you're not accustomed to thinking about your HTML, it might come as a shock that there's a lot of thought that's been put into each element.

Let's look at the case of a clickable element. What HTML element should you use to make something clickable?

Let's get this out of the way first. Although you can write this code and have it work, don't do this:

{% highlight html %}

<span onclick="runFunction();">Click me!</span>

{% endhighlight %}

Full stop. Don't do it. I feel like this shouldn't have to be said, but I've seen it too much in the wild...

If you answered an `anchor` tag, you MIGHT be right, but only in some cases. I can't do the subject justice like Ire Aderinokun in her post "[Anchors vs. Buttons](https://bitsofco.de/anchors-vs-buttons/)." Read the entire post, but here's a quick quote on anchors and buttons.

> The `<a>` element represents a hyperlink to a destination page or a section within a page. The element is labelled by its contents, which can be anything from an image to additional (non-interactive) elements like `<div>`s, `<p>`s, etc.
> `...`
> The `<button>` element, more specifically the `<button type=“button”>` element, does nothing. 

She goes on to describe additional differences between the elements. Screen readers will read them differently and keyboard users interact with them differently.

Her post really highlights how much thought can go into even the simplest choice.

If you're not willing to put the same thought into your markup as you are into your JavaScript, you're doing a disservice to your user.

Accessibility is immensely important. I can't underscore that enough. If you're not willing to think about your markup's semantics for that, think about SEO value.

I mentioned in the intro that HTML is descriptive and that the descriptiveness makes it analyzable. So, what happens if you describe things poorly? It's still analyzable, but the analysis will be wrong. A bot reading your content will prioritize the wrong things.

Imagine a blog post written like this:

{% highlight html %}

  <div class="article">  
      <div class="big-header">Headline for my story</div>  
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat lorem dolor. Aliquam volutpat aliquet sollicitudin. Praesent venenatis pulvinar mi, vel elementum neque fringilla eu. Cras sodales neque vel ultricies condimentum. Duis a ante id felis egestas bibendum at vitae justo.</p>  
      <div class="secondary-header">Section headline for my story</div>  
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat lorem dolor. Aliquam volutpat aliquet sollicitudin. Praesent venenatis pulvinar mi, vel elementum neque fringilla eu. Cras sodales neque vel ultricies condimentum. Duis a ante id felis egestas bibendum at vitae justo.</p>  
  </div>
{% endhighlight %}

This may seem like a strawman argument, but I've seen instances of  this too often.

The problem with the code above is that bots have no way of structuring importance of those elements. In fact, the paragraphs will have a higher value in a bot's eye than our headlines.

When writing content, I pay close attention to the various headline levels. This adds the right metadata to my content. It makes it something that bots will enjoy analyzing. If you're working on personal projects, it might not matter. I can almost guarantee your client or your boss (or boss's boss) will care.

Hand-in-hand with semantics is your structure. HTML is infinitely nestable. Just because you CAN do something doesn't necessarily mean you should.

Often nesting in HTML is a symptom of styling. To accomplish a design set before of, sometimes we suffer from `divitis`. 

This is changing with modern CSS, but it requires a mental shift. The same goes for JavaScript. Sometimes that extra level has been mandatory in the past.

Due to limitations in the way React rendered the DOM, if you wanted to render multiple sibling components, you would have to wrap them in an arbitrary parent.

This is less than ideal for clean markup. In [React v16.0](https://reactjs.org/blog/2017/09/26/react-v16.0.html), the React team released the concept of Fragments. This allows for a developer to have multiple elements rendered at the top level of a component.

I love the example that [the React docs use](https://reactjs.org/docs/fragments.html) for this use case. In the example, they have `<tr>` that has a single component `<Columns />` inside. The `<Columns />` Component has two `<td>`s inside of it. In the old way those would be wrapped in a `<div>` or `<span>` which is not valid HTML. By wrapping it in a `<React.Fragment>` tag, it will instead render just the two `<td>`. 

This keeps you structure much closer to its semantic needs. This will help bots and screen readers, but I also find it helps your future self.

If you open up developer tools to inspect elements, the deeper things are nested the harder they are to debug. Save yourself the hassle and keep nesting simple.

Elements that describe a single group of information should be grouped. Your HTML should read like a well-written article.

Complete thoughts are grouped into sentences. Complete concepts are grouped into paragraphs. Complete points are grouped into sections. Sections are grouped into your story.

HTML should be readable by anyone coming after you. It should be logical, clean and precise.

## Additional Perks

If you're looking for more reasons to adopt this line of thinking, ponder this. 

There have been lots of movements telling you what to think or write first. [Mobile first](https://www.lukew.com/ff/entry.asp?933). [Resilient design](https://resilientwebdesign.com/). [Support first](https://bryanlrobinson.com/blog/2016/12/17/feature-queries-on-the-rise/).

If you take the time to structure your semantically correct markup properly, you get all of that out of the box. Everything we need the web to be in the future, stems from good HTML.

## Final Thoughts: Please think

In 2019, as the JavaScript ecosystem continues to build it's momentum, please don't neglect the foundation of the web.

The better the HTML of our sites and applications, the better the entire web will be.

Just like you plan out your application, you should plan out how your application will render. Think about the order, the semantics, the structure and the users be they bots, browsers, screen readers or humans.

Happy New Year!