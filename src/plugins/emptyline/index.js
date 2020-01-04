'use strict';

// const yaml = require('js-yaml');
const {compileString} = require('../../ejs.utils');
const {makeBlockTagFunc} = require('../../md.utils');
const path = require('path');
const fs = require('fs');

const tmpbuf = fs.readFileSync(path.join(__dirname, 'template.ejs'));
const template = compileString(tmpbuf.toString());

// /**
//  * emptyline -
//  * @param {string} state - token.content
//  * @param {string} startLine - token.content
//  * @param {string} endLine - token.content
//  * @param {string} silent - token.content
//  * @return {boolean} ret - HTML string
//  */
// function emptyline(state, startLine, endLine, silent) {
//   //   let content;
//   let terminate;
//   let i;
//   let l;
//   // let token;
//   let pos;
//   let max;
//   let level;
//   // let marker;
//   let nextLine = startLine + 1;
//   //   let oldParentType;
//   const terminatorRules = state.md.block.ruler.getRules('paragraph');

//   // if it's indented more than 3 spaces, it should be a code block
//   if (state.sCount[startLine] - state.blkIndent >= 4) {
//     return false;
//   }

//   const oldParentType = state.parentType;
//   state.parentType = 'paragraph'; // use paragraph to match terminatorRules

//   // jump line-by-line until empty one or EOF
//   for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
//     // this would be a code block normally, but after paragraph
//     // it's considered a lazy continuation regardless of what's there
//     if (state.sCount[nextLine] - state.blkIndent > 3) {
//       continue;
//     }

//     //
//     // Check for underline in setext header
//     //
//     if (state.sCount[nextLine] >= state.blkIndent) {
//       pos = state.bMarks[nextLine] + state.tShift[nextLine];
//       max = state.eMarks[nextLine];

//       if (pos < max) {
//         if (
//           state.src[pos] == '$' &&
//           state.src[pos + 1] == '_' &&
//           state.src[pos + 2] == '$'
//         ) {
//           pos = state.skipSpaces(pos + 3);

//           if (pos >= max) {
//             level = 1;
//             break;
//           }
//         }

//         // marker = state.src.charCodeAt(pos);

//         // if (marker === 0x2d /* - */ || marker === 0x3d /* = */) {
//         //   pos = state.skipChars(pos, marker);
//         //   pos = state.skipSpaces(pos);

//         //   if (pos >= max) {
//         //     level = marker === 0x3d /* = */ ? 1 : 2;
//         //     break;
//         //   }
//         // }
//       }
//     }

//     // quirk for blockquotes, this line should already be checked by that rule
//     if (state.sCount[nextLine] < 0) {
//       continue;
//     }

//     // Some tags can terminate paragraph without empty line.
//     terminate = false;
//     for (i = 0, l = terminatorRules.length; i < l; i++) {
//       if (terminatorRules[i](state, nextLine, endLine, true)) {
//         terminate = true;
//         break;
//       }
//     }
//     if (terminate) {
//       break;
//     }
//   }

//   if (!level) {
//     // Didn't find valid underline
//     return false;
//   }

//   const content = state
//       .getLines(startLine, nextLine, state.blkIndent, false)
//       .trim();

//   state.line = nextLine + 1;

//   const token = state.push('adaemptyline_close', 'adaemptyline', 0);
//   token.block = true;
//   token.content = content; // 'adaemptyline';
//   // token.info = params;
//   token.map = [startLine, state.line];
//   token.markup = open;

//   // token = state.push('adaemptyline_block', 'h' + String(level), 1);
//   // token.markup = '$_$';
//   // token.map = [startLine, state.line];

//   // token = state.push('inline', '', 0);
//   // token.content = content;
//   // token.map = [startLine, state.line - 1];
//   // token.children = [];

//   // token = state.push('adaemptyline_close', 'adaemptyline', -1);
//   // token.markup = '$_$';

//   state.parentType = oldParentType;

//   return true;
// }

/**
 * renderEmptyLine - render for empty line
 * @return {string} str - HTML string
 */
function renderEmptyLine() {
  try {
    const html = template({});
    return html;
  } catch (err) {
    console.log('renderEmptyLine:catch', err);
  }

  return '';
}

/**
 * markdownitAdaTable2
 * @param {object} md - MarkdownIt
 * @param {object} config - {}
 */
function markdownitAdaEmptyLine(md, config) {
  config = config || {};

  const adaemptylineblock = makeBlockTagFunc(
      '$_$',
      'adaemptyline_block',
      'adaemptyline',
  );

  md.block.ruler.after('blockquote', 'adaemptyline_block', adaemptylineblock);
  md.renderer.rules.adaemptyline_block = (tokens, idx) => {
    return renderEmptyLine();
  };
}

module.exports = markdownitAdaEmptyLine;
