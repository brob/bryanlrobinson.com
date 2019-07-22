---
layout: layouts/post.njk
title: Build Trust on the Web incorporating User Worries with your User Stories
categories:
  - development
  - design
baseLayout: container--right
description: The web is suffering from a crisis of trust. Every week there’s a new story posted about a data breach or untrustworthy practices (I’m looking at you, Facebook). How can we fix that? When we create user stories for new features, shouldn’t we also create user worries about them?
featuredImg: /images/bryan-and-link.jpg
adSpace: 
  image: /images/common-grid-promo.jpg
  headline: Free ebook - Common CSS Grid Patterns
  description: CSS Grid is a revolution in web layout. With this ebook, I cover 3 design patterns that Grid solves easier, better and more creatively to help push our designs in better directions.
  linkText: Download Now!
  linkUrl: https://store.codecontemporary.com/solving-three-design-problems-with-css-grid/buy
---

The web is suffering from a crisis of trust. Every week there’s a new story posted about a data breach or untrustworthy practices (I’m looking at you, Facebook).

At the height of the Facebook-is-giving-away-your-data controversies, Dave Rupert shared this “user story” tweet:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">As a Customer, I want to see relevant content and personalized advertisements using data siphoned from personal and private Facebook DMs without my consent.</p>&mdash; Old Guard Rupert (@davatron5000) <a href="https://twitter.com/davatron5000/status/1075434036854747137?ref_src=twsrc%5Etfw">December 19, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

While Dave’s post is the height of Twitter humor about this topic, it got me thinking: When we create user stories for new features, shouldn’t we also create user _worries_ about them?

## What is a user story? 

To the uninitiated, user stories are a technique popularized by Agile development practitioners. They are a way of breaking up products and features into discrete pieces to be created.

There are as many ways of being Agile as there are companies using Agile methodologies, but the general take on user stories follows this pattern:

> As a < type of user >, I want < some goal > so that < some desired result >.

To take an example from Dave’s tongue-in-cheek tweet, the following user story could be real for Facebook:

>As a < Personal User >, I want < my news feed to have the most relevant content based on my interests > so that < I can prioritize what items to read >.

This is a big feature for one user story. Big user stories are called “epics” and are broken up into multiple smaller stories.

That’s the general flow. It helps create requirements documentation based around potential user needs. Read more about user stories here: [https://www.mountaingoatsoftware.com/agile/user-stories](https://www.mountaingoatsoftware.com/agile/user-stories)

## Enter user worries

One thing that user stories don’t account for is user stress. Our products on the web have the ability to touch a wide range of people. And the web is a diverse and hopefully inclusive place. So, it follows that every feature we write will be used by drastically different people with different experience levels and thus different stress points.

People’s anxiety regarding a new technology can vary based on many factors. Have they had their identity stolen before? How long have they used a computer/smartphone/web browser? Did they have a stressful day at work? Do they have a screaming baby in their arms? Not everyone will approach your new feature from the same starting point.

{% include ad-space.html %}

How can we mitigate their concerns?

I propose taking all your user stories and creating a list of potential user worries. You get bonus points if you are able to talk to users and find out their worries firsthand.

Let’s take a look at corresponding user worries for our user story example above.

### “Interests” 
-   How do you know my interests?  
-   Are you reading my messages?  
-   Are you sharing my interests with another company?  
-   Can my friends see my interests?  
-   Can individual employees view my interests?  
-   Do you know what websites I visit?  
-   Can you listen in to my phone calls if I access this from my phone?  
-   Can I opt out?  
-   Do ads get higher priority than my friends?  


### “Most relevant content”
-   If you filter my content, will I miss something that’s actually important to me?  
-   How do you know what I’m interested in?  
-   My sister is pregnant. Will I miss baby photos because I don’t have a history of viewing baby photos?  
-   Will my friends see what I post?  
    
Many users struggle with the concept of algorithms and data sorting. Many more struggle with big tech companies knowing what they like.

If you prioritize these worries along with your features, you’ll discover additional features that can offset the worries. You may also find potential ethical concerns.

While this example is obviously fresh in everyone’s minds from the recent Facebook scandals, let’s take a look at something that’s a little less loaded with security concerns.

User story: As an author, I want my work saved regularly so that I cannot lose work if my application crashes.

This feature can be best described as an “autosave.”

**Let’s outline some user worries that go along with this feature:**

-   How often is “regularly”?  
-   Will this save my mistakes?  
-   Can I undo a save?  
-   How do I know my document is saved?  
-   If I come back to a document, can I undo changes I made previously?  
-   If I forget about the auto-saving feature and hit Cmd/Ctrl+S, will that break things?  
-   Is a manual save handled differently from an autosave?  
-   (If online platform) What happens when I lose my Internet connection while working?  

These worries may not seem as earth shattering as those in the Facebook example, but to your users they may be very important.

## How do you create a user worry?

Like most things that have the word “user” in their title, a user worry will come from one of two places.

### The best source of user information: User research

If you’re doing user stories properly, they’re probably stemming from some form of user research. Finding user worries is just another step in compiling your new features.

You shouldn’t feel like user research has to have a large price tag attached. These can be simple conversations with your users. To gather user worries, simply ask your users a few additional questions.

_"Do you have any questions about < feature > ?"_

You’ll notice a pattern in my user worry examples above: They’re all questions. I find that most worries in life stem from unanswered questions. So, make sure your sample users ask you any questions they have.

### The second-best source of user information: Empathy

There’s no question that primary user research is the best way to get good user data. If for whatever reason you’re lacking research, empathy will win the day.

If you have personas built, put yourself in those user mindsets. What are they thinking as they use your feature? What outside stressors could be weighing on them? When are they using this feature? How technologically savvy are they?

In our autosave example, we probably are dealing with users from a wide range of tech backgrounds. If a particular user just got accustomed to saving his work often, it’s a new mental model for them to “not worry” about saving anymore. Often, less tech-savvy users view technology as an abstract “magic.” It was already magical enough that they could write on a machine; now they have to trust in that magic to keep their work safe. That’s a big leap for some.

## Utilizing user worries

A comprehensive list of user worries will give you more features and design elements to build. Let’s take a few our worries from our autosave example and find some new features or ideas that will address those worries.

### How do I know my document is saved?

_As a user, I want to know that my document is saved._

### How often is “regularly”?

Adding a timestamp to the most recent save could help put a user at ease. If I can see that the last save was 2 minutes ago, I can gain more understanding of how often this feature works.

_As a user, I want to know when my document was last saved._

### If I come back to a document, can I undo changes I made previously?

This could be solved in a few ways. First, we could add a manual undo/redo button near the save notification. This would show users that undoing is possible outside Cmd/Ctrl+Z.

_As a user, I want a graphical representation of my undo/redo options._

Next, we could provide a user with a version history.

_As a user, I want to be able to view and revert to previous saved versions of my document._

### Is a manual save handled differently from an autosave?

We could provide an annotation for each save, whether it was manual or automatic.

_As a user, I want to know if a previous save is the result of a manual save or an automatic save._

## Why user worries?

We already have a lot to think about when we develop applications. Why would we voluntarily add more steps and more writing to that process?

In the end, the applications whose developers show the most empathy and compassion for their users will win the day. The more you do to make users worry less, the more they’ll use your application.