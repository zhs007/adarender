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
    this.maptag = {};
  }

  /**
   * addFile
   * @param {string} fn - filename
   * @param {Buffer} buf - buffer
   * @param {boolean} isTag - is tag
   */
  addFile(fn, buf, isTag) {
    this.mapfile[fn] = buf;

    if (isTag) {
      this.maptag[fn] = true;
    }
  }

  /**
   * getFile
   * @param {string} fn - filename
   * @return {Buffer} buf - buffer
   */
  getFile(fn) {
    return this.mapfile[fn];
  }

  /**
   * getFile
   * @param {function} cb - callback(fn, buf)
   */
  eachTag(cb) {
    for (const k in this.maptag) {
      if (Object.prototype.hasOwnProperty.call(this.maptag, k)) {
        cb(k, this.mapfile[k]);
      }
    }
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
      vfs.addFile(lst[i][0], lst[i][1], false);
    }
  }

  return vfs;
}

exports.VFS = VFS;
exports.newVFSFromMarkdownData = newVFSFromMarkdownData;
