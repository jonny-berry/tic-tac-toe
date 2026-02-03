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
      return userMark;
    }
    else if (checkHorizontalWin(computerMark) || checkVerticalWin(computerMark) || checkDiagonalWin(computerMark)) {
      return computerMark;
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

  function checkForMove() {
    checkForHorizontalMove();
    checkForVerticalMove();
    checkForDiagonalMove();
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

  function blockHorizontalMove() {
    for (let pieceIndex = 0; pieceIndex <= 8; pieceIndex++) {
      // Check first column each row
      if (pieceIndex === 0 || pieceIndex === 3 || pieceIndex === 6) {
        if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex + 1] === user.mark && board[pieceIndex + 2] === user.mark) {
          board[pieceIndex] = computer.mark;
          madeMove = true;
        }
      }

      // Check second column each row
      else if (pieceIndex === 1 || pieceIndex === 4 || pieceIndex === 7) {
        if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 1] === user.mark && board[pieceIndex + 1] === user.mark) {
          board[pieceIndex] = computer.mark;
          madeMove = true;
        }
      }

      // Check third column each row
      else if (pieceIndex === 2 || pieceIndex === 5 || pieceIndex === 8) {
        if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 1] === user.mark && board[pieceIndex - 2] === user.mark) {
          board[pieceIndex] = computer.mark;
          madeMove = true;
        }
      }
    }
  }

  function blockVerticalMove() {
    for (let pieceIndex = 0; pieceIndex <= 2; pieceIndex++) {
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex + 3] === user.mark && board[pieceIndex + 6] === user.mark) {
        board[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }

    for (let pieceIndex = 3; pieceIndex <= 5; pieceIndex++) {
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex + 3] === user.mark && board[pieceIndex - 3] === user.mark) {
        board[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }

    for (let pieceIndex = 6; pieceIndex <= 8; pieceIndex++) {
      if (madeMove === false && board[pieceIndex] === '' && board[pieceIndex - 3] === user.mark && board[pieceIndex - 6] === user.mark) {
        board[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }
  }

  

  function blockDiagonalMove() {
   // Complete top left
    if (madeMove === false && board[0] === '' && board[4] === user.mark && board[8] === user.mark) {
      board[0] = computer.mark;
      madeMove = true;
    }
    // Complete top right
    else if (madeMove === false && board[2] === '' && board[4] === user.mark && board[6] === user.mark) {
      board[2] = computer.mark;
      madeMove = true;
    }
    // Complete center, left diagonal
    else if (madeMove === false && board[4] === '' && board[0] === user.mark && board[8] === user.mark) {
      board[4] = computer.mark;
      madeMove = true;
    }
    // Complete center, right diagonal
    else if (madeMove === false && board[4] === '' && board[2] === user.mark && board[6] === user.mark) {
      board[4] = computer.mark;
      madeMove = true;
    }
    // Complete bottom left
    else if (madeMove === false && board[6] === '' && board[4] === user.mark && board[2] === user.mark) {
      board[6] = computer.mark;
      madeMove = true;
    }
    // Complete bottom right
    else if (madeMove === false && board[8] === '' && board[4] === user.mark && board[0] === user.mark) {
      board[8] = computer.mark;
      madeMove = true;
    }
  }

  function blockWinningMove() {
    blockHorizontalMove();
    blockVerticalMove();
    blockDiagonalMove();
  }

  function makeRandomMove() {
    // If previous functions did not find a move make a random move
    while (madeMove === false) {
      let randomIndex = Math.floor(Math.random() * 9);  // Generate random number 0 - 8 inclusive

      if (board[randomIndex] === '') {
        board[randomIndex] = computer.mark;
        madeMove = true;
      }
    }
  }

  let firstMove = true;
  let madeMove = false;

  function makeComputerMove() {
    madeMove = false;

    // Make random move first move
    if (firstMove === true) {
      makeRandomMove();
      firstMove = false;
    }

    completeWinningPattern();
    blockWinningMove();
    setUpWinningPattern();
    checkForMove();
    makeRandomMove();
  }
  

  return { makeComputerMove, checkForWin, checkForDraw, getUserStats };
})();



