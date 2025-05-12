let tictactoe = {
    //Tabla i Igrac
    gridSelector: document.getElementById("grid"), 
    currentGridValue: [ //vrednost polja
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    currentPlayer: "X", // Trenutni igrac

    //Score
    dialog: document.getElementById("dialog"),
    closeDialog: document.getElementById("close"),
    scoreboard: document.getElementById("scoreboard"),
    scores: JSON.parse(localStorage.getItem("scores")),
    getWinner: function() {
        //Otvaranje dialoga
        this.dialog.showModal();
        //Omogucavanje da se zatvori dialog
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

        
        //Uzima score
    },
    check: function(e) {
        // Only update the box if it is empty (no "X" or "O")
        if (e.target.innerHTML === "") {
            let id = e.target.id; // Ensure the ID is treated as a number
            if (id < 3) {
                this.currentGridValue[0][id] = this.currentPlayer;
            } else if (id >= 3 && id < 6) {
                this.currentGridValue[1][id - 3] = this.currentPlayer;
            } else {
                this.currentGridValue[2][id - 6] = this.currentPlayer;
            }

            e.target.innerHTML = this.currentPlayer; // Update the UI immediately

            if (this.checkWinner()) {
                setTimeout(() => {
                    alert(`${this.currentPlayer} wins!`);
                    this.getWinner();
                    console.log(this.scores);
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
        for (let row of this.currentGridValue) {
            if (row.every(cell => cell === this.currentPlayer)) {
                return true;
            }
        }

        // Check columns
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
