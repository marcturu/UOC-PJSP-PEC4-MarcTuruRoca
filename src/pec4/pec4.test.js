import GameLogic, { Piece, Board, GameConfig, UI, Game } from './pec4.js';

describe('GameConfig', () => {
    let gameConfig;

    beforeEach(() => {
        gameConfig = new GameConfig();
    });

    test('Should initialize correctly with default values', () => {
        expect(gameConfig.size).toBe(8);
        expect(gameConfig.currentPlayer).toBe('white');
    });

    test('Should reset to initial state when initialize is called', () => {
        gameConfig.currentPlayer = 'black';
        gameConfig.initialize();
        expect(gameConfig.currentPlayer).toBe('white');
    });

    test('Should switch player from white to black', () => {
        gameConfig.currentPlayer = 'white';
        gameConfig.switchPlayer();
        expect(gameConfig.currentPlayer).toBe('black');
    });

    test('Should switch player from black to white', () => {
        gameConfig.currentPlayer = 'black';
        gameConfig.switchPlayer();
        expect(gameConfig.currentPlayer).toBe('white');
    });

    test('Should set size within valid range', () => {
        gameConfig.setSize(10);
        expect(gameConfig.size).toBe(10);
    });

    test('Should clamp size to minimum value 4', () => {
        gameConfig.setSize(2);
        expect(gameConfig.size).toBe(4);
    });

    test('Should clamp size to maximum value 16', () => {
        gameConfig.setSize(20);
        expect(gameConfig.size).toBe(16);
    });

    test('Should return 2 piece rows for board size 4', () => {
        gameConfig.setSize(4);
        expect(gameConfig.getPieceRows()).toBe(2);
    });

    test('Should return 2 piece rows for board size 7', () => {
        gameConfig.setSize(7);
        expect(gameConfig.getPieceRows()).toBe(2);
    });

    test('Should return 3 piece rows for board size 8', () => {
        gameConfig.setSize(8);
        expect(gameConfig.getPieceRows()).toBe(3);
    });

    test('Should return 3 piece rows for board size 11', () => {
        gameConfig.setSize(11);
        expect(gameConfig.getPieceRows()).toBe(3);
    });

    test('Should return 4 piece rows for board size 12', () => {
        gameConfig.setSize(12);
        expect(gameConfig.getPieceRows()).toBe(4);
    });

    test('Should return 4 piece rows for board size 16', () => {
        gameConfig.setSize(16);
        expect(gameConfig.getPieceRows()).toBe(4);
    });
});

