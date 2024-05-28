import Ship from "./ship";

class BoardSpace {
  #isShip = false;
  #isHit = false;

  get isShip() {
    return this.#isShip;
  }

  get isHit() {
    return this.#isHit;
  }

  hit() {
    if (!this.isHit()) {
      this.#isHit = true;
    }
  }
}

export default class Gameboard {
  #shipLengths = [5, 4, 3, 3, 2];
  #ships = [];
  #size;
  #board;

  constructor(size) {
    this.#size = size;
    this.#board = this.#createBoard(size);
    this.#shipLengths.forEach((length) => {
      this.#ships.push(new Ship(length));
    });
  }

  get board() {
    return this.#board;
  }

  #createBoard(size) {
    const board = [];
    for (let i = 0; i < size * size; i++) {
      board.push(new BoardSpace());
    }
    return board;
  }

  #getIndexFromLoc(row, col) {
    if (row < 0 || row >= this.#size || col < 0 || col >= this.#size) {
      return null;
    }
    return row * this.#size + col;
  }

  placeShipAt(row, col) {}
}
