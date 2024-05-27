export default class Ship {
  #shipLength;
  #nHits = 0;

  constructor(shipLength) {
    if (shipLength < 1 || !Number.isInteger(shipLength)) {
      throw new Error(
        "Ship constructor requires a length that is an integer greater than zero."
      );
    }
    this.#shipLength = shipLength;
  }

  get shipLength() {
    return this.#shipLength;
  }

  hit() {
    return ++this.#nHits;
  }

  isSunk() {
    return this.#nHits >= this.#shipLength;
  }
}
