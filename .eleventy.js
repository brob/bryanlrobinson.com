const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dateFilter = require('nunjucks-date-filter');
const markdownIt = require("markdown-it");

module.exports = function(config) {
    let mdOptions = {
      html: true,
      breaks: true,
      linkify: true
    };
    
    config.setLibrary("md", markdownIt(mdOptions).use(require('markdown-it-anchor'), {}));

    config.addPlugin(syntaxHighlight);
    config.addFilter("date", dateFilter);
    config.addCollection('posts', collection => {
        return collection.getFilteredByTag('posts').reverse();
    });
    config.addCollection('presentations', collection => {
      return collection.getFilteredByTag('presentations').reverse();
  });
    config.addFilter("limit", (array, limit) => array.slice(0, limit));
    config.addPassthroughCopy("_redirects");
    config.addPassthroughCopy("src/images");
    config.addPassthroughCopy("src/style.css");


  return {
    dir: {
      input: 'src',
      output: 'dist'
    },


    passthroughFileCopy: true
  };
};
