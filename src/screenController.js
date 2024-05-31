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

    const botMatchBtn = document.createElement("button");
    botMatchBtn.className = "gamemodeBtn";
    botMatchBtn.id = "botMatchBtn";
    botMatchBtn.innerText = "Bot vs Bot";
    gamemodeDiv.appendChild(botMatchBtn);

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
    //     <button class="gamemodeBtn" id="botMatchBtn">
    //       Bot vs Bot
    //     </button>
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

  #showBotMatchForm() {
    const pageMain = document.querySelector("main");

    const botMatchForm = document.createElement("form");
    botMatchForm.className = "startForm";
    botMatchForm.id = "botMatchForm";

    const bot1NameDiv = document.createElement("div");

    const bot1NameLabel = document.createElement("label");
    bot1NameLabel.htmlFor = "bot1Name";
    bot1NameLabel.innerText = "Bot 1 Name: ";
    bot1NameDiv.appendChild(bot1NameLabel);

    const bot1NameInput = document.createElement("input");
    bot1NameInput.type = "text";
    bot1NameInput.name = "bot1Name";
    bot1NameInput.id = "bot1Name";
    bot1NameInput.placeholder = "Computer 1";
    bot1NameDiv.appendChild(bot1NameInput);

    const bot2NameDiv = document.createElement("div");

    const bot2NameLabel = document.createElement("label");
    bot2NameLabel.htmlFor = "bot2Name";
    bot2NameLabel.innerText = "Bot 2 Name: ";
    bot2NameDiv.appendChild(bot2NameLabel);

    const bot2NameInput = document.createElement("input");
    bot2NameInput.type = "text";
    bot2NameInput.name = "bot2Name";
    bot2NameInput.id = "bot2Name";
    bot2NameInput.placeholder = "Computer 2";
    bot2NameDiv.appendChild(bot2NameInput);

    const startGameBtn = document.createElement("button");
    startGameBtn.className = "startBtn";
    startGameBtn.id = "botMatchStart";
    startGameBtn.type = "submit";
    startGameBtn.innerText = "Start Game";

    botMatchForm.appendChild(bot1NameDiv);
    botMatchForm.appendChild(bot2NameDiv);
    botMatchForm.appendChild(startGameBtn);

    pageMain.innerHTML = "";
    pageMain.appendChild(botMatchForm);
    // <form class="startForm" id="botMatchForm">
    //   <div>
    //     <label for="bot1Name">Bot 1 Name: </label>
    //     <input
    //       type="text"
    //       name="bot1Name"
    //       id="bot1Name"
    //       placeholder="Computer 1" />
    //   </div>
    //   <div>
    //     <label for="bot2Name">Bot 2 Name: </label>
    //     <input
    //       type="text"
    //       name="bot2Name"
    //       id="bot2Name"
    //       placeholder="Computer 2" />
    //   </div>
    //   <button class="startBtn" id="botMatchStart" type="submit">
    //     Start Game
    //   </button>
    // </form>
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

    const lastAttackP = document.createElement("p");
    lastAttackP.className = "lastAttack";
    gameDiv.appendChild(lastAttackP);

    const currentTurnP = document.createElement("p");
    currentTurnP.className = "currentTurn";
    gameDiv.appendChild(currentTurnP);

    const gameOverDiv = document.createElement("div");
    gameOverDiv.className = "gameOverMenu";

    gameDiv.appendChild(gameOverDiv);

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

    this.#updateGameDisplay("Welcome Gamers!");
    // <div class="game">
    //   <div class="playerContainer" id="opponentContainer">
    //     <h2 class="playerName"></h2>
    //     <div class="board"></div>
    //   </div>
    //   <p class="lastAttack"></p>
    //   <p class="currentTurn"></p>
    //   <div class="gameOverMenu">
    //     <button class="rematchBtn">Rematch</button> (added when game over)
    //     <button class="newGameBtn">New Game</button> (added when game over)
    //   </div>
    //   <div class="playerContainer" id="playerContainer">
    //     <div class="board"></div>
    //     <h2 class="playerName"></h2>
    //   </div>
    // </div>
  }

  #showEndScreen(winner) {
    const currentTurnP = document.querySelector(".currentTurn");
    currentTurnP.innerText = winner;

    const gameOverDiv = document.querySelector(".gameOverMenu");

    const rematchBtn = document.createElement("button");
    rematchBtn.className = "rematchBtn";
    rematchBtn.innerText = "Rematch";
    gameOverDiv.appendChild(rematchBtn);

    const newGameBtn = document.createElement("button");
    newGameBtn.className = "newGameBtn";
    newGameBtn.innerText = "New Game";
    gameOverDiv.appendChild(newGameBtn);
  }

  #updateGameDisplay(message = "") {
    const opponentContainer = document.getElementById("opponentContainer");
    const playerContainer = document.getElementById("playerContainer");
    const lastAttackP = document.querySelector(".lastAttack");
    const currentTurnP = document.querySelector(".currentTurn");

    lastAttackP.innerText = message;
    currentTurnP.innerText = `It's ${this.#game.attackingPlayer.name}'s turn.`;

    opponentContainer.querySelector(".playerName").textContent =
      this.#game.player2.name;
    playerContainer.querySelector(".playerName").textContent =
      this.#game.player1.name;

    if (this.#game.player1.isComputer && this.#game.player2.isComputer) {
      //bot vs bot
      this.#drawBoard(
        this.#game.player2.board,
        opponentContainer,
        false,
        false
      );
      this.#drawBoard(this.#game.player1.board, playerContainer, false, false);
    } else if (this.#game.player1.isComputer || this.#game.player2.isComputer) {
      //player vs bot
      const isPlayable = this.#game.attackingPlayer == this.#game.player1;
      this.#drawBoard(
        this.#game.player2.board,
        opponentContainer,
        true,
        isPlayable
      );
      this.#drawBoard(this.#game.player1.board, playerContainer, false, false);
    }
  }

  #drawBoard(board, container, hideShips, isPlayable) {
    const boardDiv = container.querySelector(".board");
    boardDiv.innerHTML = "";
    for (let row = 0; row < 11; row++) {
      for (let column = 0; column < 11; column++) {
        const boardRow = 9 - row;
        const boardColumn = column - 1;
        const boardSpaceDiv = document.createElement("div");
        if (column === 0 && row === 10) {
          boardDiv.appendChild(boardSpaceDiv);
        } else if (column === 0) {
          boardSpaceDiv.className = "boardLabel";
          boardSpaceDiv.textContent = boardRow;
          boardDiv.appendChild(boardSpaceDiv);
        } else if (row === 10) {
          boardSpaceDiv.className = "boardLabel";
          boardSpaceDiv.textContent = boardColumn;
          boardDiv.appendChild(boardSpaceDiv);
        } else {
          const space = board[boardRow * 10 + boardColumn];
          if (hideShips && isPlayable && !space.isHit) {
            const boardSpaceBtn = document.createElement("button");
            boardSpaceBtn.dataset.row = boardRow;
            boardSpaceBtn.dataset.column = boardColumn;
            boardSpaceBtn.className = "boardBtn";
            boardDiv.appendChild(boardSpaceBtn);
          } else {
            boardSpaceDiv.className = "boardSpace";
            if ((space.ship && !hideShips) || (space.ship && space.isHit)) {
              boardSpaceDiv.classList.add("ship");
            }
            if (space.isHit) {
              boardSpaceDiv.classList.add("hit");
            }
            boardDiv.appendChild(boardSpaceDiv);
          }
        }
      }
    }
  }

  #handleGamemodeSelect(e) {
    switch (e.target.id) {
      case "botMatchBtn":
        this.#showBotMatchForm();
        break;
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
    let player1Name =
      document.getElementById("player1Name")?.value || "Player 1";
    let player2Name =
      document.getElementById("player2Name")?.value || "Player 2";
    let nBots = 0;

    switch (e.target.id) {
      case "botMatchStart":
        player1Name = document.getElementById("bot1Name").value || "Computer 1";
        player2Name = document.getElementById("bot2Name").value || "Computer 2";
        nBots = 2;
        break;
      case "singlePlayerStart":
        player2Name = "Computer";
        nBots = 1;
        break;
      case "multiPlayerLocalStart":
        break;
      case "multiPlayerOnlineStart":
        //do later maybe?????
        break;
    }

    this.#game = new Game(player1Name, player2Name, nBots);
    this.#showGame();
    this.#game
      .start(this.#updateGameDisplay.bind(this), this.#player1Input)
      .then((winner) => this.#showEndScreen(winner));
  }

  #handleRematch() {
    const gameOverDiv = document.querySelector(".gameOverMenu");
    gameOverDiv.innerHTML = "";
    this.#game.reset();
    this.#game
      .start(this.#updateGameDisplay.bind(this), this.#player1Input)
      .then((winner) => this.#showEndScreen(winner));
  }

  #player1Input() {
    return new Promise((resolve) => {
      const cb = (e) => {
        if (e.target.className === "boardBtn") {
          const row = Number(e.target.dataset.row);
          const column = Number(e.target.dataset.column);
          const location = [row, column];
          resolve(location);
          window.removeEventListener("click", cb);
        }
      };
      window.addEventListener("click", cb);
    });
  }

  #addEventListeners() {
    window.addEventListener("click", (e) => {
      if (e.target.className === "gamemodeBtn") {
        this.#handleGamemodeSelect(e);
      }

      if (e.target.className === "startBtn") {
        this.#handleStartFormSubmit(e);
      }

      if (e.target.className === "rematchBtn") {
        this.#handleRematch();
      }

      if (e.target.className === "newGameBtn") {
        this.#showGamemodeSelect();
      }
    });
  }
}
