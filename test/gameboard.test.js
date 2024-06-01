import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

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
      expect(gameboard.placeShip(new Ship("test ship", 1), [0, 0])).toBe(true);
      expect(gameboard.board[0].ship.shipLength).toBe(1);
    });

    test("Place 2x1 horizontal ship at 0-0", () => {
      expect(gameboard.placeShip(new Ship("test ship", 2), [0, 0])).toBe(true);
      expect(gameboard.board[0].ship.shipLength).toBe(2);
      expect(gameboard.board[1].ship.shipLength).toBe(2);
      expect(gameboard.board[0].ship).toBe(gameboard.board[1].ship);
    });

    test("Place 2x1 vertical ship at 0-0", () => {
      expect(gameboard.placeShip(new Ship("test ship", 2), [0, 0], false)).toBe(
        true
      );
      expect(gameboard.board[0].ship.shipLength).toBe(2);
      expect(gameboard.board[10].ship.shipLength).toBe(2);
      expect(gameboard.board[0].ship).toBe(gameboard.board[10].ship);
    });

    test("Place ship out of bounds", () => {
      expect(gameboard.placeShip(new Ship("test ship", 2), [100, 100])).toBe(
        false
      );
      const spacesWithShip = gameboard.board.filter(
        (boardSpace) => boardSpace.ship
      );
      expect(spacesWithShip).toHaveLength(0);
    });

    test("Place overlapping ships", () => {
      expect(gameboard.placeShip(new Ship("test ship", 5), [0, 0])).toBe(true);
      expect(gameboard.placeShip(new Ship("test ship", 5), [0, 3], false)).toBe(
        false
      );
      const spacesWithShip = gameboard.board.filter(
        (boardSpace) => boardSpace.ship
      );
      expect(spacesWithShip).toHaveLength(5);
    });

    test("Place ship that goes off grid to right (don't allow column wrapping)", () => {
      expect(gameboard.placeShip(new Ship("test ship", 5), [0, 8], true)).toBe(
        false
      );
      expect(gameboard.board[8].ship).toBeNull();
    });

    test("Place ship that goes off top of grid", () => {
      expect(gameboard.placeShip(new Ship("test ship", 5), [8, 0], false)).toBe(
        false
      );
      expect(gameboard.board[80].ship).toBeNull();
    });
  });

  describe("receiveAttack()", () => {
    beforeEach(() => {
      gameboard.placeShip(new Ship("test ship", 2), [0, 0]);
    });

    test("attack a ship", () => {
      expect(gameboard.receiveAttack([0, 0])).toBe("hit");
      expect(gameboard.board[0].isHit).toBe(true);
      expect(gameboard.receiveAttack([0, 1])).toBe("hit");
      expect(gameboard.board[0].ship.isSunk()).toBe(true);
    });

    test("attack an empty space", () => {
      expect(gameboard.receiveAttack([0, 2])).toBe("miss");
      expect(gameboard.board[2].isHit).toBe(true);
    });

    test("attack an out of bounds space", () => {
      expect(gameboard.receiveAttack([100, 100])).toBeNull();
      const hitSpaces = gameboard.board.filter((space) => space.isHit);
      expect(hitSpaces).toHaveLength(0);
    });

    test("attack a hit space", () => {
      expect(gameboard.receiveAttack([0, 0])).toBe("hit");
      expect(gameboard.receiveAttack([0, 0])).toBeNull();
      const hitSpaces = gameboard.board.filter((space) => space.isHit);
      expect(hitSpaces).toHaveLength(1);
      expect(gameboard.board[0].ship.isSunk()).toBe(false);
    });
  });

  describe("allShipsSunk()", () => {
    beforeEach(() => {
      gameboard.placeShip(new Ship("test ship", 1), [0, 0]);
    });

    test("One ship: not sunk", () => {
      expect(gameboard.allShipsSunk()).toBe(false);
    });

    test("One ship: sunk", () => {
      gameboard.receiveAttack([0, 0]);
      expect(gameboard.allShipsSunk()).toBe(true);
    });

    test("Two ships: one sunk, one not sunk", () => {
      gameboard.placeShip(new Ship("test ship", 1), [0, 1]);
      gameboard.receiveAttack([0, 0]);
      expect(gameboard.allShipsSunk()).toBe(false);
    });

    test("Two ships: both sunk", () => {
      gameboard.placeShip(new Ship("test ship", 1), [0, 1]);
      gameboard.receiveAttack([0, 0]);
      gameboard.receiveAttack([0, 1]);
      expect(gameboard.allShipsSunk()).toBe(true);
    });
  });
});
