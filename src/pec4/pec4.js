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
        const size = Math.round(newSize);
        if (size >= 4 && size <= 16) {
            this.size = size;
        } else if (size < 4 && size >= 0) {
            this.size = 4;
        } else if (size > 16 && size >= 0) {
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
        this.board = Array.from({ length: this.size }, () => Array(this.size).fill(null));
    }

    generate() {
        // Initialize empty board
        this.board = Array.from({ length: this.size }, () => Array(this.size).fill(null)); 

        const pieceRows = this.gameConfig.getPieceRows();

        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if ((row + col) % 2 === 1) {
                    if (row < pieceRows) {
                    this.board[row][col] = new Piece('black');
                    } else if (row >= this.size - pieceRows) {
                        this.board[row][col] = new Piece('white');
                    }
                }
            }   
        } 
    }

    getPiece(row, col) {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) return null;
        return this.board[row][col];
    }

    setPiece(row, col, piece) {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) return;
        this.board[row][col] = piece;
    }

    isEmpty(row, col) {
        return this.board[row][col] === null;
    }
}

// Exercise 3: GameLogic (3p)
class GameLogic {
    constructor(board, config) {
        this.board = board;
        this.config = config;
        this.selectedPiece = null;
        this.gameOver = false;
        this.winner = null;
    }

    isValidMove(fromRow, fromCol, toRow, toCol) {
        const piece = this.board.getPiece(fromRow, fromCol);
        
        // There must be a piece at the source
        if (!piece) return false;

        // Destination must be within bounds
        if (toRow < 0 || toRow >= this.board.size || toCol < 0 || toCol >= this.board.size) return false;

        // Destination must be empty
        if (!this.board.isEmpty(toRow, toCol)) return false;

        // Destination must be on a dark sqaure
        if ((toRow + toCol) % 2 === 0) return false;

        const rowDiff = toRow - fromRow;
        const colDiff = Math.abs(toCol - fromCol);
        // Move must be diagonal by one
        if (colDiff !== 1) return false;

        // King can only move one step in any direction (game simplification)
        if (piece.isKing) {
            return Math.abs(rowDiff) === 1;
        }

        if (piece.player === 'white') {
            return rowDiff === -1;
        } 
        if (piece.player === 'black') {
            return rowDiff === 1;
        }

        return false;
    }

    isValidCapture(fromRow, fromCol, toRow, toCol) {
        const piece = this.board.getPiece(fromRow, fromCol);

        // There must be a piece at the source
        if (!piece) return false;

        // Destination must be within bounds
        if (toRow < 0 || toRow >= this.board.size || toCol < 0 || toCol >= this.board.size) return false;
        
        // Destination must be empty
        if (!this.board.isEmpty(toRow, toCol)) return false;
    
        // Destination must be on a dark square
        if ((toRow + toCol) % 2 === 0) return false;

        const rowDiff = toRow - fromRow;
        const colDiff = toCol - fromCol;
        // Capture must be diagonal by two
        if (Math.abs(rowDiff) !== 2 || Math.abs(colDiff) !== 2) return false;
        
        // There must be an opponent's piece in the middle
        const midRow = fromRow + rowDiff / 2;
        const midCol = fromCol + colDiff / 2;
        const midPiece = this.board.getPiece(midRow, midCol);

        if(!midPiece || midPiece.player === piece.player) return false;

        // Non-king pieces can only capture forward
        if (!piece.isKing) {
            if (piece.player === 'white' && rowDiff !== -2) return false;
            if (piece.player === 'black' && rowDiff !== 2) return false;
        }

        return true;
    }

    movePiece(fromRow, fromCol, toRow, toCol) {
        if (this.gameOver) return false;

        const piece = this.board.getPiece(fromRow, fromCol);

        // There must be a piece at the source
        if (!piece || piece.player !== this.config.currentPlayer) return false;

        // Move and capture validation
        const isMove = this.isValidMove(fromRow, fromCol, toRow, toCol);
        const isCapture = this.isValidCapture(fromRow, fromCol, toRow, toCol);
        if (!isMove && !isCapture) return false;

        // If it's a capture, remove the captured piece
        if (isCapture) {
            const midRow = (fromRow + toRow) / 2;
            const midCol = (fromCol + toCol) / 2;
            this.board.setPiece(midRow, midCol, null);
        }

        // Move the piece from source to destination
        this.board.setPiece(toRow, toCol, piece);
        this.board.setPiece(fromRow, fromCol, null);

        // If the piece reaches the last row, promote it to king
        if (!piece.isKing && (piece.player === 'white' && toRow === 0 || piece.player === 'black' && toRow === this.board.size - 1)) {
            piece.promote();
        }

        this.config.switchPlayer();

        this.checkGameOver();
        
        return true;
    }

