'use strict';

const {upload, parsefn} = require('./upload');
const fs = require('fs');
const path = require('path');

/**
 * uploadImgs - upload images
 * @param {string} telegraph - telegraph
 * @param {string} rootpath - rootpath
 * @return {object} ret - {error, lst}
 */
async function uploadImgs(telegraph, rootpath) {
  const lst = [];
  const lstfn = fs.readdirSync(rootpath);
  for (let i = 0; i < lstfn.length; ++i) {
    if (parsefn(lstfn[i])) {
      const cret = await upload(path.join(rootpath, lstfn[i]), telegraph);
      if (cret.error) {
        return {error: cret.error};
      }

      lst.push({
        fn: lstfn[i],
        url: cret.url,
      });
    }
  }

  return {lst: lst};
}

exports.uploadImgs = uploadImgs;
