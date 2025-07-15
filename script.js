//Leaderboard
const Leaderboard = (() => {
    const leaderboardObject = document.querySelector("#leaderboard");

    const show = () => {
        leaderboardObject.classList.toggle("hidden");
    }
    return { show }

})()

//Gameboard
const Gameboard = (() => {
    const gridObject = document.querySelector("#grid");
    const playerStatusBox = document.querySelector("#playerStatusBox");
    const currentGrid = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";

    const checkWinner = () => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]           // diagonals
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (
                currentGrid[a] &&
                currentGrid[a] === currentGrid[b] &&
                currentGrid[a] === currentGrid[c]
            ) {
                playerStatusBox.innerHTML = `<h1>${currentPlayer} Wins!</h1>`;
                gridObject.style.pointerEvents = "none";
                return true;
            }
        }

        // Check for draw
        if (currentGrid.every(cell => cell)) {
             playerStatusBox.innerHTML = `<h1>It's a Draw!</h1>`;
             gridObject.style.pointerEvents = "none";
             return true;
        }
        return false;
    }

    const changePlayer = () => {
        if (currentPlayer == "X") {
            currentPlayer = "O";
        }
        else {
            currentPlayer = "X";
        }
    }

    gridObject.addEventListener("click", (e) => {
        if (e.target.id != "grid") {
            
            currentGrid[e.target.id] = currentPlayer;
            e.target.innerHTML = currentPlayer;
            
            let gameEnded = checkWinner();

            if(gameEnded != true) {
                changePlayer();
                playerStatusBox.innerHTML = `<h1>${currentPlayer}'s Turn!</h1>`
            }
        }
    })
})();

const leaderboardButton = document.querySelector("#leaderboardButton").addEventListener("click", () => {
    Leaderboard.show();
})

const closeLeaderboardButton = document.querySelector("#closeButton").addEventListener("click", () => {
    Leaderboard.show();
})