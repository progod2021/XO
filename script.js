document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const endScreen = document.getElementById("endScreen");
    const endMessage = document.getElementById("endMessage");
    const newGameBtn = document.getElementById("newGameBtn");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    function renderBoard() {
        board.innerHTML = "";
        gameBoard.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.dataset.index = index;
            cellElement.textContent = cell;
            cellElement.addEventListener("click", handleCellClick);
            board.appendChild(cellElement);
        });
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (gameBoard[index] === "" && !isGameOver()) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                showEndScreen(`Player ${currentPlayer} wins!`);
            } else if (isBoardFull()) {
                showEndScreen("It's a draw!");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
        });
    }

    function isBoardFull() {
        return gameBoard.every(cell => cell !== "");
    }

    function isGameOver() {
        return checkWinner() || isBoardFull();
    }

    function showEndScreen(message) {
        endMessage.textContent = message;
        endScreen.style.display = "flex";
    }

    function hideEndScreen() {
        endScreen.style.display = "none";
    }

    function resetGame() {
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        status.textContent = `Player ${currentPlayer}'s turn`;
        hideEndScreen();
        renderBoard();
    }

    // Initial render
    renderBoard();

    // Event listeners
    newGameBtn.addEventListener("click", resetGame);
});
