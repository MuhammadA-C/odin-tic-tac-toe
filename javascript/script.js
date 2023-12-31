//Create object that controls the flow of the game
//Use a module when you only ever need one of something
//Use a factory function when you need more than one

/////////////////////////////////////////////////////////////

/*

  Things to do:
  1. Refactor code
  2. (Optional) Add AI to play the game

*/

/////////////////////////////////////////////////////////////

//Player Factory Function
const playerFactory = (symbol) => {
  let won = false;
  return { symbol, won };
};

//gameBoard Module
const GameBoard = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  let resetGameBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard[i] = "";
    }
  };

  let didYouWin = (symbol) => {
    if (wonHorizontally(symbol)) {
      return true;
    } else if (wonVertically(symbol)) {
      return true;
    } else if (wonDiagnally(symbol)) {
      return true;
    }
    return false;
  };

  let wonHorizontally = (symbol) => {
    if (
      GameBoard.gameBoard[0] == symbol &&
      GameBoard.gameBoard[1] == symbol &&
      GameBoard.gameBoard[2] == symbol
    ) {
      return true;
    }

    if (
      GameBoard.gameBoard[8] == symbol &&
      GameBoard.gameBoard[7] == symbol &&
      GameBoard.gameBoard[6] == symbol
    ) {
      return true;
    }

    if (
      GameBoard.gameBoard[3] == symbol &&
      GameBoard.gameBoard[4] == symbol &&
      GameBoard.gameBoard[5] == symbol
    ) {
      return true;
    }
    return false;
  };

  let wonVertically = (symbol) => {
    if (
      GameBoard.gameBoard[0] == symbol &&
      GameBoard.gameBoard[3] == symbol &&
      GameBoard.gameBoard[6] == symbol
    ) {
      return true;
    }

    if (
      GameBoard.gameBoard[1] == symbol &&
      GameBoard.gameBoard[4] == symbol &&
      GameBoard.gameBoard[7] == symbol
    ) {
      return true;
    }

    if (
      GameBoard.gameBoard[8] == symbol &&
      GameBoard.gameBoard[5] == symbol &&
      GameBoard.gameBoard[2] == symbol
    ) {
      return true;
    }
    return false;
  };

  let wonDiagnally = (symbol) => {
    if (
      GameBoard.gameBoard[0] == symbol &&
      GameBoard.gameBoard[4] == symbol &&
      GameBoard.gameBoard[8] == symbol
    ) {
      return true;
    }

    if (
      GameBoard.gameBoard[6] == symbol &&
      GameBoard.gameBoard[4] == symbol &&
      GameBoard.gameBoard[2] == symbol
    ) {
      return true;
    }
    return false;
  };

  return { gameBoard, resetGameBoard, didYouWin };
})();

/////////////////////////////////////////////////////////////

const gameBoardDOM = document.querySelector("#game-board");
const player1 = playerFactory("X");
const player2 = playerFactory("O");
let player1Went = false;
let rounds = 0;

gameBoardDOM.addEventListener("click", (e) => {
  if (
    !player1Went &&
    player1.won == false &&
    player2.won == false &&
    rounds != 9
  ) {
    if (e.target.className == "grid-cell") {
      if (e.target.textContent == "") {
        //update game board DOM cell
        e.target.textContent = player1.symbol;
        //Update game board array
        let index = e.target.getAttribute("data-cell");
        GameBoard.gameBoard[index] = player1.symbol;
        player1Went = true;
        highlightPlayerNameForTurn(1);
        player1.won = GameBoard.didYouWin(player1.symbol);
        rounds++;
      }
    }
  } else if (
    player1Went == true &&
    player1.won == false &&
    player2.won == false &&
    rounds != 9
  ) {
    if (e.target.className == "grid-cell") {
      if (e.target.textContent == "") {
        //update game board DOM cell
        e.target.textContent = player2.symbol;
        //Update game board array
        let index = e.target.getAttribute("data-cell");
        GameBoard.gameBoard[index] = player2.symbol;
        player1Went = false;
        highlightPlayerNameForTurn(2);
        player2.won = GameBoard.didYouWin(player2.symbol);
        rounds++;
      }
    }
  }

  const h1DOM = document.querySelector("h1");

  if (player1.won) {
    h1DOM.textContent = "Player 1 Won!";
    displayRestartBtn();
    document.querySelector(".restart-game").addEventListener("click", () => {
      location.reload();
    });
  } else if (player2.won) {
    h1DOM.textContent = "Player 2 Won!";
    displayRestartBtn();
    document.querySelector(".restart-game").addEventListener("click", () => {
      location.reload();
    });
  } else if (rounds == 9) {
    h1DOM.textContent = "You Tied";
    displayRestartBtn();
    document.querySelector(".restart-game").addEventListener("click", () => {
      location.reload();
    });
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

/*

Game Board numbered for array indexes 
  0 1 2
  3 4 5
  6 7 8

  wins:
 horizontal
  - 0 1 2
  - 8 7 6
  - 3 4 5

  vertical
  - 0 3 6
  - 1 4 7
  - 8 5 2

  Diagnal  
  - 0 4 8
  - 6 4 2

*/

function displayRestartBtn() {
  const btnDOM = document.createElement("button");
  btnDOM.type = "button";
  btnDOM.textContent = "Play Again";

  const btnContainerDOM = document.createElement("div");
  btnContainerDOM.classList.add("restart-game");

  btnContainerDOM.appendChild(btnDOM);

  const containerDOM = document.querySelector("#container");
  containerDOM.appendChild(btnContainerDOM);
}