    checkGameOver() {
        let whitePieces = 0;
        let blackPieces = 0;
        let whiteMoves = false;
        let blackMoves = false;

        for (let row = 0; row < this.board.size; row++) {
            for (let col = 0; col < this.board.size; col++) {
                const piece = this.board.getPiece(row, col);

                if (!piece) continue;

                if (piece.player === 'white') whitePieces++;
                if (piece.player === 'black') blackPieces++;

                // Non-king pieces can only move forward
                const directions = piece.isKing ? [-1, 1] : (piece.player === 'white' ? [-1] : [1]);

                for (const dir of directions) {
                    for (const dcol of [-1, 1]) {
                        // Check for valid moves and captures
                        if (this.isValidMove(row, col, row + dir, col + dcol) || this.isValidCapture(row, col, row + dir * 2, col + dcol * 2)) {
                            if (piece.player === 'white') whiteMoves = true;
                            if (piece.player === 'black') blackMoves = true;
                        }
                    }
                }
            }
        }

        if (whitePieces === 0 || !whiteMoves) {
            this.gameOver = true;
            this.winner = 'black';
        } else if (blackPieces === 0 || !blackMoves) {
            this.gameOver = true;
            this.winner = 'white';
        }
    }
}

export default GameLogic

// Exercise 4.1: UI (2 points)
export class UI {
    constructor(gameLogic, onRestart) {
        this.gameLogic = gameLogic;
        this.onRestart = onRestart;
        this.gameBoard = document.getElementById('game-board');

        this.setupSizeInput();
        this.setupRestartButton();
    }

    setupSizeInput() {
        const container = document.querySelector('.container');
        let controlsDiv = container.querySelector('.controls');
        // If controls div doesn't exist, create it
        if (!controlsDiv) {
            const newControlsDiv = document.createElement('div');
            newControlsDiv.className = 'controls';
            container.insertBefore(newControlsDiv, this.gameBoard);
            controlsDiv = newControlsDiv;
        }

        const label = document.createElement('label');
        label.htmlFor = 'board-size';
        label.textContent = 'Board size: ';

        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'board-size';
        input.min = '4';
        input.max = '16';
        input.value = this.gameLogic.board.size;

        controlsDiv.appendChild(label);
        controlsDiv.appendChild(input);
        
    }

    setupRestartButton() {
        const controlDiv = document.querySelector('.container .controls');
        const button = document.createElement('button');
        button.id = 'restart';
        button.textContent = 'Restart Match';
        button.addEventListener('click', () => {
            const gameStatus = document.getElementById('game-status');
            if (gameStatus) gameStatus.remove();
            const currentPlayer = document.getElementById('current-player');
            if (currentPlayer) currentPlayer.remove();
            this.onRestart();
        });

        controlDiv.appendChild(button);
    }

    renderBoard() {
        this.gameBoard.innerHTML = '';
        this.gameBoard.className = 'game.board checkboard';
        this.gameBoard.style.gridTemplateRows = `repeat(${this.gameLogic.board.size}, 60px)`;
        this.gameBoard.style.gridTemplateColumns = `repeat(${this.gameLogic.board.size}, 60px)`;

        for (let row = 0; row < this.gameLogic.board.size; row++) {
            for (let col = 0; col < this.gameLogic.board.size; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
                cell.dataset.row = row;
                cell.dataset.col = col;

                const piece = this.gameLogic.board.getPiece(row, col);
                if (piece) {
                    const pieceDiv = document.createElement('div');
                    pieceDiv.classList.add('piece', piece.player);
                    if (piece.isKing) pieceDiv.classList.add('king');
                    cell.appendChild(pieceDiv);
                }

                if (this.gameLogic.selectedPiece && this.gameLogic.selectedPiece.row == row && this.gameLogic.selectedPiece.col == col) {
                    cell.classList.add('selected');
                }

                cell.addEventListener('click', () => this.handleCellClick(row, col));
            }
        }
        this.showCurrentPlayer();
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
