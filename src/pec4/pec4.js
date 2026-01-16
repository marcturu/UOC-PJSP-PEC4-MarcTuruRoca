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

    /* Sets the board size, ensuring it's an integer between 4 and 16. If it's out of range, set to nearest limit. */
    setSize(newSize) {
        const size = Math.round(newSize);
        if (size >= 4 && size <= 16) {
            this.size = size;
        } else if (size < 4) {
            this.size = 4;
        } else if (size > 16) {
            this.size = 16;
        }
    }

    /* Determines the number of rows to fill with pieces based on board size */
    getPieceRows() {
        if (this.size < 8) { 
            return 2;
        } else if (this.size < 12) {
            return 3;
        } else {
            return 4;
        }
    }

    /* Initializes the starting player */
    initialize() {
        this.currentPlayer = 'white';
    }

    /* Switches the current player */
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

    /* Generates the board with the correct number of black and white basic pieces */
    generate() {
        this.board = Array.from({ length: this.size }, () => Array(this.size).fill(null)); 
        const pieceRows = this.gameConfig.getPieceRows();

        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                // Place pieces on dark squares only (when (row + col) / 2 is odd) and on the top and bottom rows
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

    /* Returns the piece at the specified position or null if out of bounds */
    getPiece(row, col) {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) return null;
        return this.board[row][col];
    }

    /* Sets the piece at the specified position or does nothing if out of bounds */
    setPiece(row, col, piece) {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) return;
        this.board[row][col] = piece;
    }

    /* Checks if the specified position is empty */
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

    /* Validates a normal move (non-capturing) */
    isValidMove(fromRow, fromCol, toRow, toCol) {
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
        const colDiff = Math.abs(toCol - fromCol);
        // Move must be a diagonal move by one
        if (colDiff !== 1) return false;

        // King can only move one step in any diagonal direction (game simplification)
        if (piece.isKing) {
            return Math.abs(rowDiff) === 1;
        }
        // Non-king white pieces can only move up (-1 in row index)
        if (piece.player === 'white') {
            return rowDiff === -1;
        } 
        // Non-king black pieces can only move down (+1 in row index)
        if (piece.player === 'black') {
            return rowDiff === 1;
        }

        return false;
    }

    /* Validates a capturing move */
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

        // Non-king pieces can only capture forward (-2 for white, +2 for black)
        if (!piece.isKing) {
            if (piece.player === 'white' && rowDiff !== -2) return false;
            if (piece.player === 'black' && rowDiff !== 2) return false;
        }

        return true;
    }

    /* Moves a piece from source to destination if the move is valid */
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

    /* Checks if the game is over (no pieces or no moves for a player) */
    checkGameOver() {
        let whitePieces = 0;
        let blackPieces = 0;
        let whiteMoves = false;
        let blackMoves = false;
        const size = this.board.size;

        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                const piece = this.board.getPiece(row, col);

                if (!piece) continue;

                if (piece.player === 'white') whitePieces++;
                if (piece.player === 'black') blackPieces++;

                // Non-king pieces can only move forward in rows (-1 for white, +1 for black), kings can move both directions (-1 and +1) 
                const directions = piece.isKing ? [-1, 1] : (piece.player === 'white' ? [-1] : [1]);

                for (const dir of directions) {
                    for (const dcol of [-1, 1]) {
                        // Check for valid moves and captures on all diagonals
                        if (this.isValidMove(row, col, row + dir, col + dcol) || this.isValidCapture(row, col, row + dir * 2, col + dcol * 2)) {
                            if (piece.player === 'white') whiteMoves = true;
                            if (piece.player === 'black') blackMoves = true;
                        }
                    }
                }
            }
        }

        // If there are no more pieces or no more possible moves, the game is over
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


    /* Creates input display for board size if it doesn't exist */
    setupSizeInput() {
        //Create input display for board size if it doesn't exist
        const container = document.querySelector('.container');
        let controls = container.querySelector('.controls');
        if (!controls) {
            controls = document.createElement('div');
            controls.className = 'controls';
            container.insertBefore(controls, this.gameBoard);
        }

        // Avoid duplicating the input
        if (document.getElementById('board-size')) return;

        // Create label and input
        const label = document.createElement('label');
        label.htmlFor = 'board-size';
        label.textContent = 'Board size: ';

        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'board-size';
        input.min = '4';
        input.max = '16';
        input.value = this.gameLogic.board.size;

        controls.appendChild(label);
        controls.appendChild(input);
    }

    /* Creates restart button if it doesn't exist and sets up click event */
    setupRestartButton() {
        // Create restart button display if it doesn't exist
        const controls = document.querySelector('.container .controls');
        let button = document.getElementById('restart');
        if (!button) {
            button = document.createElement('button');
            button.id = 'restart';
            button.textContent = 'Restart Match';
            /* Insert button after board-size input */
            const input = document.getElementById('board-size');
            input.parentNode.insertBefore(button, input.nextSibling);
        }
        
        // Setup click event
        button.onclick = () => {
            document.getElementById('game-status')?.remove();
            document.getElementById('current-player')?.remove();
            if (this.onRestart) this.onRestart();
        };
    }

    /* Renders the game board based on the current state of the game */
    renderBoard() {
        this.gameBoard.innerHTML = '';
        this.gameBoard.className = 'game-board checkerboard';

        const container = document.querySelector('.container');
        const size = this.gameLogic.board.size;

        // Calculate max board width based on container size
        const containerWidth = container.clientWidth;
        const maxBoardWidth = containerWidth - 40; // 20px padding * 2

        // Calculate cell size and board size
        const cellSize = Math.floor(maxBoardWidth / size);
        const boardSize = cellSize * size;

        // Configurate grid styles
        this.gameBoard.style.display = 'grid';
        this.gameBoard.style.gridTemplateRows = `repeat(${size}, ${cellSize}px)`;
        this.gameBoard.style.gridTemplateColumns = `repeat(${size}, ${cellSize}px)`;
        this.gameBoard.style.width = `${boardSize}px`;
        this.gameBoard.style.height = `${boardSize}px`;

        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                // Set light or dark class based on position
                cell.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
                cell.style.width = `${cellSize}px`;
                cell.style.height = `${cellSize}px`;
                cell.dataset.row = row;
                cell.dataset.col = col;

                const piece = this.gameLogic.board.getPiece(row, col);
                /* Render piece if exists */
                if (piece) {
                    const pieceDiv = document.createElement('div');
                    pieceDiv.classList.add('piece', piece.player);
                    if (piece.isKing) pieceDiv.classList.add('king');

                    // Adjust piece size with padding
                    const padding = Math.floor(cellSize * 0.15);
                    pieceDiv.style.width = `${cellSize - 2 * padding}px`;
                    pieceDiv.style.height = `${cellSize - 2 * padding}px`;

                    cell.appendChild(pieceDiv);
                }

                // Highlight selected piece if exists in this cell
                if (this.gameLogic.selectedPiece &&
                    this.gameLogic.selectedPiece.row === row &&
                    this.gameLogic.selectedPiece.col === col) {
                    cell.classList.add('selected');
                }

                cell.addEventListener('click', () => this.handleCellClick(row, col));
                this.gameBoard.appendChild(cell);
            }
        }

        this.showCurrentPlayer();
    }

    // Exercise 4.2: UI (1.5 points)
    /* Handles cell click events for selecting and moving pieces */
    handleCellClick(row, col) {
        if (this.gameLogic.gameOver) return;

        const selected = this.gameLogic.selectedPiece;
        const piece = this.gameLogic.board.getPiece(row, col);

        // If no piece is selected, select the clicked piece if it belongs to the current player
        if (!selected) {
            if (piece && piece.player === this.gameLogic.config.currentPlayer) {
                this.gameLogic.selectedPiece = { row, col };
            }
        } 
        // If a piece is already selected, try to move it to the clicked cell (if not already there)
        else {
            const { row: fromRow, col: fromCol } = selected;

            if (fromRow === row && fromCol === col) {
                this.gameLogic.selectedPiece = null;
            } else if (this.gameLogic.movePiece(fromRow, fromCol, row, col)) {
                this.gameLogic.selectedPiece = null;
            }
        }

        this.renderBoard();

        if (this.gameLogic.gameOver) this.showGameStatus(this.gameLogic.winner);
    }

    /* Displays the game status (winner) */
    showGameStatus(status) {
        // Create game status display if it doesn't exist
        let gameStatus = document.getElementById('game-status');
        if (!gameStatus) {
            gameStatus = document.createElement('div');
            gameStatus.id = 'game-status';
            this.gameBoard.after(gameStatus);
        }

        gameStatus.textContent = status === 'white' ? 'White wins!' : 'Black wins!';

        setTimeout(() => gameStatus.remove(), 5000);
    }

    /* Displays the current player's turn */
    showCurrentPlayer() {
        // Create current player display if it doesn't exist
        let currentPlayer = document.getElementById('current-player');
        if (!currentPlayer) {
            currentPlayer = document.createElement('div');
            currentPlayer.id = 'current-player';
            this.gameBoard.before(currentPlayer);
        }

        const player = this.gameLogic.config.currentPlayer;
        currentPlayer.textContent = `Turn: ${player.charAt(0).toUpperCase() + player.slice(1)}`;
    }
}

// Exercise 5: Game (1 point)
export class Game {
    constructor() {
        this.config = null;
        this.board = null;
        this.gameLogic = null;
        this.ui = null;
    }

    /* Starts a new game with the specified board size */
    start() {
        const input = document.getElementById('board-size');
        const size = input ? parseInt(input.value) : 8;

        this.config = new GameConfig();
        this.config.setSize(size);
        this.config.initialize();

        this.board = new Board(this.config);
        this.board.generate();

        this.gameLogic = new GameLogic(this.board, this.config);

        this.ui = new UI(this.gameLogic, () => this.start());
        this.ui.renderBoard();

        this.gameLogic.checkGameOver();
        if (this.gameLogic.gameOver) {
            this.ui.showGameStatus(this.gameLogic.winner);
        }
    }
}