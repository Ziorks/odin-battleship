export default class Game {
  #player1;
  #player2;
  #attackingPlayer;

  constructor(player1, player2) {
    this.#player1 = player1;
    this.#player2 = player2;
    this.#attackingPlayer = this.#player1;

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
  }

  get player1() {
    return this.#player1;
  }

  get player2() {
    return this.#player2;
  }

  get attackingPlayer() {
    return this.#attackingPlayer;
  }

  get receivingPlayer() {
    return this.#attackingPlayer == this.#player1
      ? this.#player2
      : this.#player1;
  }

  #toggleAttackingPlayer() {
    this.#attackingPlayer = this.receivingPlayer;
  }

  playRound(location) {
    const attackResult = this.receivingPlayer.receiveAttack(location);
    if (attackResult !== null) {
      if (this.receivingPlayer.allShipsSunk()) {
        return `Game Over.  ${this.#attackingPlayer.name} Wins!`;
      }

      const message = `${
        this.#attackingPlayer.name
      } attacked ${location} and it was a ${attackResult}.`;
      this.#toggleAttackingPlayer();
      return message;
    }
  }
}