const displayController = (function () {
  function updateStatDisplay() {
    let wins = document.getElementById('wins-display');
    let losses = document.getElementById('losses-display');
    let draws = document.getElementById('draws-display');

    wins.innerHTML = `Wins: ${gameController.getUserStats().wins}`;
    losses.innerHTML = `Losses: ${gameController.getUserStats().losses}`;
    draws.innerHTML = `Draws: ${gameController.getUserStats().draws}`;
  }

  function updateMarkDisplay() {
    let userMarkDisplay = document.getElementById('user-mark-display'); 
    let computerMarkDisplay = document.getElementById('computer-mark-display');

    if (user.mark === 'X') {
      userMarkDisplay.innerHTML = `User: <span class="x-mark-display">${user.mark}</span>`
      computerMarkDisplay.innerHTML = `Computer: <span class="o-mark-display">${computer.mark}<span>`
    }

    else if (user.mark === 'O') {
      userMarkDisplay.innerHTML = `User: <span class="o-mark-display">${user.mark}</span>`
      computerMarkDisplay.innerHTML = `Computer: <span class="x-mark-display">${computer.mark}<span>`
    }
  }

  let gameOver = false;

  function addBoardPieceListener(boardPiece, pieceIndex) {
      boardPiece.addEventListener('click', () => {
        if (gameBoard.getBoard()[pieceIndex] === '' && gameOver === false) {
          gameBoard.getBoard()[pieceIndex] = user.mark;
          boardPiece.innerHTML = user.mark;
        
        // Add class based on piece status
        if (gameBoard.getBoard()[pieceIndex] === 'X') {
          boardPiece.classList.add('x-board-piece');
        }

        else if (gameBoard.getBoard()[pieceIndex] === 'O') {
          boardPiece.classList.add('o-board-piece');
        }

        // Check if users latest move won the match
        if (gameController.checkForWin(user.mark, computer.mark) === user.mark) {
          console.log('i won');
          gameOver = true;
          gameController.getUserStats().wins++;
        }

        else if (gameController.checkForDraw()) {
          console.log('its a draw')
          gameOver = true;
          gameController.getUserStats().draws++;
        }

        // Make computer move if user has not won
        else if (!gameController.checkForWin(user.mark, computer.mark)) {
          gameController.makeComputerMove()
        }

        // Check if computers latest move won the match
        if (gameController.checkForWin(user.mark, computer.mark) === computer.mark) {
          console.log('pc won')
          gameOver = true;
          gameController.getUserStats().losses++;
        }

        else if (gameController.checkForDraw() && gameOver === false) {
          console.log('its a draw')
          gameOver = true;
          gameController.getUserStats().draws++;
        }

        if (gameOver) { updateStatDisplay(); }

        setTimeout(() => { updateBoard() }, 220)
      }
      })
  }

  function addBoardPieceClasses(boardPiece, pieceIndex = -1) {
    // Add class based on piece status
    if (boardPiece.innerHTML === 'X') {
      boardPiece.classList.add('x-board-piece');
    }

    else if (boardPiece.innerHTML === 'O') {
      boardPiece.classList.add('o-board-piece');
    }

    if (pieceIndex !== -1) {
      // Add class based on piece location
      if (pieceIndex === 4) {
        boardPiece.id = 'center-board-piece';
      }

      else if (pieceIndex === 3) {
        boardPiece.id = 'left-outside-board-piece';
      }

      else if (pieceIndex === 5) {
        boardPiece.id = 'right-outside-board-piece';
      }

      else if (pieceIndex === 1) {
        boardPiece.id = 'top-board-piece';
      }

      else if (pieceIndex === 7) {
        boardPiece.id = 'bottom-board-piece';
      }
    }
  }

  function updateBoard() {
    for (let currChild = 0; currChild < gameBoard.getBoard().length; currChild++) {
      if (boardContainer.children[currChild].innerHTML !== gameBoard.getBoard()[currChild]) {
        boardContainer.children[currChild].innerHTML = gameBoard.getBoard()[currChild];
        addBoardPieceClasses(boardContainer.children[currChild], currChild);
      }
    }
  }

  const boardContainer = document.createElement('div');

  function displayBoard() {
    boardContainer.id = 'board-container';
    document.body.appendChild(boardContainer);

    for (let currPiece = 0; currPiece < gameBoard.getBoard().length; currPiece++) {
      const boardPiece = document.createElement('div');
      
      boardPiece.innerHTML = gameBoard.getBoard()[currPiece];
      boardContainer.appendChild(boardPiece);
      boardPiece.classList.add('board-piece');


      addBoardPieceClasses(boardPiece, currPiece);
      addBoardPieceListener(boardPiece, currPiece);
    }
  }

  displayBoard();
  updateStatDisplay();
  updateMarkDisplay();
})();

/*
  X X X
  X X X
  X X X
*/

console.log(gameBoard.getBoard())