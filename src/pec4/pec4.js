// Piece class: Represents a piece on the board
// NOTE: This class is already implemented for you. Use it in the Board class.
export class Piece {
    constructor(player, isKing = false) {
        this.player = player; // 'white' or 'black'
        this.isKing = isKing; // boolean
    }

    promote() {
        this.isKing = true;
    }
}

// Exercise 1: GameConfig (1p)
export class GameConfig {
    constructor() {
        this.size = 8;
        this.currentPlayer = 'white';
    }

    setSize(newSize) {
        if (newSize >= 4 && newSize <= 16) {
            this.size = newSize;
        } else if (newSize < 4 && newSize >= 0) {
            this.size = 4;
        } else if (newSize > 16 && newSize >= 0) {
            this.size = 16;
        }
    }
    getPieceRows() {
        if (this.size < 8) { 
            return 2;
        } else if (this.size < 12) {
            return 3;
        } else {
            return 4;
        }
    }

    initialize() {
        this.currentPlayer = 'white';
    }

    switchPlayer() {
        if (this.currentPlayer === 'white') {
            this.currentPlayer = 'black';
        } else {
            this.currentPlayer = 'white';
        }
    }
}

// Exercise 2: Board (1.5p)
export class Board {
    constructor(gameConfig) {
        this.gameConfig = gameConfig;
        this.size = gameConfig.size;
        //this.board = [][];
    }

    generate() {
        /*pieceRows = this.gameConfig.getPieceRows();
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (row <= pieceRows-1 && col % 2 === 0 && row % 2 !== 0) {
                    this.board[row][col] = new Piece('black');
                } else if () {
                    this.board[row][col] = new Piece('white');
                }
        } */
    }

    getPiece(row, col) {
        return this.board[row][col];
    }

    setPiece(row, col, piece) {
        this.board[row][col] = piece;
    }

    isEmpty(row, col) {
        return this.board[row][col] === null;
    }
}

// Exercise 3: GameLogic (3p)
class GameLogic {
    constructor(board, config) {
    }

    isValidMove(fromRow, fromCol, toRow, toCol) {
    }

    isValidCapture(fromRow, fromCol, toRow, toCol) {
    }

    movePiece(fromRow, fromCol, toRow, toCol) {
    }

    checkGameOver() {
    }
}

export default GameLogic

// Exercise 4.1: UI (2 points)
export class UI {
    constructor(gameLogic, onRestart) {
    }

    setupSizeInput() {
    }

    setupRestartButton() {
    }

    renderBoard() {
    }

    // Exercise 4.2: UI (1.5 points)
    handleCellClick(row, col) {
    }

    showGameStatus(status) {
    }

    showCurrentPlayer() {
    }
}

// Exercise 5: Game (1 point)
export class Game {
    constructor() {
    }

    start() {
    }
}
