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
        this.#player2.randomizeShipLocations();
        this.#player2.placeShipsOnBoard();
        break;
      case "bots":
        this.#player1 = new Bot(player1Name);
        this.#player2 = new Bot(player2Name);
        this.#player1.randomizeShipLocations();
        this.#player1.placeShipsOnBoard();
        this.#player2.randomizeShipLocations();
        this.#player2.placeShipsOnBoard();
        break;
    }
    this.#attackingPlayer = this.#player1;
    this.#isGameOver = false;
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
