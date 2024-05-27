export default class Ship {
  #length;
  #nHits = 0;

  constructor(length) {
    if (typeof length !== "number" || length < 1) {
      throw new Error(
        "Ship constructor requires a length that is an integer greater than zero."
      );
    }
    this.#length = length;
  }

  hit() {
    return ++this.#nHits;
  }

  isSunk() {
    return this.#nHits >= this.#length;
  }
}
