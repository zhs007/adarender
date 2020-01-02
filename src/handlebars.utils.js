'use strict';

const handlebars = require('handlebars');

handlebars.registerHelper('isCategoryAxis', (axistype) => {
  return axistype == 'category';
});

/**
 * compileString - compile string
 * @param {string} str - template string
 * @return {object} template - handlebars template
 */
function compileString(str) {
  return handlebars.compile(str);
}

exports.compileString = compileString;
