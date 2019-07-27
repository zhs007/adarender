const MarkdownIt = require('markdown-it');
const handlebars = require('handlebars');

/**
 * exportMarkdown
 * @param {string} mdstr - markdown string
 * @param {string} tmpstr - template string
 * @return {string} htmlstr - html string
 */
function exportMarkdown(mdstr, tmpstr) {
  const md = new MarkdownIt();

  const htmlstr = md.render(mdstr);
  const template = handlebars.compile(tmpstr);
  const html = template({title: 'Ada Render', html: htmlstr});

  return html;
}

exports.exportMarkdown = exportMarkdown;
