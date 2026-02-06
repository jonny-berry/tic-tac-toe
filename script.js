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
    if (gameBoard.getBoard()[0] === mark && gameBoard.getBoard()[1] === mark && gameBoard.getBoard()[2] === mark) {
      return true;
    }
    
    if (gameBoard.getBoard()[3] === mark && gameBoard.getBoard()[4] === mark && gameBoard.getBoard()[5] === mark) {
      return true;
    }

    if (gameBoard.getBoard()[6] === mark && gameBoard.getBoard()[7] === mark && gameBoard.getBoard()[8] === mark) {
      return true;
    }

    return false;
  }

  function checkVerticalWin(mark) {
    const board = gameBoard.getBoard();

    if (gameBoard.getBoard()[0] === mark && gameBoard.getBoard()[3] === mark && gameBoard.getBoard()[6] === mark) {
      return true;
    }
    
    if (gameBoard.getBoard()[1] === mark && gameBoard.getBoard()[4] === mark && gameBoard.getBoard()[7] === mark) {
      return true;
    }

    if (gameBoard.getBoard()[2] === mark && gameBoard.getBoard()[5] === mark && gameBoard.getBoard()[8] === mark) {
      return true;
    }

    return false;
  }

  function checkDiagonalWin(mark) {
    if (gameBoard.getBoard()[0] === mark && gameBoard.getBoard()[4] === mark && gameBoard.getBoard()[8] === mark) {
      return true;
    }
    
    if (gameBoard.getBoard()[2] === mark && gameBoard.getBoard()[4] === mark && gameBoard.getBoard()[6] === mark) {
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
      if (gameBoard.getBoard()[pieceIndex] === '') {
        return false;
      }
    }
    return true; 
  }

  function checkForHorizontalMove() {
    // Check for move opening at first index of each row
    for (let pieceIndex = 0; pieceIndex <= 6; pieceIndex++) {
      // Check for horizontal first index move opening
      if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex + 1] !== user.mark && gameBoard.getBoard()[pieceIndex + 2] !== user.mark) {
        // Make first index of row move
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;
      }
      pieceIndex += 2;  // Jump to start of next row of pieces
    }

    // Check for move opening at second index of each row
    for (let pieceIndex = 1; pieceIndex <= 7; pieceIndex++) {
      // Check for middle index horizontal move opening
      if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex - 1] !== user.mark && gameBoard.getBoard()[pieceIndex + 1] !== user.mark) {
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;
      }
      pieceIndex += 2;  // Jump to start of next row of pieces
    }

    // Check for move opening at third index of each row
    for (let pieceIndex = 2; pieceIndex <= 8; pieceIndex++) {
      if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex - 1] !== user.mark && gameBoard.getBoard()[pieceIndex - 2] !== user.mark) {
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;
      }
      pieceIndex += 2;  // Jump to start of next row of pieces
    }
  }

  function checkForVerticalMove() {
    // Checks for first row moves
    for (let pieceIndex = 0; pieceIndex <= 2; pieceIndex++) {
      if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex + 3] !== user.mark && gameBoard.getBoard()[pieceIndex + 6] !== user.mark) {
        console.log('first if')
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;  
      }
    }

    // Checks for second row moves
    for (let pieceIndex = 3; pieceIndex <= 5; pieceIndex++) {
      if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex + 3] !== user.mark && gameBoard.getBoard()[pieceIndex - 3] !== user.mark) {
        console.log('second if')
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;  
      }
    }

    // Checks for third row moves
    for (let pieceIndex = 6; pieceIndex <= 8; pieceIndex++) {
      if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex - 3] !== user.mark && gameBoard.getBoard()[pieceIndex - 6] !== user.mark) {
        console.log('second if')
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;  
      }
    }
  }

  function checkForDiagonalMove() {
    // First piece
    if (madeMove === false && gameBoard.getBoard()[0] === '' && gameBoard.getBoard()[4] !== user.mark && gameBoard.getBoard()[8] !== user.mark) {
      gameBoard.getBoard()[0] = computer.mark;
      madeMove = true;
    }
    // Third piece
    else if (madeMove === false && gameBoard.getBoard()[2] === '' && gameBoard.getBoard()[4] !== user.mark && gameBoard.getBoard()[6] !== user.mark) {
      gameBoard.getBoard()[2] = computer.mark;
      madeMove = true;
    }
    // Center piece
    else if (madeMove === false && gameBoard.getBoard()[4] === '' && gameBoard.getBoard()[0] !== user.mark && gameBoard.getBoard()[8] !== user.mark) {
      gameBoard.getBoard()[4] = computer.mark;
      madeMove = true;
    }
    // Sixth piece
    else if (madeMove === false && gameBoard.getBoard()[6] === '' && gameBoard.getBoard()[4] !== user.mark && gameBoard.getBoard()[2] !== user.mark) {
      gameBoard.getBoard()[6] = computer.mark;
      madeMove = true;
    }
    // Eighth piece
    else if (madeMove === false && gameBoard.getBoard()[8] === '' && gameBoard.getBoard()[4] !== user.mark && gameBoard.getBoard()[0] !== user.mark) {
      gameBoard.getBoard()[8] = computer.mark;
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
        if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex + 1] === computer.mark && gameBoard.getBoard()[pieceIndex + 2] === computer.mark) {
          gameBoard.getBoard()[pieceIndex] = computer.mark;
          madeMove = true;
        }
      }

      // Check second column each row
      else if (pieceIndex === 1 || pieceIndex === 4 || pieceIndex === 7) {
        if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex - 1] === computer.mark && gameBoard.getBoard()[pieceIndex + 1] === computer.mark) {
          gameBoard.getBoard()[pieceIndex] = computer.mark;
          madeMove = true;
        }
      }

      // Check third column each row
      else if (pieceIndex === 2 || pieceIndex === 5 || pieceIndex === 8) {
        if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex - 1] === computer.mark && gameBoard.getBoard()[pieceIndex - 2] === computer.mark) {
          gameBoard.getBoard()[pieceIndex] = computer.mark;
          madeMove = true;
        }
      }
    }
  }

  function completeWinningColumn() {
    for (let pieceIndex = 0; pieceIndex <= 2; pieceIndex++) {
      if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex + 3] === computer.mark && gameBoard.getBoard()[pieceIndex + 6] === computer.mark) {
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }

    for (let pieceIndex = 3; pieceIndex <= 5; pieceIndex++) {
      if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex + 3] === computer.mark && gameBoard.getBoard()[pieceIndex - 3] === computer.mark) {
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }

    for (let pieceIndex = 6; pieceIndex <= 8; pieceIndex++) {
      if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex - 3] === computer.mark && gameBoard.getBoard()[pieceIndex - 6] === computer.mark) {
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }
  }

  function completeWinningDiagonal() {
    // Complete top left
    if (madeMove === false && gameBoard.getBoard()[0] === '' && gameBoard.getBoard()[4] === computer.mark && gameBoard.getBoard()[8] === computer.mark) {
      gameBoard.getBoard()[0] = computer.mark;
      madeMove = true;
    }
    // Complete top right
    else if (madeMove === false && gameBoard.getBoard()[2] === '' && gameBoard.getBoard()[4] === computer.mark && gameBoard.getBoard()[6] === computer.mark) {
      gameBoard.getBoard()[2] = computer.mark;
      madeMove = true;
    }
    // Complete center, left diagonal
    else if (madeMove === false && gameBoard.getBoard()[4] === '' && gameBoard.getBoard()[0] === computer.mark && gameBoard.getBoard()[8] === computer.mark) {
      gameBoard.getBoard()[4] = computer.mark;
      madeMove = true;
    }
    // Complete center, right diagonal
    else if (madeMove === false && gameBoard.getBoard()[4] === '' && gameBoard.getBoard()[2] === computer.mark && gameBoard.getBoard()[6] === computer.mark) {
      gameBoard.getBoard()[4] = computer.mark;
      madeMove = true;
    }
    // Complete bottom left
    else if (madeMove === false && gameBoard.getBoard()[6] === '' && gameBoard.getBoard()[4] === computer.mark && gameBoard.getBoard()[2] === computer.mark) {
      gameBoard.getBoard()[6] = computer.mark;
      madeMove = true;
    }
    // Complete bottom right
    else if (madeMove === false && gameBoard.getBoard()[8] === '' && gameBoard.getBoard()[4] === computer.mark && gameBoard.getBoard()[0] === computer.mark) {
      gameBoard.getBoard()[8] = computer.mark;
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
    if (madeMove === false && gameBoard.getBoard()[0] === '' && gameBoard.getBoard()[4] === computer.mark && gameBoard.getBoard()[8] === '') {
      gameBoard.getBoard()[0] = computer.mark;
      madeMove = true;
    }
    else if (madeMove === false && gameBoard.getBoard()[0] === '' && gameBoard.getBoard()[4] === '' && gameBoard.getBoard()[8] === computer.mark) {
      gameBoard.getBoard()[0] = computer.mark;
      madeMove = true;
    }
    // Check top right
    else if (madeMove === false && gameBoard.getBoard()[2] === '' && gameBoard.getBoard()[4] === '' && gameBoard.getBoard()[6] === computer.mark) {
      gameBoard.getBoard()[2] = computer.mark;
      madeMove = true;
    }
    else if (madeMove === false && gameBoard.getBoard()[2] === '' && gameBoard.getBoard()[4] === computer.mark && gameBoard.getBoard()[6] === '') {
      gameBoard.getBoard()[2] = computer.mark;
      madeMove = true;
    }
    // Check center, left diagonal
    else if (madeMove === false && gameBoard.getBoard()[4] === '' && gameBoard.getBoard()[0] === computer.mark && gameBoard.getBoard()[8] === '') {
      gameBoard.getBoard()[4] = computer.mark;
      madeMove = true;
    }
    else if (madeMove === false && gameBoard.getBoard()[4] === '' && gameBoard.getBoard()[0] === '' && gameBoard.getBoard()[8] === computer.mark) {
      gameBoard.getBoard()[4] = computer.mark;
      madeMove = true;
    }
    // Check center, right diagonal
    else if (madeMove === false && gameBoard.getBoard()[4] === '' && gameBoard.getBoard()[2] === computer.mark && gameBoard.getBoard()[6] === '') {
      gameBoard.getBoard()[4] = computer.mark;
      madeMove = true;
    }
    else if (madeMove === false && gameBoard.getBoard()[4] === '' && gameBoard.getBoard()[2] === '' && gameBoard.getBoard()[6] === computer.mark) {
      gameBoard.getBoard()[4] = computer.mark;
      madeMove = true;
    }
    // Check bottom left
    else if (madeMove === false && gameBoard.getBoard()[6] === '' && gameBoard.getBoard()[4] === computer.mark && gameBoard.getBoard()[2] === '') {
      gameBoard.getBoard()[6] = computer.mark;
      madeMove = true;
    }
    else if (madeMove === false && gameBoard.getBoard()[6] === '' && gameBoard.getBoard()[4] === '' && gameBoard.getBoard()[2] === computer.mark) {
      gameBoard.getBoard()[6] = computer.mark;
      madeMove = true;
    }
    // Check bottom right
    else if (madeMove === false && gameBoard.getBoard()[8] === '' && gameBoard.getBoard()[4] === computer.mark && gameBoard.getBoard()[0] === '') {
      gameBoard.getBoard()[8] = computer.mark;
      madeMove = true;
    }
    else if (madeMove === false && gameBoard.getBoard()[8] === '' && gameBoard.getBoard()[4] === '' && gameBoard.getBoard()[0] === computer.mark) {
      gameBoard.getBoard()[8] = computer.mark;
      madeMove = true;
    }
  }

  function setUpWinningColumn() {
    // Check first row
    for (let pieceIndex = 0; pieceIndex <= 2; pieceIndex++) {
      if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex + 3] === computer.mark && gameBoard.getBoard()[pieceIndex + 6] === '') {
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;
      }
      else if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex + 3] === '' && gameBoard.getBoard()[pieceIndex + 6] === computer.mark) {
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }

    // Check second row
    for (let pieceIndex = 3; pieceIndex <= 5; pieceIndex++) {
      if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex + 3] === computer.mark && gameBoard.getBoard()[pieceIndex - 3] === '') {
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;
      }
      else if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex + 3] === '' && gameBoard.getBoard()[pieceIndex - 3] === computer.mark) {
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }

    // Check third row
    for (let pieceIndex = 6; pieceIndex <= 8; pieceIndex++) {
      if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex - 3] === computer.mark && gameBoard.getBoard()[pieceIndex - 6] === '') {
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;
      }
      else if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex - 3] === '' && gameBoard.getBoard()[pieceIndex - 6] === computer.mark) {
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }
  }

  function setUpWinningRow() {
    for (let pieceIndex = 0; pieceIndex <= 8; pieceIndex++) {
      // Check first column each row
      if (pieceIndex === 0 || pieceIndex === 3 || pieceIndex === 6) {
        if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex + 1] === computer.mark && gameBoard.getBoard()[pieceIndex + 2] === '') {
          gameBoard.getBoard()[pieceIndex] = computer.mark;
          madeMove = true;
        }
        else if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex + 1] === '' && gameBoard.getBoard()[pieceIndex + 2] === computer.mark) {
          gameBoard.getBoard()[pieceIndex] = computer.mark;
          madeMove = true;
        }
      }

        // Check second column each row
        else if (pieceIndex === 1 || pieceIndex === 4 || pieceIndex === 7) {
          if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex - 1] === computer.mark && gameBoard.getBoard()[pieceIndex + 1] === '') {
            gameBoard.getBoard()[pieceIndex] = computer.mark;
            madeMove = true;
          }
          else if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex - 1] === '' && gameBoard.getBoard()[pieceIndex + 1] === computer.mark) {
            gameBoard.getBoard()[pieceIndex] = computer.mark;
            madeMove = true;
          }
        }

        // Check third column each row
        else if (pieceIndex === 2 || pieceIndex === 5 || pieceIndex === 8) {
          if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex - 1] === computer.mark && gameBoard.getBoard()[pieceIndex - 2] === '') {
            gameBoard.getBoard()[pieceIndex] = computer.mark;
            madeMove = true;
          }
          else if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex - 1] === '' && gameBoard.getBoard()[pieceIndex - 2] === computer.mark) {
            gameBoard.getBoard()[pieceIndex] = computer.mark;
            madeMove = true;
          }
        }
      }
    }

  function blockHorizontalMove() {
    for (let pieceIndex = 0; pieceIndex <= 8; pieceIndex++) {
      // Check first column each row
      if (pieceIndex === 0 || pieceIndex === 3 || pieceIndex === 6) {
        if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex + 1] === user.mark && gameBoard.getBoard()[pieceIndex + 2] === user.mark) {
          gameBoard.getBoard()[pieceIndex] = computer.mark;
          madeMove = true;
        }
      }

      // Check second column each row
      else if (pieceIndex === 1 || pieceIndex === 4 || pieceIndex === 7) {
        if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex - 1] === user.mark && gameBoard.getBoard()[pieceIndex + 1] === user.mark) {
          gameBoard.getBoard()[pieceIndex] = computer.mark;
          madeMove = true;
        }
      }

      // Check third column each row
      else if (pieceIndex === 2 || pieceIndex === 5 || pieceIndex === 8) {
        if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex - 1] === user.mark && gameBoard.getBoard()[pieceIndex - 2] === user.mark) {
          gameBoard.getBoard()[pieceIndex] = computer.mark;
          madeMove = true;
        }
      }
    }
  }

  function blockVerticalMove() {
    for (let pieceIndex = 0; pieceIndex <= 2; pieceIndex++) {
      if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex + 3] === user.mark && gameBoard.getBoard()[pieceIndex + 6] === user.mark) {
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }

    for (let pieceIndex = 3; pieceIndex <= 5; pieceIndex++) {
      if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex + 3] === user.mark && gameBoard.getBoard()[pieceIndex - 3] === user.mark) {
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }

    for (let pieceIndex = 6; pieceIndex <= 8; pieceIndex++) {
      if (madeMove === false && gameBoard.getBoard()[pieceIndex] === '' && gameBoard.getBoard()[pieceIndex - 3] === user.mark && gameBoard.getBoard()[pieceIndex - 6] === user.mark) {
        gameBoard.getBoard()[pieceIndex] = computer.mark;
        madeMove = true;
      }
    }
  }

  

  function blockDiagonalMove() {
   // Complete top left
    if (madeMove === false && gameBoard.getBoard()[0] === '' && gameBoard.getBoard()[4] === user.mark && gameBoard.getBoard()[8] === user.mark) {
      gameBoard.getBoard()[0] = computer.mark;
      madeMove = true;
    }
    // Complete top right
    else if (madeMove === false && gameBoard.getBoard()[2] === '' && gameBoard.getBoard()[4] === user.mark && gameBoard.getBoard()[6] === user.mark) {
      gameBoard.getBoard()[2] = computer.mark;
      madeMove = true;
    }
    // Complete center, left diagonal
    else if (madeMove === false && gameBoard.getBoard()[4] === '' && gameBoard.getBoard()[0] === user.mark && gameBoard.getBoard()[8] === user.mark) {
      gameBoard.getBoard()[4] = computer.mark;
      madeMove = true;
    }
    // Complete center, right diagonal
    else if (madeMove === false && gameBoard.getBoard()[4] === '' && gameBoard.getBoard()[2] === user.mark && gameBoard.getBoard()[6] === user.mark) {
      gameBoard.getBoard()[4] = computer.mark;
      madeMove = true;
    }
    // Complete bottom left
    else if (madeMove === false && gameBoard.getBoard()[6] === '' && gameBoard.getBoard()[4] === user.mark && gameBoard.getBoard()[2] === user.mark) {
      gameBoard.getBoard()[6] = computer.mark;
      madeMove = true;
    }
    // Complete bottom right
    else if (madeMove === false && gameBoard.getBoard()[8] === '' && gameBoard.getBoard()[4] === user.mark && gameBoard.getBoard()[0] === user.mark) {
      gameBoard.getBoard()[8] = computer.mark;
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

      if (gameBoard.getBoard()[randomIndex] === '') {
        gameBoard.getBoard()[randomIndex] = computer.mark;
        madeMove = true;
      }
    }
  }

  let firstMove = true;
  let madeMove = false;


  function resetController() {
    firstMove = true;
    madeMove = false;
  }

  function makeComputerMove() {
    madeMove = false;

    // Make random move first move
    if (firstMove === true) {
      makeRandomMove();
      firstMove = false;
    }

    // completeWinningPattern();
    // blockWinningMove();
    // setUpWinningPattern();
    // checkForMove();
    makeRandomMove();
  }
  

  return { makeComputerMove, checkForWin, checkForDraw, getUserStats, resetController };
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

  function renderButtons(outcome) {
    // Add upper you win display
    const markDisplayContainer = document.getElementById('mark-display');
    markDisplayContainer.innerHTML = '';
    const youWinEl = document.createElement('p');

    if (outcome === 'user') {
      youWinEl.innerHTML = 'You Win! 🎉';
      youWinEl.id = 'you-win-display';
    }

    else if (outcome === 'computer') {
      youWinEl.innerHTML = 'You Lose. ❌';
      youWinEl.id = 'you-win-display';
    }

    else if (outcome === 'draw') {
      youWinEl.innerHTML = 'It’s a draw. 🤝';
      youWinEl.id = 'you-win-display';
    }


    markDisplayContainer.appendChild(youWinEl);

    // Add restart and switch mark display elements
    const buttonContainer = document.getElementById('button-container');
    const playAgainButton = document.createElement('button');
    const switchMarkButton = document.createElement('button');

    playAgainButton.id = 'play-again-button';
    switchMarkButton.id = 'switch-mark-button';

    playAgainButton.innerHTML = 'Play Again';
    switchMarkButton.innerHTML = 'Switch Mark';

    buttonContainer.appendChild(playAgainButton);
    buttonContainer.appendChild(switchMarkButton);

    addPlayAgainButtonListener(playAgainButton);
    addSwitchMarkButtonListener(switchMarkButton);
  }

  function addSwitchMarkButtonListener(element) {
    element.addEventListener('click', () => {
      if (user.mark === 'X') {
        user.mark = 'O';
        computer.mark = 'X';
      }

      else if (user.mark === 'O') {
        user.mark = 'X';
        computer.mark = 'O';
      }

      console.log(`user.mark: ${user.mark}`)
      console.log(`computer.mark: ${computer.mark}`)
    })
  }

  function removeButtons() {
    document.getElementById('you-win-display').innerHTML = '';

    const buttonContainer = document.getElementById('button-container');
    let playAgainButton = document.getElementById('play-again-button');
    let switchMarkButton = document.getElementById('switch-mark-button');

    buttonContainer.removeChild(playAgainButton)
    buttonContainer.removeChild(switchMarkButton)
  }

  function addPlayAgainButtonListener(element) {
    element.addEventListener('click', () => {
      console.log(gameBoard.getBoard())
      gameBoard.resetBoard(gameBoard.resetBoard(gameBoard.getBoard()));
      console.log(gameBoard.getBoard())
      removeButtons();
      removeBoard();
      gameController.resetController()

      gameOver = false;
      
      const markDisplay = document.getElementById('mark-display');
      const youWinDisplay = document.getElementById('you-win-display');

      markDisplay.removeChild(youWinDisplay);

      renderMarkDisplay();
      updateMarkDisplay();
      displayBoard();
    })
  }

  let gameOver = false;
  let outcome;

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
          gameOver = true;
          winner = 'user';
  
          gameController.getUserStats().wins++;

          outcome = 'user';
          renderButtons(outcome);
        }

        else if (gameController.checkForDraw()) {
          console.log('its a draw')
          gameOver = true;
          gameController.getUserStats().draws++;
          
          outcome = 'draw';
          renderButtons(outcome);
        }

        // Make computer move if user has not won
        else if (!gameController.checkForWin(user.mark, computer.mark)) {
          gameController.makeComputerMove()
          console.log(gameBoard.getBoard())
        }

        // Check if computers latest move won the match
        if (gameController.checkForWin(user.mark, computer.mark) === computer.mark) {
          console.log('pc won')
          gameOver = true;
          gameController.getUserStats().losses++;

          outcome = 'computer';
          renderButtons(outcome);
        }

        else if (gameController.checkForDraw() && gameOver === false) {
          console.log('its a draw')
          gameOver = true;
          gameController.getUserStats().draws++;

          outcome = 'draw';
          renderButtons(outcome);
        }

        if (gameOver) {
          updateBoard();
          updateStatDisplay();
        }

        if (!gameOver) { setTimeout(() => { updateBoard() }, 220) }
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

  function removeBoard() {
    while (boardContainer.firstChild) {
      boardContainer.removeChild(boardContainer.firstChild);
    }
  }
  
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

  function renderMarkDisplay() {
    const markDisplay = document.getElementById('mark-display');
    const userMarkDisplay = document.createElement('p');
    const computerMarkDisplay = document.createElement('p');

    userMarkDisplay.id = 'user-mark-display';
    computerMarkDisplay.id = 'computer-mark-display';

    markDisplay.appendChild(userMarkDisplay);
    markDisplay.appendChild(computerMarkDisplay);
  }

  renderMarkDisplay()
  displayBoard();
  updateStatDisplay();
  updateMarkDisplay();
})();

/*
    <p id="user-mark-display">User: X</p>
    <p id="computer-mark-display">Computer: O</p>
*/

/*
  X X X
  X X X
  X X X
*/

console.log(gameBoard.getBoard())