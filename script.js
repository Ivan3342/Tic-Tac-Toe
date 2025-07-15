const WinnerInput = () => {
    const winnerInputField = document.querySelector("#winnerName");
    const submitButton = document.querySelector("#submitWinner");

    const addNewWinner = () => {
        const name = winnerInputField.value;
        const score = 10;
    }
}

//Leaderboard
const Leaderboard = (() => {
    const leaderboardObject = document.querySelector("#leaderboard");
    const leaderboard = [{ name: 'Ivan', score: 20 }];
    const leaderboardList = leaderboardObject.querySelector("ol")

    const updateLeaderboard = () => {
        leaderboardList.innerHTML = "";
        leaderboard.forEach(player => {
            const newElement = document.createElement("li");
            newElement.innerHTML = `${player.name}: ${player.score}`;
            leaderboardList.appendChild(newElement);
        })
    }

    const show = () => {
        updateLeaderboard();
        leaderboardObject.classList.toggle("hidden");
    }
    return { show }

})()

//Gameboard
const Gameboard = (() => {
    const gridObject = document.querySelector("#grid");
    const playerStatusBox = document.querySelector("#playerStatusBox");
    const restartGameButton = document.querySelector("#restartGameButton");
    let currentGrid = ["", "", "", "", "", "", "", "", ""];
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
                restartGameButton.classList.toggle("hidden");
                return true;
            }
        }
        if (currentGrid.every(cell => cell)) {
            playerStatusBox.innerHTML = `<h1>It's a Draw!</h1>`;
            gridObject.style.pointerEvents = "none";
            restartGameButton.classList.toggle("hidden");
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

    const restartGame = () => {
        currentPlayer = "X";
        currentGrid = ["", "", "", "", "", "", "", "", ""];
        [...gridObject.children].forEach(field => {
            field.innerHTML = "";
        })
        playerStatusBox.innerHTML = "";
        gridObject.style.pointerEvents = "auto";
        restartGameButton.classList.toggle("hidden");
    }

    gridObject.addEventListener("click", (e) => {
        if (e.target.id != "grid") {

            currentGrid[e.target.id] = currentPlayer;
            e.target.innerHTML = currentPlayer;

            let gameEnded = checkWinner();

            if (gameEnded != true) {
                changePlayer();
                playerStatusBox.innerHTML = `<h1>${currentPlayer}'s Turn!</h1>`
            }
        }
    })

    return { restartGame }
})();

const leaderboardButton = document.querySelector("#leaderboardButton").addEventListener("click", () => {
    Leaderboard.show();
})

const closeLeaderboardButton = document.querySelector("#closeButton").addEventListener("click", () => {
    Leaderboard.show();
})

const restartGameButton = document.querySelector("#restartGameButton").addEventListener("click", () => {
    Gameboard.restartGame();
})