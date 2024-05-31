import { Player, Bot } from "./player";

export default class Game {
  #player1;
  #player2;
  #attackingPlayer;
  #isGameOver;
  #gametype;

  constructor(player1Name, player2Name, gametype) {
    this.#gametype = gametype;
    this.#init(player1Name, player2Name);
  }

  #init(player1Name, player2Name) {
    switch (this.#gametype) {
      case "pvp":
      case "online":
        this.#player1 = new Player(player1Name);
        this.#player2 = new Player(player2Name);
        break;
      case "pvb":
        this.#player1 = new Player(player1Name);
        this.#player2 = new Bot(player2Name);
        break;
      case "bots":
        this.#player1 = new Bot(player1Name);
        this.#player2 = new Bot(player2Name);
        break;
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

  get gametype() {
    return this.#gametype;
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

  async start(cb, playerInput) {
    let roundResult = null;

    while (!this.#isGameOver) {
      let input;

      if (this.#attackingPlayer instanceof Bot) {
        input = this.#attackingPlayer.getAttack();
        await new Promise((resolve) => setTimeout(resolve, 10));
      } else {
        input = await playerInput();
      }

      roundResult = this.#playRound(input);
      if (roundResult !== null) {
        cb(roundResult);
      }
    }

    return `Game Over.  ${this.receivingPlayer.name} Wins!`;
  }

  reset() {
    this.#init(this.#player1.name, this.#player2.name);
  }
}
