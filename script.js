const gameBoard = (function () {
  let boardPieces = [ '', 'x', '', '', '', '', '', '', '' ];

  function getBoard() {
    return boardPieces;
  }

  function resetBoard() {
    boardPieces = [ '', '', '', '', '', '', '', '', '' ];
  }

  return { getBoard, resetBoard };
})();
