import Gameboard from "./gameboard";
import Ship from "./ship";

export class Player {
  #name;
  #board = new Gameboard();
  #ships = [
    { ship: new Ship("Carrier", 5), location: null, isHorizontal: true },
    { ship: new Ship("Battleship", 4), location: null, isHorizontal: true },
    { ship: new Ship("Destroyer", 3), location: null, isHorizontal: true },
    { ship: new Ship("Submarine", 3), location: null, isHorizontal: true },
    { ship: new Ship("Patrol Boat", 2), location: null, isHorizontal: true },
  ];
  #shipsConfirmed = false;

  constructor(name) {
    this.#name = name;
  }

  get board() {
    return this.#shipsConfirmed
      ? this.#board.board
      : this.#getShipPreviewBoard();
  }

  get name() {
    return this.#name;
  }

  get ships() {
    return [...this.#ships];
  }

  get shipsConfirmed() {
    return this.#shipsConfirmed;
  }

  #allShipsPlaceable() {
    let result = true;
    const testBoard = new Gameboard();
    this.#ships.forEach(({ ship, location, isHorizontal }) => {
      if (location) {
        result = result && testBoard.placeShip(ship, location, isHorizontal);
      } else {
        result = false;
      }
    });
    return result;
  }

  #getShipPreviewBoard() {
    const previewBoard = new Gameboard();
    this.#ships.forEach(({ ship, location, isHorizontal }) => {
      if (location) {
        previewBoard.placeShip(ship, location, isHorizontal);
      }
    });
    return [...previewBoard.board];
  }

  setShipLocation(shipName, location, isHorizontal) {
    if (this.#shipsConfirmed) {
      return false;
    }

    const testShips = this.#ships.map((item) => {
      if (item.ship.name === shipName) {
        item.location = location;
        item.isHorizontal = isHorizontal;
      }
      return item;
    });

    const testBoard = new Gameboard();
    let placed = true;
    testShips.forEach(({ ship, location, isHorizontal }) => {
      if (location) {
        placed = placed && testBoard.placeShip(ship, location, isHorizontal);
      }
    });

    if (placed) {
      this.#ships = testShips;
      return true;
    }
    return false;
  }

  clearShipLocations() {
    if (this.#shipsConfirmed) {
      return false;
    }

    this.#ships.forEach((ship) => {
      ship.location = null;
      ship.isHorizontal = true;
    });
    return true;
  }

  randomizeShipLocations() {
    if (this.#shipsConfirmed) {
      return false;
    }

    const testBoard = new Gameboard();
    this.#ships.forEach(({ ship, location, isHorizontal }, index) => {
      let placed = false;
      while (!placed) {
        location = [
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        ];
        isHorizontal = Boolean(Math.floor(Math.random() + 0.5));
        placed = testBoard.placeShip(ship, location, isHorizontal);
      }
      this.#ships[index].location = location;
      this.#ships[index].isHorizontal = isHorizontal;
    });
    return true;
  }

  placeShipsOnBoard() {
    if (!this.#allShipsPlaceable()) {
      return false;
    }

    this.#ships.forEach(({ ship, location, isHorizontal }) => {
      this.#board.placeShip(ship, location, isHorizontal);
    });
    this.#shipsConfirmed = true;
    return true;
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
    this.randomizeShipLocations();
    this.placeShipsOnBoard();
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
