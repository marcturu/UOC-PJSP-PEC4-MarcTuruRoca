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
        this.board = [];
    }

    generate() {
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
        this.board = board;
        this.config = config;
        this.selectedPiece = null;
        this.gameOver = false;
        this.winner = null;
    }

    isValidMove(fromRow, fromCol, toRow, toCol) {
        const piece = this.board.getPiece(fromRow, fromCol);
        
        // There must be a piece at the source
        if (!piece || piece.player !== this.config.currentPlayer) return false;

        // Destination must be within bounds
        if (toRow < 0 || toRow >= this.board.size || toCol < 0 || toCol >= this.board.size) return false;

        // Destination must be empty
        if (!this.board.isEmpty(toRow, toCol)) return false;

        // Destination must be on a dark sqaure
        if ((toRow + toCol) % 2 === 0) return false;

        const rowDiff = toRow - fromRow;
        const colDiff = Matgh.abs(toCol - fromCol);
        // Move must be diagonal by one
        if (colDiff != 1) return false;

        // King can only move one step in any direction (simplification)
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
        if (!piece || piece.player != this.config.currentPlayer) return false;

        // Destination must be within bounds
        if (toRow < 0 || toRow >= this.board.size || toCol < 0 || toCol >= this.board.size) return false;
        
        // Destination must be empty
        if (!this.board.isEmpty(toRow, toCol)) return false;
    
        // Destination must be on a dark square
        if ((toRow + toCol) % 2 === 0) return false;

        const rowDiff = toRow - fromRow;
        const colDiff = toCol - fromCol;
        // Capture must be diagonal by two
        if (Math.abs(rowDiff) != 2 || Math.abs(colDiff) != 2) return false;
        
        // There must be an opponent's piece in the middle
        const midRow = fromRow + rowDiff / 2;
        const midCol = fromCol + colDiff / 2;
        const midPiece = this.board.getPiece(midRow, midCol);

        if(!midPiece || midPiece.player === piece.player) return false;

        // Non-king pieces can only capture forward
        if (!piece.king) {
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

                const directions = piece.isKing ? [-1, 1] : (piece.player === 'white' ? [-1] : [1]);

                for (const dir of directions) {
                    for (const dcol of [-1, 1]) {
                        const newRow = row + dir;
                        const newCol = col + dcol;
                        if (this.isValidMove(row, col, newRow, newCol) || this.isValidCapture(row, col, newRow + dir, newCol + dcol)) {
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
