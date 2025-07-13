const leaderboardButton = document.getElementById("leaderboardButton");
const grid = document.getElementById("grid");
const fields = [...grid.children];

let userInput = "X";

fields.forEach(field => {
    field.addEventListener("click", (e) => {
        e.target.innerHTML = userInput;
        if(userInput == "X") {
            userInput = "O";
        }
        else {
            userInput = "X";
        }
    })
});

