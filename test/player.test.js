import { Player, Bot } from "../src/player";

describe("Player unit tests", () => {
  describe("Getters", () => {
    describe("Human", () => {
      let testPlayer;
      beforeEach(() => {
        testPlayer = new Player("test human player");
      });

      test("name", () => {
        expect(testPlayer.name).toBe("test human player");
      });

      test("board", () => {
        expect(testPlayer.board).toHaveLength(100);
      });

      test("ships", () => {
        expect(testPlayer.ships).toHaveLength(5);
      });

      test("shipsConfirmed", () => {
        expect(testPlayer.shipsConfirmed).toBe(false);
      });
    });

    describe("Computer", () => {
      let testPlayer;
      beforeEach(() => {
        testPlayer = new Bot("test computer player");
      });

      test("name", () => {
        expect(testPlayer.name).toBe("test computer player");
      });

      test("board", () => {
        expect(testPlayer.board).toHaveLength(100);
      });

      test("ships", () => {
        expect(testPlayer.ships).toHaveLength(5);
      });

      test("shipsConfirmed", () => {
        expect(testPlayer.shipsConfirmed).toBe(true);
      });
    });
  });

  describe("Methods", () => {
    let humanPlayer;
    beforeEach(() => {
      humanPlayer = new Player("test human player");
    });

    test("RandomizeShipLocations", () => {
      humanPlayer.randomizeShipLocations();
      expect(humanPlayer.ships.every((ship) => ship.location !== null)).toBe(
        true
      );
    });

    test("ClearShipLocations", () => {
      humanPlayer.randomizeShipLocations();
      humanPlayer.clearShipLocations();
      expect(
        humanPlayer.ships.every(
          (ship) => ship.location === null && ship.isHorizontal === true
        )
      ).toBe(true);
    });

    test("placeShipsOnBoard", () => {
      expect(humanPlayer.placeShipsOnBoard()).toBe(false);
      humanPlayer.randomizeShipLocations();
      expect(humanPlayer.placeShipsOnBoard()).toBe(true);
    });

    test("setShipLocation", () => {
      expect(humanPlayer.setShipLocation("Destroyer", [0, 0], true)).toBe(true);
      expect(humanPlayer.setShipLocation("Destroyer", [0, 0], true)).toBe(true);
      expect(humanPlayer.setShipLocation("Battleship", [8, 0], false)).toBe(
        false
      );
      expect(humanPlayer.setShipLocation("Submarine", [0, 0], true)).toBe(
        false
      );
    });
  });
});
