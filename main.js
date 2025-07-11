let tictactoe = {
    gridSelector: document.getElementById("grid"), 
    currentGridValue: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    currentPlayer: "X",

    dialog: document.getElementById("dialog"),
    closeDialog: document.getElementById("close"),
    scoreboard: document.getElementById("scoreboard"),
    scores: JSON.parse(localStorage.getItem("scores")),
    getWinner: function() {
        this.dialog.showModal();
        this.closeDialog.addEventListener("click", () => {
            let score = {
                name: document.getElementById("name").value,
                score: 1
            }
            let imaUnosa = false;
            for(let i = 0; i < this.scores.length; i++) {
                if(score.name === this.scores[i].name) {
                    this.scores[i].score++;
                    imaUnosa = true;
                    break;
                }
            }
            if(imaUnosa == false) {
                this.scores.push({name: document.getElementById("name").value,
                    score: 1});
                localStorage.setItem("scores", this.scores)
            }
            let innerHTMLValue = "";
            this.scores.forEach(score => {
                innerHTMLValue += `<div class="score-entry">${score.name}: ${score.score}</div>`
            }).join("");
            this.scoreboard.innerHTML = innerHTMLValue;

            this.dialog.close();
        });

        this.closeDialog.removeEventListener("click", () => {
            console.log("a")
        });

    },
    check: function(e) {
        if (e.target.innerHTML === "") {
            let id = e.target.id; 
            if (id < 3) {
                this.currentGridValue[0][id] = this.currentPlayer;
            } else if (id >= 3 && id < 6) {
                this.currentGridValue[1][id - 3] = this.currentPlayer;
            } else {
                this.currentGridValue[2][id - 6] = this.currentPlayer;
            }

            e.target.innerHTML = this.currentPlayer;

            if (this.checkWinner()) {
                setTimeout(() => {
                    alert(`${this.currentPlayer} wins!`);
                    this.getWinner();
                    console.log(this.scores);
                    this.resetGame();
                }, 10); 
                return;
            }

            if (this.isTie()) {
                setTimeout(() => {
                    alert("It's a tie!");
                    this.resetGame();
                }, 10); 
                return;
            }

            this.togglePlayer(); 
        }
    },
    togglePlayer: function() {
        this.currentPlayer = (this.currentPlayer === "X") ? "O" : "X";
    },
    checkWinner: function() {
        for (let row of this.currentGridValue) {
            if (row.every(cell => cell === this.currentPlayer)) {
                return true;
            }
        }

        for (let col = 0; col < 3; col++) {
            if (
                this.currentGridValue[0][col] === this.currentPlayer &&
                this.currentGridValue[1][col] === this.currentPlayer &&
                this.currentGridValue[2][col] === this.currentPlayer
            ) {
                return true;
            }
        }
        if (
            this.currentGridValue[0][0] === this.currentPlayer &&
            this.currentGridValue[1][1] === this.currentPlayer &&
            this.currentGridValue[2][2] === this.currentPlayer
        ) {
            return true;
        }
        if (
            this.currentGridValue[0][2] === this.currentPlayer &&
            this.currentGridValue[1][1] === this.currentPlayer &&
            this.currentGridValue[2][0] === this.currentPlayer
        ) {
            return true;
        }

        return false;
    },
    isTie: function() {
        return this.currentGridValue.flat().every(cell => cell !== "");
    },
    resetGame: function() {
        let boxes = document.getElementsByClassName("grid-field");
        Array.from(boxes).forEach((box) => {
            box.innerHTML = ""; // Clear the grid
        });
        this.currentGridValue = [
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

tictactoe.init();
