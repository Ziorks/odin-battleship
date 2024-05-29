import Player from "./player";

export default class Game {
  #players = [];

  constructor(player1Name, player2Name) {
    this.#players.push(new Player(player1Name));
    this.#players.push(new Player(player2Name));

    const testShips = [
      { length: 2, location: [0, 0] },
      { length: 3, location: [2, 0] },
      { length: 3, location: [4, 0] },
      { length: 4, location: [6, 0] },
      { length: 5, location: [8, 0] },
    ];

    testShips.forEach((ship) => {
      this.#players[0].placeShip(ship.length, ship.location);
      this.#players[1].placeShip(ship.length, ship.location);
    });
  }

  get player1Board() {
    return this.#players[0].board;
  }

  get player2Board() {
    return this.#players[1].board;
  }

  #togglePlayers() {
    this.#players.reverse();
  }

  playRound(location) {
    const attackResult = this.#players[1].receiveAttack(location);
    if (attackResult !== null) {
      if (this.#players[1].allShipsSunk()) {
        return `Game Over.  ${this.#players[0].name} Wins!`;
      }

      const message = `${
        this.#players[0].name
      } attacked ${location} and it was a ${attackResult}.`;
      this.#togglePlayers();
      return message;
    }
  }
}
