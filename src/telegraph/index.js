'use strict';

const {
  initAccount,
  getAccountInfo,
  getTotalPageList,
} = require('./telegraph');
const {publishImgs} = require('./publish');

exports.telegraph = {
  initAccount,
  getAccountInfo,
  getTotalPageList,
  publishImgs,
};
