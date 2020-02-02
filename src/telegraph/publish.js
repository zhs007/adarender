'use strict';

const {upload} = require('./upload');
const {publishPage} = require('./telegraph');
const fs = require('fs');
const path = require('path');

/**
 * findInImgsList - is in imgs list
 * @param {array} lst - lst
 * @param {int} index - index
 * @return {object} node - node
 */
function findInImgsList(lst, index) {
  for (let i = 0; i < lst.length; ++i) {
    if (lst[i].index == index) {
      return lst[i];
    }
  }

  return undefined;
}

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
  let jlst = [];
  const imgsfn = path.join(telegraph.outputpath, title + '.imgs.json');
  if (fs.existsSync(imgsfn)) {
    const imgsbuf = fs.readFileSync(imgsfn);
    jlst = JSON.parse(imgsbuf);
  }

  const lst = [];
  for (let i = starti; i <= endi; ++i) {
    const co = findInImgsList(jlst, i);
    if (co) {
      lst.push({
        tag: 'figure',
        children: [{tag: 'img', attrs: {src: co.url}}],
      });

      continue;
    }

    const fn = fnfunc(i);
    if (fn == undefined) {
      break;
    }

    if (fs.existsSync(fn)) {
      const cret = await upload(fn, telegraph);
      if (cret.error) {
        return {error: cret.error};
      }

      jlst.push({
        index: i,
        fn: fn,
        url: cret.url,
      });

      fs.writeFileSync(imgsfn, JSON.stringify(jlst));

      lst.push({
        tag: 'figure',
        children: [{tag: 'img', attrs: {src: cret.url}}],
      });
    }
  }

  return await publishPage(telegraph, title, lst);
}

exports.publishImgs = publishImgs;
