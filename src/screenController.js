import Game from "./game";
import Gameboard from "./gameboard";

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
    //  </form>
  }

  #showShipPlacementForm(player) {
    const pageMain = document.querySelector("main");

    const shipPlacementForm = document.createElement("form");
    shipPlacementForm.className = "startForm";
    shipPlacementForm.id = "shipPlacementForm";

    const shipPlacementDiv = document.createElement("div");
    shipPlacementDiv.className = "shipPlacement";

    const shipPlacementPlayerHeader = document.createElement("h2");
    shipPlacementPlayerHeader.innerText = player.name;
    shipPlacementDiv.appendChild(shipPlacementPlayerHeader);

    const shipPlacementHeader = document.createElement("h3");
    shipPlacementHeader.innerText = "Place Your Ships";
    shipPlacementDiv.appendChild(shipPlacementHeader);

    const boardDiv = document.createElement("div");
    boardDiv.className = "board";
    shipPlacementDiv.appendChild(boardDiv);

    shipPlacementForm.appendChild(shipPlacementDiv);

    //start single ship placement form
    const singleShipPlacementForm = document.createElement("form");
    singleShipPlacementForm.className = "singleShipPlacementForm";

    const shipSelectorDiv = document.createElement("div");

    const shipSelectorLabel = document.createElement("label");
    shipSelectorLabel.htmlFor = "ships";
    shipSelectorLabel.innerText = "Ship";
    shipSelectorDiv.appendChild(shipSelectorLabel);

    const shipSelectorBox = document.createElement("select");
    shipSelectorBox.name = "ships";
    shipSelectorBox.id = "ships";

    player.ships.forEach(({ ship }) => {
      const option = document.createElement("option");
      option.value = ship.name;
      option.innerText = ship.name;
      shipSelectorBox.appendChild(option);
    });

    shipSelectorDiv.appendChild(shipSelectorBox);
    singleShipPlacementForm.appendChild(shipSelectorDiv);

    const rowDiv = document.createElement("div");

    const rowLabel = document.createElement("label");
    rowLabel.htmlFor = "row";
    rowLabel.innerText = "Row";
    rowDiv.appendChild(rowLabel);

    const rowInput = document.createElement("input");
    rowInput.type = "number";
    rowInput.name = "row";
    rowInput.id = "row";
    rowInput.min = "0";
    rowInput.max = "9";
    rowInput.value = "0";
    rowDiv.appendChild(rowInput);

    singleShipPlacementForm.appendChild(rowDiv);

    const columnDiv = document.createElement("div");

    const columnLabel = document.createElement("label");
    columnLabel.htmlFor = "column";
    columnLabel.innerText = "Column";
    columnDiv.appendChild(columnLabel);

    const columnInput = document.createElement("input");
    columnInput.type = "number";
    columnInput.name = "column";
    columnInput.id = "column";
    columnInput.min = "0";
    columnInput.max = "9";
    columnInput.value = "0";
    columnDiv.appendChild(columnInput);

    singleShipPlacementForm.appendChild(columnDiv);

    const orientationDiv = document.createElement("div");

    const horizontalLabel = document.createElement("label");
    horizontalLabel.htmlFor = "horizontal";
    horizontalLabel.innerText = "Horizontal ";
    orientationDiv.appendChild(horizontalLabel);

    const horizontalInput = document.createElement("input");
    horizontalInput.type = "radio";
    horizontalInput.name = "orientation";
    horizontalInput.id = "horizontal";
    horizontalInput.value = "horizontal";
    horizontalInput.checked = true;
    orientationDiv.appendChild(horizontalInput);

    const verticalLabel = document.createElement("label");
    verticalLabel.htmlFor = "vertical";
    verticalLabel.innerText = "Vertical ";
    orientationDiv.appendChild(verticalLabel);

    const verticalInput = document.createElement("input");
    verticalInput.type = "radio";
    verticalInput.name = "orientation";
    verticalInput.id = "vertical";
    verticalInput.value = "vertical";
    orientationDiv.appendChild(verticalInput);

    singleShipPlacementForm.appendChild(orientationDiv);

    const singleShipPlacementBtn = document.createElement("button");
    singleShipPlacementBtn.className = "shipPlacementBtn";
    singleShipPlacementBtn.type = "submit";
    singleShipPlacementBtn.innerText = "Place Ship";
    singleShipPlacementBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const shipName = document.getElementById("ships").value;
      const row = Number(document.getElementById("row").value);
      const column = Number(document.getElementById("column").value);
      const isHorizontal = document.getElementById("horizontal").checked;
      if (player.setShipLocation(shipName, [row, column], isHorizontal)) {
        this.#updateShipPlacementDisplay(player);
      }
    });

    singleShipPlacementForm.appendChild(singleShipPlacementBtn);
    shipPlacementForm.appendChild(singleShipPlacementForm);

    //end single ship placement form

    const randomizeShipsBtn = document.createElement("button");
    randomizeShipsBtn.className = "shipPlacementBtn";
    randomizeShipsBtn.type = "button";
    randomizeShipsBtn.innerText = "Randomize Ships";
    randomizeShipsBtn.addEventListener("click", () => {
      player.randomizeShipLocations();
      this.#updateShipPlacementDisplay(player);
    });
    shipPlacementForm.appendChild(randomizeShipsBtn);

    const clearBoardBtn = document.createElement("button");
    clearBoardBtn.className = "shipPlacementBtn";
    clearBoardBtn.type = "button";
    clearBoardBtn.innerText = "Clear Board";
    clearBoardBtn.addEventListener("click", () => {
      player.clearShipLocations();
      this.#updateShipPlacementDisplay(player);
    });
    shipPlacementForm.appendChild(clearBoardBtn);

    const placeShipsBtn = document.createElement("button");
    placeShipsBtn.className = "placeShipsBtn";
    placeShipsBtn.type = "submit";
    placeShipsBtn.innerText = "Confirm Ship Placement";
    placeShipsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (player.placeShipsOnBoard()) {
        this.#startGame();
      }
    });
    shipPlacementForm.appendChild(placeShipsBtn);

    pageMain.innerHTML = "";
    pageMain.appendChild(shipPlacementForm);

    this.#updateShipPlacementDisplay(player);
    //   <form class="startForm" id="shipPlacementForm">
    //     <div class="shipPlacement">
    //       <h2>[PlayerName]</h2>
    //       <h3>Place Your Ships</h3>
    //       <div class="board">
    //       </div>
    //     </div>
    //     <form class="singleShipPlacementForm">
    //       <div>
    //         <label for="ships">Ship</label>
    //         <select name="ships" id="ships">
    //           <option value="Carrier">Carrier</option>
    //           <option value="Battleship">Battleship</option>
    //           <option value="Destroyer">Destroyer</option>
    //           <option value="Submarine">Submarine</option>
    //           <option value="Patrol Boat">Patrol Boat</option>
    //         </select>
    //       </div>
    //       <div>
    //         <label for="row">Row</label>
    //         <input type="number" name="row" id="row" min="0" max="9" />
    //       </div>
    //       <div>
    //         <label for="column">Column</label>
    //         <input type="number" name="column" id="column" min="0" max="9" />
    //       </div>
    //       <div>
    //         <label for="horizontal">Horizontal </label>
    //         <input type="radio" name="orientation" id="horizontal" value="horizontal" />
    //         <label for="vertical">Vertical </label>
    //         <input type="radio" name="orientation" id="vertical" value="vertical" />
    //       </div>
    //       <button class="shipPlacementBtn" type="submit">Place Ship</button>
    //     </form>
    //     <button class="shipPlacementBtn" type="button">Randomize Ships</button>
    //     <button class="shipPlacementBtn" type="button">Clear Board</button>
    //     <button class="placeShipsBtn" type="submit">Confirm Ship Placement</button>
    //  </form>
  }

  #updateShipPlacementDisplay(player) {
    const placementBoard = new Gameboard();
    player.ships.forEach(({ ship, location, isHorizontal }) => {
      if (location) {
        placementBoard.placeShip(ship, location, isHorizontal);
      }
    });
    this.#drawBoard(
      placementBoard.board,
      document.querySelector(".shipPlacement"),
      false,
      false
    );
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

    if (this.#game.gametype === "bots") {
      this.#drawBoard(
        this.#game.player2.board,
        opponentContainer,
        false,
        false
      );
      this.#drawBoard(this.#game.player1.board, playerContainer, false, false);
    } else if (this.#game.gametype === "pvb") {
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
    let gametype = "";

    switch (e.target.id) {
      case "botMatchStart":
        player1Name = document.getElementById("bot1Name").value || "Computer 1";
        player2Name = document.getElementById("bot2Name").value || "Computer 2";
        gametype = "bots";
        break;
      case "singlePlayerStart":
        player2Name = "Computer";
        gametype = "pvb";
        break;
      case "multiPlayerLocalStart":
        gametype = "pvp";
        break;
      case "multiPlayerOnlineStart":
        gametype = "online";
        //do later maybe?????
        break;
    }

    this.#game = new Game(player1Name, player2Name, gametype);
    this.#startGame();
  }

  #handleRematch() {
    this.#game.reset();
    this.#startGame();
  }

  #startGame() {
    if (!this.#game.player1.shipsConfirmed) {
      this.#showShipPlacementForm(this.#game.player1);
      return;
    } else if (!this.#game.player2.shipsConfirmed) {
      this.#showShipPlacementForm(this.#game.player2);
      return;
    }
    this.#showGame();
    this.#game
      .start(
        this.#updateGameDisplay.bind(this),
        this.#playerInput,
        this.#playerInput
      )
      .then((winner) => this.#showEndScreen(winner));
  }

  #playerInput() {
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
