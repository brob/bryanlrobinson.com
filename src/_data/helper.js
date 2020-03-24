const fs = require('fs');
const uglifycss = require('uglifycss');
const path = require('path');

const cssDir = path.join(__dirname, '..', '_includes', 'css');



module.exports = {
  getCSS(coreStyles, layoutStyles) {
    let css = '';
    let partials = [];

    if (coreStyles) {
      partials = [...partials, ...coreStyles];
    }

    if (layoutStyles) {
      partials = [...partials, ...layoutStyles];
    }


    if (partials.length) {
      partials.forEach(partial => {
          const cssPath = path.join(cssDir, partial);
        css += fs.readFileSync(cssPath);
      });
    }

    return uglifycss.processString(css);
  }
};