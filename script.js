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

  function checkForHorizontalMove() {
    // Check for move opening at first index of each row
    for (let pieceIndex = 0; pieceIndex <= 6; pieceIndex++) {
      // Check for horizontal first index move opening
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex + 1] !== user.mark && board[pieceIndex + 2] !== user.mark) {
        // Make first index of row move
        board[pieceIndex] = computer.mark;
        madeMove = true;
      }
      pieceIndex += 2;  // Jump to start of next row of pieces
    }

    // Check for move opening at second index of each row
    for (let pieceIndex = 1; pieceIndex <= 7; pieceIndex++) {
      // Check for middle index horizontal move opening
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 1] !== user.mark && board[pieceIndex + 1] !== user.mark) {
        board[pieceIndex] = computer.mark;
        madeMove = true;
      }
      pieceIndex += 2;  // Jump to start of next row of pieces
    }

    // Check for move opening at third index of each row
    for (let pieceIndex = 2; pieceIndex <= 8; pieceIndex++) {
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 1] !== user.mark && board[pieceIndex - 2] !== user.mark) {
        board[pieceIndex] = computer.mark;
        madeMove = true;
      }
      pieceIndex += 2;  // Jump to start of next row of pieces
    }
  }

  function checkForVerticalMove() {
    // Checks for first row moves
    for (let pieceIndex = 0; pieceIndex <= 2; pieceIndex++) {
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex + 3] !== user.mark && board[pieceIndex + 6] !== user.mark) {
        console.log('first if')
        board[pieceIndex] = computer.mark;
        madeMove = true;  
      }
    }

    // Checks for second row moves
    for (let pieceIndex = 3; pieceIndex <= 5; pieceIndex++) {
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex + 3] !== user.mark && board[pieceIndex - 3] !== user.mark) {
        console.log('second if')
        board[pieceIndex] = computer.mark;
        madeMove = true;  
      }
    }

    // Checks for second row moves
    for (let pieceIndex = 6; pieceIndex <= 8; pieceIndex++) {
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 3] !== user.mark && board[pieceIndex - 6] !== user.mark) {
        console.log('second if')
        board[pieceIndex] = computer.mark;
        madeMove = true;  
      }
    }
  }

  function makeComputerMove() {
    let madeMove = false;
  }

  return { checkForWin, makeComputerMove, checkForDraw };
})();

/*
  X X X
  X X X
  X X X
*/

// Check for draw function

console.log(user.mark)
console.log(gameBoard.getBoard())
// console.log(gameController.checkForDraw())
gameController.makeComputerMove()
console.log(gameBoard.getBoard())