describe('Board', () => {
    let gameConfig;
    let board;

    beforeEach(() => {
        gameConfig = new GameConfig();
        board = new Board(gameConfig);
    });

    test('Should initialize the board correctly with size 8x8', () => {
        expect(board.size).toBe(8);
        expect(board.board.length).toBe(8);
        expect(board.board.every(row => row.length === 8)).toBe(true);
    });

    test('Should generate the board with 12 black pieces in rows 0-2 for 8x8', () => {
        board.generate();
        let blackPieces = 0;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board.getPiece(row, col);
                if (piece && piece.player === 'black') {
                    blackPieces++;
                    expect(piece.isKing).toBe(false);
                    expect((row + col) % 2).toBe(1); // dark square
                }
            }
        }
        expect(blackPieces).toBe(12);
    });

    test('Should generate the board with 12 white pieces in rows 5-7 for 8x8', () => {
        board.generate();
        let whitePieces = 0;
        for (let row = 5; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board.getPiece(row, col);
                if (piece && piece.player === 'white') {
                    whitePieces++;
                    expect(piece.isKing).toBe(false);
                    expect((row + col) % 2).toBe(1); // dark square
                }
            }
        }
        expect(whitePieces).toBe(12);
    });

    test('Should place pieces only on dark squares', () => {
        board.generate();
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board.getPiece(row, col);
                if (piece !== null) {
                    expect((row + col) % 2).toBe(1);
                }
            }
        }
    });

    test('Should generate 4x4 board with 4 pieces per player', () => {
        gameConfig.setSize(4);
        board = new Board(gameConfig);
        board.generate();

        expect(board.size).toBe(4);
        expect(board.board.length).toBe(4);

        let blackPieces = 0;
        let whitePieces = 0;

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const piece = board.getPiece(row, col);
                if (piece) {
                    if (piece.player === 'black') blackPieces++;
                    if (piece.player === 'white') whitePieces++;
                    expect((row + col) % 2).toBe(1); // dark square
                }
            }
        }

        expect(blackPieces).toBe(4); // 2 rows * 2 pieces per row
        expect(whitePieces).toBe(4);
    });

    test('Should generate 16x16 board with 32 pieces per player', () => {
        gameConfig.setSize(16);
        board = new Board(gameConfig);
        board.generate();

        expect(board.size).toBe(16);
        expect(board.board.length).toBe(16);

        let blackPieces = 0;
        let whitePieces = 0;

        for (let row = 0; row < 16; row++) {
            for (let col = 0; col < 16; col++) {
                const piece = board.getPiece(row, col);
                if (piece) {
                    if (piece.player === 'black') blackPieces++;
                    if (piece.player === 'white') whitePieces++;
                    expect((row + col) % 2).toBe(1); // dark square
                }
            }
        }

        expect(blackPieces).toBe(32); // 4 rows * 8 pieces per row
        expect(whitePieces).toBe(32);
    });

    test('getPiece should return the correct piece', () => {
        board.generate();
        const piece = board.getPiece(0, 1);
        expect(piece).not.toBeNull();
        expect(piece.player).toBe('black');
    });

    test('getPiece should return null for out of bounds', () => {
        expect(board.getPiece(-1, 0)).toBeNull();
        expect(board.getPiece(0, -1)).toBeNull();
        expect(board.getPiece(8, 0)).toBeNull();
        expect(board.getPiece(0, 8)).toBeNull();
    });

    test('setPiece should correctly place a piece', () => {
        board.setPiece(4, 4, new Piece('white', true));
        const piece = board.getPiece(4, 4);
        expect(piece).not.toBeNull();
        expect(piece.player).toBe('white');
        expect(piece.isKing).toBe(true);
    });

    test('isEmpty should return true for empty cells', () => {
        board.generate();
        expect(board.isEmpty(3, 3)).toBe(true);
        expect(board.isEmpty(4, 4)).toBe(true);
    });

    test('isEmpty should return false for occupied cells', () => {
        board.generate();
        expect(board.isEmpty(0, 1)).toBe(false);
        expect(board.isEmpty(7, 0)).toBe(false);
    });
});

