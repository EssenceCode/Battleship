/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/module/board/board.js":
/*!***********************************!*\
  !*** ./src/module/board/board.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameBoard)
/* harmony export */ });
/* harmony import */ var _ship_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ship/ship */ "./src/module/ship/ship.js");
/* harmony import */ var _helper_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/helper */ "./src/module/helper/helper.js");


function GameBoard() {
  const ocean = Array.from({
    length: 10
  }, () => Array(10).fill(false));
  const shipAttacks = Array.from({
    length: 10
  }, () => Array(10).fill(false));
  const dock = [];
  const createShip = (name, length) => {
    const ship = (0,_ship_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(name, length);
    dock.push(ship);
    return ship;
  };
  const placeShip = function (vessel, row, col, dir) {
    let oceanBoard = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ocean;
    const board = oceanBoard;
    const ship = vessel;
    if ((0,_helper_helper__WEBPACK_IMPORTED_MODULE_1__["default"])(ship, row, col, dir, board)) {
      for (let i = 0; i < ship.length; i += 1) {
        if (dir === "horizontal") {
          board[row][col + i] = ship;
        }
        ;
        if (dir === "vertical") {
          board[row + i][col] = ship;
        }
        ;
      }
      ;
      return true;
    }
    ;
    return false;
  };
  const receivedAtk = function (row, col) {
    let oceanBoard = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ocean;
    const board = oceanBoard;
    if (shipAttacks[row][col] === false && board[row][col] !== false) {
      board[row][col].hit();
      shipAttacks[row][col] = true;
      return true;
    }
    ;
    shipAttacks[row][col] = true;
    return false;
  };
  const shipWrecks = function () {
    let ships = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : dock;
    const shipGrave = [];
    for (let i = 0; i < ships.length; i += 1) {
      if (ships[i].isSunk() === true || ships[i].isSunk() === false) {
        shipGrave.push(ships[i].isSunk());
      }
      ;
    }
    ;
    return shipGrave.every(shipSunk => shipSunk === true);
  };
  return Object.freeze({
    get ocean() {
      return ocean;
    },
    get shipAttacks() {
      return shipAttacks;
    },
    get dock() {
      return dock;
    },
    createShip,
    placeShip,
    receivedAtk,
    shipWrecks
  });
}
;

/***/ }),

/***/ "./src/module/dom/board-player/board-player.js":
/*!*****************************************************!*\
  !*** ./src/module/dom/board-player/board-player.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createGame)
/* harmony export */ });
const createBoard = option => {
  // player container
  const playerOneContainer = document.querySelector(".p1-container");
  const playerTwoContainer = document.querySelector(".p2-container");
  // player board container
  const boardOneContainer = document.querySelector(".human-board");
  const boardTwoContainer = document.querySelector(".computer-board");
  option[0].board.ocean.map((row, rowIndex) => {
    row.map((col, colIndex) => {
      const colCell = document.createElement("button");
      colCell.className = "cell";
      colCell.setAttribute("data-row", rowIndex);
      colCell.setAttribute("data-col", colIndex);
      colCell.classList.add("cell-human");
      colCell.classList.add("drop-target");
      return boardOneContainer.appendChild(colCell);
    });
    return playerOneContainer.appendChild(boardOneContainer);
  });
  option[1].board.ocean.map((row, rowIndex) => {
    row.map((col, colIndex) => {
      const colCell = document.createElement("button");
      colCell.className = "cell";
      colCell.setAttribute("data-row", rowIndex);
      colCell.setAttribute("data-col", colIndex);
      colCell.classList.add("cell-computer");
      return boardTwoContainer.appendChild(colCell);
    });
    return playerTwoContainer.appendChild(boardTwoContainer);
  });
};
function createGame(option, div) {
  // form
  const container = div;
  // const placeShipBtn = button;

  const formContainer = document.querySelector(".form-container");
  const name = document.querySelector("#player-name");
  const start = document.querySelector("#start");
  // player container
  const playerOneContainer = document.querySelector(".p1-container");
  const playerTwoContainer = document.querySelector(".p2-container");
  // name container
  const playerOneNameContainer = document.createElement("div");
  const playerTwoNameContainer = document.createElement("div");
  // name paragraph
  const p1Name = document.createElement("p");
  const p2Name = document.createElement("p");
  // player name class
  p1Name.classList.add("player-name");
  p2Name.classList.add("player-name");
  start.addEventListener("click", e => {
    e.preventDefault();
    const changeName = option[0];
    if (name.value !== "") {
      changeName.name = name.value;
    }
    ;
    p1Name.textContent = `Commander ${option[0].name}`;
    p2Name.textContent = `Commander ${option[1].name}`;
    playerOneNameContainer.appendChild(p1Name);
    playerTwoNameContainer.appendChild(p2Name);
    playerOneContainer.appendChild(playerOneNameContainer);
    playerTwoContainer.appendChild(playerTwoNameContainer);
    container.appendChild(playerOneContainer);
    container.appendChild(playerTwoContainer);
    formContainer.style.display = "none";
    container.style.display = "grid";
    createBoard(option);
    return true;
  });
}
;

/***/ }),

/***/ "./src/module/dom/dom-controller.js":
/*!******************************************!*\
  !*** ./src/module/dom/dom-controller.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomController)
/* harmony export */ });
/* harmony import */ var _game_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game/game */ "./src/module/game/game.js");
/* harmony import */ var _board_player_board_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board-player/board-player */ "./src/module/dom/board-player/board-player.js");
/* harmony import */ var _ship_portage_ship_portage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship-portage/ship-portage */ "./src/module/dom/ship-portage/ship-portage.js");
/* harmony import */ var _dom_state_dom_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom-state/dom-state */ "./src/module/dom/dom-state/dom-state.js");




function DomController() {
  const container = document.querySelector(".game-container");
  const placeShipBtn = document.querySelector(".place-ship");
  const game = (0,_game_game__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const createPlayerAndBoard = () => (0,_board_player_board_player__WEBPACK_IMPORTED_MODULE_1__["default"])(game.players, container);
  const placeShip = () => (0,_ship_portage_ship_portage__WEBPACK_IMPORTED_MODULE_2__["default"])(game, placeShipBtn);
  const boardEvent = () => (0,_dom_state_dom_state__WEBPACK_IMPORTED_MODULE_3__["default"])(game);
  return Object.freeze({
    createPlayerAndBoard,
    placeShip,
    boardEvent
  });
}
;

/***/ }),

/***/ "./src/module/dom/dom-state/dom-state.js":
/*!***********************************************!*\
  !*** ./src/module/dom/dom-state/dom-state.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomState)
/* harmony export */ });
const gameOver = option => {
  const winContainer = document.querySelector(".winner");
  if (!option.isSunkAll()) return false;
  const p = document.createElement("p");
  let winner;
  winner = option.getActivePlayer().name === option.players[0].name ? winner = option.players[1].name : winner = option.players[0].name;
  p.textContent = `Winner: ${winner}`;
  winContainer.appendChild(p);
  return true;
};
const updateScreen = option => {
  // human board
  option[0].board.shipAttacks.map((row, rowIndex) => row.map((col, colIndex) => {
    if (col !== false) {
      const cell = document.querySelector(`.cell-human[data-row="${rowIndex}"][data-col="${colIndex}"]`);
      if (!cell.classList.contains("hit") && !cell.classList.contains("ship")) {
        cell.classList.add("hit");
      }
      ;
      if (cell.classList.contains("ship")) {
        cell.textContent = "hit";
        cell.classList.add("sink");
        return cell;
      }
      ;
      cell.textContent = "miss";
      return cell;
    }
    ;
    return false;
  }));

  // computer board
  option[1].board.shipAttacks.map((row, rowIndex) => row.map((col, colIndex) => {
    if (col === true) {
      const cell = document.querySelector(`.cell-computer[data-row="${rowIndex}"][data-col="${colIndex}"]`);
      if (!cell.classList.contains("hit") && !cell.classList.contains("ship-computer")) {
        cell.classList.add("hit");
        cell.textContent = "miss";
        return cell;
      }
      ;
      if (cell.classList.contains("ship-computer")) {
        cell.textContent = "sink";
        cell.classList.add("sink");
        return cell;
      }
      ;
      return true;
    }
    ;
    return false;
  }));
};
const playLogic = async (e, option) => {
  const {
    row
  } = e.target.dataset;
  const {
    col
  } = e.target.dataset;

  // let playerCreationDon = false;
  try {
    if (option.isSunkAll()) return false;
    if (row !== undefined && col !== undefined) {
      if (e.target.classList.contains("hit") || e.target.classList.contains("boards")) {
        // errorMessage.textContent = "";
        return false;
      }
      ;
      const parent = e.target.parentNode;
      const children = parent.childNodes;
      // disable pointer
      children.forEach(val => {
        const child = val;
        child.style.pointerEvents = "none";
      });
      await option.humanInput(+row, +col).then(() => {
        updateScreen(option.players);
      });
      await option.computerInput().then(() => {
        updateScreen(option.players);
        // enable pointer
        children.forEach(val => {
          const child = val;
          child.style.pointerEvents = "auto";
        });
      });
      return option;
    }
    ;
    const error = Error("you clicked the board frame");
    throw error;
  } catch (error) {
    return error;
  }
  ;
};
function DomState(option) {
  const board = document.querySelector(".computer-board");
  board.addEventListener("click", e => {
    playLogic(e, option).then(data => {
      // check if game is over

      if (data === false || typeof data.isSunkAll !== "function") return null;
      if (data.isSunkAll()) return gameOver(option);

      // return otherwise
      return null;
    });
  });
  return true;
}
;

/***/ }),

/***/ "./src/module/dom/ship-portage/ship-portage.js":
/*!*****************************************************!*\
  !*** ./src/module/dom/ship-portage/ship-portage.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ placeShip)
/* harmony export */ });
/* harmony import */ var _helper_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/helper */ "./src/module/helper/helper.js");

