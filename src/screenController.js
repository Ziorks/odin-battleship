export default class ScreenController {
  #player1BoardDiv = document.getElementById("player1_board");
  //#player2BoardDiv = document.getElementById("player2_board");

  renderBoard(board) {
    for (let row = 0; row < 11; row++) {
      for (let column = 0; column < 11; column++) {
        if (column === 0 && row === 10) {
          const cornerSpace = document.createElement("div");
          this.#player1BoardDiv.appendChild(cornerSpace);
        } else if (column === 0) {
          const rowLabel = document.createElement("div");
          rowLabel.className = "boardLabel";
          rowLabel.textContent = 9 - row;
          this.#player1BoardDiv.appendChild(rowLabel);
        } else if (row === 10) {
          const columnLabel = document.createElement("div");
          columnLabel.className = "boardLabel";
          columnLabel.textContent = column - 1;
          this.#player1BoardDiv.appendChild(columnLabel);
        } else {
          const space = board[(9 - row) * 10 + column - 1];
          const spaceDiv = document.createElement("div");
          spaceDiv.className = "boardSpace";
          if (space.ship) {
            spaceDiv.classList.add("ship");
          }
          if (space.isHit) {
            spaceDiv.classList.add("hit");
          }
          this.#player1BoardDiv.appendChild(spaceDiv);
        }
      }
    }
  }
}
