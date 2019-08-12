'use strict';

const MarkdownIt = require('markdown-it');
const handlebars = require('handlebars');
const hljs = require('highlight.js');
const pluginEncodeImgName = require('../plugins/encode-imgname');
const markdownitAdaDataset = require('../plugins/adadataset');
const markdownitAdaPie = require('../plugins/adapie');
const markdownitAdaLine = require('../plugins/adaline');

/**
 * getTitle
 * @param {object} md - MarkdownIt
 * @param {string} mdstr - markdown string
 * @return {string} title - title string
 */
function getTitle(md, mdstr) {
  const ret = md.parse(mdstr);

  for (let i = 0; i < ret.length; ++i) {
    if (ret[i].tag == 'h1' && ret[i].type == 'heading_open') {
      let title = '';

      for (let j = 1; i + j < ret.length; ++j) {
        if (ret[i + j].type == 'heading_close') {
          break;
        } else if (ret[i + j].type == 'inline') {
          for (let k = 0; k < ret[i + j].children.length; ++k) {
            if (ret[i + j].children[k].type == 'text') {
              title += ret[i + j].children[k].content;
            }
          }
        }
      }

      return title;
    }
  }

  return '';
}

/**
 * exportMarkdown
 * @param {string} mdstr - markdown string
 * @param {string} tmpstr - template string
 * @param {string} inpath - inpath
 * @param {string} outputpath - outputpath
 * @param {object} vfs - VFS
 * @return {object} ret - {err, html, title}
 */
function exportMarkdown(mdstr, tmpstr, inpath, outputpath, vfs) {
  try {
    const md = new MarkdownIt({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              '</code></pre>'
            );
          } catch (__) {}
        }

        return (
          '<pre class="hljs"><code>' +
          md.utils.escapeHtml(str) +
          '</code></pre>'
        );
      },
    });

    md.use(pluginEncodeImgName, {
      input: inpath,
      output: outputpath,
      onlyname: true,
      vfs: vfs,
    });

    md.use(markdownitAdaDataset, {});
    md.use(markdownitAdaPie, {});
    md.use(markdownitAdaLine, {});

    const title = getTitle(md, mdstr);
    const htmlstr = md.render(mdstr);
    const template = handlebars.compile(tmpstr);
    const html = template({title: 'Ada Render - ' + title, html: htmlstr});

    return {html: html, title: title};
  } catch (err) {
    return {err: 'exportMarkdown ' + err};
  }
}

exports.exportMarkdown = exportMarkdown;
