const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(config) {

    config.addPlugin(syntaxHighlight);
    config.addCollection('posts', collection => {
        return collection.getFilteredByTag('posts').reverse();
    });

    config.addFilter("limit", (array, limit) => array.slice(0, limit));
    config.addPassthroughCopy("_redirects");


  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    passthroughFileCopy: true
  };
};
