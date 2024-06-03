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

  setShipLocation(shipName, locationInput, isHorizontalInput) {
    if (this.#shipsConfirmed) {
      return false;
    }

    const testShips = this.#ships.map(({ ship, location, isHorizontal }) => {
      if (ship.name === shipName) {
        location = locationInput;
        isHorizontal = isHorizontalInput;
      }
      return { ship, location, isHorizontal };
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
    }
    return placed;
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
  #lastAttack = null;
  #initialHit = null;
  #lastHit = null;
  #availableDirections = null;

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

  #initDirections() {
    const deltaMatrix = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    const directions = [];
    deltaMatrix.forEach(([dRow, dColumn]) => {
      const [row, column] = this.#initialHit;
      if (
        this.#availableAttacks.find(
          (attack) => attack[0] === row + dRow && attack[1] === column + dColumn
        )
      ) {
        directions.push([dRow, dColumn]);
      }
    });

    //shuffle directions array
    let currentIndex = directions.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [directions[currentIndex], directions[randomIndex]] = [
        directions[randomIndex],
        directions[currentIndex],
      ];
    }

    this.#availableDirections = directions;
  }

  getAttackLocation() {
    let index = null;
    //the "&& this.#availableDirections.length" can be removed if I implement memory for multiple ships
    //right now if it hits multiple ships in an attack loop, it will exit loop attack mode after one ship is sunk
    //i.e. it can't handle ships that touch well
    if (this.#initialHit && this.#availableDirections.length) {
      index = this.#availableAttacks.findIndex(([row, column]) => {
        const attackRow = this.#lastHit[0] + this.#availableDirections[0][0];
        const attackColumn = this.#lastHit[1] + this.#availableDirections[0][1];
        return row === attackRow && column === attackColumn;
      });
    } else {
      index = Math.floor(Math.random() * this.#availableAttacks.length);
    }
    this.#lastAttack = this.#availableAttacks.splice(index, 1)[0];
    return this.#lastAttack;
  }

  handleAttackResponse(response) {
    switch (response) {
      case "sunk":
        this.#initialHit = null;
        this.#availableDirections = null;
        this.#lastHit = this.#lastAttack;
        break;
      case "hit":
        this.#initialHit = this.#initialHit || this.#lastAttack;
        this.#lastHit = this.#lastAttack;
        if (!this.#availableDirections) {
          this.#initDirections();
        }
        break;
      case "miss":
        if (this.#initialHit) {
          this.#lastHit = this.#initialHit;
          this.#availableDirections.shift();
        }
        break;
    }
  }
}
