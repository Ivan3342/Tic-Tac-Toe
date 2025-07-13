const leaderboardButton = document.getElementById("leaderboardButton");
const leaderboard = document.getElementById("leaderboard");
const closeButton = document.getElementById("closeButton")
const grid = document.getElementById("grid");
const fields = [...grid.children];

leaderboardButton.addEventListener("click", (e) => {
    leaderboard.classList.toggle("hidden")
})

closeButton.addEventListener("click", (e) => {
    leaderboard.classList.toggle("hidden");
})

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

