let colorCards = document.getElementById("mainContent");
let startBtn = document.getElementById("startBtn");
let displayRgb = document.getElementById("rgbDisplay");
let displayResult = document.getElementById("resultDisplay");
let rgbArr = [];
let tries = 0;
let correctGuesses = 0;
const maxTries = 5;

startBtn.addEventListener("click", startGame);

function startGame() {
    tries = 0;
    correctGuesses = 0;
    displayResult.innerText = '';
    generateNewColors();
}

function generateNewColors() {
    if (tries >= maxTries) {
        checkGameResult();
        return;
    }

    colorCards.innerHTML = '';
    rgbArr = [];

    for (let i = 1; i <= 6; i++) {
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);
        let rgb = `rgb(${r}, ${g}, ${b})`;
        rgbArr.push(rgb);
    }

    let randomIndex = Math.floor(Math.random() * rgbArr.length);
    let randomRgb = rgbArr[randomIndex];
    
    displayRgb.innerText = randomRgb;

    rgbArr.forEach((color) => {
        let span = document.createElement('span');
        span.style.backgroundColor = color;

        span.addEventListener('click', function() {
            displayResult.style.transform = "scale(1.1)";

            if (color === randomRgb) {
                correctGuesses++;
                displayResult.innerText = "Result: Correct!";
                displayResult.style.color = "lightgreen";
            } else {
                displayResult.innerText = "Result: Wrong!";
                displayResult.style.color = "red";
            }

            tries++;

            setTimeout(function() {
                displayResult.style.transform = "scale(1.0)";
            }, 300);

            if (tries < maxTries) {
                setTimeout(function() {
                    generateNewColors();
                }, 700);
            } else {
                checkGameResult();
            }
        });

        colorCards.appendChild(span);
    });
}

function checkGameResult() {
    if (correctGuesses >= 3) {
        alert("You win! You got " + correctGuesses + " correct guesses.");
    } else {
        alert("You lose! You got " + correctGuesses + " correct guesses.");
    }
    startGame();
}
