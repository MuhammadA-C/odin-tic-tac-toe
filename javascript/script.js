//Create object that controls the flow of the game
//Use a module when you only ever need one of something
//Use a factory function when you need more than one

/////////////////////////////////////////////////////////////

//Player Factory Function
const playerFactory = (symbol) => {
  let pick = () => {
    const gameBoardDOM = document.querySelector("#game-board");

    gameBoardDOM.addEventListener("click", (e) => {
      if (e.target.className == "grid-cell") {
        if (e.target.textContent == "") {
          //update game board DOM cell
          e.target.textContent = symbol;
          //Update game board array
          let index = e.target.getAttribute("data-cell");
          GameBoard.gameBoard[index] = symbol;
        }
      }
    });
  };

  return { symbol, pick };
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

const Game = (() => {
  const player1 = playerFactory("X");
  const player2 = playerFactory("O");

  return {};
})();

/////////////////////////////////////////////////////////////
