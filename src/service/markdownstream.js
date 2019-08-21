'use strict';

const {getMD5String, newMarkdownData} = require('./utils');
const adarender = require('../../proto/adarender_pb');

/**
 * MarkdownStream class
 */
class MarkdownStream {
  /**
   * constructor
   */
  constructor() {
    this.reset();
  }

  /**
   * reset
   */
  reset() {
    this.buf = new Uint8Array();
    this.mdobj = undefined;
    this.err = '';
  }

  /**
   * onData
   * @param {object} mdstream - MarkdownStream
   * @return {string} err - err
   */
  onData(mdstream) {
    try {
      const err = mdstream.getError();
      if (err) {
        this.err = err;

        return 'client sent a error';
      }

      if (mdstream.hasMarkdowndata()) {
        this.mdobj = mdstream.getMarkdowndata();

        return '';
      }

      const curlen = mdstream.getCurlength();
      const curstart = mdstream.getCurstart();

      if (curlen <= 0) {
        return 'invalid curlength ' + curlen;
      }

      if (curstart < 0) {
        return 'invalid curstart ' + curstart;
      }

      if (this.buf.length != curstart) {
        return (
          'invalid buf.length or curstart ' + this.buf.length + ' ' + curstart
        );
      }

      const curbuf = mdstream.getData_asU8();
      if (!curbuf) {
        return 'invalid data';
      }

      if (curbuf.length != curlen) {
        return (
          'invalid curlength or data.length ' + curlen + ' ' + curbuf.length
        );
      }

      const hashdata = mdstream.getHashdata();

      const md5str = getMD5String(curbuf);
      if (md5str != hashdata) {
        return 'invalid md5str or hashdata ' + md5str + ' ' + hashdata;
      }

      const nbuf = new Uint8Array(this.buf.length + curbuf.length);
      nbuf.set(this.buf, 0);
      this.buf = nbuf;
      this.buf.set(curbuf, curstart);

      const totalhashdata = mdstream.getTotalhashdata();
      const totallength = mdstream.getTotallength();

      if (totallength < this.buf.length) {
        return (
          'invalid buf.length or totallength ' +
          this.buf.length +
          ' ' +
          totallength
        );
      }

      if (totallength == this.buf.length) {
        if (!totalhashdata) {
          return 'no totalhashdata';
        }

        const totalmd5str = getMD5String(this.buf);
        if (totalmd5str != totalhashdata) {
          return (
            'invalid totalmd5str or totalhashdata ' +
            totalmd5str +
            ' ' +
            totalhashdata
          );
        }

        this.mdobj = adarender.MarkdownData.deserializeBinary(this.buf);
      } else if (totalhashdata) {
        return 'invalid totalhashdata';
      }
    } catch (err) {
      return 'markdownstream.onData error ' + err;
    }

    return '';
  }

  /**
   * onEnd
   * @return {string} err - err
   */
  onEnd() {
    if (this.err || this.mdobj) {
      return '';
    }

    return 'non error or mdobj';
  }

  /**
   * sendMarkdownData
   * @param {object} call - call
   * @param {object} obj - {strData, templateName}
   * @param {string} token - token
   */
  async sendMarkdownData(call, obj, token) {
    try {
      const mdstream = new adarender.MarkdownStream();

      const mddata = newMarkdownData(obj);
      mdstream.setMarkdowndata(mddata);

      mdstream.setToken(token);

      await call.write(mdstream);
      call.end();
    } catch (err) {
      console.log('MarkdownStream.sendMarkdownData ' + err);
    }
  }
}

exports.MarkdownStream = MarkdownStream;
