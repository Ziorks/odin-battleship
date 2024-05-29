import Game from "./game";

export default class ScreenController {
  #game = new Game("player 1", "player 2"); //todo:get names from form
  #player1Container = document.getElementById("player1_container");
  #player2Container = document.getElementById("player2_container");

  constructor() {
    this.#updateBoard(this.#game.player1Board, this.#player1Container);
    this.#updateBoard(this.#game.player2Board, this.#player2Container);
  }

  #updateBoard(board, container) {
    const boardDiv = container.querySelector(".board");
    for (let row = 0; row < 11; row++) {
      for (let column = 0; column < 11; column++) {
        const boardRow = 9 - row;
        const boardColumn = column - 1;
        if (column === 0 && row === 10) {
          const cornerSpace = document.createElement("div");
          boardDiv.appendChild(cornerSpace);
        } else if (column === 0) {
          const rowLabel = document.createElement("div");
          rowLabel.className = "boardLabel";
          rowLabel.textContent = boardRow;
          boardDiv.appendChild(rowLabel);
        } else if (row === 10) {
          const columnLabel = document.createElement("div");
          columnLabel.className = "boardLabel";
          columnLabel.textContent = boardColumn;
          boardDiv.appendChild(columnLabel);
        } else {
          const space = board[boardRow * 10 + boardColumn];
          const spaceDiv = document.createElement("div");
          spaceDiv.dataset.row = boardRow;
          spaceDiv.dataset.column = boardColumn;
          spaceDiv.className = "boardSpace";
          if (space.ship) {
            spaceDiv.classList.add("ship");
          }
          if (space.isHit) {
            spaceDiv.classList.add("hit");
          }
          boardDiv.appendChild(spaceDiv);
        }
      }
    }
  }
}