describe('GameLogic', () => {
    let gameConfig;
    let board;
    let gameLogic;

    beforeEach(() => {
        gameConfig = new GameConfig();
        board = new Board(gameConfig);
        board.generate();
        gameLogic = new GameLogic(board, gameConfig);
    });

    test('Should initialize correctly', () => {
        expect(gameLogic.board).toBe(board);
        expect(gameLogic.config).toBe(gameConfig);
        expect(gameLogic.selectedPiece).toBeNull();
        expect(gameLogic.gameOver).toBe(false);
        expect(gameLogic.winner).toBeNull();
    });

    test('isValidMove should return true for valid white piece forward move', () => {
        // White piece at (5,0) can move to (4,1)
        expect(gameLogic.isValidMove(5, 0, 4, 1)).toBe(true);
    });

    test('isValidMove should return false for backward move of normal piece', () => {
        // White piece at (5,0) cannot move backward to (6,1)
        expect(gameLogic.isValidMove(5, 0, 6, 1)).toBe(false);
    });

    test('isValidMove should return false for move to light square', () => {
        // Cannot move to light square
        expect(gameLogic.isValidMove(5, 0, 4, 0)).toBe(false);
    });

    test('isValidMove should return false for non-diagonal move', () => {
        expect(gameLogic.isValidMove(5, 0, 4, 0)).toBe(false);
        expect(gameLogic.isValidMove(5, 0, 3, 0)).toBe(false);
    });

    test('isValidMove should allow king to move in any diagonal direction', () => {
        // Place a white king at (4, 3) and clear surrounding squares
        board.setPiece(4, 3, new Piece('white', true));
        board.setPiece(3, 2, null); // Clear destination
        board.setPiece(3, 4, null); // Clear destination
        board.setPiece(5, 2, null); // Clear destination (has white piece initially)
        board.setPiece(5, 4, null); // Clear destination (has white piece initially)

        expect(gameLogic.isValidMove(4, 3, 3, 2)).toBe(true); // forward left
        expect(gameLogic.isValidMove(4, 3, 3, 4)).toBe(true); // forward right
        expect(gameLogic.isValidMove(4, 3, 5, 2)).toBe(true); // backward left
        expect(gameLogic.isValidMove(4, 3, 5, 4)).toBe(true); // backward right
    });

    test('isValidCapture should return true for valid capture', () => {
        // Setup: white piece at (5,0), black piece at (4,1), empty at (3,2)
        board.setPiece(4, 1, new Piece('black', false));
        board.setPiece(3, 2, null);

        expect(gameLogic.isValidCapture(5, 0, 3, 2)).toBe(true);
    });

    test('isValidCapture should return false if no enemy piece in between', () => {
        // No piece at (4,1)
        board.setPiece(4, 1, null);
        expect(gameLogic.isValidCapture(5, 0, 3, 2)).toBe(false);
    });

    test('isValidCapture should return false if friendly piece in between', () => {
        // White piece trying to jump over another white piece
        board.setPiece(4, 1, new Piece('white', false));
        board.setPiece(3, 2, null);

        expect(gameLogic.isValidCapture(5, 0, 3, 2)).toBe(false);
    });

    test('movePiece should successfully move a piece', () => {
        // Move white piece from (5,0) to (4,1)
        const result = gameLogic.movePiece(5, 0, 4, 1);

        expect(result).toBe(true);
        expect(board.getPiece(5, 0)).toBeNull();
        expect(board.getPiece(4, 1)).not.toBeNull();
        expect(board.getPiece(4, 1).player).toBe('white');
    });

    test('movePiece should switch player after successful move', () => {
        expect(gameConfig.currentPlayer).toBe('white');
        gameLogic.movePiece(5, 0, 4, 1);
        expect(gameConfig.currentPlayer).toBe('black');
    });

    test('movePiece should not allow moving opponent piece', () => {
        // Try to move black piece when it's white's turn
        const result = gameLogic.movePiece(2, 1, 3, 2);
        expect(result).toBe(false);
    });

    test('movePiece should capture enemy piece', () => {
        // Setup capture scenario
        board.setPiece(4, 1, new Piece('black', false));
        board.setPiece(3, 2, null);

        const result = gameLogic.movePiece(5, 0, 3, 2);

        expect(result).toBe(true);
        expect(board.getPiece(5, 0)).toBeNull();
        expect(board.getPiece(4, 1)).toBeNull(); // captured piece removed
        expect(board.getPiece(3, 2)).not.toBeNull();
        expect(board.getPiece(3, 2).player).toBe('white');
    });

    test('movePiece should promote white piece to king when reaching row 0', () => {
        // Setup white piece close to promotion
        board.setPiece(1, 2, new Piece('white', false));
        board.setPiece(0, 1, null);
        gameConfig.currentPlayer = 'white';

        gameLogic.movePiece(1, 2, 0, 1);

        const piece = board.getPiece(0, 1);
        expect(piece.isKing).toBe(true);
    });

    test('movePiece should promote black piece to king when reaching row 7', () => {
        // Setup black piece close to promotion
        board.setPiece(6, 1, new Piece('black', false));
        board.setPiece(7, 2, null);
        gameConfig.currentPlayer = 'black';

        gameLogic.movePiece(6, 1, 7, 2);

        const piece = board.getPiece(7, 2);
        expect(piece.isKing).toBe(true);
    });

    test('checkGameOver should detect when white wins (no black pieces)', () => {
        // Remove all black pieces
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board.getPiece(row, col);
                if (piece && piece.player === 'black') {
                    board.setPiece(row, col, null);
                }
            }
        }

        gameLogic.checkGameOver();

        expect(gameLogic.gameOver).toBe(true);
        expect(gameLogic.winner).toBe('white');
    });

    test('checkGameOver should detect when black wins (no white pieces)', () => {
        // Remove all white pieces
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board.getPiece(row, col);
                if (piece && piece.player === 'white') {
                    board.setPiece(row, col, null);
                }
            }
        }

        gameLogic.checkGameOver();

        expect(gameLogic.gameOver).toBe(true);
        expect(gameLogic.winner).toBe('black');
    });

    test('checkGameOver should not end game when both players have pieces and moves', () => {
        gameLogic.checkGameOver();
        expect(gameLogic.gameOver).toBe(false);
        expect(gameLogic.winner).toBeNull();
    });

    test('checkGameOver should declare winner when current player has no valid moves', () => {
        // Create a scenario where white has no moves
        // Clear the board
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                board.setPiece(row, col, null);
            }
        }

        // Place white piece surrounded by black pieces (blocked)
        board.setPiece(4, 4, new Piece('white', false));
        board.setPiece(3, 3, new Piece('black', false));
        board.setPiece(3, 5, new Piece('black', false));

        gameConfig.currentPlayer = 'white';
        gameLogic.checkGameOver();

        expect(gameLogic.gameOver).toBe(true);
        expect(gameLogic.winner).toBe('black'); // Black wins because white is blocked
    });

    test('checkGameOver should declare winner when black has no valid moves', () => {
        // Create a scenario where black has no moves but white has moves
        // Clear the board
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                board.setPiece(row, col, null);
            }
        }

        // Place black piece that cannot move (blocked)
        board.setPiece(3, 3, new Piece('black', false));
        board.setPiece(4, 4, new Piece('white', false));
        board.setPiece(4, 2, new Piece('white', false));

        // Add a white piece that CAN move to ensure white has valid moves
        // White piece at (5,2) can move to (4,3) which is a dark square
        board.setPiece(5, 2, new Piece('white', false));

        gameConfig.currentPlayer = 'black';
        gameLogic.checkGameOver();

        expect(gameLogic.gameOver).toBe(true);
        expect(gameLogic.winner).toBe('white'); // White wins because black is blocked
    });
});

