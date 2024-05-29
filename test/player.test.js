import Player from "../src/player";

describe("Player unit tests", () => {
  describe("Getters", () => {
    test("Human", () => {
      const testPlayer = new Player("test human player");
      expect(testPlayer.name).toBe("test human player");
      expect(testPlayer.isComputer).toBe(false);
      expect(testPlayer.board).toHaveLength(100);
    });

    test("Computer", () => {
      const testPlayer = new Player("test computer player", true);
      expect(testPlayer.name).toBe("test computer player");
      expect(testPlayer.isComputer).toBe(true);
      expect(testPlayer.board).toHaveLength(100);
    });
  });
});