const renderShips = option => {
  option[0].board.ocean.map((row, rowIndex) => {
    row.map((col, colIndex) => {
      const ship = document.querySelector(`.cell-human[data-row="${rowIndex}"][data-col="${colIndex}"]`);
      if (col !== false) {
        ship.classList.add("ship");
      }
      ;
      return null;
    });
    return null;
  });
  option[1].board.ocean.map((row, rowIndex) => {
    row.map((col, colIndex) => {
      const ship = document.querySelector(`.cell-computer[data-row="${rowIndex}"][data-col="${colIndex}"]`);
      if (col !== false) {
        ship.classList.add("ship-computer");
      }
      return null;
    });
    return null;
  });
};
function placeShip(option, button) {
  const direction = document.querySelector(".direction");
  const placeShipBtn = button;
  const start = document.querySelector(".place-ship");
  const posAvailable = (ship, row, col, dir, board) => (0,_helper_helper__WEBPACK_IMPORTED_MODULE_0__["default"])().posAvailable(ship, row, col, dir, board);
  placeShipBtn.addEventListener("click", () => {
    placeShipBtn.style.display = "none";
    const ships = document.querySelectorAll(".cell-computer");
    ships.forEach(val => {
      const ship = val;
      ship.style.pointerEvents = "auto";
    });
    // place computer ship;
    option.players[1].placeShip();
    renderShips(option.players);
  });
  let dragged = null;
  const source = document.querySelector(".dock");
  const dir = document.querySelector("#dir-select");
  dir.addEventListener("click", e => {
    const parent = document.querySelector(".dock");
    const child = parent.children;
    const horizontalPos = ["carrier-horizontal-height", "battleship-horizontal-height", "cruiser-submarine-horizontal-height", "cruiser-submarine-horizontal-height", "destroyer-horizontal-height"];
    if (e.target.value === "horizontal") {
      parent.classList.remove("vertical-dock");
      parent.classList.add("horizontal-dock");
      Array.from(child).map((val, index) => {
        if (typeof val.classList === "undefined") return false;
        if (val.classList.contains(horizontalPos[index])) return false;
        return child[index].classList.add(horizontalPos[index]);
      });
      return true;
    }
    ;
    if (e.target.value === "vertical") {
      parent.classList.add("vertical-dock");
      parent.classList.remove("horizontal-dock");
      Array.from(child).map((val, index) => {
        if (typeof val.classList === "undefined") return false;
        if (!val.classList.contains(horizontalPos[index])) return false;
        return child[index].classList.remove(horizontalPos[index]);
      });
      return true;
    }
    ;
    return false;
  });
  source.addEventListener("dragstart", e => {
    const parent = e.target.parentNode;
    const children = parent.childNodes;
    const selectedChild = Array.from(children).filter(val => {
      if (typeof val.classList !== "undefined") {
        return val.dataset.name === e.target.dataset.name;
      }
      ;
      return false;
    });
    dragged = selectedChild;
  });
  const target = document.querySelector(".human-board");
  target.addEventListener("dragover", e => {
    // prevent default to allow drop
    e.preventDefault();
  }, false);
  target.addEventListener("dragenter", () => {});
  target.addEventListener("dragleave", () => {});
  target.addEventListener("drop", e => {
    const parent = dragged[0].parentNode;
    const child = dragged[0];
    const {
      row
    } = e.target.dataset;
    const {
      col
    } = e.target.dataset;
    const {
      index
    } = dragged[0].dataset;
    const ship = option.players[0].dock[+index];
    if (!posAvailable(ship, +row, +col, dir.value, option.players[0].board.ocean)) return false;
    option.players[0].placeShip(ship, +row, +col, dir.value);
    parent.removeChild(child);
    if (parent.children.length === 0) {
      start.classList.remove("hide-btn");
      start.classList.add("show");
      direction.style.display = "none";
    }
    ;
    return renderShips(option.players);
  });
}
;

/***/ }),

/***/ "./src/module/game/game.js":
/*!*********************************!*\
  !*** ./src/module/game/game.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _board_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../board/board */ "./src/module/board/board.js");
/* harmony import */ var _player_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../player/player */ "./src/module/player/player.js");
/* harmony import */ var _helper_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/helper */ "./src/module/helper/helper.js");



function Game() {
  let isGameStarted = false;
  let currentPlayer;
  const players = [];
  const boards = [];
  const wait = ms => (0,_helper_helper__WEBPACK_IMPORTED_MODULE_2__["default"])().wait(ms);

  // initialized boards and players
  if (isGameStarted === false) {
    boards.push((0,_board_board__WEBPACK_IMPORTED_MODULE_0__["default"])());
    boards.push((0,_board_board__WEBPACK_IMPORTED_MODULE_0__["default"])());
    players.push((0,_player_player__WEBPACK_IMPORTED_MODULE_1__["default"])("human", boards[0], boards[1]));
    players.push((0,_player_player__WEBPACK_IMPORTED_MODULE_1__["default"])("computer", boards[1], boards[0], true));
    players[0].createAllShips();
    players[1].createAllShips();
    currentPlayer = {
      ...players[0]
    };
    isGameStarted = true;
  }
  ;
  const getActivePlayer = () => currentPlayer;
  const isSunkAll = function () {
    let player = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getActivePlayer();
    return player.board.shipWrecks();
  };
  const switchPlayer = () => {
    if (currentPlayer.name === players[0].name) {
      currentPlayer = {
        ...players[1]
      };
      return currentPlayer;
    }
    ;
    currentPlayer = {
      ...players[0]
    };
    return currentPlayer;
  };
  const humanInput = async (row, col) => {
    await wait(1000);
    players[0].atkEnemy(row, col);
    switchPlayer();
    return true;
  };
  const computerInput = async () => {
    if (isSunkAll()) return false;
    await wait(3000);
    players[1].atkEnemy();
    switchPlayer();
    return true;
  };
  return Object.freeze({
    get players() {
      return players;
    },
    getActivePlayer,
    switchPlayer,
    isSunkAll,
    humanInput,
    computerInput
  });
}
;

/***/ }),

/***/ "./src/module/helper/helper.js":
/*!*************************************!*\
  !*** ./src/module/helper/helper.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Helper)
/* harmony export */ });
function Helper() {
  const posAvailable = (ship, row, col, dir, board) => {
    const array = [];
    for (let i = 0; i < ship.length; i += 1) {
      if (dir === "horizontal") {
        if (col + i > 9) return false;
        array.push(board[row][col + i]);
      }
      ;
      if (dir === "vertical") {
        if (row + i > 9) return false;
        array.push(board[row + i][col]);
      }
      ;
    }
    ;
    return array.every(cell => cell === false);
  };
  const wait = ms => new Promise(resolve => {
    setTimeout(resolve, ms);
  });
  const legalMoves = ocean => {
    const legalAttacks = [];
    for (let i = 0; i < ocean.shipAttacks.length; i += 1) {
      for (let j = 0; j < ocean.shipAttacks[i].length; j += 1) {
        if (ocean.shipAttacks[i][j] === false) {
          legalAttacks.push([i, j]);
        }
        ;
      }
      ;
    }
    ;
    return legalAttacks;
  };
  return {
    posAvailable,
    wait,
    legalMoves
  };
}
;

/***/ }),

/***/ "./src/module/player/player.js":
/*!*************************************!*\
  !*** ./src/module/player/player.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _helper_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/helper */ "./src/module/helper/helper.js");

function Player(name, board, enemyBoard) {
  let isComputer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  const isAi = isComputer;
  let playerName = name;
  const ocean = board;
  const helper = (0,_helper_helper__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const legalAttacks = helper.legalMoves(ocean);
  const shipBluePrints = [{
    name: "carrier",
    length: 5
  }, {
    name: "battleship",
    length: 4
  }, {
    name: "cruiser",
    length: 3
  }, {
    name: "submarine",
    length: 3
  }, {
    name: "destroyer",
    length: 2
  }];
  const {
    dock
  } = ocean;
  const createAllShips = () => {
    for (let i = 0; i < shipBluePrints.length; i += 1) {
      ocean.createShip(shipBluePrints[i].name, shipBluePrints[i].length);
    }
    ;
    return true;
  };
  const placeShip = (ship, row, col, dir) => {
    if (isAi) {
      const queue = [...ocean.dock];
      while (queue.length !== 0) {
        const currentShip = queue[0];
        const randomRow = Math.floor(Math.random() * 9);
        const randomCol = Math.floor(Math.random() * 9);
        const direction = ["horizontal", "vertical"];
        const randomDir = Math.floor(Math.random() * direction.length);
        if (helper.posAvailable(currentShip, randomRow, randomCol, direction[randomDir], ocean.ocean)) {
          ocean.placeShip(currentShip, randomRow, randomCol, direction[randomDir]);
          queue.shift();
        }
        ;
      }
      ;
      return true;
    }
    ;
    return ocean.placeShip(ship, row, col, dir);
  };
  const atkEnemy = (row, col) => {
    if (Number.isInteger(row) && Number.isInteger(col) && enemyBoard.shipAttacks[row][col] === true) return false;
    if (isAi) {
      const availableIndex = legalAttacks.filter(val => enemyBoard.shipAttacks[val[0]][val[1]] !== true);
      const choice = availableIndex[Math.floor(Math.random() * availableIndex.length)];
      enemyBoard.receivedAtk(choice[0], choice[1]);
      return true;
    }
    ;
    enemyBoard.receivedAtk(row, col);
    return true;
  };
  return Object.freeze({
    get name() {
      return playerName;
    },
    set name(val) {
      playerName = val;
    },
    get board() {
      return ocean;
    },
    get dock() {
      return dock;
    },
    atkEnemy,
    createAllShips,
    placeShip
  });
}
;

/***/ }),

/***/ "./src/module/ship/ship.js":
/*!*********************************!*\
  !*** ./src/module/ship/ship.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
function Ship(name, length) {
  let health = 0;
  const hit = () => {
    health += 1;
    return true;
  };
  const resetHealth = () => {
    health = 0;
    return health;
  };
  const isSunk = () => {
    if (health === length) return true;
    return false;
  };
  return Object.freeze({
    get name() {
      return name;
    },
    get length() {
      return length;
    },
    hit,
    resetHealth,
    isSunk
  });
}
;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `*{
    margin: 0;
    padding: 0;
}


.form-container {
    display: grid;
    place-content: center;
    justify-content: center;
    margin-top: 20px;
}

form {
    height: 250px;
    margin: 10px;
    padding: 10px;
    display: grid;
    place-items: center;
    text-align: center;
}

form > button, .place-ship {
    width: 4rem;
    height: 2rem;
    background-color: white;
    color: black;
    border: 1px solid red;
}

form > button:hover, .place-ship:hover {
    background-color: red;
    color: white;
} 

.game-container {
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
   place-content: center;
   place-items: center;
   margin-top: 10px;
   
}

.game-container {
    display: none;
}

.p1-container {
    grid-column: 1;
}

.announcement {
    grid-column: 2;
}

.p2-container {
    grid-column: 3;
}

.p1-container, .p2-container {
    display: grid;
    gap: 10px;
}

.boards {
    display: grid;
    width: 500px;
    height: 500px;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
}

.ship-placement{
    display: flex;
    justify-content: center;
    gap: 10px;
}

.vertical-dock {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100px;
    gap: 10px;
}

.horizontal-dock {
    display: grid;
    gap: 10px;
}

/* .vertical-dock {
    border: 1px solid black;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(100px, 150px));
    width: 50px;
} */

