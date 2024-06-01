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

  placeShip(ship, [row, column], isHorizontal = true) {
    const boardIndices = [];
    for (let i = 0; i < ship.shipLength; i++) {
      if (isHorizontal) {
        boardIndices.push(
          column + i > 9 ? null : this.#getBoardIndex(row, column + i)
        );
      } else {
        boardIndices.push(this.#getBoardIndex(row + i, column));
      }

      if (
        boardIndices[i] === null ||
        this.#board[boardIndices[i]].ship !== null
      ) {
        return false;
      }
    }
    boardIndices.forEach((index) => {
      this.#board[index].ship = ship;
    });
    this.#ships.push(ship);
    return true;
  }

  receiveAttack([row, column]) {
    const boardIndex = this.#getBoardIndex(row, column);
    if (boardIndex === null || this.#board[boardIndex].isHit) {
      return null;
    }

    const boardSpace = this.#board[boardIndex];
    boardSpace.isHit = true;
    if (boardSpace.ship) {
      boardSpace.ship.hit();
      return "hit";
    }
    return "miss";
  }

  allShipsSunk() {
    return this.#ships.reduce((accum, ship) => accum && ship.isSunk(), true);
  }
}
