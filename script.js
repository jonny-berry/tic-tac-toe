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

    // Checks for third row moves
    for (let pieceIndex = 6; pieceIndex <= 8; pieceIndex++) {
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 3] !== user.mark && board[pieceIndex - 6] !== user.mark) {
        console.log('second if')
        board[pieceIndex] = computer.mark;
        madeMove = true;  
      }
    }
  }

  function checkForDiagonalMove() {
    // First piece
    if (madeMove === false && board[0] === '' && board[4] !== user.mark && board[8] !== user.mark) {
      board[0] = computer.mark;
      madeMove = true;
    }
    // Third piece
    else if (madeMove === false && board[2] === '' && board[4] !== user.mark && board[6] !== user.mark) {
      board[2] = computer.mark;
      madeMove = true;
    }
    // Center piece
    else if (madeMove === false && board[4] === '' && board[0] !== user.mark && board[8] !== user.mark) {
      board[4] = computer.mark;
      madeMove = true;
    }
    // Sixth piece
    else if (madeMove === false && board[6] === '' && board[4] !== user.mark && board[2] !== user.mark) {
      board[6] = computer.mark;
      madeMove = true;
    }
    // Eighth piece
    else if (madeMove === false && board[8] === '' && board[4] !== user.mark && board[0] !== user.mark) {
      board[8] = computer.mark;
      madeMove = true;
    }
  }

  function completeWinningRow() {
    for (let pieceIndex = 0; pieceIndex <= 8; pieceIndex++) {
      // Check first column each row
      if (pieceIndex === 0 || pieceIndex === 3 || pieceIndex === 6) {
        if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex + 1] === computer.mark && board[pieceIndex + 2] === computer.mark) {
          board[pieceIndex] = computer.mark;
          madeMove = true;
        }
      }

      // Check second column each row
      else if (pieceIndex === 1 || pieceIndex === 4 || pieceIndex === 7) {
        if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 1] === computer.mark && board[pieceIndex + 1] === computer.mark) {
          board[pieceIndex] = computer.mark;
          madeMove = true;
        }
      }

      // Check third column each row
      else if (pieceIndex === 2 || pieceIndex === 5 || pieceIndex === 8) {
        if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 1] === computer.mark && board[pieceIndex - 2] === computer.mark) {
          board[pieceIndex] = computer.mark;
          madeMove = true;
        }
      }
    }
  }

  function completeWinningColumn() {
    for (let pieceIndex = 0; pieceIndex <= 2; pieceIndex++) {
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex + 3] === computer.mark && board[pieceIndex + 6] === computer.mark) {
        board[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }

    for (let pieceIndex = 3; pieceIndex <= 5; pieceIndex++) {
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex + 3] === computer.mark && board[pieceIndex - 3] === computer.mark) {
        board[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }

    for (let pieceIndex = 6; pieceIndex <= 8; pieceIndex++) {
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 3] === computer.mark && board[pieceIndex - 6] === computer.mark) {
        board[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }
  }

  function completeWinningDiagonal() {
    // Complete top left
    if (madeMove === false && board[0] === '' && board[4] === computer.mark && board[8] === computer.mark) {
      board[0] = computer.mark;
      madeMove = true;
    }
    // Complete top right
    else if (madeMove === false && board[2] === '' && board[4] === computer.mark && board[6] === computer.mark) {
      board[2] = computer.mark;
      madeMove = true;
    }
    // Complete center, left diagonal
    else if (madeMove === false && board[4] === '' && board[0] === computer.mark && board[8] === computer.mark) {
      board[4] = computer.mark;
      madeMove = true;
    }
    // Complete center, right diagonal
    else if (madeMove === false && board[4] === '' && board[2] === computer.mark && board[6] === computer.mark) {
      board[4] = computer.mark;
      madeMove = true;
    }
    // Complete bottom left
    else if (madeMove === false && board[6] === '' && board[4] === computer.mark && board[2] === computer.mark) {
      board[6] = computer.mark;
      madeMove = true;
    }
    // Complete bottom right
    else if (madeMove === false && board[8] === '' && board[4] === computer.mark && board[0] === computer.mark) {
      board[8] = computer.mark;
      madeMove = true;
    }
  }

  function completeWinningPattern() {
    completeWinningRow();
    completeWinningColumn();
    completeWinningDiagonal();
  }

  function setUpWinningPattern() {
    setUpWinningRow();
    setUpWinningColumn();
    setUpWinningDiagonal();
  }

  function setUpWinningDiagonal() {
    // Check top left
    if (madeMove === false && board[0] === '' && board[4] === computer.mark && board[8] === '') {
      board[0] = computer.mark;
      madeMove = true;
    }
    else if (madeMove === false && board[0] === '' && board[4] === '' && board[8] === computer.mark) {
      board[0] = computer.mark;
      madeMove = true;
    }
    // Check top right
    else if (madeMove === false && board[2] === '' && board[4] === '' && board[6] === computer.mark) {
      board[2] = computer.mark;
      madeMove = true;
    }
    else if (madeMove === false && board[2] === '' && board[4] === computer.mark && board[6] === '') {
      board[2] = computer.mark;
      madeMove = true;
    }
    // Check center, left diagonal
    else if (madeMove === false && board[4] === '' && board[0] === computer.mark && board[8] === '') {
      board[4] = computer.mark;
      madeMove = true;
    }
    else if (madeMove === false && board[4] === '' && board[0] === '' && board[8] === computer.mark) {
      board[4] = computer.mark;
      madeMove = true;
    }
    // Check center, right diagonal
    else if (madeMove === false && board[4] === '' && board[2] === computer.mark && board[6] === '') {
      board[4] = computer.mark;
      madeMove = true;
    }
    else if (madeMove === false && board[4] === '' && board[2] === '' && board[6] === computer.mark) {
      board[4] = computer.mark;
      madeMove = true;
    }
    // Check bottom left
    else if (madeMove === false && board[6] === '' && board[4] === computer.mark && board[2] === '') {
      board[6] = computer.mark;
      madeMove = true;
    }
    else if (madeMove === false && board[6] === '' && board[4] === '' && board[2] === computer.mark) {
      board[6] = computer.mark;
      madeMove = true;
    }
    // Check bottom right
    else if (madeMove === false && board[8] === '' && board[4] === computer.mark && board[0] === '') {
      board[8] = computer.mark;
      madeMove = true;
    }
    else if (madeMove === false && board[8] === '' && board[4] === '' && board[0] === computer.mark) {
      board[8] = computer.mark;
      madeMove = true;
    }
  }

  function setUpWinningColumn() {
    // Check first row
    for (let pieceIndex = 0; pieceIndex <= 2; pieceIndex++) {
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex + 3] === computer.mark && board[pieceIndex + 6] === '') {
        board[pieceIndex] = computer.mark;
        madeMove = true;
      }
      else if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex + 3] === '' && board[pieceIndex + 6] === computer.mark) {
        board[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }

    // Check second row
    for (let pieceIndex = 3; pieceIndex <= 5; pieceIndex++) {
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex + 3] === computer.mark && board[pieceIndex - 3] === '') {
        board[pieceIndex] = computer.mark;
        madeMove = true;
      }
      else if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex + 3] === '' && board[pieceIndex - 3] === computer.mark) {
        board[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }

    // Check third row
    for (let pieceIndex = 6; pieceIndex <= 8; pieceIndex++) {
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 3] === computer.mark && board[pieceIndex - 6] === '') {
        board[pieceIndex] = computer.mark;
        madeMove = true;
      }
      else if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 3] === '' && board[pieceIndex - 6] === computer.mark) {
        board[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }
  }

  function setUpWinningRow() {
    for (let pieceIndex = 0; pieceIndex <= 8; pieceIndex++) {
      // Check first column each row
      if (pieceIndex === 0 || pieceIndex === 3 || pieceIndex === 6) {
        if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex + 1] === computer.mark && board[pieceIndex + 2] === '') {
          board[pieceIndex] = computer.mark;
          madeMove = true;
        }
        else if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex + 1] === '' && board[pieceIndex + 2] === computer.mark) {
          board[pieceIndex] = computer.mark;
          madeMove = true;
        }
      }

        // Check second column each row
        else if (pieceIndex === 1 || pieceIndex === 4 || pieceIndex === 7) {
          if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 1] === computer.mark && board[pieceIndex + 1] === '') {
            board[pieceIndex] = computer.mark;
            madeMove = true;
          }
          else if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 1] === '' && board[pieceIndex + 1] === computer.mark) {
            board[pieceIndex] = computer.mark;
            madeMove = true;
          }
        }

        // Check third column each row
        else if (pieceIndex === 2 || pieceIndex === 5 || pieceIndex === 8) {
          if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 1] === computer.mark && board[pieceIndex - 2] === '') {
            board[pieceIndex] = computer.mark;
            madeMove = true;
          }
          else if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 1] === '' && board[pieceIndex - 2] === computer.mark) {
            board[pieceIndex] = computer.mark;
            madeMove = true;
          }
        }
      }
    }

  let madeMove = false;

  function makeComputerMove() {
    madeMove = false;

    completeWinningPattern();
    setUpWinningPattern();
  }
  

  return { checkForWin, makeComputerMove, checkForDraw };
})();

/*
  X X X
  X X X
  X X X
*/

console.log(user.mark)
console.log(gameBoard.getBoard())
// console.log(gameController.checkForDraw())
gameController.makeComputerMove()
console.log(gameBoard.getBoard())