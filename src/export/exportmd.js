const MarkdownIt = require('markdown-it');
const handlebars = require('handlebars');
const hljs = require('highlight.js');

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
 * @return {object} ret - {err, html, title}
 */
function exportMarkdown(mdstr, tmpstr) {
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
