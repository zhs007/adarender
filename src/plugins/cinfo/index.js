'use strict';

// const yaml = require('js-yaml');
const {compileString} = require('../../ejs.utils');
// const {makeBlockFunc} = require('../../md.utils');
const path = require('path');
// const ejs = require('ejs');
const fs = require('fs');

const opentmpbuf = fs.readFileSync(path.join(__dirname, 'open.ejs'));
const opentemplate = compileString(opentmpbuf.toString());

const closetmpbuf = fs.readFileSync(path.join(__dirname, 'close.ejs'));
const closetemplate = compileString(closetmpbuf.toString());

/**
 * renderOpen - render for cinfo_open
 * @param {object} token - token
 * @return {string} str - HTML string
 */
function renderOpen(token) {
  try {
    const html = opentemplate({});
    return html;
  } catch (err) {
    console.log('renderOpen:catch', err);
  }

  return '';
}

/**
 * renderClose - render for cinfo_close
 * @param {object} token - token
 * @return {string} str - HTML string
 */
function renderClose(token) {
  try {
    const html = closetemplate({});
    return html;
  } catch (err) {
    console.log('renderClose:catch', err);
  }

  return '';
}

/**
 * tokenize - render for table
 * @param {string} state - token.content
 * @param {string} silent - HTML string
 * @return {boolean} silent - HTML string
 */
function tokenize(state, silent) {
  //   let i;
  //   let scanned;
  // let token;
  //   let len;
  //   let ch;
  // const start = state.pos;
  // const marker = state.src.charCodeAt(start);

  if (silent) {
    return false;
  }

  if (state.src.length - state.pos >= 2) {
    if (state.src[state.pos] == '-' && state.src[state.pos + 1] == '=') {
      const token = state.push('text', '', 0);
      token.content = '-=';

      state.delimiters.push({
        marker: 0x3d,
        length: 0, // disable "rule of 3" length checks meant for emphasis
        jump: 0,
        token: state.tokens.length - 1,
        end: -1,
        open: true,
        close: false,
      });

      state.pos += 2;

      return true;
    } else if (state.src[state.pos] == '=' && state.src[state.pos + 1] == '-') {
      const token = state.push('text', '', 0);
      token.content = '=-';

      state.delimiters.push({
        marker: 0x3d,
        length: 0, // disable "rule of 3" length checks meant for emphasis
        jump: 0,
        token: state.tokens.length - 1,
        end: -1,
        open: false,
        close: true,
      });

      state.pos += 2;

      return true;
    }
  }

  return false;

  // if (marker !== 0x3d /* = */) {
  //   return false;
  // }

  // const scanned = state.scanDelims(state.pos, true);
  // let len = scanned.length;
  // const ch = String.fromCharCode(marker);

  // if (len < 2) {
  //   return false;
  // }

  // if (len % 2) {
  //   token = state.push('text', '', 0);
  //   token.content = ch;
  //   len--;
  // }

  // for (let i = 0; i < len; i += 2) {
  //   token = state.push('text', '', 0);
  //   token.content = ch + ch;

  //   if (!scanned.can_open && !scanned.can_close) {
  //     continue;
  //   }

  //   state.delimiters.push({
  //     marker: marker,
  //     length: 0, // disable "rule of 3" length checks meant for emphasis
  //     jump: i,
  //     token: state.tokens.length - 1,
  //     end: -1,
  //     open: scanned.can_open,
  //     close: scanned.can_close,
  //   });
  // }

  // state.pos += scanned.length;

  // return true;
}

/**
 * postProcess - render for table
 * @param {string} state - token.content
 * @param {string} delimiters - HTML string
 */
function postProcess(state, delimiters) {
  //   let i;
  let j;
  let startDelim;
  let endDelim;
  let token;
  const loneMarkers = [];
  const max = delimiters.length;

  for (let i = 0; i < max; i++) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x3d /* = */) {
      continue;
    }

    if (startDelim.end === -1) {
      continue;
    }

    endDelim = delimiters[startDelim.end];

    token = state.tokens[startDelim.token];
    token.type = 'cinfo_open';
    token.tag = 'cinfo';
    token.nesting = 1;
    token.markup = '==';
    token.content = '';

    token = state.tokens[endDelim.token];
    token.type = 'cinfo_close';
    token.tag = 'cinfo';
    token.nesting = -1;
    token.markup = '==';
    token.content = '';

    if (
      state.tokens[endDelim.token - 1].type === 'text' &&
      state.tokens[endDelim.token - 1].content === '='
    ) {
      loneMarkers.push(endDelim.token - 1);
    }
  }

  // If a marker sequence has an odd number of characters, it's splitted
  // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
  // start of the sequence.
  //
  // So, we have to move all those markers after subsequent s_close tags.
  //
  while (loneMarkers.length) {
    i = loneMarkers.pop();
    j = i + 1;

    while (j < state.tokens.length && state.tokens[j].type === 'cinfo_close') {
      j++;
    }

    j--;

    if (i !== j) {
      token = state.tokens[j];
      state.tokens[j] = state.tokens[i];
      state.tokens[i] = token;
    }
  }
}

/**
 * markdownitCenterInfo
 * @param {object} md - MarkdownIt
 * @param {object} config - {}
 */
function markdownitCenterInfo(md, config) {
  config = config || {};

  md.inline.ruler.before('emphasis', 'cinfo', tokenize);
  md.inline.ruler2.before('emphasis', 'cinfo', (state) => {
    // let curr;
    // const tokens_meta = state.tokens_meta;
    const max = (state.tokens_meta || []).length;

    postProcess(state, state.delimiters);

    for (let curr = 0; curr < max; curr++) {
      if (state.tokens_meta[curr] && state.tokens_meta[curr].delimiters) {
        postProcess(state, state.tokens_meta[curr].delimiters);
      }
    }
  });

  md.renderer.rules.cinfo_open = (tokens, idx) => {
    return renderOpen(tokens[idx]);
  };

  md.renderer.rules.cinfo_close = (tokens, idx) => {
    return renderClose(tokens[idx]);
  };
}

module.exports = markdownitCenterInfo;
