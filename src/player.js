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

  constructor(name) {
    this.#name = name;
  }

  get board() {
    return this.#board.board;
  }

  get name() {
    return this.#name;
  }

  get ships() {
    return this.#ships;
  }

  #shipsReadyToPlace() {
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

  randomizeShipLocations() {
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
  }

  placeShipsOnBoard() {
    if (!this.#shipsReadyToPlace()) {
      return false;
    }

    this.#ships.forEach(({ ship, location, isHorizontal }) => {
      this.#board.placeShip(ship, location, isHorizontal);
    });
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
