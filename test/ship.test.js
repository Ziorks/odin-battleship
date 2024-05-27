import Ship from "../src/ship";

describe("Ship unit tests", () => {
  test("hit once", () => {
    const testShip = new Ship(2);
    expect(testShip.hit()).toBe(1);
  });

  test("hit once not sunk", () => {
    const testShip = new Ship(2);
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
  });

  test("hit twice sunk", () => {
    const testShip = new Ship(2);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
  });

  test("construct with non-number error", () => {
    expect(() => new Ship("four")).toThrow(
      "Ship constructor requires a length that is an integer greater than zero."
    );
  });

  test("construct with negative number error", () => {
    expect(() => new Ship(-4)).toThrow(
      "Ship constructor requires a length that is an integer greater than zero."
    );
  });
});
