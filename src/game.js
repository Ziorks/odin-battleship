import Player from "./player";

export default class Game {
  #player1;
  #player2;

  constructor(player1Name, player2Name) {
    this.#player1 = new Player(player1Name);
    this.#player2 = new Player(player2Name);

    const testShips = [
      { length: 2, location: [0, 0] },
      { length: 3, location: [2, 0] },
      { length: 3, location: [4, 0] },
      { length: 4, location: [6, 0] },
      { length: 5, location: [8, 0] },
    ];

    testShips.forEach((ship) => {
      this.#player1.placeShip(ship.length, ship.location);
      this.#player2.placeShip(ship.length, ship.location);
    });

    this.#player1.receiveAttack([0, 0]);
    this.#player1.receiveAttack([1, 0]);
  }

  get player1Board() {
    return this.#player1.board;
  }

  get player2Board() {
    return this.#player2.board;
  }
}
