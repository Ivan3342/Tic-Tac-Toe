//Leaderboard
const Leaderboard = (() => {
    const leaderboardObject = document.getElementById("leaderboard");

    const show = () => {
        leaderboardObject.classList.toggle("hidden");
    }
    return { show }

})()





const leaderboardButton = document.querySelector("#leaderboardButton").addEventListener("click", ()=> {
    Leaderboard.show();
})

const closeLeaderboardButton = document.querySelector("#closeButton").addEventListener("click", ()=>{
    Leaderboard.show();
})