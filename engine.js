/* Fifteen puzzle engine - pure logic, shared by the app and node tests.
   Board: flat array of size*size; tiles 1..15, blank is 0. */
(function (global) {
  'use strict';

  function solved(size) {
    var b = [];
    for (var i = 1; i < size * size; i++) b.push(i);
    b.push(0);
    return b;
  }

  function isSolved(board) {
    for (var i = 0; i < board.length - 1; i++) {
      if (board[i] !== i + 1) return false;
    }
    return board[board.length - 1] === 0;
  }

  /* Indices that can slide into the blank right now. */
  function legalMoves(board, size) {
    var blank = board.indexOf(0);
    var bx = blank % size, by = (blank - bx) / size;
    var out = [];
    if (bx > 0) out.push(blank - 1);
    if (bx < size - 1) out.push(blank + 1);
    if (by > 0) out.push(blank - size);
    if (by < size - 1) out.push(blank + size);
    return out;
  }

  /* Slide tile at `idx` into the blank; returns a NEW board, or null if illegal. */
  function move(board, size, idx) {
    var legal = legalMoves(board, size);
    if (legal.indexOf(idx) === -1) return null;
    var next = board.slice();
    var blank = next.indexOf(0);
    next[blank] = next[idx];
    next[idx] = 0;
    return next;
  }

  /*
   * Shuffle by walking `steps` random legal moves from solved - the result is
   * always solvable by construction. Avoids immediately undoing the last move
   * when possible, so short shuffles still scramble.
   */
  function shuffle(size, rand, steps) {
    var b = solved(size);
    var prev = -1;
    for (var s = 0; s < steps; s++) {
      var opts = legalMoves(b, size).filter(function (i) { return i !== prev; });
      if (!opts.length) opts = legalMoves(b, size);
      var pick = opts[Math.floor(rand() * opts.length)];
      prev = b.indexOf(0);
      b = move(b, size, pick);
    }
    return b;
  }

  var api = { solved: solved, isSolved: isSolved, legalMoves: legalMoves, move: move, shuffle: shuffle };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else global.Fifteen = api;
})(typeof window !== 'undefined' ? window : globalThis);
