import Gameboard from "../src/gameboard";

describe("Gameboard unit tests", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });

  describe("Create gameboard", () => {
    test("board is populated", () => {
      expect(gameboard.board).toHaveLength(100);
    });
  });

  describe("placeShip()", () => {
    test("Place 1x1 ship at 0-0", () => {
      gameboard.placeShip(1, [0, 0]);
      expect(gameboard.board[0].ship.shipLength).toBe(1);
    });

    test("Place 2x1 horizontal ship at 0-0", () => {
      gameboard.placeShip(2, [0, 0]);
      expect(gameboard.board[0].ship.shipLength).toBe(2);
      expect(gameboard.board[1].ship.shipLength).toBe(2);
      expect(gameboard.board[0].ship).toBe(gameboard.board[1].ship);
    });

    test("Place 2x1 vertical ship at 0-0", () => {
      gameboard.placeShip(2, [0, 0], false);
      expect(gameboard.board[0].ship.shipLength).toBe(2);
      expect(gameboard.board[10].ship.shipLength).toBe(2);
      expect(gameboard.board[0].ship).toBe(gameboard.board[10].ship);
    });

    test("Place ship out of bounds", () => {
      gameboard.placeShip(2, [100, 100]);
      const spacesWithShip = gameboard.board.filter(
        (boardSpace) => boardSpace.ship
      );
      expect(spacesWithShip).toHaveLength(0);
    });

    test("Place overlapping ships", () => {
      gameboard.placeShip(5, [0, 0]);
      gameboard.placeShip(5, [0, 3], false);
      const spacesWithShip = gameboard.board.filter(
        (boardSpace) => boardSpace.ship
      );
      expect(spacesWithShip).toHaveLength(5);
    });
  });

  describe("receiveAttack()", () => {
    beforeEach(() => {
      gameboard.placeShip(2, [0, 0]);
    });

    test("attack a ship", () => {
      gameboard.receiveAttack([0, 0]);
      expect(gameboard.board[0].isHit).toBe(true);
      gameboard.receiveAttack([0, 1]);
      expect(gameboard.board[0].ship.isSunk()).toBe(true);
    });

    test("attack an empty space", () => {
      gameboard.receiveAttack([0, 1]);
      expect(gameboard.board[1].isHit).toBe(true);
    });

    test("attack an out of bounds space", () => {
      gameboard.receiveAttack([100, 100]);
      const hitSpaces = gameboard.board.filter((space) => space.isHit);
      expect(hitSpaces).toHaveLength(0);
    });

    test("attack a hit space", () => {
      gameboard.receiveAttack([0, 0]);
      gameboard.receiveAttack([0, 0]);
      const hitSpaces = gameboard.board.filter((space) => space.isHit);
      expect(hitSpaces).toHaveLength(1);
      expect(gameboard.board[0].ship.isSunk()).toBe(false);
    });
  });

  describe("allShipsSunk()", () => {
    beforeEach(() => {
      gameboard.placeShip(1, [0, 0]);
    });

    test("One ship: not sunk", () => {
      expect(gameboard.allShipsSunk()).toBe(false);
    });

    test("One ship: sunk", () => {
      gameboard.receiveAttack([0, 0]);
      expect(gameboard.allShipsSunk()).toBe(true);
    });

    test("Two ships: one sunk, one not sunk", () => {
      gameboard.placeShip(1, [0, 1]);
      gameboard.receiveAttack([0, 0]);
      expect(gameboard.allShipsSunk()).toBe(false);
    });

    test("Two ships: both sunk", () => {
      gameboard.placeShip(1, [0, 1]);
      gameboard.receiveAttack([0, 0]);
      gameboard.receiveAttack([0, 1]);
      expect(gameboard.allShipsSunk()).toBe(true);
    });
  });
});
