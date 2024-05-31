import { Player, Bot } from "../src/player";

describe("Player unit tests", () => {
  describe("Getters", () => {
    test("Human", () => {
      const testPlayer = new Player("test human player");
      expect(testPlayer.name).toBe("test human player");
      expect(testPlayer.board).toHaveLength(100);
    });

    test("Computer", () => {
      const testPlayer = new Bot("test computer player");
      expect(testPlayer.name).toBe("test computer player");
      expect(testPlayer.board).toHaveLength(100);
    });
  });
});
