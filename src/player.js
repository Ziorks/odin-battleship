import Gameboard from "./gameboard";

export class Player {
  #board = new Gameboard();
  #name;

  constructor(name) {
    this.#name = name;
  }

  get board() {
    return this.#board.board;
  }

  get name() {
    return this.#name;
  }

  placeShip(length, location) {
    return this.#board.placeShip(length, location);
  }

  receiveAttack(location) {
    return this.#board.receiveAttack(location);
  }

  allShipsSunk() {
    return this.#board.allShipsSunk();
  }
}

export class Bot extends Player {
  #availableAttacks;

  constructor(name) {
    super(name);
    this.#initAvailableAttacks();
  }

  #initAvailableAttacks() {
    const allLocations = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        allLocations.push([i, j]);
      }
    }
    this.#availableAttacks = allLocations;
  }

  getAttack() {
    const index = Math.floor(Math.random() * this.#availableAttacks.length);
    return this.#availableAttacks.splice(index, 1)[0];
  }
}
