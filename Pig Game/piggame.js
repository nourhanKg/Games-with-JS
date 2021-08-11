"use strict";

//elements to use
const player1 = document.querySelector(".one");
const player2 = document.querySelector(".two");
const rollBtn = document.querySelector(".roll");
const holdBtn = document.querySelector(".hold");
const againBtn = document.querySelector(".again");
const playerName = document.querySelectorAll(".name");

let image = document.querySelector(".dice");
let score1 = document.querySelector(".score1");
let current1 = document.querySelector(".current1");
let score2 = document.querySelector(".score2");
let current2 = document.querySelector(".current2");

//at start of game
let currentScore, accScore1, accScore2, playing;

function initialize() {
    currentScore = 0;
    accScore1 = 0;
    accScore2 = 0;
    playing = true;
}
initialize();

//to switch players
function switchPlayer(active, inactive) {
    active.classList.toggle("active");
    inactive.classList.toggle("active");
    currentScore = 0;
}

//rolling dice
function rollDice() {
    if(playing) {
        let dice = Math.trunc(Math.random() * 6) + 1;
        image.setAttribute("src", `./dice-${dice}.png`);
        if(dice === 1) { // check to change player
            if(player1.classList.contains("active")) {
                switchPlayer(player1, player2);
                current1.textContent = currentScore;
            }
            else {
                switchPlayer(player2, player1);
                current2.textContent = currentScore;
            }
        }
        else { //display current score
            currentScore += dice;
            player1.classList.contains("active") ? current1.textContent = currentScore : current2.textContent = currentScore;
        }         
    }
}

//holding dice
function hold() {
    if(playing) {
        if(player1.classList.contains("active")) { //adding score to player1
            accScore1 += currentScore;
            score1.textContent = accScore1;
            if(accScore1 >= 100) { // check if player won
                player1.classList.add("winner");
                playerName[0].classList.remove("name");
                image.setAttribute("src", "");
                playing = false;
            }
            else {
                switchPlayer(player1, player2);
                current1.textContent = currentScore;
            }
        }
        else { //adding score to player2
            accScore2 += currentScore;
            score2.textContent = accScore2;
            if(accScore2 >= 100) {
                player2.classList.add("winner");
                playerName[1].classList.remove("name");
                image.setAttribute("src", "");
                playing = false;
            }
            else {
                switchPlayer(player2, player1);
                current2.textContent = currentScore;
            }
        }
    }
}

//restart game
function reset() {
    initialize();
    current1.textContent = "0";
    current2.textContent = "0";
    score1.textContent = "0";
    score2.textContent = "0";
    image.setAttribute("src", "");
    player1.classList.add("active");
    player2.classList.remove("active");
    player1.classList.remove("winner");
    player2.classList.remove("winner");
    for(let i = 0; i < playerName.length; i++) 
        playerName[i].classList.add("name");
}

rollBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", hold);
againBtn.addEventListener("click", reset);