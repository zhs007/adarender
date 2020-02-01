'use strict';

const {upload} = require('./upload');
const {newPage} = require('./telegraph');
const fs = require('fs');

/**
 * publishImgs - publish images
 * @param {string} telegraph - telegraph
 * @param {string} title - title
 * @param {function} fnfunc - function (i) string
 * @param {int} starti - start index
 * @param {int} endi - end index
 * @return {object} ret - {error, page}
 */
async function publishImgs(telegraph, title, fnfunc, starti, endi) {
  const lst = [];
  for (let i = starti; i <= endi; ++i) {
    const fn = fnfunc(i);
    if (fn == undefined) {
      break;
    }

    if (fs.existsSync(fn)) {
      const cret = await upload(fn, telegraph);
      if (cret.error) {
        return {error: cret.error};
      }

      lst.push({
        tag: 'figure',
        children: [{tag: 'img', attrs: {src: cret.url}}],
      });
    }
  }

  return await newPage(telegraph, title, lst);
}

exports.publishImgs = publishImgs;
