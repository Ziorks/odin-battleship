import { Player, Bot } from "../src/player";

describe("Player unit tests", () => {
  describe("Getters", () => {
    test("Human", () => {
      const testPlayer = new Player("test human player");
      expect(testPlayer.name).toBe("test human player");
      expect(testPlayer.board).toHaveLength(100);
      expect(testPlayer.ships).toHaveLength(5);
    });

    test("Computer", () => {
      const testPlayer = new Bot("test computer player");
      expect(testPlayer.name).toBe("test computer player");
      expect(testPlayer.board).toHaveLength(100);
      expect(testPlayer.ships).toHaveLength(5);
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

    test("placeShipsOnBoard", () => {
      expect(humanPlayer.placeShipsOnBoard()).toBe(false);
      humanPlayer.randomizeShipLocations();
      expect(humanPlayer.placeShipsOnBoard()).toBe(true);
    });
  });
});
