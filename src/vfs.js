'use strict';

// const adarender = require('../../proto/adarender_pb');

/**
 * VFS - virtual file system
 */
class VFS {
  /**
   * constructor
   */
  constructor() {
    this.mapfile = {};
  }

  /**
   * addFile
   * @param {string} fn - filename
   * @param {Buffer} buf - buffer
   */
  addFile(fn, buf) {
    this.mapfile[fn] = buf;
  }

  /**
   * getFile
   * @param {string} fn - filename
   * @return {Buffer} buf - buffer
   */
  getFile(fn) {
    return this.mapfile[fn];
  }
}

/**
 * newVFSFromMarkdownData
 * @param {object} md - adarender.MarkdownData
 * @return {VFS} vfs - VFS
 */
function newVFSFromMarkdownData(md) {
  const vfs = new VFS();

  const mb = md.getBinarydataMap();
  if (mb) {
    const lst = mb.getEntryList();
    for (let i = 0; i < lst.length; ++i) {
      vfs.addFile(lst[i][0], lst[i][1]);
    }
  }

  return vfs;
}

exports.VFS = VFS;
exports.newVFSFromMarkdownData = newVFSFromMarkdownData;
