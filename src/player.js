import Gameboard from "./gameboard";

export default class Player {
  #board = new Gameboard();
  #name;
  #isComputer;

  constructor(name, isComputer = false) {
    this.#name = name;
    this.#isComputer = isComputer;
  }

  get board() {
    return this.#board.board;
  }

  get name() {
    return this.#name;
  }

  get isComputer() {
    return this.#isComputer;
  }

  placeShip(length, location) {
    this.#board.placeShip(length, location);
  }

  receiveAttack(location) {
    this.#board.receiveAttack(location);
  }

  allShipsSunk() {
    return this.#board.allShipsSunk();
  }
}
