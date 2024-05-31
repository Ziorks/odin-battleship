import Player from "./player";

export default class Game {
  #player1;
  #player2;
  #attackingPlayer;
  #isGameOver;

  constructor(player1Name, player2Name, nBots = 0) {
    this.#init(player1Name, player2Name, nBots);
  }

  #init(player1Name, player2Name, nBots) {
    if (nBots === 0) {
      this.#player1 = new Player(player1Name);
      this.#player2 = new Player(player2Name);
    } else if (nBots === 1) {
      this.#player1 = new Player(player1Name);
      this.#player2 = new Player(player2Name, true);
    } else {
      this.#player1 = new Player(player1Name, true);
      this.#player2 = new Player(player2Name, true);
    }
    this.#attackingPlayer = this.#player1;
    this.#isGameOver = false;

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

  #playRound(location) {
    const attackResult = this.receivingPlayer.receiveAttack(location);
    if (attackResult === null || this.#isGameOver) {
      return null;
    }

    const message = `${this.#attackingPlayer.name} attacked [${location[0]},  ${
      location[1]
    }] and it was a ${attackResult}${attackResult === "hit" ? "!" : "."}`;

    if (this.receivingPlayer.allShipsSunk()) {
      this.#isGameOver = true;
    }

    this.#toggleAttackingPlayer();
    return message;
  }

  async start(cb, player1Input, player2Input) {
    let roundResult = null;

    while (!this.#isGameOver) {
      let input;

      if (this.#attackingPlayer.isComputer) {
        input = [
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        ];
        //implement a getAttack() for bots and replace this trash
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else if (this.#attackingPlayer == this.#player1) {
        input = await player1Input();
      } else {
        input = await player2Input();
      }

      roundResult = this.#playRound(input);
      if (roundResult !== null) {
        cb(roundResult);
      }
    }

    return `Game Over.  ${this.receivingPlayer.name} Wins!`;
  }

  reset() {
    const nBots = this.#player1.isComputer
      ? 2
      : this.#player2.isComputer
      ? 1
      : 0;
    this.#init(this.#player1.name, this.#player2.name, nBots);
  }
}
