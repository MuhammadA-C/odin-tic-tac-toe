//Create object that controls the flow of the game
//Use a module when you only ever need one of something
//Use a factory function when you need more than one

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
      }
    }
  }
});