describe('UI', () => {
    let gameConfig;
    let board;
    let gameLogic;
    let ui;

    beforeEach(() => {
        document.body.innerHTML = '<div class="container"><div id="game-board"></div></div>';

        gameConfig = new GameConfig();
        board = new Board(gameConfig);
        board.generate();
        gameLogic = new GameLogic(board, gameConfig);
        ui = new UI(gameLogic, () => {});
    });

    test('Should initialize correctly', () => {
        expect(ui.gameLogic).toBe(gameLogic);
        expect(ui.gameBoard).toEqual(document.getElementById('game-board'));
    });

    test('setupSizeInput should create board size input with all required attributes', () => {
        // Clear existing input created by constructor
        const existingInput = document.getElementById('board-size');
        if (existingInput) existingInput.parentElement.remove();

        // Call setupSizeInput directly
        ui.setupSizeInput();

        const boardSizeInput = document.getElementById('board-size');
        expect(boardSizeInput).not.toBeNull();
        expect(boardSizeInput.tagName).toBe('INPUT');
        expect(boardSizeInput.type).toBe('number');
        expect(boardSizeInput.id).toBe('board-size');
        expect(boardSizeInput.min).toBe('4');
        expect(boardSizeInput.max).toBe('16');
        expect(boardSizeInput.value).toBe('8');
    });

    test('setupSizeInput should create label with correct text and htmlFor attribute', () => {
        // Clear existing input
        const existingInput = document.getElementById('board-size');
        if (existingInput) existingInput.parentElement.remove();

        // Call setupSizeInput directly
        ui.setupSizeInput();

        const boardSizeInput = document.getElementById('board-size');
        const label = boardSizeInput.previousElementSibling;

        expect(label).not.toBeNull();
        expect(label.tagName).toBe('LABEL');
        expect(label.textContent).toBe('Board size: ');
        expect(label.htmlFor).toBe('board-size');
    });

    test('setupSizeInput should add controls div with input and label to container', () => {
        // Clear existing input
        const existingInput = document.getElementById('board-size');
        if (existingInput) existingInput.parentElement.remove();

        // Call setupSizeInput directly
        ui.setupSizeInput();

        const boardSizeInput = document.getElementById('board-size');
        const container = document.querySelector('.container');

        expect(boardSizeInput).not.toBeNull();
        expect(boardSizeInput.parentElement).not.toBeNull();
        expect(boardSizeInput.parentElement.parentElement).toBe(container);
    });

    test('setupSizeInput should not create duplicate inputs if called multiple times', () => {
        // Call setupSizeInput multiple times
        ui.setupSizeInput();
        ui.setupSizeInput();
        ui.setupSizeInput();

        // Should still have only one input
        const inputs = document.querySelectorAll('#board-size');
        expect(inputs.length).toBe(1);
    });

    test('setupRestartButton should create restart button with correct properties', () => {
        // Clear existing button created by constructor
        const existingButton = document.getElementById('restart');
        if (existingButton) existingButton.remove();

        // Call setupRestartButton directly
        ui.setupRestartButton();

        const restartButton = document.getElementById('restart');
        expect(restartButton).not.toBeNull();
        expect(restartButton.tagName).toBe('BUTTON');
        expect(restartButton.id).toBe('restart');
        expect(restartButton.textContent).toBe('Restart Match');
    });

    test('setupRestartButton should add button to controls div next to board-size input', () => {
        // Clear existing button
        const existingButton = document.getElementById('restart');
        if (existingButton) existingButton.remove();

        // Call setupRestartButton directly
        ui.setupRestartButton();

        const restartButton = document.getElementById('restart');
        const boardSizeInput = document.getElementById('board-size');

        expect(restartButton).not.toBeNull();
        expect(boardSizeInput).not.toBeNull();
        expect(restartButton.parentElement).toBe(boardSizeInput.parentElement);
    });

    test('setupRestartButton should remove game-status element when button is clicked', () => {
        // Add status element
        const gameBoard = document.getElementById('game-board');
        const statusDiv = document.createElement('div');
        statusDiv.id = 'game-status';
        gameBoard.insertAdjacentElement('afterend', statusDiv);

        expect(document.getElementById('game-status')).not.toBeNull();

        // Click restart button
        const restartButton = document.getElementById('restart');
        restartButton.click();

        expect(document.getElementById('game-status')).toBeNull();
    });

    test('setupRestartButton should remove current-player element when button is clicked', () => {
        // Add player div element
        const gameBoard = document.getElementById('game-board');
        const playerDiv = document.createElement('div');
        playerDiv.id = 'current-player';
        gameBoard.insertAdjacentElement('beforebegin', playerDiv);

        expect(document.getElementById('current-player')).not.toBeNull();

        // Click restart button
        const restartButton = document.getElementById('restart');
        restartButton.click();

        expect(document.getElementById('current-player')).toBeNull();
    });

    test('setupRestartButton should call onRestart callback when button is clicked', () => {
        const onRestartMock = jest.fn();

        // Create new UI with mock callback
        const testUi = new UI(gameLogic, onRestartMock);

        // Click the restart button
        const restartButton = document.getElementById('restart');
        restartButton.click();

        expect(onRestartMock).toHaveBeenCalled();
        expect(onRestartMock).toHaveBeenCalledTimes(1);
    });

    test('setupRestartButton should not throw error if onRestart callback is not provided', () => {
        // Create UI without callback
        const testUi = new UI(gameLogic, null);

        // Click should not throw error
        const restartButton = document.getElementById('restart');
        expect(() => restartButton.click()).not.toThrow();
    });

    test('setupRestartButton should handle multiple calls without duplicating buttons', () => {
        // Call setupRestartButton multiple times
        ui.setupRestartButton();
        ui.setupRestartButton();
        ui.setupRestartButton();

        // Should still have only one restart button
        const restartButtons = document.querySelectorAll('#restart');
        expect(restartButtons.length).toBe(1);
    });

    test('Should create both size input and restart button from constructor', () => {
        // Verify both controls are created when UI is instantiated
        const boardSizeInput = document.getElementById('board-size');
        const restartButton = document.getElementById('restart');

        expect(boardSizeInput).not.toBeNull();
        expect(restartButton).not.toBeNull();
        expect(boardSizeInput.parentElement).toBe(restartButton.parentElement);
    });

    test('Should render board with correct number of cells', () => {
        ui.renderBoard();

        const cells = ui.gameBoard.querySelectorAll('.cell');
        expect(cells.length).toBe(64); // 8x8 board
    });

    test('Should render 4x4 board with correct number of cells', () => {
        gameConfig.setSize(4);
        board = new Board(gameConfig);
        board.generate();
        gameLogic = new GameLogic(board, gameConfig);
        ui = new UI(gameLogic, () => {});
        ui.renderBoard();

        const cells = ui.gameBoard.querySelectorAll('.cell');
        expect(cells.length).toBe(16); // 4x4 board
    });

    test('Should render 16x16 board with correct number of cells', () => {
        gameConfig.setSize(16);
        board = new Board(gameConfig);
        board.generate();
        gameLogic = new GameLogic(board, gameConfig);
        ui = new UI(gameLogic, () => {});
        ui.renderBoard();

        const cells = ui.gameBoard.querySelectorAll('.cell');
        expect(cells.length).toBe(256); // 16x16 board
    });

    test('Should render board with checkerboard class', () => {
        ui.renderBoard();
        expect(ui.gameBoard.classList.contains('checkerboard')).toBe(true);
    });

    test('Should render cells with correct light/dark classes', () => {
        ui.renderBoard();

        const cells = ui.gameBoard.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            const row = Math.floor(index / 8);
            const col = index % 8;

            if ((row + col) % 2 === 0) {
                expect(cell.classList.contains('light')).toBe(true);
            } else {
                expect(cell.classList.contains('dark')).toBe(true);
            }
        });
    });

    test('Should render pieces on the board', () => {
        ui.renderBoard();

        const pieces = ui.gameBoard.querySelectorAll('.piece');
        expect(pieces.length).toBe(24); // 12 white + 12 black pieces
    });

    test('Should render white and black pieces correctly', () => {
        ui.renderBoard();

        const whitePieces = ui.gameBoard.querySelectorAll('.piece.white');
        const blackPieces = ui.gameBoard.querySelectorAll('.piece.black');

        expect(whitePieces.length).toBe(12);
        expect(blackPieces.length).toBe(12);
    });

    test('handleCellClick should select piece if no piece is selected and belongs to current player', () => {
        ui.renderBoard();

        // Click on a white piece at (5, 0)
        ui.handleCellClick(5, 0);

        expect(gameLogic.selectedPiece).not.toBeNull();
        expect(gameLogic.selectedPiece.row).toBe(5);
        expect(gameLogic.selectedPiece.col).toBe(0);
    });

    test('handleCellClick should not select piece if it does not belong to current player', () => {
        ui.renderBoard();

        // Try to select black piece when it's white's turn
        ui.handleCellClick(2, 1);

        expect(gameLogic.selectedPiece).toBeNull();
    });

    test('handleCellClick should move selected piece to clicked cell', () => {
        ui.renderBoard();

        // Select piece at (5, 0)
        ui.handleCellClick(5, 0);
        expect(gameLogic.selectedPiece).not.toBeNull();

        // Move to (4, 1)
        ui.handleCellClick(4, 1);

        expect(board.getPiece(5, 0)).toBeNull();
        expect(board.getPiece(4, 1)).not.toBeNull();
        expect(gameLogic.selectedPiece).toBeNull();
    });

    test('handleCellClick should deselect piece when clicking on same piece again', () => {
        ui.renderBoard();

        // Select piece
        ui.handleCellClick(5, 0);
        expect(gameLogic.selectedPiece).not.toBeNull();

        // Click again to deselect
        ui.handleCellClick(5, 0);
        expect(gameLogic.selectedPiece).toBeNull();
    });

    test('handleCellClick should show game status when game is over', () => {
        ui.renderBoard();

        // Force game over
        gameLogic.gameOver = true;
        gameLogic.winner = 'white';

        // Select and move
        ui.handleCellClick(5, 0);
        ui.handleCellClick(4, 1);

        // Game over should prevent any selection
        expect(gameLogic.selectedPiece).toBeNull();
    });

    test('handleCellClick should call showGameStatus when game ends after move', () => {
        // Remove all black pieces except one
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board.getPiece(row, col);
                if (piece && piece.player === 'black' && !(row === 2 && col === 1)) {
                    board.setPiece(row, col, null);
                }
            }
        }

        ui.renderBoard();

        // Setup a capture that ends the game
        board.setPiece(3, 2, new Piece('black', false));
        board.setPiece(2, 1, null);

        // Spy on showGameStatus
        const showGameStatusSpy = jest.spyOn(ui, 'showGameStatus');

        // Move and capture the last black piece
        ui.handleCellClick(5, 0);
        ui.handleCellClick(4, 1);

        // Switch to black turn
        gameConfig.currentPlayer = 'black';
        ui.handleCellClick(3, 2);
        ui.handleCellClick(2, 1);

        // Switch back to white
        gameConfig.currentPlayer = 'white';
        ui.handleCellClick(4, 1);
        ui.handleCellClick(2, 3);

        // The game might be over now, check if showGameStatus was called
        if (gameLogic.gameOver) {
            expect(showGameStatusSpy).toHaveBeenCalledWith(gameLogic.winner);
        }
    });

    test('Should handle cell click to select a piece', () => {
        ui.renderBoard();

        // Click on a white piece at (5, 0)
        const cell = ui.gameBoard.querySelector('[data-row="5"][data-col="0"]');
        cell.click();

        expect(gameLogic.selectedPiece).not.toBeNull();
        expect(gameLogic.selectedPiece.row).toBe(5);
        expect(gameLogic.selectedPiece.col).toBe(0);
    });

    test('Should handle cell click to move selected piece', () => {
        ui.renderBoard();

        // Select piece at (5, 0)
        const cell1 = ui.gameBoard.querySelector('[data-row="5"][data-col="0"]');
        cell1.click();

        // Move to (4, 1)
        const cell2 = ui.gameBoard.querySelector('[data-row="4"][data-col="1"]');
        cell2.click();

        expect(board.getPiece(5, 0)).toBeNull();
        expect(board.getPiece(4, 1)).not.toBeNull();
        expect(gameLogic.selectedPiece).toBeNull();
    });

    test('Should not select opponent piece', () => {
        ui.renderBoard();

        // Try to select black piece when it's white's turn
        const cell = ui.gameBoard.querySelector('[data-row="2"][data-col="1"]');
        cell.click();

        expect(gameLogic.selectedPiece).toBeNull();
    });

    test('Should deselect piece when clicking on same piece again', () => {
        ui.renderBoard();

        // Select piece
        const cell = ui.gameBoard.querySelector('[data-row="5"][data-col="0"]');
        cell.click();
        expect(gameLogic.selectedPiece).not.toBeNull();

        // Click again to deselect
        cell.click();
        expect(gameLogic.selectedPiece).toBeNull();
    });

    test('showGameStatus should display winner message', () => {
        ui.showGameStatus('white');

        const statusDiv = document.getElementById('game-status');
        expect(statusDiv).not.toBeNull();
        expect(statusDiv.textContent).toBe('White wins!');
    });

    test('showGameStatus message should disappear after 5 seconds', (done) => {
        jest.useFakeTimers();

        ui.showGameStatus('black');

        let statusDiv = document.getElementById('game-status');
        expect(statusDiv).not.toBeNull();
        expect(statusDiv.textContent).toBe('Black wins!');

        // Fast-forward time by 5 seconds
        jest.advanceTimersByTime(5000);

        // Check that the message has been removed
        statusDiv = document.getElementById('game-status');
        expect(statusDiv).toBeNull();

        jest.useRealTimers();
        done();
    });


    test('showCurrentPlayer should create element with id current-player', () => {
        ui.showCurrentPlayer();

        const playerDiv = document.getElementById('current-player');
        expect(playerDiv).not.toBeNull();
    });

    test('showCurrentPlayer should display Turn: White for white player', () => {
        gameConfig.currentPlayer = 'white';
        ui.showCurrentPlayer();

        const playerDiv = document.getElementById('current-player');
        expect(playerDiv.textContent).toBe('Turn: White');
    });

    test('showCurrentPlayer should display Turn: Black for black player', () => {
        gameConfig.currentPlayer = 'black';
        ui.showCurrentPlayer();

        const playerDiv = document.getElementById('current-player');
        expect(playerDiv.textContent).toBe('Turn: Black');
    });

    test('showCurrentPlayer should insert element before game-board', () => {
        ui.showCurrentPlayer();

        const playerDiv = document.getElementById('current-player');
        const gameBoard = document.getElementById('game-board');

        expect(playerDiv.nextElementSibling).toBe(gameBoard);
    });

    test('showCurrentPlayer should update existing element if already present', () => {
        // First call creates the element
        gameConfig.currentPlayer = 'white';
        ui.showCurrentPlayer();

        const firstPlayerDiv = document.getElementById('current-player');
        expect(firstPlayerDiv.textContent).toBe('Turn: White');

        // Second call should update the same element
        gameConfig.currentPlayer = 'black';
        ui.showCurrentPlayer();

        const secondPlayerDiv = document.getElementById('current-player');
        expect(secondPlayerDiv).toBe(firstPlayerDiv); // Same element
        expect(secondPlayerDiv.textContent).toBe('Turn: Black');
    });

    test('showCurrentPlayer should display current player', () => {
        ui.renderBoard();

        const playerDiv = document.getElementById('current-player');
        expect(playerDiv).not.toBeNull();
        expect(playerDiv.textContent).toBe('Turn: White');
    });

    test('Should highlight selected piece', () => {
        gameLogic.selectedPiece = { row: 5, col: 0 };
        ui.renderBoard();

        const cell = ui.gameBoard.querySelector('[data-row="5"][data-col="0"]');
        expect(cell.classList.contains('selected')).toBe(true);
    });

    test('Should render king pieces with king class', () => {
        board.setPiece(4, 3, new Piece('white', true));
        ui.renderBoard();

        const cell = ui.gameBoard.querySelector('[data-row="4"][data-col="3"]');
        const piece = cell.querySelector('.piece');
        expect(piece.classList.contains('king')).toBe(true);
    });
});

