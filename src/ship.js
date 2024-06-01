export default class Ship {
  #name;
  #shipLength;
  #nHits = 0;

  constructor(name, shipLength) {
    if (shipLength < 1 || !Number.isInteger(shipLength)) {
      throw new Error(
        "Ship constructor requires a length that is an integer greater than zero."
      );
    }
    this.#name = name;
    this.#shipLength = shipLength;
  }

  get name() {
    return this.#name;
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
