let tictactoe = {
    grid: document.getElementById("grid"),
    currentGrid: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    currentPlayer: "X",  // Track the current player
    check: function(e) {
        // Only update the box if it is empty (no "X" or "O")
        if (e.target.innerHTML === "") {
            let id = parseInt(e.target.id); // Ensure the ID is treated as a number
            if (id < 3) {
                this.currentGrid[0][id] = this.currentPlayer;
            } else if (id >= 3 && id < 6) {
                this.currentGrid[1][id - 3] = this.currentPlayer;
            } else {
                this.currentGrid[2][id - 6] = this.currentPlayer;
            }

            e.target.innerHTML = this.currentPlayer; // Update the UI immediately

            if (this.checkWinner()) {
                setTimeout(() => {
                    alert(`${this.currentPlayer} wins!`);
                    this.resetGame();
                }, 10); // Slight delay to ensure UI update
                return;
            }

            if (this.isTie()) {
                setTimeout(() => {
                    alert("It's a tie!");
                    this.resetGame();
                }, 10); // Slight delay to ensure UI update
                return;
            }

            this.togglePlayer(); // Switch players after a move
        }
    },
    togglePlayer: function() {
        // Switch between "X" and "O"
        this.currentPlayer = (this.currentPlayer === "X") ? "O" : "X";
    },
    checkWinner: function() {
        // Check rows
        for (let row of this.currentGrid) {
            if (row.every(cell => cell === this.currentPlayer)) {
                return true;
            }
        }

        // Check columns
        for (let col = 0; col < 3; col++) {
            if (
                this.currentGrid[0][col] === this.currentPlayer &&
                this.currentGrid[1][col] === this.currentPlayer &&
                this.currentGrid[2][col] === this.currentPlayer
            ) {
                return true;
            }
        }

        // Check diagonals
        if (
            this.currentGrid[0][0] === this.currentPlayer &&
            this.currentGrid[1][1] === this.currentPlayer &&
            this.currentGrid[2][2] === this.currentPlayer
        ) {
            return true;
        }
        if (
            this.currentGrid[0][2] === this.currentPlayer &&
            this.currentGrid[1][1] === this.currentPlayer &&
            this.currentGrid[2][0] === this.currentPlayer
        ) {
            return true;
        }

        return false;
    },
    isTie: function() {
        return this.currentGrid.flat().every(cell => cell !== "");
    },
    resetGame: function() {
        let boxes = document.getElementsByClassName("grid-field");
        Array.from(boxes).forEach((box) => {
            box.innerHTML = ""; // Clear the grid
        });
        this.currentGrid = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        this.currentPlayer = "X"; // Reset to player "X"
    },
    init: function() {
        // Set up the event listeners
        let boxes = document.getElementsByClassName("grid-field");
        Array.from(boxes).forEach((box) => {
            box.addEventListener("click", (e) => {
                this.check(e);  // Call the check function when a box is clicked
            });
        });
    }
}

// Initialize the game
tictactoe.init();
