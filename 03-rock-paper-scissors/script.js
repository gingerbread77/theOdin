let win = 0;
let lose = 0;
let draw = 0;

const scoreboard = document.querySelector(".scoreboard");
const result = document.querySelector(".result-message");
const gameOptions = document.querySelector(".game-options");
const option = document.querySelectorAll(".game-options .option");
const replayBtn = document.querySelector(".play-again");
const gameResult = document.querySelector(".game-result");

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function displayResultMessage(humanChoice, computerChoice) {
  let resultMessage = "";

  if (
    (humanChoice === "rock" && computerChoice === "paper") ||
    (humanChoice === "scissors" && computerChoice === "rock") ||
    (humanChoice === "paper" && computerChoice === "scissors")
  ) {
    resultMessage = "YOU LOSE!";
    lose++;
  } else if (humanChoice === computerChoice) {
    resultMessage = "It's a tie!";
    draw++;
  } else {
    resultMessage = "Congrats, YOU WIN!";
    win++;
  }

  result.innerHTML = `<h3>${resultMessage}</h3>`;
  result.style.display = "flex";

  scoreboard.innerHTML = `
    <p id="win"><strong>Won: </strong>${win}</p>
    <p id="lose"><strong>Lost: </strong>${lose}</p>
    <p id="draw"><strong>Draw: </strong>${draw}</p>`;

  replayBtn.style.display = "flex";
}

function displayGameArea(humanChoice, computerChoice) {
  const gameContainer = document.createElement("div");
  gameContainer.className = "game-container";
  gameContainer.innerHTML = `
    <div class="versus-text">
      <p>Computer</p>
      <p>vs</p>
      <p>Player</p>
    </div>
    <div class="game-options">
      <img src="./img/${computerChoice}_l.png" alt="computer move" />
      <img src="./img/${humanChoice}_r.png" alt="player move" />
    </div>`;
  gameResult.parentNode.insertBefore(gameContainer, gameResult);
}

option.forEach((btn) => {
  btn.addEventListener("click", () => {
    const humanSelection = btn.dataset.id;
    const computerSelection = getComputerChoice();

    displayResultMessage(humanSelection, computerSelection);
    gameOptions.style.display = "none";

    displayGameArea(humanSelection, computerSelection);
  });
});

replayBtn.addEventListener("click", () => {
  const gameContainer = document.querySelector(".game-container");
  if (gameContainer) gameContainer.remove();

  result.style.display = "none";
  gameOptions.style.display = "flex";

  replayBtn.style.display = "none";
  const audio = new Audio("./sound-effect/game-start.mp3");
  audio.play();
});
