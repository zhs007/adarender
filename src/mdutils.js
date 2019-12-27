'use strict';

/**
 * makeBlockFunc - make a block function
 * @param {string} open - tag for open
 * @param {string} close - tag for close
 * @param {string} blockname - name for block
 * @param {string} name - name
 * @return {function} func - a function for blockfunc
 */
function makeBlockFunc(open, close, blockname, name) {
  return (state, startLine, endLine, silent) => {
    // let openDelim;
    // let len;
    let params;
    let nextLine;
    // let token;
    let firstLine;
    let lastLine;
    let lastLinePos;
    let haveEndMarker = false;
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];

    if (pos + open.length > max) {
      return false;
    }

    const openDelim = state.src.slice(pos, pos + open.length);

    if (openDelim !== open) {
      return false;
    }

    pos += open.length;
    firstLine = state.src.slice(pos, max);

    // Since start is found, we can report success here in validation mode
    if (silent) {
      return true;
    }

    if (firstLine.trim().slice(-close.length) === close) {
      // Single line expression
      firstLine = firstLine.trim().slice(0, -close.length);
      haveEndMarker = true;
    }

    // search end of block
    nextLine = startLine;

    for (;;) {
      if (haveEndMarker) {
        break;
      }

      nextLine++;

      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break;
      }

      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (pos < max && state.tShift[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        break;
      }

      if (
        state.src
            .slice(pos, max)
            .trim()
            .slice(-close.length) !== close
      ) {
        continue;
      }

      if (state.tShift[nextLine] - state.blkIndent >= 4) {
        // closing block math should be indented less then 4 spaces
        continue;
      }

      lastLinePos = state.src.slice(0, max).lastIndexOf(close);
      lastLine = state.src.slice(pos, lastLinePos);

      pos += lastLine.length + close.length;

      // make sure tail has spaces only
      pos = state.skipSpaces(pos);

      if (pos < max) {
        continue;
      }

      // found!
      haveEndMarker = true;
    }

    // If math block has heading spaces, they should be removed from its inner block
    const len = state.tShift[startLine];

    state.line = nextLine + (haveEndMarker ? 1 : 0);

    const token = state.push(blockname, name, 0);
    token.block = true;
    token.content =
      (firstLine && firstLine.trim() ? firstLine + '\n' : '') +
      state.getLines(startLine + 1, nextLine, len, true) +
      (lastLine && lastLine.trim() ? lastLine : '');
    token.info = params;
    token.map = [startLine, state.line];
    token.markup = open;

    return true;
  };
}

exports.makeBlockFunc = makeBlockFunc;
