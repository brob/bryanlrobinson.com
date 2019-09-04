const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dateFilter = require('nunjucks-date-filter');
const markdownIt = require("markdown-it");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const blogTools = require("eleventy-plugin-blog-tools");

module.exports = function(config) {
    let mdOptions = {
      html: true,
      breaks: true,
      linkify: true
    };

    config.setLibrary("md", markdownIt(mdOptions).use(require('markdown-it-anchor'), {}));

    config.addPlugin(syntaxHighlight);
    config.addPlugin(pluginRss);
    config.addPlugin(blogTools);

    config.addFilter("date", dateFilter);
    config.addCollection('posts', collection => {
        return collection.getFilteredByTag('posts').reverse();
    });

    config.addFilter("related", function(items, categorizeBy, categoryArray, threshold = 1, excludedSlug = "") {
      let posts = Array.from(items).filter(item => {
        return item.fileSlug != excludedSlug // removes "excluded item" aka the current item
      });

      let filteredPosts = posts.filter(item => {
        let matchedCount = 0; // Counter to match our threshold
        item.data[categorizeBy].forEach(cat => {
          if (categoryArray.includes(cat)) {
            return matchedCount++
          }
        });
        return (matchedCount >= threshold);
      })
      return filteredPosts
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


  return {
    dir: {
      input: 'src',
      output: 'dist'
    },


    passthroughFileCopy: true
  };
};
