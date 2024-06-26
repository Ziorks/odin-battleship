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
    let vertical = false;

    const updatePreviewBoard = () => {
      this.#drawBoard(player, shipPreviewDiv, false, false);
    };

    const updateShipsContainer = () => {
      shipsContainerDiv.innerHTML = "";
      player.ships.forEach((ship) => {
        if (ship.location) {
          return;
        }

        const dragableShipDiv = document.createElement("div");
        dragableShipDiv.className = "dragableShip";
        if (vertical) {
          dragableShipDiv.classList.add("vertical");
        }

        const grabCb = (e) => {
          const { x, y } = dragableShipDiv.getBoundingClientRect();
          const startX = e.clientX;
          const startY = e.clientY;
          dragableShipDiv.style.position = "absolute";
          dragableShipDiv.style.left = `${x - startX + e.pageX}px`;
          dragableShipDiv.style.top = `${y - startY + e.pageY}px`;

          const moveCb = (e) => {
            const translateX = e.clientX - startX;
            const translateY = e.clientY - startY;
            dragableShipDiv.style.transform = `translate(${translateX}px, ${translateY}px)`;
          };
          const rotateCb = (e) => {
            if (e.key === "r") {
              vertical = !vertical;
              if (vertical) {
                dragableShipDiv.classList.add("vertical");
              } else {
                dragableShipDiv.classList.remove("vertical");
              }
            }
          };
          const dropCb = () => {
            const { width, height, bottom, left } =
              dragableShipDiv.getBoundingClientRect();
            const halfSpaceWidth = vertical ? width / 2 : height / 2;
            const shipX = left + halfSpaceWidth;
            const shipY = bottom - halfSpaceWidth;
            let location = null;

            for (let i = 0; i < boardDiv.childNodes.length; i++) {
              const boardSpace = boardDiv.childNodes[i];
              const { top, bottom, left, right } =
                boardSpace.getBoundingClientRect();
              const gridGapOffset = 1;
              if (
                shipX >= left - gridGapOffset &&
                shipX <= right + gridGapOffset &&
                shipY >= top - gridGapOffset &&
                shipY <= bottom + gridGapOffset &&
                boardSpace.dataset.row
              ) {
                location = [
                  Number(boardSpace.dataset.row),
                  Number(boardSpace.dataset.column),
                ];
                break;
              }
            }

            player.setShipLocation(ship.ship.name, location, !vertical);
            vertical = false;
            dragableShipDiv.remove();
            updatePreviewBoard();
            updateShipsContainer();
            document.body.style.removeProperty("cursor");
            window.removeEventListener("keydown", rotateCb);
            window.removeEventListener("mousemove", moveCb);
            window.removeEventListener("mouseup", dropCb);
          };

          dragableShipDiv.style.cursor = "none";
          document.body.style.cursor = "none";
          window.addEventListener("keydown", rotateCb);
          window.addEventListener("mousemove", moveCb);
          window.addEventListener("mouseup", dropCb);
        };

        dragableShipDiv.addEventListener("mousedown", grabCb);

        for (let i = 0; i < ship.ship.shipLength; i++) {
          const dragableShipSpace = document.createElement("div");
          dragableShipSpace.className = "dragableShipSpace";
          dragableShipDiv.appendChild(dragableShipSpace);
        }

        shipsContainerDiv.appendChild(dragableShipDiv);
      });
    };

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

    const dragAndDropHeader = document.createElement("h4");
    dragAndDropHeader.textContent = "Drag and drop ships onto board.";
    shipPreviewDiv.appendChild(dragAndDropHeader);

    const rotationTip = document.createElement("p");
    rotationTip.textContent = "(Press 'R' while dragging to rotate)";
    shipPreviewDiv.appendChild(rotationTip);

    const shipsContainerDiv = document.createElement("div");
    shipsContainerDiv.className = "shipsContainer";

    shipPreviewDiv.appendChild(shipsContainerDiv);

    const shipPlacementBtnsDiv = document.createElement("div");
    shipPlacementBtnsDiv.className = "shipPlacementBtns";

    const randomizeShipsBtn = document.createElement("button");
    randomizeShipsBtn.type = "button";
    randomizeShipsBtn.innerText = "Randomize Ships";
    randomizeShipsBtn.addEventListener("click", () => {
      player.randomizeShipLocations();
      updatePreviewBoard();
      updateShipsContainer();
    });
    shipPlacementBtnsDiv.appendChild(randomizeShipsBtn);

    const clearBoardBtn = document.createElement("button");
    clearBoardBtn.type = "button";
    clearBoardBtn.innerText = "Clear Board";
    clearBoardBtn.addEventListener("click", () => {
      player.clearShipLocations();
      updatePreviewBoard();
      updateShipsContainer();
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

    updatePreviewBoard();
    updateShipsContainer();
    // <div class="shipPreview">
    //   <h2>[PlayerName]</h2>
    //   <h4>Place Your Ships</h4>
    //   <div class="board"></div>
    //   <h3>Drag and drop ships onto board</h3>
    //   <p>(Press 'R' while dragging to rotate)</p>
    //   <div class="shipContainer">
    //     <div class="dragableShip"></div>
    //     ...
    //     <div class="dragableShip"></div>
    //   </div>
    //   <div class="shipPlacementBtns">
    //     <button type="button">Randomize Ships</button>
    //     <button type="button">Clear Board</button>
    //   </div>
    //   <div class="shipPlacementBtns">
    //     <button type="submit">Confirm Ship Placement</button>
    //   </div>
    // </div>
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

  #showPrivacyScreen(message) {
    const pageMain = document.querySelector("main");

    const privacyDiv = document.createElement("div");
    privacyDiv.className = "privacyScreen";

    const turnHeader = document.createElement("h2");
    turnHeader.textContent = `It's ${this.#game.attackingPlayer.name}'s turn.`;
    privacyDiv.appendChild(turnHeader);

    const instructions = document.createElement("p");
    instructions.textContent = `Make sure ${
      this.#game.receivingPlayer.name
    } isn't looking and press button to continue.`;
    privacyDiv.appendChild(instructions);

    const showGameBtn = document.createElement("button");
    showGameBtn.type = "button";
    showGameBtn.innerText = "Show Game";
    showGameBtn.addEventListener("click", () => {
      this.#showGame();

      const opponentContainer = document.getElementById("opponentContainer");
      const playerContainer = document.getElementById("playerContainer");
      const lastAttackP = document.querySelector(".lastAttack");
      const currentTurnP = document.querySelector(".currentTurn");
      const attacker = this.#game.attackingPlayer;
      const receiver = this.#game.receivingPlayer;

      lastAttackP.innerText = message;
      currentTurnP.innerText = `It's ${attacker.name}'s turn.`;
      opponentContainer.querySelector(".playerName").textContent =
        receiver.name;
      playerContainer.querySelector(".playerName").textContent = attacker.name;
      this.#drawBoard(receiver, opponentContainer, true, true);
      this.#drawBoard(attacker, playerContainer, false, false);
      this.#updateBoardShipsDiv(receiver, opponentContainer);
      this.#updateBoardShipsDiv(attacker, playerContainer);
    });
    privacyDiv.appendChild(showGameBtn);

    pageMain.innerHTML = "";
    pageMain.appendChild(privacyDiv);
  }

  #updateGameDisplay(message = "") {
    //This is ugly and I hate it but it works
    //Refactor this for sure if I update this
    const opponentContainer = document.getElementById("opponentContainer");
    const playerContainer = document.getElementById("playerContainer");
    const lastAttackP = document.querySelector(".lastAttack");
    const currentTurnP = document.querySelector(".currentTurn");

    lastAttackP.innerText = message;
    currentTurnP.innerText = `It's ${this.#game.attackingPlayer.name}'s turn.`;

    if (this.#game.gametype === "bots") {
      opponentContainer.querySelector(".playerName").textContent =
        this.#game.player2.name;
      playerContainer.querySelector(".playerName").textContent =
        this.#game.player1.name;
      this.#updateBoardShipsDiv(this.#game.player2, opponentContainer);
      this.#updateBoardShipsDiv(this.#game.player1, playerContainer);
      this.#drawBoard(this.#game.player2, opponentContainer, false, false);
      this.#drawBoard(this.#game.player1, playerContainer, false, false);
    } else if (this.#game.gametype === "pvb") {
      const isPlayable =
        this.#game.attackingPlayer == this.#game.player1 &&
        !this.#game.isGameOver;
      opponentContainer.querySelector(".playerName").textContent =
        this.#game.player2.name;
      playerContainer.querySelector(".playerName").textContent =
        this.#game.player1.name;
      this.#updateBoardShipsDiv(this.#game.player2, opponentContainer);
      this.#updateBoardShipsDiv(this.#game.player1, playerContainer);
      this.#drawBoard(this.#game.player2, opponentContainer, true, isPlayable);
      this.#drawBoard(this.#game.player1, playerContainer, false, false);
    } else if (this.#game.gametype === "pvp") {
      this.#updateBoardShipsDiv(this.#game.attackingPlayer, opponentContainer);
      this.#drawBoard(
        this.#game.attackingPlayer,
        opponentContainer,
        true,
        false
      );
      if (!this.#game.isGameOver) {
        setTimeout(() => {
          this.#showPrivacyScreen(message);
        }, 2000);
      }
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
            boardSpaceDiv.dataset.row = boardRow;
            boardSpaceDiv.dataset.column = boardColumn;
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

    const welcomeMessage = "Welcome Gamers!";
    if (this.#game.gametype === "pvp") {
      this.#showPrivacyScreen(welcomeMessage);
    } else {
      this.#showGame();
      this.#updateGameDisplay(welcomeMessage);
    }

    this.#game
      .start(this.#updateGameDisplay.bind(this), this.#playerInput)
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
