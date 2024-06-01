import Ship from "../src/ship";

describe("Ship unit tests", () => {
  describe("Expected use cases", () => {
    let testShip;

    beforeEach(() => {
      testShip = new Ship("Test Ship", 2);
    });

    test("get name", () => {
      expect(testShip.name).toBe("Test Ship");
    });

    test("get length", () => {
      expect(testShip.shipLength).toBe(2);
    });

    test("hit once", () => {
      expect(testShip.hit()).toBe(1);
    });

    test("hit multiple", () => {
      expect(testShip.hit()).toBe(1);
      expect(testShip.hit()).toBe(2);
    });

    test("hit once, not sunk", () => {
      expect(testShip.isSunk()).toBe(false);
      testShip.hit();
      expect(testShip.isSunk()).toBe(false);
    });

    test("hit twice, sunk", () => {
      expect(testShip.isSunk()).toBe(false);
      testShip.hit();
      expect(testShip.isSunk()).toBe(false);
      testShip.hit();
      expect(testShip.isSunk()).toBe(true);
    });
  });

  describe("Error handling", () => {
    test("construct with non-number", () => {
      expect(() => new Ship("Test Ship", "four")).toThrow(
        "Ship constructor requires a length that is an integer greater than zero."
      );
      expect(() => new Ship("Test Ship", 1.4)).toThrow(
        "Ship constructor requires a length that is an integer greater than zero."
      );
    });

    test("construct with invalid number", () => {
      expect(() => new Ship("Test Ship", -4)).toThrow(
        "Ship constructor requires a length that is an integer greater than zero."
      );
      expect(() => new Ship("Test Ship", 0)).toThrow(
        "Ship constructor requires a length that is an integer greater than zero."
      );
    });
  });
});
