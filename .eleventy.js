const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dateFilter = require('nunjucks-date-filter');

module.exports = function(config) {

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
