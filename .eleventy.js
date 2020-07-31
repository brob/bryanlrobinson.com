const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dateFilter = require('nunjucks-date-filter');
const markdownIt = require("markdown-it");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const blogTools = require("eleventy-plugin-blog-tools");
const svgContents = require('eleventy-plugin-svg-contents');
const sanitizeHTML = require('sanitize-html')
// const pluginRespimg = require( "../eleventy-respimg" );
const htmlMinTransform = require('./src/transforms/html-min-transform.js');
const slugify = require('slugify');

require('dotenv').config()


module.exports = function(config) {
    let mdOptions = {
      html: true,
      breaks: true,
      linkify: true
    };

    config.setLibrary("md", markdownIt(mdOptions).use(require('markdown-it-anchor'), {}));

    config.addPlugin(svgContents);  
    config.addPlugin(syntaxHighlight);
    config.addPlugin(pluginRss);
    config.addPlugin(blogTools);

// Update the plugin
// Have class option
// Have option for automatic domain prepend

    config.addTransform('htmlmin', htmlMinTransform);

    config.cloudinaryCloudName = 'brob';
    config.srcsetWidths = [ 320, 640, 960, 1280 ];
    config.fallbackWidth = 640;
    config.lazyLoad = true;
    // config.addPlugin(pluginRespimg);
    config.addShortcode('respimg', (path, alt, sizes, className, srcsetWidths=config.srcsetWidths) => {
      const fetchBase = `https://res.cloudinary.com/${config.cloudinaryCloudName}/image/fetch/`;
      const src = `${fetchBase}q_auto,f_auto,w_${config.fallbackWidth}/${path}`;
      if (!Array.isArray(srcsetWidths)) {
        srcsetWidths = srcsetWidths.split(',');
      }
        
      const srcset = srcsetWidths.map(w => {
        return `${fetchBase}q_auto:eco,f_auto,w_${w}/${path} ${w}w`;
      }).join(', ');

      return `<img loading="lazy" src="${src}" srcset="${srcset}" class="${className ? className : "respimg"}" sizes="${sizes ? sizes : '100vw'}" alt="${alt ? alt : ''}">`;
    });

    // Webmentions Filter
    config.addFilter('webmentionsForUrl', (webmentions, url) => {
      const allowedTypes = ['mention-of', 'in-reply-to', 'like-of']
      const clean = content =>
        sanitizeHTML(content, {
          allowedTags: ['b', 'i', 'em', 'strong', 'a'],
          allowedAttributes: {
            a: ['href']
          }
        })

      return webmentions
        .filter(entry => entry['wm-target'] === url)
        .filter(entry => allowedTypes.includes(entry['wm-property']))
        .filter(entry => !!entry.content)
        .map(entry => {
          const { html, text } = entry.content
          entry.content.value = html ? clean(html) : clean(text)
          return entry
        })
    })


    config.addFilter("date", dateFilter);
    config.addCollection('posts', collection => {
        return collection.getFilteredByTag('posts').reverse();
    });

    config.addCollection('categories', collection => {
      let categories = [];
      let sortedPosts = [];
      const posts = collection.getFilteredByTag('posts').reverse()

      posts.forEach(post => {
        categories = [...new Set([...categories, ...post.data.categories])];
      });
      categories.forEach(category => {
        let filteredPosts = posts.filter(post => post.data.categories.includes(category));
        let categoryDetails =  { 
          'title': category,
          'slug': slugify(category),
          'posts': [ ...filteredPosts ]
        };
        sortedPosts.push(categoryDetails);      
      });
      return sortedPosts;
    });
        

    config.addFilter("limit", (array, limit) => array.slice(0, limit));
    config.addPassthroughCopy("_redirects");
    config.addPassthroughCopy("src/images");
    config.addPassthroughCopy("src/style.css");
    config.addPassthroughCopy("src/service-worker.js");
    config.addPassthroughCopy("src/manifest.json");
    config.addPassthroughCopy("src/js");


  return {
    dir: {
      input: 'src',
      output: 'dist'
    },


    passthroughFileCopy: true
  };
};
