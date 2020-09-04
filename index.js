const cells = document.querySelectorAll(".game__cell");
const cellWithX = '<img src="./xmark.png" alt="">';
const cellWithO = '<img src="./omark.png" alt="">';
const gameField = document.querySelector(".game__field");
const resetButton = document.querySelector("#reset");
const winX = document.querySelector("#winX");
const win0 = document.querySelector("#win0");
const draw = document.querySelector("#draw");
let counterWinner = 0;
let endGame = false;
let win = false;
let winner = false;
let newGame = false;
let winXCounter = 0;
let win0Counter = 0;
let drawCounter = 0;

clickToCell();

function clickToCell() {
  cells.forEach((cell) => {
    if (!endGame) {
      cell.addEventListener("click", drawStep);
    } else {
      cell.removeEventListener("click", drawStep);
    }
  });
}

function drawStep() {
  if (!this.innerHTML && !endGame) {
    if (counterWinner % 2) {
      this.innerHTML = cellWithO;
    } else {
      this.innerHTML = cellWithX;
    }
    ++counterWinner;
    findWinner();
  }
}

function findWinner() {
  win =
    (cells[0].innerHTML === cells[1].innerHTML &&
      cells[0].innerHTML === cells[2].innerHTML &&
      cells[0].innerHTML !== "") ||
    (cells[3].innerHTML === cells[4].innerHTML &&
      cells[3].innerHTML === cells[5].innerHTML &&
      cells[3].innerHTML !== "") ||
    (cells[6].innerHTML === cells[7].innerHTML &&
      cells[6].innerHTML === cells[8].innerHTML &&
      cells[6].innerHTML !== "") ||
    (cells[0].innerHTML === cells[3].innerHTML &&
      cells[0].innerHTML === cells[6].innerHTML &&
      cells[0].innerHTML !== "") ||
    (cells[1].innerHTML === cells[4].innerHTML &&
      cells[1].innerHTML === cells[7].innerHTML &&
      cells[1].innerHTML !== "") ||
    (cells[2].innerHTML === cells[5].innerHTML &&
      cells[2].innerHTML === cells[8].innerHTML &&
      cells[2].innerHTML !== "") ||
    (cells[0].innerHTML === cells[4].innerHTML &&
      cells[0].innerHTML === cells[8].innerHTML &&
      cells[0].innerHTML !== "") ||
    (cells[2].innerHTML === cells[4].innerHTML &&
      cells[2].innerHTML === cells[6].innerHTML &&
      cells[2].innerHTML !== "");

  if (win) {
    showWinner();
  } else if (counterWinner === 9 && !win) {
    showDraw();
  }

  win = false;
  endGame = false;
}

function showWinner() {
  winner = `The user drawn ${counterWinner % 2 ? "X" : "O"} is winner`;
  counterWinner % 2
    ? (winX.innerHTML = ++winXCounter)
    : (win0.innerHTML = ++win0Counter);
  alert(winner);
  resetField();
}

function showDraw() {
  draw.innerHTML = ++drawCounter;
  alert("It's a draw");

  resetField();
}

function resetField() {
  newGame = confirm("New game");
  if (newGame) {
    counterWinner = "";
    cells.forEach((cell) => {
      cell.innerHTML = "";
    });
    clickToCell();
  } else if (win) {
    cells.forEach((cell) => {
      cell.removeEventListener("click", drawStep);
    });
    win = false;
  }
}

resetButton.addEventListener("click", resetField);
