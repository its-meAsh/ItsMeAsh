const scoreSpan = document.querySelector("#scoreSpan");
const containerLeft = document.querySelector(".containerLeft>div");
const numToColor = {
  0: "#FFFFFF"
}
const ROWS = 10;
const COLUMNS = 10;
const randomAllowed = [2, 4, 8]
var grid = matrixMake(ROWS, COLUMNS, 0)
var htmlGrid = []
var score = 0;
var gameOverNotified = false;
var gameOver = false;
for (let i = 0; i < ROWS; i++) {
  htmlGrid.push([])
  for (let j = 0; j < COLUMNS; j++) {
    htmlGrid[i].push([document.createElement('div')]);
  }
}
function getColor(val) {
  if (!checkIn(val, Object.keys(numToColor))) {
    numToColor[val] = randColor()
  }
  return numToColor[val]
}
function renderGrid() {
  containerLeft.innerHTML = "";
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      htmlGrid[i][j][0].innerHTML = grid[i][j][0];
      htmlGrid[i][j][0].style.backgroundColor = getColor(grid[i][j][0])
    }
  }
}
function renderScreen() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      containerLeft.append(htmlGrid[i][j][0]);
    }
  }
}
function returnEmpty() {
  let array = []
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      if (grid[i][j][0] == 0) {
        array.push([i, j])
      }
    }
  }
  return array
}
function placeRandom() {
  let location = choice(returnEmpty())
  grid[location[0]][location[1]][0] = choice(randomAllowed);
}
function shift(array) {
  if (getFreq(array)[0] == array.length) {
    return array
  }
  for (let i = 0; i < array.length; i++) {
    let d = 1
    for (let j = i; j < array.length - 1; j++) {
      if (array[j][0] == array[j + 1][0]) {
        array[j][0] = array[j][0] * 2;
        score += array[j][0];
        array[j + 1][0] = 0;
      }
    }
    while (array[i][0] == 0 && i + d < array.length) {
      array[i][0] = array[i + d][0];
      array[i + d][0] = 0;
      d++;
    }
  }
  return array;
}
function shiftLeft() {
  for (let i = 0; i < ROWS; i++) {
    grid[i] = shift(grid[i])
  }
}
function shiftRight() {
  for (let i = 0; i < ROWS; i++) {
    let array = grid[i];
    array = shift(array.reverse())
    grid[i] = array.reverse()
  }
}
function shiftUp() {
  for (let j = 0; j < COLUMNS; j++) {
    let colArray = [];
    for (let i = 0; i < ROWS; i++) {
      colArray.push(grid[i][j]);
    }
    colArray = shift(colArray);
    for (let k = 0; k < ROWS; k++) {
      grid[k][j] = colArray[k];
    }
  }
}
function shiftDown() {
  for (let j = 0; j < COLUMNS; j++) {
    let colArray = [];
    for (let i = 0; i < ROWS; i++) {
      colArray.unshift(grid[i][j]);
    }
    colArray = shift(colArray).reverse()
    for (let k = 0; k < ROWS; k++) {
      grid[k][j] = colArray[k];
    }
  }
}
function updateScore() {
  scoreSpan.innerHTML = score;
}
function update() {
  renderGrid()
  renderScreen()
  updateScore()
  placeRandom()
  renderGrid()
  renderScreen()
}
update()
const controlBox = document.querySelectorAll(".controlBox");
controlBox[0].addEventListener('click', () => {
  shiftUp()
})
controlBox[1].addEventListener('click', () => {
  shiftLeft()
})
controlBox[2].addEventListener('click', () => {
  shiftDown()
})
controlBox[3].addEventListener('click', () => {
  shiftRight()
})
function reset() {
  grid = matrixMake(ROWS, COLUMNS, 0)
  htmlGrid = []
  score = 0;
  gameOverNotified = false;
  gameOver = false;
  for (let i = 0; i < ROWS; i++) {
    htmlGrid.push([])
    for (let j = 0; j < COLUMNS; j++) {
      htmlGrid[i].push([document.createElement('div')]);
    }
  }
  update()
}
for (let each of controlBox) {
  each.addEventListener('click', () => {
    if (!gameOver) {
      update()
    }
    if (gameOver && gameOverNotified) {
      reset()
    }
    if (returnEmpty().length == 0 && gameOver) {
      containerLeft.innerHTML = "Game over";
      gameOverNotified = true;
    }
    if (returnEmpty().length == 0) {
      gameOver = true;
    }
    else {
      gameOver = false
    }
  })
}