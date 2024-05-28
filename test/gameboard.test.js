import Gameboard from "../src/gameboard";

describe("Gameboard unit tests", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard(10);
  });

  test("Create board", () => {
    expect(gameboard.board).toHaveLength(100);
  });
});