.battleship-vertical-height {
    height: 199px;
   
}

.cruiser-submarine-vertical-height {
    height: 150px;
   
}

.destroyer-vertical-height {
    height: 100px;
}

/*  */
.carrier-horizontal-height {
    display: flex;
    width: auto;
    height: 50px;
    gap: 1.5px;
}

.battleship-horizontal-height {
    display: flex;
    width: 190px;
    height: 50px;
    gap: 1.5px;
}

.cruiser-submarine-horizontal-height {
    display: flex;
    width: 150px;
    height: 50px;
    gap: 1.5px;
}

.destroyer-horizontal-height {
    display: flex;
    width: 100px;
    height: 50px;
    gap: 1.5px;
}


.shipment {
    height: 50px;
    width: 50px;
    border: 1px solid black;
    background: blue;
}

.shipment-valid {
    background-color: green;
}

.shipment-invalid {
    background-color: red;
}


.cell-computer {
    pointer-events: none
}

.cell-human, .cell-computer  {
    /* background-color: aliceblue; */
    background: thistle;
    border: 1px solid white;
}

.hide-btn, .create-ship {
    display: none;
}

.ship {
    background-color: blue;
}

.hit {
    background-color: blanchedalmond;
}

.sink {
    background-color: red;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,UAAU;AACd;;;AAGA;IACI,aAAa;IACb,qBAAqB;IACrB,uBAAuB;IACvB,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,aAAa;IACb,aAAa;IACb,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,uBAAuB;IACvB,YAAY;IACZ,qBAAqB;AACzB;;AAEA;IACI,qBAAqB;IACrB,YAAY;AAChB;;AAEA;GACG,aAAa;GACb,kCAAkC;GAClC,qBAAqB;GACrB,mBAAmB;GACnB,gBAAgB;;AAEnB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,SAAS;AACb;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,aAAa;IACb,sCAAsC;IACtC,mCAAmC;AACvC;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,SAAS;AACb;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,YAAY;IACZ,SAAS;AACb;;AAEA;IACI,aAAa;IACb,SAAS;AACb;;AAEA;;;;;GAKG;;AAEH;IACI,aAAa;;AAEjB;;AAEA;IACI,aAAa;;AAEjB;;AAEA;IACI,aAAa;AACjB;;AAEA,KAAK;AACL;IACI,aAAa;IACb,WAAW;IACX,YAAY;IACZ,UAAU;AACd;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,YAAY;IACZ,UAAU;AACd;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,YAAY;IACZ,UAAU;AACd;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,YAAY;IACZ,UAAU;AACd;;;AAGA;IACI,YAAY;IACZ,WAAW;IACX,uBAAuB;IACvB,gBAAgB;AACpB;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,qBAAqB;AACzB;;;AAGA;IACI;AACJ;;AAEA;IACI,iCAAiC;IACjC,mBAAmB;IACnB,uBAAuB;AAC3B;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,gCAAgC;AACpC;;AAEA;IACI,qBAAqB;AACzB","sourcesContent":["*{\n    margin: 0;\n    padding: 0;\n}\n\n\n.form-container {\n    display: grid;\n    place-content: center;\n    justify-content: center;\n    margin-top: 20px;\n}\n\nform {\n    height: 250px;\n    margin: 10px;\n    padding: 10px;\n    display: grid;\n    place-items: center;\n    text-align: center;\n}\n\nform > button, .place-ship {\n    width: 4rem;\n    height: 2rem;\n    background-color: white;\n    color: black;\n    border: 1px solid red;\n}\n\nform > button:hover, .place-ship:hover {\n    background-color: red;\n    color: white;\n} \n\n.game-container {\n   display: grid;\n   grid-template-columns: 1fr 1fr 1fr;\n   place-content: center;\n   place-items: center;\n   margin-top: 10px;\n   \n}\n\n.game-container {\n    display: none;\n}\n\n.p1-container {\n    grid-column: 1;\n}\n\n.announcement {\n    grid-column: 2;\n}\n\n.p2-container {\n    grid-column: 3;\n}\n\n.p1-container, .p2-container {\n    display: grid;\n    gap: 10px;\n}\n\n.boards {\n    display: grid;\n    width: 500px;\n    height: 500px;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n}\n\n.ship-placement{\n    display: flex;\n    justify-content: center;\n    gap: 10px;\n}\n\n.vertical-dock {\n    display: grid;\n    grid-template-columns: repeat(5, 1fr);\n    width: 100px;\n    gap: 10px;\n}\n\n.horizontal-dock {\n    display: grid;\n    gap: 10px;\n}\n\n/* .vertical-dock {\n    border: 1px solid black;\n    display: grid;\n    grid-template-columns: repeat(auto-fit,minmax(100px, 150px));\n    width: 50px;\n} */\n\n.battleship-vertical-height {\n    height: 199px;\n   \n}\n\n.cruiser-submarine-vertical-height {\n    height: 150px;\n   \n}\n\n.destroyer-vertical-height {\n    height: 100px;\n}\n\n/*  */\n.carrier-horizontal-height {\n    display: flex;\n    width: auto;\n    height: 50px;\n    gap: 1.5px;\n}\n\n.battleship-horizontal-height {\n    display: flex;\n    width: 190px;\n    height: 50px;\n    gap: 1.5px;\n}\n\n.cruiser-submarine-horizontal-height {\n    display: flex;\n    width: 150px;\n    height: 50px;\n    gap: 1.5px;\n}\n\n.destroyer-horizontal-height {\n    display: flex;\n    width: 100px;\n    height: 50px;\n    gap: 1.5px;\n}\n\n\n.shipment {\n    height: 50px;\n    width: 50px;\n    border: 1px solid black;\n    background: blue;\n}\n\n.shipment-valid {\n    background-color: green;\n}\n\n.shipment-invalid {\n    background-color: red;\n}\n\n\n.cell-computer {\n    pointer-events: none\n}\n\n.cell-human, .cell-computer  {\n    /* background-color: aliceblue; */\n    background: thistle;\n    border: 1px solid white;\n}\n\n.hide-btn, .create-ship {\n    display: none;\n}\n\n.ship {\n    background-color: blue;\n}\n\n.hit {\n    background-color: blanchedalmond;\n}\n\n.sink {\n    background-color: red;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module_dom_dom_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/dom/dom-controller */ "./src/module/dom/dom-controller.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");


const dom = (0,_module_dom_dom_controller__WEBPACK_IMPORTED_MODULE_0__["default"])();
dom.createPlayerAndBoard();
dom.placeShip();
dom.boardEvent();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUMsT0FBTyxnRkFBZ0YsVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsY0FBYyxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE1B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Q0E7QUFDQTtBQUNBOzs7Ozs7VUNiQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7OztBQ0F1RDtBQUVsQztBQUVyQixNQUFNZ0ksR0FBRyxHQUFHckYsc0VBQWEsQ0FBQyxDQUFDO0FBQzNCcUYsR0FBRyxDQUFDbEYsb0JBQW9CLENBQUMsQ0FBQztBQUMxQmtGLEdBQUcsQ0FBQy9JLFNBQVMsQ0FBQyxDQUFDO0FBQ2YrSSxHQUFHLENBQUNoRixVQUFVLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGUvYm9hcmQvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGUvZG9tL2JvYXJkLXBsYXllci9ib2FyZC1wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGUvZG9tL2RvbS1jb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlL2RvbS9kb20tc3RhdGUvZG9tLXN0YXRlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlL2RvbS9zaGlwLXBvcnRhZ2Uvc2hpcC1wb3J0YWdlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlL2dhbWUvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZS9oZWxwZXIvaGVscGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlL3BsYXllci9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGUvc2hpcC9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLi4vc2hpcC9zaGlwXCI7XG5pbXBvcnQgcG9zQXZhaWxhYmxlIGZyb20gXCIuLi9oZWxwZXIvaGVscGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdhbWVCb2FyZCgpIHtcbiAgICBjb25zdCBvY2VhbiA9IEFycmF5LmZyb20oe2xlbmd0aDogMTB9LCAoKSA9PiBBcnJheSgxMCkuZmlsbChmYWxzZSkpO1xuXG4gICAgY29uc3Qgc2hpcEF0dGFja3MgPSBBcnJheS5mcm9tKHtsZW5ndGg6IDEwfSwgKCkgPT4gQXJyYXkoMTApLmZpbGwoZmFsc2UpKTtcblxuICAgIGNvbnN0IGRvY2sgPSBbXTtcblxuICAgIGNvbnN0IGNyZWF0ZVNoaXAgPSAobmFtZSwgbGVuZ3RoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNoaXAgPSBTaGlwKG5hbWUsIGxlbmd0aCk7XG5cbiAgICAgICAgZG9jay5wdXNoKHNoaXApXG5cbiAgICAgICAgcmV0dXJuIHNoaXA7XG4gICAgfTsgXG5cbiAgICBjb25zdCBwbGFjZVNoaXAgPSAodmVzc2VsLCByb3csIGNvbCwgZGlyLCBvY2VhbkJvYXJkID0gb2NlYW4pID0+IHtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBvY2VhbkJvYXJkO1xuICAgICAgICBjb25zdCBzaGlwID0gdmVzc2VsXG5cbiAgICAgICAgaWYocG9zQXZhaWxhYmxlKHNoaXAsIHJvdywgY29sLCBkaXIsIGJvYXJkKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYoZGlyID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgICAgICAgICAgICBib2FyZFtyb3ddW2NvbCArIGldID0gc2hpcDtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYoZGlyID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgYm9hcmRbcm93ICsgaV1bY29sXSA9IHNoaXA7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfTtcblxuICAgIGNvbnN0IHJlY2VpdmVkQXRrID0gKHJvdywgY29sLCBvY2VhbkJvYXJkID0gb2NlYW4pID0+IHtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBvY2VhbkJvYXJkO1xuICAgICAgICBcbiAgICAgICAgaWYoc2hpcEF0dGFja3Nbcm93XVtjb2xdID09PSBmYWxzZSAmJiBib2FyZFtyb3ddW2NvbF0gIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBib2FyZFtyb3ddW2NvbF0uaGl0KCk7XG4gICAgICAgICAgICBzaGlwQXR0YWNrc1tyb3ddW2NvbF0gPSB0cnVlO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgXG4gICAgICAgIHNoaXBBdHRhY2tzW3Jvd11bY29sXSA9IHRydWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2hpcFdyZWNrcyA9IChzaGlwcyA9IGRvY2spID0+IHtcbiAgICAgICAgY29uc3Qgc2hpcEdyYXZlID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYoc2hpcHNbaV0uaXNTdW5rKCkgPT09IHRydWUgfHwgc2hpcHNbaV0uaXNTdW5rKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgc2hpcEdyYXZlLnB1c2goc2hpcHNbaV0uaXNTdW5rKCkpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHNoaXBHcmF2ZS5ldmVyeShzaGlwU3VuayA9PiBzaGlwU3VuayA9PT0gdHJ1ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgZ2V0IG9jZWFuKCkgeyByZXR1cm4gb2NlYW59LFxuICAgICAgICBnZXQgc2hpcEF0dGFja3MoKSB7IHJldHVybiBzaGlwQXR0YWNrc30sXG4gICAgICAgIGdldCBkb2NrKCkgeyByZXR1cm4gZG9ja30sXG4gICAgICAgIGNyZWF0ZVNoaXAsXG4gICAgICAgIHBsYWNlU2hpcCxcbiAgICAgICAgcmVjZWl2ZWRBdGssXG4gICAgICAgIHNoaXBXcmVja3MsXG4gICAgfSk7XG59OyIsImNvbnN0IGNyZWF0ZUJvYXJkID0gKG9wdGlvbikgPT4ge1xuICAgIC8vIHBsYXllciBjb250YWluZXJcbiAgICBjb25zdCBwbGF5ZXJPbmVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnAxLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBwbGF5ZXJUd29Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnAyLWNvbnRhaW5lclwiKTtcbiAgICAvLyBwbGF5ZXIgYm9hcmQgY29udGFpbmVyXG4gICAgY29uc3QgYm9hcmRPbmVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmh1bWFuLWJvYXJkXCIpO1xuICAgIGNvbnN0IGJvYXJkVHdvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlci1ib2FyZFwiKTtcblxuICAgIG9wdGlvblswXS5ib2FyZC5vY2Vhbi5tYXAoKHJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgICAgcm93Lm1hcCgoY29sLCBjb2xJbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29sQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICAgICAgICAgIGNvbENlbGwuY2xhc3NOYW1lID0gXCJjZWxsXCI7XG4gICAgICAgICAgICBjb2xDZWxsLnNldEF0dHJpYnV0ZShcImRhdGEtcm93XCIsIHJvd0luZGV4KTtcbiAgICAgICAgICAgIGNvbENlbGwuc2V0QXR0cmlidXRlKFwiZGF0YS1jb2xcIiwgY29sSW5kZXgpO1xuICAgICAgICAgICAgY29sQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1odW1hblwiKTtcbiAgICAgICAgICAgIGNvbENlbGwuY2xhc3NMaXN0LmFkZChcImRyb3AtdGFyZ2V0XCIpXG4gICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGJvYXJkT25lQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbENlbGwpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwbGF5ZXJPbmVDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRPbmVDb250YWluZXIpO1xuICAgIH0pO1xuICAgIFxuICAgIG9wdGlvblsxXS5ib2FyZC5vY2Vhbi5tYXAoKHJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgICAgcm93Lm1hcCgoY29sLCBjb2xJbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29sQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICBjb2xDZWxsLmNsYXNzTmFtZSA9IFwiY2VsbFwiO1xuXG4gICAgICAgICAgICBjb2xDZWxsLnNldEF0dHJpYnV0ZShcImRhdGEtcm93XCIsIHJvd0luZGV4KTtcbiAgICAgICAgICAgIGNvbENlbGwuc2V0QXR0cmlidXRlKFwiZGF0YS1jb2xcIiwgY29sSW5kZXgpO1xuICAgICAgICAgICAgY29sQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbC1jb21wdXRlclwiKTtcbiAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gYm9hcmRUd29Db250YWluZXIuYXBwZW5kQ2hpbGQoY29sQ2VsbClcbiAgICAgICAgfSk7XG4gICAgICBcbiAgICAgICAgcmV0dXJuIHBsYXllclR3b0NvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZFR3b0NvbnRhaW5lcik7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVHYW1lKG9wdGlvbiwgZGl2KSB7XG4gICAgLy8gZm9ybVxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRpdjtcbiAgICAvLyBjb25zdCBwbGFjZVNoaXBCdG4gPSBidXR0b247XG5cbiAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXItbmFtZVwiKTtcbiAgICBjb25zdCBzdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhcnRcIik7XG4gICAgLy8gcGxheWVyIGNvbnRhaW5lclxuICAgIGNvbnN0IHBsYXllck9uZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucDEtY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IHBsYXllclR3b0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucDItY29udGFpbmVyXCIpO1xuICAgIC8vIG5hbWUgY29udGFpbmVyXG4gICAgY29uc3QgcGxheWVyT25lTmFtZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgcGxheWVyVHdvTmFtZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgLy8gbmFtZSBwYXJhZ3JhcGhcbiAgICBjb25zdCBwMU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBjb25zdCBwMk5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAvLyBwbGF5ZXIgbmFtZSBjbGFzc1xuICAgIHAxTmFtZS5jbGFzc0xpc3QuYWRkKFwicGxheWVyLW5hbWVcIik7XG4gICAgcDJOYW1lLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItbmFtZVwiKVxuXG4gICAgc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgY2hhbmdlTmFtZSA9IG9wdGlvblswXTtcbiAgICBcbiAgICAgICAgaWYobmFtZS52YWx1ZSAhPT0gXCJcIikge1xuICAgICAgICAgICAgY2hhbmdlTmFtZS5uYW1lID0gbmFtZS52YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHAxTmFtZS50ZXh0Q29udGVudCA9IGBDb21tYW5kZXIgJHtvcHRpb25bMF0ubmFtZX1gO1xuICAgICAgICBwMk5hbWUudGV4dENvbnRlbnQgPSBgQ29tbWFuZGVyICR7b3B0aW9uWzFdLm5hbWV9YDtcblxuICAgICAgICBwbGF5ZXJPbmVOYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHAxTmFtZSk7XG4gICAgICAgIHBsYXllclR3b05hbWVDb250YWluZXIuYXBwZW5kQ2hpbGQocDJOYW1lKTtcblxuICAgICAgICBwbGF5ZXJPbmVDb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyT25lTmFtZUNvbnRhaW5lcik7XG5cbiAgICAgICAgcGxheWVyVHdvQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllclR3b05hbWVDb250YWluZXIpXG5cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllck9uZUNvbnRhaW5lcik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXJUd29Db250YWluZXIpO1xuICAgICAgICBcbiAgICAgICAgZm9ybUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gICAgICAgIFxuICAgICAgICBjcmVhdGVCb2FyZChvcHRpb24pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICBcbiAgICBcbn07IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4uL2dhbWUvZ2FtZVwiO1xuaW1wb3J0IGNyZWF0ZUdhbWUgZnJvbSBcIi4vYm9hcmQtcGxheWVyL2JvYXJkLXBsYXllclwiO1xuaW1wb3J0IFBvcnRhZ2UgZnJvbSBcIi4vc2hpcC1wb3J0YWdlL3NoaXAtcG9ydGFnZVwiXG5pbXBvcnQgRG9tU3RhdGUgZnJvbSBcIi4vZG9tLXN0YXRlL2RvbS1zdGF0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEb21Db250cm9sbGVyKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1jb250YWluZXJcIik7XG4gICAgY29uc3QgcGxhY2VTaGlwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZS1zaGlwXCIpO1xuXG4gICAgY29uc3QgZ2FtZSA9IEdhbWUoKTsgICBcblxuICAgIGNvbnN0IGNyZWF0ZVBsYXllckFuZEJvYXJkID0gKCkgPT4gY3JlYXRlR2FtZShnYW1lLnBsYXllcnMsIGNvbnRhaW5lcilcblxuICAgIGNvbnN0IHBsYWNlU2hpcCA9ICgpID0+IFBvcnRhZ2UoZ2FtZSwgcGxhY2VTaGlwQnRuKTtcblxuICAgIGNvbnN0IGJvYXJkRXZlbnQgPSAoKSA9PiBEb21TdGF0ZShnYW1lKVxuICAgIFxuXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgICAgICBjcmVhdGVQbGF5ZXJBbmRCb2FyZCxcbiAgICAgICAgcGxhY2VTaGlwLFxuICAgICAgICBib2FyZEV2ZW50LFxuICAgIH0pO1xufTsiLCJjb25zdCBnYW1lT3ZlciA9IChvcHRpb24pID0+IHtcbiAgICBjb25zdCB3aW5Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lclwiKTtcbiAgICBpZighb3B0aW9uLmlzU3Vua0FsbCgpKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgXG4gICAgbGV0IHdpbm5lcjtcbiAgICB3aW5uZXIgPSBvcHRpb24uZ2V0QWN0aXZlUGxheWVyKCkubmFtZSA9PT0gb3B0aW9uLnBsYXllcnNbMF0ubmFtZSA/IHdpbm5lciA9IG9wdGlvbi5wbGF5ZXJzWzFdLm5hbWUgOiB3aW5uZXIgPSBvcHRpb24ucGxheWVyc1swXS5uYW1lO1xuICAgIHAudGV4dENvbnRlbnQgPSBgV2lubmVyOiAke3dpbm5lcn1gO1xuXG4gICAgd2luQ29udGFpbmVyLmFwcGVuZENoaWxkKHApXG4gICAgcmV0dXJuIHRydWU7XG59OyBcblxuY29uc3QgdXBkYXRlU2NyZWVuID0gKG9wdGlvbikgPT4ge1xuICAgIC8vIGh1bWFuIGJvYXJkXG4gICAgb3B0aW9uWzBdLmJvYXJkLnNoaXBBdHRhY2tzLm1hcCgocm93LCByb3dJbmRleCkgPT4gcm93Lm1hcCgoY29sLCBjb2xJbmRleCkgPT4ge1xuICAgICAgICBpZihjb2wgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNlbGwtaHVtYW5bZGF0YS1yb3c9XCIke3Jvd0luZGV4fVwiXVtkYXRhLWNvbD1cIiR7Y29sSW5kZXh9XCJdYClcbiAgICAgICAgICAgIGlmKCFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSAmJiAhY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSB7XG4gICAgICAgICAgICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwiaGl0XCI7XG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwic2lua1wiKTsgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjZWxsLnRleHRDb250ZW50ID0gXCJtaXNzXCJcblxuICAgICAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pKTsgXG5cbiAgICAvLyBjb21wdXRlciBib2FyZFxuICAgIG9wdGlvblsxXS5ib2FyZC5zaGlwQXR0YWNrcy5tYXAoKHJvdywgcm93SW5kZXgpID0+IHJvdy5tYXAoKGNvbCwgY29sSW5kZXgpID0+IHtcbiAgICAgICAgaWYoY29sID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNlbGwtY29tcHV0ZXJbZGF0YS1yb3c9XCIke3Jvd0luZGV4fVwiXVtkYXRhLWNvbD1cIiR7Y29sSW5kZXh9XCJdYClcbiAgICAgICAgICAgIGlmKCFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSAmJiAhY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwLWNvbXB1dGVyXCIpKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICAgICAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIm1pc3NcIlxuICAgICAgICAgICAgICAgIHJldHVybiBjZWxsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZihjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXAtY29tcHV0ZXJcIikpIHtcbiAgICAgICAgICAgICAgICBjZWxsLnRleHRDb250ZW50ID0gXCJzaW5rXCI7XG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwic2lua1wiKVxuICAgICAgICAgICAgICAgIHJldHVybiBjZWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pKTsgXG5cbiAgICBcbn07XG5cbmNvbnN0IHBsYXlMb2dpYyA9IGFzeW5jIChlLG9wdGlvbikgPT4ge1xuICAgIGNvbnN0IHtyb3d9ID0gZS50YXJnZXQuZGF0YXNldFxuICAgIGNvbnN0IHtjb2x9ID0gZS50YXJnZXQuZGF0YXNldFxuICAgICAgICBcbiAgICAgICAgLy8gbGV0IHBsYXllckNyZWF0aW9uRG9uID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYob3B0aW9uLmlzU3Vua0FsbCgpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYocm93ICE9PSB1bmRlZmluZWQgJiYgY29sICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJib2FyZHNcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZS50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gcGFyZW50LmNoaWxkTm9kZXM7XG4gICAgICAgICAgICAgICAgLy8gZGlzYWJsZSBwb2ludGVyXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZCA9IHZhbDtcbiAgICAgICAgICAgICAgICBjaGlsZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICBcbiAgICAgICAgICAgIGF3YWl0IG9wdGlvbi5odW1hbklucHV0KCtyb3csICtjb2wpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVNjcmVlbihvcHRpb24ucGxheWVycyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYXdhaXQgb3B0aW9uLmNvbXB1dGVySW5wdXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB1cGRhdGVTY3JlZW4ob3B0aW9uLnBsYXllcnMpO1xuICAgICAgICAgICAgICAgIC8vIGVuYWJsZSBwb2ludGVyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGVycm9yID0gRXJyb3IoXCJ5b3UgY2xpY2tlZCB0aGUgYm9hcmQgZnJhbWVcIik7XG4gICAgICAgIHRocm93KGVycm9yKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICAgICAgICAgICAgcmV0dXJuIGVycm9yOyBcbiAgICAgICAgfTtcbn07XG5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEb21TdGF0ZShvcHRpb24pIHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXItYm9hcmRcIik7XG5cbiAgICBib2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgcGxheUxvZ2ljKGUsIG9wdGlvbikudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgZ2FtZSBpcyBvdmVyXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGRhdGEgPT09IGZhbHNlIHx8IHR5cGVvZiBkYXRhLmlzU3Vua0FsbCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgaWYoZGF0YS5pc1N1bmtBbGwoKSkgcmV0dXJuIGdhbWVPdmVyKG9wdGlvbik7XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBvdGhlcndpc2VcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0cnVlO1xufTtcbiIsImltcG9ydCBIZWxwZXIgZnJvbSBcIi4uLy4uL2hlbHBlci9oZWxwZXJcIjtcblxuY29uc3QgcmVuZGVyU2hpcHMgPSAob3B0aW9uKSA9PiB7XG4gICAgb3B0aW9uWzBdLmJvYXJkLm9jZWFuLm1hcCgocm93LCByb3dJbmRleCkgPT4ge1xuICAgICAgICByb3cubWFwKChjb2wsIGNvbEluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNlbGwtaHVtYW5bZGF0YS1yb3c9XCIke3Jvd0luZGV4fVwiXVtkYXRhLWNvbD1cIiR7Y29sSW5kZXh9XCJdYCk7XG4gICAgICAgICAgICBpZihjb2wgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xuICAgIFxuICAgIG9wdGlvblsxXS5ib2FyZC5vY2Vhbi5tYXAoKHJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgICAgcm93Lm1hcCgoY29sLCBjb2xJbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jZWxsLWNvbXB1dGVyW2RhdGEtcm93PVwiJHtyb3dJbmRleH1cIl1bZGF0YS1jb2w9XCIke2NvbEluZGV4fVwiXWApO1xuICAgICAgICAgICAgaWYoY29sICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZChcInNoaXAtY29tcHV0ZXJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIFxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICBcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBsYWNlU2hpcChvcHRpb24sIGJ1dHRvbikge1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlyZWN0aW9uXCIpO1xuICAgIGNvbnN0IHBsYWNlU2hpcEJ0biA9IGJ1dHRvbjtcbiAgICBjb25zdCBzdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2Utc2hpcFwiKTtcblxuICAgIGNvbnN0IHBvc0F2YWlsYWJsZSA9IChzaGlwLCByb3csIGNvbCwgZGlyLCBib2FyZCkgPT4gSGVscGVyKCkucG9zQXZhaWxhYmxlKHNoaXAsIHJvdywgY29sLCBkaXIsIGJvYXJkKVxuICAgIHBsYWNlU2hpcEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgcGxhY2VTaGlwQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgIFxuICAgICAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2VsbC1jb21wdXRlclwiKTtcbiAgICAgICAgc2hpcHMuZm9yRWFjaCh2YWwgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IHZhbDtcbiAgICAgICAgICAgIHNoaXAuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gcGxhY2UgY29tcHV0ZXIgc2hpcDtcbiAgICAgICAgb3B0aW9uLnBsYXllcnNbMV0ucGxhY2VTaGlwKClcbiAgICAgICAgcmVuZGVyU2hpcHMob3B0aW9uLnBsYXllcnMpXG4gICAgfSk7XG5cbiAgICBsZXQgZHJhZ2dlZCA9IG51bGw7ICAgIFxuICAgIGNvbnN0IHNvdXJjZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZG9ja1wiKTtcbiAgICBjb25zdCBkaXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rpci1zZWxlY3RcIilcblxuICAgIGRpci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiBcbiAgICAgICAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kb2NrXCIpO1xuICAgICAgICBjb25zdCBjaGlsZCA9IHBhcmVudC5jaGlsZHJlblxuXG4gICAgICAgIGNvbnN0IGhvcml6b250YWxQb3MgPSBbXG4gICAgICAgICAgICBcImNhcnJpZXItaG9yaXpvbnRhbC1oZWlnaHRcIixcbiAgICAgICAgICAgIFwiYmF0dGxlc2hpcC1ob3Jpem9udGFsLWhlaWdodFwiLFxuICAgICAgICAgICAgXCJjcnVpc2VyLXN1Ym1hcmluZS1ob3Jpem9udGFsLWhlaWdodFwiLFxuICAgICAgICAgICAgXCJjcnVpc2VyLXN1Ym1hcmluZS1ob3Jpem9udGFsLWhlaWdodFwiLFxuICAgICAgICAgICAgXCJkZXN0cm95ZXItaG9yaXpvbnRhbC1oZWlnaHRcIlxuICAgICAgICBdO1xuICAgXG4gICAgICAgIGlmKGUudGFyZ2V0LnZhbHVlID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICBcbiAgICAgICAgICAgIHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKFwidmVydGljYWwtZG9ja1wiKTtcblxuICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsLWRvY2tcIik7XG4gICAgICAgIFxuICAgICAgICAgICAgQXJyYXkuZnJvbShjaGlsZCkubWFwKCh2YWwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIHZhbC5jbGFzc0xpc3QgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZih2YWwuY2xhc3NMaXN0LmNvbnRhaW5zKGhvcml6b250YWxQb3NbaW5kZXhdKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkW2luZGV4XS5jbGFzc0xpc3QuYWRkKGhvcml6b250YWxQb3NbaW5kZXhdKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZihlLnRhcmdldC52YWx1ZSA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgICAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsLWRvY2tcIik7XG5cbiAgICAgICAgICAgIHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaG9yaXpvbnRhbC1kb2NrXCIpO1xuICAgICAgIFxuICAgICAgICAgICAgQXJyYXkuZnJvbShjaGlsZCkubWFwKCh2YWwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIHZhbC5jbGFzc0xpc3QgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZighdmFsLmNsYXNzTGlzdC5jb250YWlucyhob3Jpem9udGFsUG9zW2luZGV4XSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZFtpbmRleF0uY2xhc3NMaXN0LnJlbW92ZShob3Jpem9udGFsUG9zW2luZGV4XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIHNvdXJjZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IGUudGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gcGFyZW50LmNoaWxkTm9kZXM7XG4gXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQ2hpbGQgPSBBcnJheS5mcm9tKGNoaWxkcmVuKS5maWx0ZXIoKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYodHlwZW9mIHZhbC5jbGFzc0xpc3QgIT09IFwidW5kZWZpbmVkXCIgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5kYXRhc2V0Lm5hbWUgPT09IGUudGFyZ2V0LmRhdGFzZXQubmFtZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgXG4gICAgICAgIGRyYWdnZWQgPSBzZWxlY3RlZENoaWxkXG4gICAgfSk7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmh1bWFuLWJvYXJkXCIpO1xuXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgICAvLyBwcmV2ZW50IGRlZmF1bHQgdG8gYWxsb3cgZHJvcFxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICBcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2UsXG4gICAgKTtcblxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsICgpID0+IHtcblxuICAgIH0pO1xuXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgKCkgPT4ge1xuICAgXG4gICAgfSk7XG5cbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gZHJhZ2dlZFswXS5wYXJlbnROb2RlO1xuICAgICAgICBjb25zdCBjaGlsZCA9IGRyYWdnZWRbMF07XG4gICAgICAgIGNvbnN0IHtyb3d9ID0gZS50YXJnZXQuZGF0YXNldDtcbiAgICAgICAgY29uc3Qge2NvbH0gPSBlLnRhcmdldC5kYXRhc2V0O1xuICAgICAgICBjb25zdCB7aW5kZXh9ID0gZHJhZ2dlZFswXS5kYXRhc2V0O1xuICAgICAgICBjb25zdCBzaGlwID0gb3B0aW9uLnBsYXllcnNbMF0uZG9ja1sraW5kZXhdXG5cbiAgICAgICAgaWYoIXBvc0F2YWlsYWJsZShzaGlwLCArcm93LCArY29sLCBkaXIudmFsdWUsIG9wdGlvbi5wbGF5ZXJzWzBdLmJvYXJkLm9jZWFuKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgXG5cblxuICAgICAgICBvcHRpb24ucGxheWVyc1swXS5wbGFjZVNoaXAoc2hpcCwgK3JvdywgK2NvbCwgZGlyLnZhbHVlKVxuICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpXG4gICAgICAgIGlmKHBhcmVudC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHN0YXJ0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlLWJ0blwiKTtcbiAgICAgICAgICAgIHN0YXJ0LmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuXG4gICAgICAgICAgICBkaXJlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgXG4gICAgICAgIH07XG4gICAgICBcbiAgICAgICAgcmV0dXJuIHJlbmRlclNoaXBzKG9wdGlvbi5wbGF5ZXJzKVxuICAgIH0pO1xuXG4gICAgICAgIFxufTtcbiIsImltcG9ydCBDcmVhdGVCb2FyZCBmcm9tIFwiLi4vYm9hcmQvYm9hcmRcIjtcbmltcG9ydCBDcmVhdGVQbGF5ZXIgZnJvbSBcIi4uL3BsYXllci9wbGF5ZXJcIjtcbmltcG9ydCBIZWxwZXIgZnJvbSBcIi4uL2hlbHBlci9oZWxwZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gR2FtZSgpIHtcbiAgICBsZXQgaXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xuICAgIGxldCBjdXJyZW50UGxheWVyO1xuXG4gICAgY29uc3QgcGxheWVycyA9IFtdO1xuICAgIGNvbnN0IGJvYXJkcyA9IFtdO1xuXG4gICAgY29uc3Qgd2FpdCA9IChtcykgPT4gSGVscGVyKCkud2FpdChtcyk7XG5cbiAgICAvLyBpbml0aWFsaXplZCBib2FyZHMgYW5kIHBsYXllcnNcbiAgICBpZihpc0dhbWVTdGFydGVkID09PSBmYWxzZSkge1xuICAgICAgICBib2FyZHMucHVzaChDcmVhdGVCb2FyZCgpKTtcbiAgICAgICAgYm9hcmRzLnB1c2goQ3JlYXRlQm9hcmQoKSk7XG4gICAgICAgXG5cbiAgICAgICAgcGxheWVycy5wdXNoKENyZWF0ZVBsYXllcihcImh1bWFuXCIsIGJvYXJkc1swXSwgYm9hcmRzWzFdKSk7XG4gICAgICAgIHBsYXllcnMucHVzaChDcmVhdGVQbGF5ZXIoXCJjb21wdXRlclwiLGJvYXJkc1sxXSxib2FyZHNbMF0sIHRydWUpKTtcbiAgICAgICAgXG4gICAgICAgIHBsYXllcnNbMF0uY3JlYXRlQWxsU2hpcHMoKTtcbiAgICAgICAgcGxheWVyc1sxXS5jcmVhdGVBbGxTaGlwcygpO1xuXG4gICAgICAgIGN1cnJlbnRQbGF5ZXIgPSB7Li4ucGxheWVyc1swXX0gXG4gICAgICAgIGlzR2FtZVN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBcbiAgICB9O1xuXG4gICAgXG4gICAgY29uc3QgZ2V0QWN0aXZlUGxheWVyID0gKCkgPT4gY3VycmVudFBsYXllcjtcblxuICAgIGNvbnN0IGlzU3Vua0FsbCA9IChwbGF5ZXIgPSBnZXRBY3RpdmVQbGF5ZXIoKSkgPT4gcGxheWVyLmJvYXJkLnNoaXBXcmVja3MoKTtcbiAgICBcbiAgICBjb25zdCBzd2l0Y2hQbGF5ZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmKGN1cnJlbnRQbGF5ZXIubmFtZSA9PT0gcGxheWVyc1swXS5uYW1lKSB7XG4gICAgICAgICAgICBjdXJyZW50UGxheWVyID0gey4uLnBsYXllcnNbMV19O1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQbGF5ZXI7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBjdXJyZW50UGxheWVyID0gey4uLnBsYXllcnNbMF19O1xuICAgICAgICByZXR1cm4gY3VycmVudFBsYXllcjtcbiAgICB9O1xuXG4gICAgY29uc3QgaHVtYW5JbnB1dCA9IGFzeW5jIChyb3csIGNvbCkgPT4ge1xuICAgICAgICBhd2FpdCB3YWl0KDEwMDApXG4gICAgICAgIHBsYXllcnNbMF0uYXRrRW5lbXkocm93LCBjb2wpO1xuICAgICAgICBzd2l0Y2hQbGF5ZXIoKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgY29tcHV0ZXJJbnB1dCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYoaXNTdW5rQWxsKCkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgYXdhaXQgd2FpdCgzMDAwKTtcbiAgICAgICAgcGxheWVyc1sxXS5hdGtFbmVteSgpO1xuICAgICAgICBzd2l0Y2hQbGF5ZXIoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH07XG5cbiAgICBcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIGdldCBwbGF5ZXJzKCkgeyByZXR1cm4gcGxheWVyc30sXG4gICAgICAgIGdldEFjdGl2ZVBsYXllcixcbiAgICAgICAgc3dpdGNoUGxheWVyLFxuICAgICAgICBpc1N1bmtBbGwsXG4gICAgICAgIGh1bWFuSW5wdXQsXG4gICAgICAgIGNvbXB1dGVySW5wdXQsXG4gICAgICAgIFxuICAgIH0pO1xufTsiLCJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhlbHBlcigpIHtcbiAgICBjb25zdCBwb3NBdmFpbGFibGUgPSAoc2hpcCwgcm93LCBjb2wsIGRpciwgYm9hcmQpID0+IHtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmKGRpciA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgICAgICBpZihjb2wgKyBpID4gOSkgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGJvYXJkW3Jvd11bY29sICsgaV0pO1xuICAgICAgICAgICAgfTtcbiAgICBcbiAgICAgICAgICAgIGlmKGRpciA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgICAgICAgICAgaWYocm93ICsgaSA+IDkpICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaChib2FyZFtyb3cgKyBpXVtjb2xdKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gYXJyYXkuZXZlcnkoKGNlbGwpID0+IGNlbGwgPT09IGZhbHNlKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgd2FpdCA9IG1zID0+IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxlZ2FsTW92ZXMgPSAob2NlYW4pID0+IHtcbiAgICAgICAgY29uc3QgbGVnYWxBdHRhY2tzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2NlYW4uc2hpcEF0dGFja3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgb2NlYW4uc2hpcEF0dGFja3NbaV0ubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpZihvY2Vhbi5zaGlwQXR0YWNrc1tpXVtqXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVnYWxBdHRhY2tzLnB1c2goW2ksal0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9OyBcblxuICAgICAgICByZXR1cm4gbGVnYWxBdHRhY2tzO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwb3NBdmFpbGFibGUsXG4gICAgICAgIHdhaXQsXG4gICAgICAgIGxlZ2FsTW92ZXNcbiAgICB9O1xufTtcblxuXG5cblxuIiwiaW1wb3J0IEhlbHBlciBmcm9tIFwiLi4vaGVscGVyL2hlbHBlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQbGF5ZXIobmFtZSwgYm9hcmQsIGVuZW15Qm9hcmQsIGlzQ29tcHV0ZXIgPSBmYWxzZSkge1xuICAgIGNvbnN0IGlzQWkgPSBpc0NvbXB1dGVyO1xuICAgIFxuICAgIGxldCBwbGF5ZXJOYW1lID0gbmFtZVxuXG4gICAgY29uc3Qgb2NlYW4gPSBib2FyZDtcblxuICAgIGNvbnN0IGhlbHBlciA9IEhlbHBlcigpO1xuXG4gICAgY29uc3QgbGVnYWxBdHRhY2tzID0gaGVscGVyLmxlZ2FsTW92ZXMob2NlYW4pO1xuXG4gICAgY29uc3Qgc2hpcEJsdWVQcmludHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiY2FycmllclwiLFxuICAgICAgICAgICAgbGVuZ3RoOiA1LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgXG4gICAgICAgICAgICBuYW1lOiBcImJhdHRsZXNoaXBcIixcbiAgICAgICAgICAgIGxlbmd0aDogNCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgIFxuICAgICAgICAgICAgbmFtZTogXCJjcnVpc2VyXCIsXG4gICAgICAgICAgICBsZW5ndGg6IDNcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgIFxuICAgICAgICAgICAgbmFtZTogXCJzdWJtYXJpbmVcIixcbiAgICAgICAgICAgIGxlbmd0aDogM1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgXG4gICAgICAgICAgICBuYW1lOiBcImRlc3Ryb3llclwiLFxuICAgICAgICAgICAgbGVuZ3RoOiAyXG4gICAgICAgIH0sXG4gICAgXTtcblxuICAgIGNvbnN0IHtkb2NrfSA9IG9jZWFuO1xuXG4gICAgY29uc3QgY3JlYXRlQWxsU2hpcHMgPSAoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcEJsdWVQcmludHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIG9jZWFuLmNyZWF0ZVNoaXAoc2hpcEJsdWVQcmludHNbaV0ubmFtZSwgc2hpcEJsdWVQcmludHNbaV0ubGVuZ3RoKVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHJvdywgY29sLCBkaXIpID0+IHtcbiAgICAgICAgaWYoaXNBaSkge1xuICAgICAgICAgICAgY29uc3QgcXVldWUgPSBbLi4ub2NlYW4uZG9ja11cbiAgIFxuICAgICAgICAgICAgd2hpbGUocXVldWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBxdWV1ZVswXTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCByYW5kb21Sb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KTtcbiAgICAgICAgICAgICAgICBjb25zdCByYW5kb21Db2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBbXCJob3Jpem9udGFsXCIsIFwidmVydGljYWxcIl07XG5cbiAgICAgICAgICAgICAgICBjb25zdCByYW5kb21EaXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBkaXJlY3Rpb24ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihoZWxwZXIucG9zQXZhaWxhYmxlKGN1cnJlbnRTaGlwLCByYW5kb21Sb3csIHJhbmRvbUNvbCwgZGlyZWN0aW9uW3JhbmRvbURpcl0sIG9jZWFuLm9jZWFuKSkge1xuICAgICAgICAgICAgICAgICAgICBvY2Vhbi5wbGFjZVNoaXAoY3VycmVudFNoaXAsIHJhbmRvbVJvdywgcmFuZG9tQ29sLCBkaXJlY3Rpb25bcmFuZG9tRGlyXSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gb2NlYW4ucGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBkaXIpXG4gICAgfTtcblxuICAgXG5cbiAgICBjb25zdCBhdGtFbmVteSA9IChyb3csIGNvbCkgPT4ge1xuICAgICAgICBpZihOdW1iZXIuaXNJbnRlZ2VyKHJvdykgJiYgTnVtYmVyLmlzSW50ZWdlcihjb2wpICYmIGVuZW15Qm9hcmQuc2hpcEF0dGFja3Nbcm93XVtjb2xdID09PSB0cnVlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYoaXNBaSkge1xuICAgICAgICAgICAgY29uc3QgYXZhaWxhYmxlSW5kZXggPSBsZWdhbEF0dGFja3MuZmlsdGVyKCh2YWwpID0+ICBlbmVteUJvYXJkLnNoaXBBdHRhY2tzW3ZhbFswXV1bdmFsWzFdXSAhPT0gdHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCBjaG9pY2UgPSBhdmFpbGFibGVJbmRleFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhdmFpbGFibGVJbmRleC5sZW5ndGgpXTtcbiAgICAgICAgICBcbiAgICAgICAgICAgIGVuZW15Qm9hcmQucmVjZWl2ZWRBdGsoY2hvaWNlWzBdLCBjaG9pY2VbMV0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBlbmVteUJvYXJkLnJlY2VpdmVkQXRrKHJvdywgY29sKTtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuIFxuICAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgICBnZXQgbmFtZSgpIHsgcmV0dXJuIHBsYXllck5hbWV9LFxuICAgICAgICAgc2V0IG5hbWUodmFsKSB7IHBsYXllck5hbWUgPSB2YWx9LCBcbiAgICAgICAgIGdldCBib2FyZCgpIHsgcmV0dXJuIG9jZWFufSxcbiAgICAgICAgIGdldCBkb2NrKCkgeyByZXR1cm4gZG9ja30sXG4gICAgICAgICBhdGtFbmVteSxcbiAgICAgICAgIGNyZWF0ZUFsbFNoaXBzLFxuICAgICAgICAgcGxhY2VTaGlwXG4gICAgIH0pO1xuIH07IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2hpcChuYW1lLCBsZW5ndGgpIHtcbiAgICBsZXQgaGVhbHRoID0gMDtcblxuICAgIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICAgICAgaGVhbHRoICs9IDE7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzZXRIZWFsdGggPSAoKSA9PiB7XG4gICAgICAgIGhlYWx0aCA9IDA7XG4gICAgICAgIHJldHVybiBoZWFsdGhcbiAgICB9O1xuXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgICAgICBpZihoZWFsdGggPT09IGxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgZ2V0IG5hbWUoKSB7IHJldHVybiBuYW1lIH0sXG4gICAgICAgIGdldCBsZW5ndGgoKSB7IHJldHVybiBsZW5ndGggfSxcbiAgICAgICAgaGl0LFxuICAgICAgICByZXNldEhlYWx0aCxcbiAgICAgICAgaXNTdW5rLFxuICAgIH0pO1xufTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKntcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbn1cblxuXG4uZm9ybS1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgcGxhY2UtY29udGVudDogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbmZvcm0ge1xuICAgIGhlaWdodDogMjUwcHg7XG4gICAgbWFyZ2luOiAxMHB4O1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBwbGFjZS1pdGVtczogY2VudGVyO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuZm9ybSA+IGJ1dHRvbiwgLnBsYWNlLXNoaXAge1xuICAgIHdpZHRoOiA0cmVtO1xuICAgIGhlaWdodDogMnJlbTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xufVxuXG5mb3JtID4gYnV0dG9uOmhvdmVyLCAucGxhY2Utc2hpcDpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICAgIGNvbG9yOiB3aGl0ZTtcbn0gXG5cbi5nYW1lLWNvbnRhaW5lciB7XG4gICBkaXNwbGF5OiBncmlkO1xuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcbiAgIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcbiAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgXG59XG5cbi5nYW1lLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cblxuLnAxLWNvbnRhaW5lciB7XG4gICAgZ3JpZC1jb2x1bW46IDE7XG59XG5cbi5hbm5vdW5jZW1lbnQge1xuICAgIGdyaWQtY29sdW1uOiAyO1xufVxuXG4ucDItY29udGFpbmVyIHtcbiAgICBncmlkLWNvbHVtbjogMztcbn1cblxuLnAxLWNvbnRhaW5lciwgLnAyLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBnYXA6IDEwcHg7XG59XG5cbi5ib2FyZHMge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgd2lkdGg6IDUwMHB4O1xuICAgIGhlaWdodDogNTAwcHg7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG59XG5cbi5zaGlwLXBsYWNlbWVudHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGdhcDogMTBweDtcbn1cblxuLnZlcnRpY2FsLWRvY2sge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcbiAgICB3aWR0aDogMTAwcHg7XG4gICAgZ2FwOiAxMHB4O1xufVxuXG4uaG9yaXpvbnRhbC1kb2NrIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdhcDogMTBweDtcbn1cblxuLyogLnZlcnRpY2FsLWRvY2sge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsbWlubWF4KDEwMHB4LCAxNTBweCkpO1xuICAgIHdpZHRoOiA1MHB4O1xufSAqL1xuXG4uYmF0dGxlc2hpcC12ZXJ0aWNhbC1oZWlnaHQge1xuICAgIGhlaWdodDogMTk5cHg7XG4gICBcbn1cblxuLmNydWlzZXItc3VibWFyaW5lLXZlcnRpY2FsLWhlaWdodCB7XG4gICAgaGVpZ2h0OiAxNTBweDtcbiAgIFxufVxuXG4uZGVzdHJveWVyLXZlcnRpY2FsLWhlaWdodCB7XG4gICAgaGVpZ2h0OiAxMDBweDtcbn1cblxuLyogICovXG4uY2Fycmllci1ob3Jpem9udGFsLWhlaWdodCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICB3aWR0aDogYXV0bztcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgZ2FwOiAxLjVweDtcbn1cblxuLmJhdHRsZXNoaXAtaG9yaXpvbnRhbC1oZWlnaHQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgd2lkdGg6IDE5MHB4O1xuICAgIGhlaWdodDogNTBweDtcbiAgICBnYXA6IDEuNXB4O1xufVxuXG4uY3J1aXNlci1zdWJtYXJpbmUtaG9yaXpvbnRhbC1oZWlnaHQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgd2lkdGg6IDE1MHB4O1xuICAgIGhlaWdodDogNTBweDtcbiAgICBnYXA6IDEuNXB4O1xufVxuXG4uZGVzdHJveWVyLWhvcml6b250YWwtaGVpZ2h0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHdpZHRoOiAxMDBweDtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgZ2FwOiAxLjVweDtcbn1cblxuXG4uc2hpcG1lbnQge1xuICAgIGhlaWdodDogNTBweDtcbiAgICB3aWR0aDogNTBweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICBiYWNrZ3JvdW5kOiBibHVlO1xufVxuXG4uc2hpcG1lbnQtdmFsaWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xufVxuXG4uc2hpcG1lbnQtaW52YWxpZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG5cbi5jZWxsLWNvbXB1dGVyIHtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZVxufVxuXG4uY2VsbC1odW1hbiwgLmNlbGwtY29tcHV0ZXIgIHtcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiBhbGljZWJsdWU7ICovXG4gICAgYmFja2dyb3VuZDogdGhpc3RsZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbn1cblxuLmhpZGUtYnRuLCAuY3JlYXRlLXNoaXAge1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5zaGlwIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xufVxuXG4uaGl0IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDtcbn1cblxuLnNpbmsge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxTQUFTO0lBQ1QsVUFBVTtBQUNkOzs7QUFHQTtJQUNJLGFBQWE7SUFDYixxQkFBcUI7SUFDckIsdUJBQXVCO0lBQ3ZCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixZQUFZO0lBQ1osYUFBYTtJQUNiLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWix1QkFBdUI7SUFDdkIsWUFBWTtJQUNaLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLHFCQUFxQjtJQUNyQixZQUFZO0FBQ2hCOztBQUVBO0dBQ0csYUFBYTtHQUNiLGtDQUFrQztHQUNsQyxxQkFBcUI7R0FDckIsbUJBQW1CO0dBQ25CLGdCQUFnQjs7QUFFbkI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFNBQVM7QUFDYjs7QUFFQTtJQUNJLGFBQWE7SUFDYixZQUFZO0lBQ1osYUFBYTtJQUNiLHNDQUFzQztJQUN0QyxtQ0FBbUM7QUFDdkM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLFNBQVM7QUFDYjs7QUFFQTtJQUNJLGFBQWE7SUFDYixxQ0FBcUM7SUFDckMsWUFBWTtJQUNaLFNBQVM7QUFDYjs7QUFFQTtJQUNJLGFBQWE7SUFDYixTQUFTO0FBQ2I7O0FBRUE7Ozs7O0dBS0c7O0FBRUg7SUFDSSxhQUFhOztBQUVqQjs7QUFFQTtJQUNJLGFBQWE7O0FBRWpCOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQSxLQUFLO0FBQ0w7SUFDSSxhQUFhO0lBQ2IsV0FBVztJQUNYLFlBQVk7SUFDWixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtJQUNaLFlBQVk7SUFDWixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtJQUNaLFlBQVk7SUFDWixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtJQUNaLFlBQVk7SUFDWixVQUFVO0FBQ2Q7OztBQUdBO0lBQ0ksWUFBWTtJQUNaLFdBQVc7SUFDWCx1QkFBdUI7SUFDdkIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOzs7QUFHQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSSxpQ0FBaUM7SUFDakMsbUJBQW1CO0lBQ25CLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKntcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5cXG4uZm9ybS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG5cXG5mb3JtIHtcXG4gICAgaGVpZ2h0OiAyNTBweDtcXG4gICAgbWFyZ2luOiAxMHB4O1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1pdGVtczogY2VudGVyO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbmZvcm0gPiBidXR0b24sIC5wbGFjZS1zaGlwIHtcXG4gICAgd2lkdGg6IDRyZW07XFxuICAgIGhlaWdodDogMnJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAgIGNvbG9yOiBibGFjaztcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xcbn1cXG5cXG5mb3JtID4gYnV0dG9uOmhvdmVyLCAucGxhY2Utc2hpcDpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gICAgY29sb3I6IHdoaXRlO1xcbn0gXFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG4gICBkaXNwbGF5OiBncmlkO1xcbiAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxuICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICAgbWFyZ2luLXRvcDogMTBweDtcXG4gICBcXG59XFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLnAxLWNvbnRhaW5lciB7XFxuICAgIGdyaWQtY29sdW1uOiAxO1xcbn1cXG5cXG4uYW5ub3VuY2VtZW50IHtcXG4gICAgZ3JpZC1jb2x1bW46IDI7XFxufVxcblxcbi5wMi1jb250YWluZXIge1xcbiAgICBncmlkLWNvbHVtbjogMztcXG59XFxuXFxuLnAxLWNvbnRhaW5lciwgLnAyLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdhcDogMTBweDtcXG59XFxuXFxuLmJvYXJkcyB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHdpZHRoOiA1MDBweDtcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uc2hpcC1wbGFjZW1lbnR7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBnYXA6IDEwcHg7XFxufVxcblxcbi52ZXJ0aWNhbC1kb2NrIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gICAgd2lkdGg6IDEwMHB4O1xcbiAgICBnYXA6IDEwcHg7XFxufVxcblxcbi5ob3Jpem9udGFsLWRvY2sge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBnYXA6IDEwcHg7XFxufVxcblxcbi8qIC52ZXJ0aWNhbC1kb2NrIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LG1pbm1heCgxMDBweCwgMTUwcHgpKTtcXG4gICAgd2lkdGg6IDUwcHg7XFxufSAqL1xcblxcbi5iYXR0bGVzaGlwLXZlcnRpY2FsLWhlaWdodCB7XFxuICAgIGhlaWdodDogMTk5cHg7XFxuICAgXFxufVxcblxcbi5jcnVpc2VyLXN1Ym1hcmluZS12ZXJ0aWNhbC1oZWlnaHQge1xcbiAgICBoZWlnaHQ6IDE1MHB4O1xcbiAgIFxcbn1cXG5cXG4uZGVzdHJveWVyLXZlcnRpY2FsLWhlaWdodCB7XFxuICAgIGhlaWdodDogMTAwcHg7XFxufVxcblxcbi8qICAqL1xcbi5jYXJyaWVyLWhvcml6b250YWwtaGVpZ2h0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgZ2FwOiAxLjVweDtcXG59XFxuXFxuLmJhdHRsZXNoaXAtaG9yaXpvbnRhbC1oZWlnaHQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogMTkwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgZ2FwOiAxLjVweDtcXG59XFxuXFxuLmNydWlzZXItc3VibWFyaW5lLWhvcml6b250YWwtaGVpZ2h0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDE1MHB4O1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIGdhcDogMS41cHg7XFxufVxcblxcbi5kZXN0cm95ZXItaG9yaXpvbnRhbC1oZWlnaHQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogMTAwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgZ2FwOiAxLjVweDtcXG59XFxuXFxuXFxuLnNoaXBtZW50IHtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICB3aWR0aDogNTBweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIGJhY2tncm91bmQ6IGJsdWU7XFxufVxcblxcbi5zaGlwbWVudC12YWxpZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbn1cXG5cXG4uc2hpcG1lbnQtaW52YWxpZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuXFxuLmNlbGwtY29tcHV0ZXIge1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZVxcbn1cXG5cXG4uY2VsbC1odW1hbiwgLmNlbGwtY29tcHV0ZXIgIHtcXG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogYWxpY2VibHVlOyAqL1xcbiAgICBiYWNrZ3JvdW5kOiB0aGlzdGxlO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXG59XFxuXFxuLmhpZGUtYnRuLCAuY3JlYXRlLXNoaXAge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uc2hpcCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XFxufVxcblxcbi5oaXQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFuY2hlZGFsbW9uZDtcXG59XFxuXFxuLnNpbmsge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgRG9tQ29udHJvbGxlciBmcm9tIFwiLi9tb2R1bGUvZG9tL2RvbS1jb250cm9sbGVyXCJcblxuaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcblxuY29uc3QgZG9tID0gRG9tQ29udHJvbGxlcigpXG5kb20uY3JlYXRlUGxheWVyQW5kQm9hcmQoKVxuZG9tLnBsYWNlU2hpcCgpXG5kb20uYm9hcmRFdmVudCgpXG5cbiJdLCJuYW1lcyI6WyJTaGlwIiwicG9zQXZhaWxhYmxlIiwiR2FtZUJvYXJkIiwib2NlYW4iLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJmaWxsIiwic2hpcEF0dGFja3MiLCJkb2NrIiwiY3JlYXRlU2hpcCIsIm5hbWUiLCJzaGlwIiwicHVzaCIsInBsYWNlU2hpcCIsInZlc3NlbCIsInJvdyIsImNvbCIsImRpciIsIm9jZWFuQm9hcmQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJib2FyZCIsImkiLCJyZWNlaXZlZEF0ayIsImhpdCIsInNoaXBXcmVja3MiLCJzaGlwcyIsInNoaXBHcmF2ZSIsImlzU3VuayIsImV2ZXJ5Iiwic2hpcFN1bmsiLCJPYmplY3QiLCJmcmVlemUiLCJjcmVhdGVCb2FyZCIsIm9wdGlvbiIsInBsYXllck9uZUNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBsYXllclR3b0NvbnRhaW5lciIsImJvYXJkT25lQ29udGFpbmVyIiwiYm9hcmRUd29Db250YWluZXIiLCJtYXAiLCJyb3dJbmRleCIsImNvbEluZGV4IiwiY29sQ2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJzZXRBdHRyaWJ1dGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUdhbWUiLCJkaXYiLCJjb250YWluZXIiLCJmb3JtQ29udGFpbmVyIiwic3RhcnQiLCJwbGF5ZXJPbmVOYW1lQ29udGFpbmVyIiwicGxheWVyVHdvTmFtZUNvbnRhaW5lciIsInAxTmFtZSIsInAyTmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJjaGFuZ2VOYW1lIiwidmFsdWUiLCJ0ZXh0Q29udGVudCIsInN0eWxlIiwiZGlzcGxheSIsIkdhbWUiLCJQb3J0YWdlIiwiRG9tU3RhdGUiLCJEb21Db250cm9sbGVyIiwicGxhY2VTaGlwQnRuIiwiZ2FtZSIsImNyZWF0ZVBsYXllckFuZEJvYXJkIiwicGxheWVycyIsImJvYXJkRXZlbnQiLCJnYW1lT3ZlciIsIndpbkNvbnRhaW5lciIsImlzU3Vua0FsbCIsInAiLCJ3aW5uZXIiLCJnZXRBY3RpdmVQbGF5ZXIiLCJ1cGRhdGVTY3JlZW4iLCJjZWxsIiwiY29udGFpbnMiLCJwbGF5TG9naWMiLCJ0YXJnZXQiLCJkYXRhc2V0IiwicGFyZW50IiwicGFyZW50Tm9kZSIsImNoaWxkcmVuIiwiY2hpbGROb2RlcyIsImZvckVhY2giLCJ2YWwiLCJjaGlsZCIsInBvaW50ZXJFdmVudHMiLCJodW1hbklucHV0IiwidGhlbiIsImNvbXB1dGVySW5wdXQiLCJlcnJvciIsIkVycm9yIiwiZGF0YSIsIkhlbHBlciIsInJlbmRlclNoaXBzIiwiYnV0dG9uIiwiZGlyZWN0aW9uIiwicXVlcnlTZWxlY3RvckFsbCIsImRyYWdnZWQiLCJzb3VyY2UiLCJob3Jpem9udGFsUG9zIiwicmVtb3ZlIiwiaW5kZXgiLCJzZWxlY3RlZENoaWxkIiwiZmlsdGVyIiwicmVtb3ZlQ2hpbGQiLCJDcmVhdGVCb2FyZCIsIkNyZWF0ZVBsYXllciIsImlzR2FtZVN0YXJ0ZWQiLCJjdXJyZW50UGxheWVyIiwiYm9hcmRzIiwid2FpdCIsIm1zIiwiY3JlYXRlQWxsU2hpcHMiLCJwbGF5ZXIiLCJzd2l0Y2hQbGF5ZXIiLCJhdGtFbmVteSIsImFycmF5IiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwibGVnYWxNb3ZlcyIsImxlZ2FsQXR0YWNrcyIsImoiLCJQbGF5ZXIiLCJlbmVteUJvYXJkIiwiaXNDb21wdXRlciIsImlzQWkiLCJwbGF5ZXJOYW1lIiwiaGVscGVyIiwic2hpcEJsdWVQcmludHMiLCJxdWV1ZSIsImN1cnJlbnRTaGlwIiwicmFuZG9tUm93IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tQ29sIiwicmFuZG9tRGlyIiwic2hpZnQiLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJhdmFpbGFibGVJbmRleCIsImNob2ljZSIsImhlYWx0aCIsInJlc2V0SGVhbHRoIiwiZG9tIl0sInNvdXJjZVJvb3QiOiIifQ==