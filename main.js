// Codecademy - JavaScript Syntax Project - Find your Hat
// Make sure you have Node and NPM installed
// Run npm install prompt-sync in the terminal

const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.start = {
      x: 0,
      y: 0,
    };
    this.hat = {
      x: 0,
      y: 0,
    };
    this.location = {
      x: 0,
      y: 0,
    };
  }
  print() {
    console.clear();
    this.field.forEach((element) => console.log(element.join("")));
  }

  isInBounds() {
    if (
      this.location.y >= 0 &&
      this.location.x >= 0 &&
      this.location.y < this.field.length &&
      this.location.x < this.field[0].length
    ) {
      return true;
    } else {
      return false;
    }
  }

  isHat() {
    if (this.field[this.location.y][this.location.x] === hat) {
      return true;
    } else {
      return false;
    }
  }

  isHole() {
    if (this.field[this.location.y][this.location.x] === hole) {
      return true;
    } else {
      return false;
    }
  }

  getNextMove() {
    const move = prompt(
      "What's your next move? [U=up;D=down,L=left;R=right] "
    ).toUpperCase();
    switch (move) {
      case "U":
        this.location.y -= 1;
        break;
      case "D":
        this.location.y += 1;
        break;
      case "L":
        this.location.x -= 1;
        break;
      case "R":
        this.location.x += 1;
        break;
      default:
        console.log("Enter U, D, L or R.");
        this.getNextMove();
        break;
    }
  }

  playGame() {
    let gameOver = false;

    // Generate new hat position
    do {
      this.hat.x = Math.floor(Math.random() * this.field[0].length);
      this.hat.y = Math.floor(Math.random() * this.field.length);
    } while (this.hat.x === this.start.x && this.hat.y === this.start.y);
    // Update game board with new hat position
    this.field[this.hat.y][this.hat.x] = hat;

    // Add start position to game board
    this.field[this.start.y][this.start.x] = pathCharacter;

    // Play game until player is out of bounds, in a hole or found his hat
    while (!gameOver) {
      this.print();
      this.getNextMove();

      if (!this.isInBounds()) {
        console.log("SORRY, you jumped off the cliff.");
        gameOver = true;
        break;
      } else if (this.isHole()) {
        console.log("GAME OVER, you fell down a black hole.");
        gameOver = true;
        break;
      } else if (this.isHat()) {
        console.log("COOL, you found your hat!");
        gameOver = true;
        break;
      }

      // Update player location on board
      this.field[this.location.y][this.location.x] = pathCharacter;
    }
  }

  static generateField(boardHeight, boardWidth, percentage) {
    // Fill new game board with holes and field characters
    const field = new Array(boardHeight).fill(0);
    for (let y = 0; y < boardHeight; y++) {
      // Add rows to new field
      field[y] = new Array(boardWidth).fill(0);
      for (let x = 0; x < boardWidth; x++) {
        const random = Math.random();
        // Add x% holes to field
        if (random > percentage) {
          field[y][x] = fieldCharacter;
        } else {
          field[y][x] = hole;
        }
      }
    }
    // Return random field
    return field;
  }
}

let newField = Field.generateField(10, 10, 0.1);
const gameBoard = new Field(newField);
gameBoard.playGame();
