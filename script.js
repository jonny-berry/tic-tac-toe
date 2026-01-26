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

  function checkDiagonalWin(mark) {
    const board = gameBoard.getBoard();

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

  return { checkForWin };
})();

/*
  X X X
  X X X
  X X X
*/

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

const user = createPlayer('Player', 'X');
const computer = createPlayer('Computer', 'O');

console.log(gameController.checkForWin(user.mark, computer.mark))