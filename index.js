const cells = document.querySelectorAll(".game__cell");
const cellWithX = '<img src="./xmark.png" alt="">';
const cellWithO = '<img src="./omark.png" alt="">';
let counterWinner = 0;
const gameField = document.querySelector(".game__field");
let endGame = false;
let winner;
const resetButton = document.querySelector("#reset");

const winX = document.querySelector("#winX");
const win0 = document.querySelector("#win0");
const draw = document.querySelector("#draw");

let winXCounter = 0;
let win0Counter = 0;
let drawCounter = 0;

cells.forEach((cell) => {
  if (counterWinner < 9 && endGame == false) {
    cell.addEventListener("click", drawStep);
  } else {
    cell.removeEventListener("click", drawStep);
    endGame = false;
  }
});

gameField.addEventListener("click", findWinner);

function drawStep() {
  if (!this.innerHTML) {
    if (counterWinner % 2) {
      this.innerHTML = cellWithO;
    } else {
      this.innerHTML = cellWithX;
    }
    ++counterWinner;
  }
}

function findWinner() {
  endGame = false;
  const win =
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

  showWinner(win);
}

function showWinner(win) {
  if (win) {
    endGame = true;
    winner = `The user drawn ${counterWinner % 2 ? "X" : "O"} is winner`;
    counterWinner % 2
      ? (winX.innerHTML = ++winXCounter)
      : (win0.innerHTML = ++win0Counter);
    alert(winner);
    resetField();
    winner = "";
  }

  if (counterWinner === 9 && endGame == false) {
    draw.innerHTML = ++drawCounter;
    alert("It's a draw");
    resetField();
  }
}

function resetField() {
  newGame = confirm("New game");
  if (newGame) {
    counterWinner = "";
    cells.forEach((cell) => {
      cell.innerHTML = "";
    });
  } else if (winner) {
    endGame = false;
    gameField.removeEventListener("click", findWinner);
    cells.forEach((cell) => {
      cell.removeEventListener("click", drawStep);
    });
  }
}

resetButton.addEventListener("click", resetField);
