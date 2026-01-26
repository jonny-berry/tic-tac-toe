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

function createPlayer(name, mark) {
  return { name, mark }
}

const user = createPlayer('Player', 'X');
const computer = createPlayer('Computer', 'O');