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
    botMatchBtn.innerText = "Bot vs Bot";
    botMatchBtn.addEventListener("click", () => this.#showBotMatchForm());
    gamemodeDiv.appendChild(botMatchBtn);

    const singlePlayerBtn = document.createElement("button");
    singlePlayerBtn.innerText = "Player vs Bot";
    singlePlayerBtn.addEventListener("click", () =>
      this.#showSinglePlayerForm()
    );
    gamemodeDiv.appendChild(singlePlayerBtn);

    const multiPlayerLocalBtn = document.createElement("button");
    multiPlayerLocalBtn.innerText = "Player vs Player (local)";
    multiPlayerLocalBtn.disabled = true; //disabled until functionality exists
    multiPlayerLocalBtn.addEventListener("click", () =>
      this.#showMultiPlayerLocalForm()
    );
    gamemodeDiv.appendChild(multiPlayerLocalBtn);

    const multiPlayerOnlineBtn = document.createElement("button");
    multiPlayerOnlineBtn.id = "multiPlayerOnlineBtn";
    multiPlayerOnlineBtn.innerText = "Player vs Player (online)";
    multiPlayerOnlineBtn.disabled = true; //disabled until functionality exists
    multiPlayerOnlineBtn.addEventListener("click", () =>
      this.#showMultiPlayerOnlineForm()
    );
    gamemodeDiv.appendChild(multiPlayerOnlineBtn);

    pageMain.innerHTML = "";
    pageMain.appendChild(gamemodeDiv);
    // <div class="gamemode">
    //   <h2>Select a Gamemode</h2>
    //   <button>Bot vs Bot</button>
    //   <button>Player vs Bot</button>
    //   <button>Player vs Player (local)</button>
    //   <button>Player vs Player (online)</button>
    // </div>
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

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "formBtns";

    const startGameBtn = document.createElement("button");
    startGameBtn.className = "startBtn";
    startGameBtn.type = "submit";
    startGameBtn.innerText = "Start Game";
    startGameBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const player1Name = bot1NameInput.value || "Computer 1";
      const player2Name = bot2NameInput.value || "Computer 2";
      this.#game = new Game(player1Name, player2Name, "bots");
      this.#startGame();
    });
    buttonsDiv.appendChild(startGameBtn);

    const backBtn = document.createElement("button");
    backBtn.className = "backBtn";
    backBtn.type = "button";
    backBtn.innerText = "Cancel";
    backBtn.addEventListener("click", () => {
      this.#showGamemodeSelect();
    });
    buttonsDiv.appendChild(backBtn);

    botMatchForm.appendChild(bot1NameDiv);
    botMatchForm.appendChild(bot2NameDiv);
    botMatchForm.appendChild(buttonsDiv);

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
    //   <div class="formBtns">
    //      <button class="startBtn" type="submit">Start Game</button>
    //      <button class="backBtn" type="button">Cancel</button>
    //   </div>
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

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "formBtns";

    const startGameBtn = document.createElement("button");
    startGameBtn.className = "startBtn";
    startGameBtn.type = "submit";
    startGameBtn.innerText = "Start Game";
    startGameBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const player1Name = player1NameInput.value || "Player 1";
      this.#game = new Game(player1Name, "Computer", "pvb");
      this.#startGame();
    });
    buttonsDiv.appendChild(startGameBtn);

    const backBtn = document.createElement("button");
    backBtn.className = "backBtn";
    backBtn.type = "button";
    backBtn.innerText = "Cancel";
    backBtn.addEventListener("click", () => {
      this.#showGamemodeSelect();
    });
    buttonsDiv.appendChild(backBtn);

    singlePlayerForm.appendChild(player1NameDiv);
    singlePlayerForm.appendChild(buttonsDiv);

    pageMain.innerHTML = "";
    pageMain.appendChild(singlePlayerForm);
    // <form class="startForm" id="singlePlayerForm">
    //   <div>
    //     <label for="player1Name">Player Name: </label>
    //     <input
    //       type="text"
    //       name="player1Name"
    //       id="player1Name"
    //       placeholder="Player 1" />
    //   </div>
    //   <div class="formBtns">
    //     <button class="startBtn" type="submit">Start Game</button>
    //     <button class="backBtn" type="button">Cancel</button>
    //   </div>
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

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "formBtns";

    const startGameBtn = document.createElement("button");
    startGameBtn.className = "startBtn";
    startGameBtn.type = "submit";
    startGameBtn.innerText = "Start Game";
    startGameBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const player1Name = player1NameInput.value || "Player 1";
      const player2Name = player2NameInput.value || "Player 2";
      this.#game = new Game(player1Name, player2Name, "pvp");
      this.#startGame();
    });
    buttonsDiv.appendChild(startGameBtn);

    const backBtn = document.createElement("button");
    backBtn.className = "backBtn";
    backBtn.type = "button";
    backBtn.innerText = "Cancel";
    backBtn.addEventListener("click", () => {
      this.#showGamemodeSelect();
    });
    buttonsDiv.appendChild(backBtn);

    multiPlayerLocalForm.appendChild(player1NameDiv);
    multiPlayerLocalForm.appendChild(player2NameDiv);
    multiPlayerLocalForm.appendChild(buttonsDiv);

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
    //   <div class="formBtns">
    //      <button class="startBtn" type="submit">Start Game</button>
    //      <button class="backBtn" type="button">Cancel</button>
    //   </div>
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

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "formBtns";

    const startGameBtn = document.createElement("button");
    startGameBtn.className = "startBtn";
    startGameBtn.type = "submit";
    startGameBtn.innerText = "Find Opponent";
    startGameBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const player1Name = player1NameInput.value || "Player 1";
      const player2Name = null; //get player2Name from online response
      this.#game = new Game(player1Name, player2Name, "online");
      this.#startGame();
    });
    buttonsDiv.appendChild(startGameBtn);

    const backBtn = document.createElement("button");
    backBtn.className = "backBtn";
    backBtn.type = "button";
    backBtn.innerText = "Cancel";
    backBtn.addEventListener("click", () => {
      this.#showGamemodeSelect();
    });
    buttonsDiv.appendChild(backBtn);

    multiPlayerOnlineForm.appendChild(player1NameDiv);
    multiPlayerOnlineForm.appendChild(buttonsDiv);

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
    //   <div class="formBtns">
    //      <button class="startBtn" type="submit">Find Opponent</button>
    //      <button class="backBtn" type="button">Cancel</button>
    //   </div>
    // </form>
  }

  #showShipPlacementForm(player) {
    const pageMain = document.querySelector("main");

    const shipPreviewDiv = document.createElement("div");
    shipPreviewDiv.className = "shipPreview";

    const shipPreviewPlayerHeader = document.createElement("h2");
    shipPreviewPlayerHeader.innerText = player.name;
    shipPreviewDiv.appendChild(shipPreviewPlayerHeader);

    const shipPreviewHeader = document.createElement("h3");
    shipPreviewHeader.innerText = "Place Your Ships";
    shipPreviewDiv.appendChild(shipPreviewHeader);

    const boardDiv = document.createElement("div");
    boardDiv.className = "board";
    shipPreviewDiv.appendChild(boardDiv);

    //start single ship placement form
    const shipPlacementForm = document.createElement("form");
    shipPlacementForm.className = "shipPlacementForm";

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
      option.innerText = `${ship.name}(${ship.shipLength})`;
      shipSelectorBox.appendChild(option);
    });

    shipSelectorDiv.appendChild(shipSelectorBox);
    shipPlacementForm.appendChild(shipSelectorDiv);

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

    shipPlacementForm.appendChild(rowDiv);

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

    shipPlacementForm.appendChild(columnDiv);

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

    shipPlacementForm.appendChild(orientationDiv);

    const singleShipPlacementBtn = document.createElement("button");
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

    shipPlacementForm.appendChild(singleShipPlacementBtn);
    shipPreviewDiv.appendChild(shipPlacementForm);

    //end single ship placement form

    const shipPlacementBtnsDiv = document.createElement("div");
    shipPlacementBtnsDiv.className = "shipPlacementBtns";

    const randomizeShipsBtn = document.createElement("button");
    randomizeShipsBtn.type = "button";
    randomizeShipsBtn.innerText = "Randomize Ships";
    randomizeShipsBtn.addEventListener("click", () => {
      player.randomizeShipLocations();
      this.#updateShipPlacementDisplay(player);
    });
    shipPlacementBtnsDiv.appendChild(randomizeShipsBtn);

    const clearBoardBtn = document.createElement("button");
    clearBoardBtn.type = "button";
    clearBoardBtn.innerText = "Clear Board";
    clearBoardBtn.addEventListener("click", () => {
      player.clearShipLocations();
      this.#updateShipPlacementDisplay(player);
    });
    shipPlacementBtnsDiv.appendChild(clearBoardBtn);

    shipPreviewDiv.appendChild(shipPlacementBtnsDiv);

    const shipsConfirmBtnDiv = document.createElement("div");
    shipsConfirmBtnDiv.className = "shipPlacementBtns";

    const placeShipsBtn = document.createElement("button");
    placeShipsBtn.type = "submit";
    placeShipsBtn.innerText = "Confirm Ship Placement";
    placeShipsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (player.placeShipsOnBoard()) {
        this.#startGame();
      }
    });
    shipsConfirmBtnDiv.appendChild(placeShipsBtn);

    shipPreviewDiv.appendChild(shipsConfirmBtnDiv);

    pageMain.innerHTML = "";
    pageMain.appendChild(shipPreviewDiv);

    this.#updateShipPlacementDisplay(player);
    // <div class="shipPreview">
    //   <h2>[PlayerName]</h2>
    //   <h3>Place Your Ships</h3>
    //   <div class="board"></div>
    //   <form class="shipPlacementForm">
    //     <div>
    //       <label for="ships">Ship</label>
    //       <select name="ships" id="ships">
    //         <option value="Carrier">Carrier(5)</option>
    //         <option value="Battleship">Battleship(4)</option>
    //         <option value="Destroyer">Destroyer(3)</option>
    //         <option value="Submarine">Submarine(3)</option>
    //         <option value="Patrol Boat">Patrol Boat(2)</option>
    //       </select>
    //     </div>
    //     <div>
    //       <label for="row">Row</label>
    //       <input type="number" name="row" id="row" min="0" max="9" />
    //     </div>
    //     <div>
    //       <label for="column">Column</label>
    //       <input type="number" name="column" id="column" min="0" max="9" />
    //     </div>
    //     <div>
    //       <label for="horizontal">Horizontal </label>
    //       <input type="radio" name="orientation" id="horizontal" value="horizontal" />
    //       <label for="vertical">Vertical </label>
    //       <input type="radio" name="orientation" id="vertical" value="vertical" />
    //     </div>
    //     <button type="submit">Place Ship</button>
    //   </form>
    //   <div class="shipPlacementBtns">
    //     <button type="button">Randomize Ships</button>
    //     <button type="button">Clear Board</button>
    //   </div>
    //   <div class="shipPlacementBtns">
    //     <button type="submit">Confirm Ship Placement</button>
    //   </div>
    // </div>
  }

  #updateShipPlacementDisplay(player) {
    this.#drawBoard(
      player,
      document.querySelector(".shipPreview"),
      false,
      false
    );
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

    const opponentShipsDiv = document.createElement("div");
    opponentShipsDiv.className = "boardShips";
    opponentContainer.appendChild(opponentShipsDiv);

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

    const playerContainer = document.createElement("div");
    playerContainer.className = "playerContainer";
    playerContainer.id = "playerContainer";

    const playerBoardDiv = document.createElement("div");
    playerBoardDiv.className = "board";
    playerContainer.appendChild(playerBoardDiv);

    const playerShipsDiv = document.createElement("div");
    playerShipsDiv.className = "boardShips";
    playerContainer.appendChild(playerShipsDiv);

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
    //   <div class="playerContainer" id="playerContainer">
    //     <div class="board"></div>
    //     <h2 class="playerName"></h2>
    //   </div>
    // </div>
  }

  #showEndScreen(winner) {
    const currentTurnP = document.querySelector(".currentTurn");
    currentTurnP.innerText = winner;

    const gameOverDiv = document.createElement("div");
    gameOverDiv.className = "gameOverMenu";

    const rematchBtn = document.createElement("button");
    rematchBtn.className = "endGameBtn";
    rematchBtn.innerText = "Rematch";
    rematchBtn.addEventListener("click", () => this.#handleRematch());
    gameOverDiv.appendChild(rematchBtn);

    const newGameBtn = document.createElement("button");
    newGameBtn.className = "endGameBtn";
    newGameBtn.innerText = "New Game";
    newGameBtn.addEventListener("click", () => this.#showGamemodeSelect());
    gameOverDiv.appendChild(newGameBtn);

    currentTurnP.insertAdjacentElement("afterend", gameOverDiv);
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

    this.#updateBoardShipsDiv(this.#game.player2, opponentContainer);
    this.#updateBoardShipsDiv(this.#game.player1, playerContainer);

    if (this.#game.gametype === "bots") {
      this.#drawBoard(this.#game.player2, opponentContainer, false, false);
      this.#drawBoard(this.#game.player1, playerContainer, false, false);
    } else if (this.#game.gametype === "pvb") {
      const isPlayable = this.#game.attackingPlayer == this.#game.player1;
      this.#drawBoard(this.#game.player2, opponentContainer, true, isPlayable);
      this.#drawBoard(this.#game.player1, playerContainer, false, false);
    }
  }

  #drawBoard(player, container, hideShips, isPlayable) {
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
          const space = player.board[boardRow * 10 + boardColumn];
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

  #updateBoardShipsDiv(player, container) {
    const boardShipsDiv = container.querySelector(".boardShips");
    boardShipsDiv.innerHTML = "";

    const boardShipsHeader = document.createElement("h3");
    boardShipsHeader.textContent = "Remaining Ships";

    boardShipsDiv.appendChild(boardShipsHeader);

    const boardShipNamesDiv = document.createElement("div");
    boardShipNamesDiv.className = "boardShipNames";

    player.ships.forEach(({ ship }) => {
      if (ship.isSunk()) {
        return;
      }
      const shipSpan = document.createElement("p");
      shipSpan.innerText = `${ship.name}(${ship.shipLength})`;
      boardShipNamesDiv.appendChild(shipSpan);
    });

    boardShipsDiv.appendChild(boardShipNamesDiv);
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
}
