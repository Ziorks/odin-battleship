import Player from "./player";
import Game from "./game";

export default class ScreenController {
  #game;

  constructor() {
    this.#addEventListeners();
  }

  #updateGameDisplay() {
    const opponentContainer = document.getElementById("opponentContainer");
    const playerContainer = document.getElementById("playerContainer");

    opponentContainer.querySelector(".playerName").textContent =
      this.#game.player2.name;
    playerContainer.querySelector(".playerName").textContent =
      this.#game.player1.name;

    this.#drawBoard(this.#game.player2.board, opponentContainer, true);
    this.#drawBoard(this.#game.player1.board, playerContainer, false);
  }

  #drawBoard(board, container, isOpponent) {
    const boardDiv = container.querySelector(".board");
    boardDiv.innerHTML = "";
    for (let row = 0; row < 11; row++) {
      for (let column = 0; column < 11; column++) {
        const boardRow = 9 - row;
        const boardColumn = column - 1;
        const boardSpaceDiv = document.createElement("div");
        if (column === 0 && row === 10) {
          boardSpaceDiv.className = "boardCorner";
        } else if (column === 0) {
          boardSpaceDiv.className = "boardLabel";
          boardSpaceDiv.textContent = boardRow;
        } else if (row === 10) {
          boardSpaceDiv.className = "boardLabel";
          boardSpaceDiv.textContent = boardColumn;
        } else {
          const space = board[boardRow * 10 + boardColumn];
          boardSpaceDiv.dataset.row = boardRow;
          boardSpaceDiv.dataset.column = boardColumn;
          boardSpaceDiv.className = "boardSpace";
          if ((space.ship && !isOpponent) || (space.ship && space.isHit)) {
            boardSpaceDiv.classList.add("ship");
          }
          if (space.isHit) {
            boardSpaceDiv.classList.add("hit");
          }
        }
        boardDiv.appendChild(boardSpaceDiv);
      }
    }
  }

  #handleGamemodeSelect(e) {
    const gamemodeDiv = document.querySelector(".gamemode");
    const singlePlayerForm = document.getElementById("singlePlayerForm");
    const multiPlayerLocalForm = document.getElementById(
      "multiPlayerLocalForm"
    );
    const multiPlayerOnlineForm = document.getElementById(
      "multiPlayerOnlineForm"
    );
    gamemodeDiv.style.display = "none";

    switch (e.target.id) {
      case "singlePlayerBtn":
        singlePlayerForm.style.display = "block";
        break;
      case "multiPlayerLocalBtn":
        multiPlayerLocalForm.style.display = "block";
        break;
      case "multiPlayerOnlineBtn":
        multiPlayerOnlineForm.style.display = "block";
        break;
    }
  }

  #handleStartFormSubmit(e) {
    e.preventDefault();
    const player1Name =
      document.getElementById("player1Name").value || "Player 1";
    const player1 = new Player(player1Name);
    let player2Name;
    let player2;

    switch (e.target.id) {
      case "singlePlayerStart":
        player2Name = "Computer";
        player2 = new Player(player2Name, true);
        break;
      case "multiPlayerLocalStart":
        player2Name =
          document.getElementById("player2Name").value || "Player 2";
        player2 = new Player(player2Name);
        break;
      case "multiPlayerOnlineStart":
        //do later maybe?????
        break;
    }

    this.#game = new Game(player1, player2);
    document.querySelector(".start").style.display = "none";
    document.querySelector(".game").style.display = "block";
    this.#updateGameDisplay();
  }

  #addEventListeners() {
    window.addEventListener("click", (e) => {
      if (e.target.className === "gamemodeBtn") {
        this.#handleGamemodeSelect(e);
      }

      if (e.target.className === "startBtn") {
        this.#handleStartFormSubmit(e);
      }

      if (e.target.className === "boardSpace") {
        const row = Number(e.target.dataset.row);
        const column = Number(e.target.dataset.column);
        const location = [row, column];
        this.#game.playRound(location);
        this.#updateGameDisplay();
      }
    });
  }
}
