//Create players object
//Create object that controls the flow of the game
//Use a module when you only ever need one of something
//Use a factory function when you need more than one

/////////////////////////////////////////////////////////////

//Player Factory Function
const playerFactory = () => {};

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
