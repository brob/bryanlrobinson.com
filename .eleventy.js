const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(config) {

    config.addPlugin(syntaxHighlight);
    config.addCollection('posts', collection => {
        return collection.getFilteredByTag('posts').reverse();
    });

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    passthroughFileCopy: true
  };
};
