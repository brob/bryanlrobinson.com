---
layout: layouts/post.njk
title: Create an Eleventy (11ty) theme based on a free HTML template
categories:
  - development
baseLayout: container--right
description: In this video series, we'll take a look at what it takes to start with a free HTML template found on Google and convert it for use with a static site generator (SSG). We'll be using my personal favorite SSG 11ty (EleventyJS).
featuredImg: /images/icons/icon-512x512.png
adSpace: 
  image: /images/practical-grid-heart.jpg
  headline: Practical CSS Grid - Learn about this revolution in Web design!
  description: Whether you're new to CSS Grid or have played with it, finding practical examples of this new layout mechanism is the best way to learn it's power. Sign up below for two hours of practical grid knowledge just for you!
  linkText: Start Learning Now!
  linkUrl: https://store.codecontemporary.com/practical-css-grid
---
In this video series, we'll take a look at what it takes to start with a free HTML template found on Google and convert it for use with a static site generator (SSG). We'll be using my personal favorite SSG [11ty](https://11ty.io).

For many people working in agencies or doing freelance, it's hard to make a transition from WordPress to something static. Themes are incredibly handy when using WordPress. You can still have the conveniences of templates and themes with a static site generator.

Many SSGs have themes available free or for low costs, but it's not too hard to convert any HTML theme into a theme on a SSG.

## Introduction

<figure style="position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; margin-bottom: 1rem;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/z-o1W9ijUhI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"  style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;" allowfullscreen></iframe>
</figure>

## Tutorial 1: Project structure and initial templates

In this video, we'll tackle picking our theme and basic 11ty setup and configuration. After we move our assets and static HTML into our project, we install Eleventy via `npm install @11ty/eleventy` and create a `.eleventy.js` configuration file with some simple modifications.

<figure style="position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; margin-bottom: 1rem;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/h6ZxRudaYIQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"  style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;" allowfullscreen></iframe>
</figure>

## Tutorial 2: Creating a base template

In this video, we'll tackle creating the base template from which all our other templates will inherit. 

This template will contain our header and footer, as well as our page banners.

We set up the template and then use front matter to use the layout on each of our HTML pages.

<figure style="position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; margin-bottom: 1rem;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/iWivBpYmOaQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"  style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;" allowfullscreen></iframe>
</figure>

## Tutorial 3: Creating a reusable simple content template

In this video, we explore extending our base template to allow for a reusable simple content template that we'll use for our "About" page.

<figure style="position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; margin-bottom: 1rem;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/iHHxd5L_gIo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"  style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;" allowfullscreen></iframe>
</figure>

## Tutorial 4: Eleventy Collections for Services and Testimonials (where the fun begins)

This video is where the fun begins! We start converting our data over from static HTML to be more dynamic by creating 11ty Collections.

These collections allow us to create a file per service and testimonial and then loop through those in our templates to create the design from our HTML.

<figure style="position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; margin-bottom: 1rem;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/xzH2XZubgEk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"  style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;" allowfullscreen></iframe>
</figure>

## Tutorial 5: Creating a Custom Homepage with front matter and collections

In this tutorial, we'll tackle converting our homepage into a custom template. We'll use front-matter for the one-off data on the homepage. For Services and Testimonials, we'll pull data directly from the collections we created in the previous video. For a new Brands section, we'll create another collection and pull those in as well.

<figure style="position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; margin-bottom: 1rem;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/5MpfJNdPnNs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"  style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;" allowfullscreen></iframe>
</figure>

## Coming Soon: Contact Form, Deployment and NetlifyCMS tutorials