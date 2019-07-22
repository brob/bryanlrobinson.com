---
layout: layouts/post.njk
title: Dynamic Static Sites with Netlify and iOS Shortcuts
subhead: Use Netlify Functions, a Gulp build process and iOS Shortcuts to publish dynamic content to your static site
categories:
  - development
  - tutorial
  - javascript
baseLayout: container--right
featuredImg: /images/uploads/shortcuts-screens.jpg
featuredLarge: true
description: An experiment adding dynamic functionality to this site pushed via iOS shortcuts and Netlify functions
adSpace: 
  image: /images/common-grid-promo.jpg
  headline: Free ebook - Common CSS Grid Patterns
  description: CSS Grid is a revolution in web layout. With this ebook, I cover 3 design patterns that Grid solves easier, better and more creatively to help push our designs in better directions.
  linkText: Download Now!
  linkUrl: https://store.codecontemporary.com/solving-three-design-problems-with-css-grid/buy
---

I've been using Netlify as my host for a while now and have consistently loved the experience. In my time with the service, I haven't been utilizing it much more than a static site host.

I really want to use more of their features and make my static site more dynamic.

*Demo*: [On this site](/bryan-sight/){:target="_blank"}

*GitHub Repository*: [repo](https://github.com/brob/netlify-shortcut-statuses){:target="_blank"}  

## The Challenge: Share data from iOS Shortcuts to my Netlify site

![Screenshot of the demo](/images/uploads/shortcuts-live.jpg)


When iOS released Shortcuts with iOS12, I saw Netlify's Twitter account share a video of someone deploying their site with a shortcut. I thought that was excellent, so I decided to go that route. 

With this challenge, I wanted to learn more about Serverless functions and Netlify's API. I did some reading and based my solution off of Phil Hawkworth's [excellent JAMstack comment engine functionality](https://github.com/philhawksworth/jamstack-comments-engine).

{% include ad-space.html %}

### Requirements

*   Works with my Static Site Generator: [Jekyll](https://jekyllrb.com/)
*   Does more than build my site
*   Be able to be built over the course of a hackathon (I built the basics of this over the course of [HACKmemphis](http://hackmemphis.com), an annual hackathon I organize)

### Feature Flow

I decided on a small set of features. Take a short dictation and photo from shortcuts and post it as a status to my site.

Here was the flow I built from: 

1.  Run the Shortcut which will take a photo and ask me "What's happening?"
2.  Submit the string and image URI to a serverless function in Netlify
3.  Have the function process the data and submit to a Netlify form (which gets used as a data store)
4.  Generate a build/deploy
5.  On build, have Gulp make an API call to Netlify to get all the form data and create a JSON object that Jekyll can ingest
6.  *Stretch Goal* Download the image from 3rd party (imgur) to be local to my project

## Setting up the shortcut

![Process screenshots of iOS Shortcut](/images/uploads/shortcuts-screens.jpg)


The iOS Shortcuts app allows you to automate many pieces of your workflow. It has access to multiple Apple apps as well as some third party apps.

**Here's the shortcut I've created:**

1.  Use Apple's Camera to take a photo
2.  Pass that photo to the Imgur app to upload to Imgur (need a place online for these to go; this was the easiest)
3.  Have Siri ask me "What's happening" (more for demo purposes at HACKmemphis than anything else)
4.  Use the Dictation skill to record and type my response
5.  Pass that string plus the image URL from imgur to a Netlify function URL as parameters
6.  Hit that URL with Safari

## Creating a Netlify function to handle the data

![Netlify Function promo from netlify's website](/images/uploads/netlify-functions.jpg)

Now that we're sending the data to a URL on our site, we need something to handle that data. Remember, this is a static site.  

To do this, we can use Netlify's awesome Functions. It's important to note that this DOES cost money past a certain point. This sort of function would take a LOT of use to get past the free usage tier, though.  

Our function is split into two parts: formatting data and posting data to a database.  

### Step 1: Ingest the data from URL parameters and sanitize it for use

In this area, I discovered my first issue. The URLs I was getting from Imgur's iOS shortcut came in different formats. Both of the formats were not the pure image. I never found the root cause of the varying formats, but baked in protections for that. To get the direct image URL, all it took was rewriting the URL string with `download` in it.  

{% highlight javascript %}

// populate environment variables locally.
require('dotenv').config()

export function handler(event, context, callback) {
    const doingString = event.queryStringParameters.doing;
    const imgUrl = event.queryStringParameters.imgUrl;
    
    if(imgUrl) {
      let urlPieces = imgUrl.split('/');
      let photoId = urlPieces[urlPieces.length - 1];
      if (photoId.endsWith('.jpg')) {
        // Protects against imgur changing
        let idSplit = photoId.split('.');
        photoId = idSplit[0];
      } 
      var imgDownloadLink = `https://imgur.com/download/${photoId}`      
    } 

    var payload = {
      'form-name' : process.env.FORM_NAME,
      'received': new Date().toString(),
      'doing': doingString,
      'imgUrl': imgDownloadLink
    };
    ...
}


{% endhighlight %}

### Step 2: Post that data to a form on Netlify


{% highlight javascript %}
export function handler(event, context, callback) {
...
var approvedURL = process.env.POST_FORM;

      request.post({'url':approvedURL, 'formData': payload }, function(err, httpResponse, body) {
        var msg;

        if (err) {
            msg = 'Post to status list failed:' + err;
            console.log(msg);
        } else {
            msg = 'Post to status list successful.'
            console.log(msg);
        }
        var msg = "Status posted. Deploy triggered.";

        console.log(msg);
        callback(null, {
            statusCode: 200,
            body: msg
        });
          return console.log(msg);
      });
  };
{% endhighlight %}

First, note that we'll be using environment variables for our form endpoint as well as our form name. This removes "sensitive" data from our git repository. If someone has a form name, they can post to your forms and cost you money.

**"Gotcha" No. 1:** Simulating environment variables locally. There's a lovely package on NPM called dotenv that I was able to set up to handle this. Create a `.env` file in your project (and don't version control it) that houses your variables. Your JavaScript is able to read `process.env.VARIABLE_NAME` by running `require('dotenv').config()`.  

**"Gotcha" No. 2:** How do you post to a Netlify form? As it turns out, you can post to any URL on your site as long as you have the proper form name.  

The rest of what's happening in this code is a POST request using the Node "request" module to send our data to our form.  

**"Gotcha No. 3:** In order for Netlify to understand our POST, our site has to have an HTML form with this name. Netlify uses the HTML in your repository to figure out what processing your site needs.  

The site can handle this with a single route for all its forms. In this repository, I'm using a form-stub.html which isn't linked anywhere.  

In this example, we're using Netlify's form system as a database. You could create a third-party database with Firebase or a similar tool. In my case, I wanted to use as few third-parties as possible.

## Using the data in our site

Most static site generators have some way of dealing with data files. In Jekyll, if you put JSON files in a `_data` directory, you gain access to those variables in your templates.  

We'll be requesting this data during the build process, so we need to utilize a task runner for this. My current tool of choice for tasks is GulpJS. 

In this example, we use two Gulp tasks: one for building our data and one for downloading the images.  

### Getting the data from Netlify

Before we can use the data, we've got to fetch it. Netlify provides a handy API for dealing with their forms. There's a lovely GET method that will return the form submissions. This allows us to use the form functionality as a database for these updates.  

Using this data, we'll create a JSON file in `_data` to store our information.  

To lower complexity for this example, we'll clean the previous file first. To do this, we'll use `fs.truncate` to truncate the file to 0 characters.  

{% highlight javascript %}
function cleanFile(filePath, callback) {
    fs.truncate(filePath, 0, callback);
}
{% endhighlight %}

Once we have our file cleaned, we need to create the new data from the API request's body. We use Array.map() to create a the object for each status as expected by our Jekyll templates.  


{% highlight js %}
function buildStatuses(body) {
    let data = body.data;
    let imgId = getId(data.imgUrl);
    const status = {
        status: data.doing,
        imgUrl: data.imgUrl,
        localUrl: `/images/statusImages/${imgId}.jpg`,
        date: body.created_at
    };
    return status;
}
{% endhighlight %}

Once we have the data how we want it, we'll use fs.writeFileSync() to  write this array to our data file.  

{% highlight js %}
fs.writeFileSync(statusFile, JSON.stringify(statuses, null, 2), function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Status data saved.");
    }
});
console.log(`${statusFile} rebuilt from data`);
{% endhighlight %}

Note: I'm utilizing synchronous versions of `fs` module functions. This made the process a bit easier and clearer.  

I'm also using environment variables again to protect the form ID as well as my API key. Remember to always keep your sensitive data in these variables and not in your repo.  

The finished Gulp task looks like this:

{% highlight js %}
gulp.task('status:get', function () {
    // URL for data store
    let url = `https://api.netlify.com/api/v1/forms/${process.env.STATUS_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`;
    let statusFile = `./_data/statuses.json`;

    cleanFile(statusFile, function() {
        // Erases JSON file
        console.log(`${statusFile} cleaned`);
        request(url, function (err, response, body) {
            // console.log(body);
            if (!err && response.statusCode === 200) {
                let bodyArray = JSON.parse(body);
                let statuses = bodyArray.map(buildStatuses);

                // Write the status to a data file
                fs.writeFileSync(statusFile, JSON.stringify(statuses, null, 2), function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Status data saved.");
                    }
                });
                console.log(`${statusFile} rebuilt from data`);
    
            } else {
                console.log("Couldn't get statuses from Netlify");
            }
        });
    });
    
});
{% endhighlight %}

### Bonus: Download the images to the project via Imgur

Now that we have the data, we can write a function to fetch the images and store them locally. This will cut down on reliance of a third-party website to serve static content.  

First, we need to determine all the images we need from the data. To do that, we'll read the statuses.json file and grab the image IDs from the data.  

{% highlight js %}
function imageNeeds() {
    // Creates array of all image IDs in JSON file
    let idList = fs.readFileSync('_data/statuses.json', 'utf8', function(err, contents) {
        return statuses;
    });
    let jsonEncoded = JSON.parse(idList);
    const statusImageIds = jsonEncoded.map(status => { let split = status.imgUrl.split('/'); return split[split.length - 1]; });
    return statusImageIds;
} 
{% endhighlight %}

From there, we could just download each image from Imgur to our project. When we have a lot of statuses, that could end up taking a long time.  

To help mitigate that, I let this process run locally when I'm working on my site and then push the images to GitHub.  

Then, I can compare the image IDs I need to what files already exist and only download the latest.  

{% highlight js %}
function currentlyDownloaded() {
    // Creates array of images currently in the project
    const files = fs.readdirSync('./images/statusImages', (err, files) => {
        return files;        
    });
    const imageIds = files.map(imageUrl => imageUrl.replace('.jpg', ''));
    return imageIds;
}

const imageIdList = imageNeeds();
const downloadedIdList = currentlyDownloaded();

// Filters IDs to find images we need to download
let needToDownload = imageIdList.filter(e => {
    return ! downloadedIdList.includes(e);
});

needToDownload.forEach(fileId => {
    let url = `https://imgur.com/download/${fileId}`;
    let fileName = `./images/statusImages/${fileId}.jpg`
    download(url, fileName, function() {
        console.log(`Downloaded ${url}`);
    })
});
{% endhighlight %}

### Writing a Jekyll template to use the data

Jekyll has access to JSON data built directly into its templates. By utilizing `site.data.<filename>`, we gain access to the data either as an array to loop through or an object to pull data from.  

In our case, we'll loop through the data as an array using `for status in site.data.statuses`. 



{% highlight html %}
<article class="status">
    <img src="{{ status.localUrl }}">  
    <p>{{ status.status }}</p>  
</article>  
{% endhighlight %}

## Setting up the build and serve functions

Once we have everything configured the way we want, we need tell Gulp the order to run our commands. In this case, we want a development serving command and a production `build` command.  

{% highlight js %}
gulp.task('default', function () {
    runSequence('status:get', 'image:get', 'serve:jekyll');
});

gulp.task('build', function () {
    runSequence('status:get', 'image:get', 'build:jekyll', 'lambda:build');
});
{% endhighlight %}

The main differences in these commands are serving vs building Jekyll and adding Netlify's lambda build command to the build functionality.  

The `lambda:build` function runs a shell command for the Netlify-lambda-cli package.  

```netlify-lambda build lambda_build```  

In this instance `lambda_build` is the name of the directory in which our lambda function's source exists. The source then gets published to the `functions` directory which Netlify is expecting.  
For local testing, you can run `netlify-lambda server lambda_build` and it will run a server for you.  

## Where to go from here?

I believe the future is in static architecture. This is a small snapshot at building that future.  

There's a lot of things in this project that felt a little wonky. They felt that way because my brain is used to thinking of things in terms of server code. Once I got past that, I felt POWERFUL.  

This seems ridiculous in some ways, but there's immense power to be hand by offloading your server to someone else. There's immense performance by handling all pages as static HTML.  

It's an interesting time to be doing this work. What would you build in this workflow?