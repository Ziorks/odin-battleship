import Player from "./player";
import Game from "./game";

export default class ScreenController {
  #game;

  constructor() {
    this.#init();
  }

  #init() {
    const body = document.querySelector("body");

    const pageHeader = document.createElement("header");
    pageHeader.textContent = "Battleship";
    body.appendChild(pageHeader);

    const pageMain = document.createElement("main");
    body.appendChild(pageMain);

    this.#addEventListeners();
    this.#showGamemodeSelect();
  }

  #showGamemodeSelect() {
    const pageMain = document.querySelector("main");

    const gamemodeDiv = document.createElement("div");
    gamemodeDiv.className = "gamemode";

    const gamemodeHeader = document.createElement("h2");
    gamemodeHeader.textContent = "Select a Gamemode";
    gamemodeDiv.appendChild(gamemodeHeader);

    const singlePlayerBtn = document.createElement("button");
    singlePlayerBtn.className = "gamemodeBtn";
    singlePlayerBtn.id = "singlePlayerBtn";
    singlePlayerBtn.innerText = "Player vs Bot";
    gamemodeDiv.appendChild(singlePlayerBtn);

    const multiPlayerLocalBtn = document.createElement("button");
    multiPlayerLocalBtn.className = "gamemodeBtn";
    multiPlayerLocalBtn.id = "multiPlayerLocalBtn";
    multiPlayerLocalBtn.innerText = "Player vs Player (local)";
    multiPlayerLocalBtn.disabled = true; //disabled until functionality exists
    gamemodeDiv.appendChild(multiPlayerLocalBtn);

    const multiPlayerOnlineBtn = document.createElement("button");
    multiPlayerOnlineBtn.className = "gamemodeBtn";
    multiPlayerOnlineBtn.id = "multiPlayerOnlineBtn";
    multiPlayerOnlineBtn.innerText = "Player vs Player (online)";
    multiPlayerOnlineBtn.disabled = true; //disabled until functionality exists
    gamemodeDiv.appendChild(multiPlayerOnlineBtn);

    pageMain.innerHTML = "";
    pageMain.appendChild(gamemodeDiv);
    // <div class="gamemode">
    //     <h2>Select a Gamemode</h2>
    //     <button class="gamemodeBtn" id="singlePlayerBtn">
    //       Player vs Bot
    //     </button>
    //     <button class="gamemodeBtn" id="multiPlayerLocalBtn" disabled>
    //       Player vs Player (local)
    //     </button>
    //     <button class="gamemodeBtn" id="multiPlayerOnlineBtn" disabled>
    //       Player vs Player (online)
    //     </button>
    //   </div>
  }

  #showSinglePlayerForm() {
    const pageMain = document.querySelector("main");

    const singlePlayerForm = document.createElement("form");
    singlePlayerForm.className = "startForm";
    singlePlayerForm.id = "singlePlayerForm";

    const player1NameDiv = document.createElement("div");

    const player1NameLabel = document.createElement("label");
    player1NameLabel.htmlFor = "player1Name";
    player1NameLabel.innerText = "Player Name: ";
    player1NameDiv.appendChild(player1NameLabel);

    const player1NameInput = document.createElement("input");
    player1NameInput.type = "text";
    player1NameInput.name = "player1Name";
    player1NameInput.id = "player1Name";
    player1NameInput.placeholder = "Player 1";
    player1NameDiv.appendChild(player1NameInput);

    const startGameBtn = document.createElement("button");
    startGameBtn.className = "startBtn";
    startGameBtn.id = "singlePlayerStart";
    startGameBtn.type = "submit";
    startGameBtn.innerText = "Start Game";

    singlePlayerForm.appendChild(player1NameDiv);
    singlePlayerForm.appendChild(startGameBtn);

    pageMain.innerHTML = "";
    pageMain.appendChild(singlePlayerForm);
    //   <form class="startForm" id="singlePlayerForm">
    //     <div>
    //       <label for="player1Name">Player Name: </label>
    //       <input
    //         type="text"
    //         name="player1Name"
    //         id="player1Name"
    //         placeholder="Player 1" />
    //     </div>
    //     <button class="startBtn" id="singlePlayerStart" type="submit">
    //       Start Game
    //     </button>
    // </form>
  }

  #showMultiPlayerLocalForm() {
    const pageMain = document.querySelector("main");

    const multiPlayerLocalForm = document.createElement("form");
    multiPlayerLocalForm.className = "startForm";
    multiPlayerLocalForm.id = "multiPlayerLocalForm";

    const player1NameDiv = document.createElement("div");

    const player1NameLabel = document.createElement("label");
    player1NameLabel.htmlFor = "player1Name";
    player1NameLabel.innerText = "Player 1 Name: ";
    player1NameDiv.appendChild(player1NameLabel);

    const player1NameInput = document.createElement("input");
    player1NameInput.type = "text";
    player1NameInput.name = "player1Name";
    player1NameInput.id = "player1Name";
    player1NameInput.placeholder = "Player 1";
    player1NameDiv.appendChild(player1NameInput);

    const player2NameDiv = document.createElement("div");

    const player2NameLabel = document.createElement("label");
    player2NameLabel.htmlFor = "player2Name";
    player2NameLabel.innerText = "Player 2 Name: ";
    player2NameDiv.appendChild(player2NameLabel);

    const player2NameInput = document.createElement("input");
    player2NameInput.type = "text";
    player2NameInput.name = "player2Name";
    player2NameInput.id = "player2Name";
    player2NameInput.placeholder = "Player 2";
    player2NameDiv.appendChild(player2NameInput);

    const startGameBtn = document.createElement("button");
    startGameBtn.className = "startBtn";
    startGameBtn.id = "multiPlayerLocalStart";
    startGameBtn.type = "submit";
    startGameBtn.innerText = "Start Game";

    multiPlayerLocalForm.appendChild(player1NameDiv);
    multiPlayerLocalForm.appendChild(player2NameDiv);
    multiPlayerLocalForm.appendChild(startGameBtn);

    pageMain.innerHTML = "";
    pageMain.appendChild(multiPlayerLocalForm);
    // <form class="startForm" id="multiPlayerLocalForm">
    //   <div>
    //     <label for="player1Name">Player 1 Name: </label>
    //     <input
    //       type="text"
    //       name="player1Name"
    //       id="player1Name"
    //       placeholder="Player 1" />
    //   </div>
    //   <div>
    //     <label for="player2Name">Player 2 Name: </label>
    //     <input
    //       type="text"
    //       name="player2Name"
    //       id="player2Name"
    //       placeholder="Player 2" />
    //   </div>
    //   <button class="startBtn" id="multiPlayerLocalStart" type="submit">
    //     Start Game
    //   </button>
    // </form>
  }

  #showMultiPlayerOnlineForm() {
    const pageMain = document.querySelector("main");

    const multiPlayerOnlineForm = document.createElement("form");
    multiPlayerOnlineForm.className = "startForm";
    multiPlayerOnlineForm.id = "multiPlayerOnlineForm";

    const player1NameDiv = document.createElement("div");

    const player1NameLabel = document.createElement("label");
    player1NameLabel.htmlFor = "player1Name";
    player1NameLabel.innerText = "Player Name: ";
    player1NameDiv.appendChild(player1NameLabel);

    const player1NameInput = document.createElement("input");
    player1NameInput.type = "text";
    player1NameInput.name = "player1Name";
    player1NameInput.id = "player1Name";
    player1NameInput.placeholder = "Player 1";
    player1NameDiv.appendChild(player1NameInput);

    const startGameBtn = document.createElement("button");
    startGameBtn.className = "startBtn";
    startGameBtn.id = "multiPlayerOnlineStart";
    startGameBtn.type = "submit";
    startGameBtn.innerText = "Find Opponent";

    multiPlayerOnlineForm.appendChild(player1NameDiv);
    multiPlayerOnlineForm.appendChild(startGameBtn);

    pageMain.innerHTML = "";
    pageMain.appendChild(multiPlayerOnlineForm);
    // <form class="startForm" id="multiPlayerOnlineForm">
    //   <div>
    //     <label for="player1Name">Player Name: </label>
    //     <input
    //       type="text"
    //       name="player1Name"
    //       id="player1Name"
    //       placeholder="Player 1" />
    //   </div>
    //   <button class="startBtn" id="multiPlayerOnlineStart" type="submit">
    //     Find Opponent
    //   </button>
    // </form>
  }

  #showGame() {
    const pageMain = document.querySelector("main");

    const gameDiv = document.createElement("div");
    gameDiv.className = "game";

    const opponentContainer = document.createElement("div");
    opponentContainer.className = "playerContainer";
    opponentContainer.id = "opponentContainer";

    const opponentHeader = document.createElement("h2");
    opponentHeader.className = "playerName";
    opponentContainer.appendChild(opponentHeader);

    const opponentBoardDiv = document.createElement("div");
    opponentBoardDiv.className = "board";
    opponentContainer.appendChild(opponentBoardDiv);

    gameDiv.appendChild(opponentContainer);

    const playerContainer = document.createElement("div");
    playerContainer.className = "playerContainer";
    playerContainer.id = "playerContainer";

    const playerBoardDiv = document.createElement("div");
    playerBoardDiv.className = "board";
    playerContainer.appendChild(playerBoardDiv);

    const playerHeader = document.createElement("h2");
    playerHeader.className = "playerName";
    playerContainer.appendChild(playerHeader);

    gameDiv.appendChild(playerContainer);

    pageMain.innerHTML = "";
    pageMain.appendChild(gameDiv);

    this.#updateGameDisplay();
    // <div class="game">
    //   <div class="playerContainer" id="opponentContainer">
    //     <h2 class="playerName"></h2>
    //     <div class="board"></div>
    //   </div>
    //   <div class="playerContainer" id="playerContainer">
    //     <div class="board"></div>
    //     <h2 class="playerName"></h2>
    //   </div>
    // </div>
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
    switch (e.target.id) {
      case "singlePlayerBtn":
        this.#showSinglePlayerForm();
        break;
      case "multiPlayerLocalBtn":
        this.#showMultiPlayerLocalForm();
        break;
      case "multiPlayerOnlineBtn":
        this.#showMultiPlayerOnlineForm();
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
    this.#showGame();
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
