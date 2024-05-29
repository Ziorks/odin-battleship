import Player from "./player";

const player1 = new Player("Player 1");
const player2 = new Player("Player 2");

//temporary function to place ships
(() => {
  const testShips = [
    { length: 2, location: [0, 0] },
    { length: 3, location: [2, 0] },
    { length: 3, location: [4, 0] },
    { length: 4, location: [6, 0] },
    { length: 5, location: [8, 0] },
  ];

  testShips.forEach((ship) => {
    player1.board.placeShip(ship.length, ship.location);
    player2.board.placeShip(ship.length, ship.location);
  });
})();
