import Ship from "./ship";

class BoardSpace {
  ship = null;
  isHit = false;
}

export default class Gameboard {
  #size = 10;
  #board;
  #ships = [];

  constructor() {
    this.#clearBoard();
  }

  get board() {
    return this.#board;
  }

  #clearBoard() {
    this.#board = [];
    for (let i = 0; i < this.#size * this.#size; i++) {
      this.#board.push(new BoardSpace());
    }
  }

  #getBoardIndex(row, column) {
    if (row < 0 || row >= this.#size || column < 0 || column > this.#size) {
      return null;
    }
    return row * this.#size + column;
  }

  placeShip(shipLength, row, column, isHorizontal = true) {
    const ship = new Ship(shipLength);
    const boardIndices = [];
    for (let i = 0; i < shipLength; i++) {
      if (isHorizontal) {
        boardIndices.push(this.#getBoardIndex(row, column + i));
      } else {
        boardIndices.push(this.#getBoardIndex(row + i, column));
      }

      if (
        boardIndices[i] === null ||
        this.#board[boardIndices[i]].ship !== null
      ) {
        return;
      }
    }
    boardIndices.forEach((index) => {
      this.#board[index].ship = ship;
    });
    this.#ships.push(ship);
  }
}
