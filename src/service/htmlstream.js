'use strict';

const {getMD5String, newHTMLData, buildHTMLDataStream} = require('./utils');
const adarender = require('../../proto/adarender_pb');

/**
 * HTMLStream class
 */
class HTMLStream {
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
    this.htmlobj = undefined;
    this.err = '';
  }

  /**
   * onData
   * @param {object} htmlstream - HTMLStream
   * @return {string} err - err
   */
  onData(htmlstream) {
    try {
      const err = htmlstream.getError();
      if (err) {
        this.err = err;

        return 'client sent a error';
      }

      if (htmlstream.hasHtmldata()) {
        this.htmlobj = htmlstream.getHtmldata();

        return '';
      }

      const curlen = htmlstream.getCurlength();
      const curstart = htmlstream.getCurstart();

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

      const curbuf = htmlstream.getData_asU8();
      if (!curbuf) {
        return 'invalid data';
      }

      if (curbuf.length != curlen) {
        return (
          'invalid curlength or data.length ' + curlen + ' ' + curbuf.length
        );
      }

      const hashdata = htmlstream.getHashdata();

      const md5str = getMD5String(curbuf);
      if (md5str != hashdata) {
        return 'invalid md5str or hashdata ' + md5str + ' ' + hashdata;
      }

      this.buf.set(curbuf, curstart);

      const totalhashdata = htmlstream.getTotalhashdata();
      const totallength = htmlstream.getTotallength();

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

        this.htmlobj = adarender.HTMLData.deserializeBinary(this.buf);
      } else if (totalhashdata) {
        return 'invalid totalhashdata';
      }
    } catch (err) {
      return 'htmlstream.onData error ' + err;
    }

    return '';
  }

  /**
   * onEnd
   * @return {string} err - err
   */
  onEnd() {
    if (this.err || this.htmlobj) {
      return '';
    }

    return 'non error or htmlobj';
  }

  /**
   * sendErr
   * @param {object} call - call
   * @param {string} errstr - error string
   */
  async sendErr(call, errstr) {
    try {
      const htmlstream = new adarender.HTMLStream();
      htmlstream.setError(errstr);

      await call.write(htmlstream);
      call.end();
    } catch (err) {
      console.log('HTMLStream.sendErr ' + err);
    }
  }

  /**
   * sendHTMLData
   * @param {object} call - call
   * @param {object} obj - {strData}
   */
  async sendHTMLData(call, obj) {
    try {
      const htmldata = newHTMLData(obj);
      await buildHTMLDataStream(htmldata, async (htmstream) => {
        await call.write(htmstream);
      });

      call.end();
    } catch (err) {
      console.log('HTMLStream.sendHTMLData ' + err);
    }
  }
}

exports.HTMLStream = HTMLStream;
