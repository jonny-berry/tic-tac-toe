const user = createPlayer('User', 'X');
const computer = createPlayer('Computer', 'O');





const gameBoard = (function () {
  let boardPieces = [ '', '', '', '', '', '', '', '', '' ];

  function getBoard() {
    return boardPieces;
  }

  function resetBoard() {
    boardPieces = [ '', '', '', '', '', '', '', '', '' ];
  }

  return { getBoard, resetBoard };
})();

function createPlayer(name, mark) {
  return { name, mark };
}






const gameController = (function () {
  let userStats = { wins: 0, losses: 0, draws: 0 };
  let computerStats = { wins: 0, losses: 0, draws: 0 };

  function getUserStats() {
    return userStats;
  }

  function getComputerStats() {
    return computerStats;
  }

  function checkHorizontalWin(mark) {
    const board = gameBoard.getBoard();

    if (board[0] === mark && board[1] === mark && board[2] === mark) {
      return true;
    }
    
    if (board[3] === mark && board[4] === mark && board[5] === mark) {
      return true;
    }

    if (board[6] === mark && board[7] === mark && board[8] === mark) {
      return true;
    }

    return false;
  }

  function checkVerticalWin(mark) {
    const board = gameBoard.getBoard();

    if (board[0] === mark && board[3] === mark && board[6] === mark) {
      return true;
    }
    
    if (board[1] === mark && board[4] === mark && board[7] === mark) {
      return true;
    }

    if (board[2] === mark && board[5] === mark && board[8] === mark) {
      return true;
    }

    return false;
  }

  const board = gameBoard.getBoard();

  function checkDiagonalWin(mark) {
    if (board[0] === mark && board[4] === mark && board[8] === mark) {
      return true;
    }
    
    if (board[2] === mark && board[4] === mark && board[6] === mark) {
      return true;
    }

    return false;
  }

  function checkForWin(userMark, computerMark) {
    if (checkHorizontalWin(userMark) || checkVerticalWin(userMark) || checkDiagonalWin(userMark)) {
      console.log('The user won')
      return true;
    }
    else if (checkHorizontalWin(computerMark) || checkVerticalWin(computerMark) || checkDiagonalWin(computerMark)) {
      console.log('The computer won')
      return true;
    }

    return false;
  }

  const numPieces = 9;
  
  function checkForDraw() {
    for (let pieceIndex = 0; pieceIndex < numPieces; pieceIndex++) {
      if (board[pieceIndex] === '') {
        return false;
      }
    }
    return true; 
  }

  

  return { checkForWin, checkForDraw };
})();

/*
  X X X
  X X X
  X X X
*/

// Check for draw function

console.log(user.mark)
console.log(gameBoard.getBoard())
console.log(gameController.checkForDraw())