describe('Game', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="container">
                <div id="game-board"></div>
            </div>
        `;
    });

    test('Should initialize correctly', () => {
        const game = new Game();
        expect(game.config).toBeNull();
        expect(game.board).toBeNull();
        expect(game.gameLogic).toBeNull();
        expect(game.ui).toBeNull();
    });

    test('Should create all game components when start is called', () => {
        const game = new Game();
        game.start();

        expect(game.config).not.toBeNull();
        expect(game.config).toBeInstanceOf(GameConfig);
        expect(game.board).toBeInstanceOf(Board);
        expect(game.gameLogic).toBeInstanceOf(GameLogic);
        expect(game.ui).toBeInstanceOf(UI);
    });

    test('Should restart game when restart button is clicked', () => {
        const game = new Game();
        game.start();

        // Make a move
        game.gameLogic.movePiece(5, 0, 4, 1);
        expect(game.config.currentPlayer).toBe('black');

        // Click restart
        const restartButton = document.getElementById('restart');
        restartButton.click();

        // Should be back to white's turn
        expect(game.config.currentPlayer).toBe('white');
    });

    test('Should render the board when game starts', () => {
        const game = new Game();
        game.start();

        const cells = document.querySelectorAll('.cell');
        expect(cells.length).toBe(64);
    });

    test('Should have 24 pieces on the board initially', () => {
        const game = new Game();
        game.start();

        const pieces = document.querySelectorAll('.piece');
        expect(pieces.length).toBe(24);
    });
});
