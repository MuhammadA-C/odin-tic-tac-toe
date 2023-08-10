//Create object that controls the flow of the game
//Use a module when you only ever need one of something
//Use a factory function when you need more than one

/////////////////////////////////////////////////////////////

/*

  Things to do:
  1. Add code to check to see who won
  2. Announce winner of the game
  3. Restart button to restart the game
  4. Refactor code
  5. (Optional) Add AI to play the game

*/

/////////////////////////////////////////////////////////////

//Player Factory Function
const playerFactory = (symbol) => {
  return { symbol };
};

//gameBoard Module
const GameBoard = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  let resetGameBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard[i] = "";
    }
  };

  return { gameBoard, resetGameBoard };
})();

/////////////////////////////////////////////////////////////

const gameBoardDOM = document.querySelector("#game-board");
const player1 = playerFactory("X");
const player2 = playerFactory("O");
let player1Went = false;

gameBoardDOM.addEventListener("click", (e) => {
  if (!player1Went) {
    if (e.target.className == "grid-cell") {
      if (e.target.textContent == "") {
        //update game board DOM cell
        e.target.textContent = player1.symbol;
        //Update game board array
        let index = e.target.getAttribute("data-cell");
        GameBoard.gameBoard[index] = player1.symbol;
        player1Went = true;
        highlightPlayerNameForTurn(1);
      }
    }
  } else {
    if (e.target.className == "grid-cell") {
      if (e.target.textContent == "") {
        //update game board DOM cell
        e.target.textContent = player2.symbol;
        //Update game board array
        let index = e.target.getAttribute("data-cell");
        GameBoard.gameBoard[index] = player2.symbol;
        player1Went = false;
        highlightPlayerNameForTurn(2);
      }
    }
  }
});

function highlightPlayerNameForTurn(numberForPlayer) {
  const player1Txt = document.querySelector("#players > :first-child");
  const player2Txt = document.querySelector("#players > :last-child");

  switch (numberForPlayer) {
    case 1:
      player1Txt.classList.toggle("your-turn");
      player2Txt.classList.toggle("your-turn");
      break;
    case 2:
      player2Txt.classList.toggle("your-turn");
      player1Txt.classList.toggle("your-turn");
      break;
  }
}
