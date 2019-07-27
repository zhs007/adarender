const MarkdownIt = require('markdown-it');

/**
 * exportMarkdown
 * @param {string} mdstr - markdown string
 * @return {string} htmlstr - html string
 */
function exportMarkdown(mdstr) {
  const md = new MarkdownIt();

  return md.render(mdstr);
}

exports.exportMarkdown = exportMarkdown;
