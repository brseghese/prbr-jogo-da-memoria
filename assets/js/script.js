const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

const cardClick = document.getElementById("card-click");
const cardCheck = document.getElementById("card-check");
const cardWin = document.getElementById("card-win");
const cardStart = document.getElementById("card-start");

function startGame() {
  let gameStartLayer = document.getElementById("gameStart");
  gameStartLayer.style.display = "none";
  cardStart.play();
  stopTime();
  verificarLocalStorage();
  startTime();
  initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards) {
  let gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";

  game.cards.forEach((card) => {
    let cardElement = document.createElement("div");
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;

    setTimeout(() => {
      cardElement.classList.add("flip");
    }, 300);
    setTimeout(() => {
      cardElement.classList.remove("flip");
    }, 3000);

    createCardContent(card, cardElement);
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement("div");
  cardElementFace.classList.add(face);
  if (face === FRONT) {
    let iconElement = document.createElement("img");
    iconElement.classList.add(ICON);
    iconElement.src = "./assets/img/" + card.icon + ".png";
    cardElementFace.appendChild(iconElement);
  } else {
    let iconElement = document.createElement("img");
    iconElement.classList.add(ICON);
    iconElement.src = "./assets/img/card.png";
    cardElementFace.appendChild(iconElement);
  }
  element.appendChild(cardElementFace);
}

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add("flip");
    cardClick.play();

    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards();
        cardCheck.play();

        if (game.checkGameOver()) {
          let gameOverLayer = document.getElementById("gameOver");
          gameOverLayer.style.display = "flex";

          cardWin.play();
          pauseTime();

          let resultadoP = document.getElementById("resultado");
          resultadoP.textContent = `Parabéns! Tempo de jogo: ${calculateTime(
            time
          )}`;

          compararTime(time);
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);

          firstCardView.classList.remove("flip");
          secondCardView.classList.remove("flip");
          game.unflipCards();
        }, 1000);
      }
    }
  }
}

function restart() {
  game.clearCards();
  compararTime(time);
  startGame();
  cardStart.play();
  let gameOverLayer = document.getElementById("gameOver");
  gameOverLayer.style.display = "none";
}

// ----------------------------------------------

let interval;
let time = 0;
let timeP = document.getElementById("time");

function startTime() {
  let startTime = Date.now() - time;
  interval = setInterval(() => {
    time = Date.now() - startTime;
    timeP.textContent = calculateTime(time);
  }, 1000);
}

function pauseTime() {
  clearInterval(interval);
  timeP.textContent = calculateTime(time);
}

function stopTime() {
  time = 0;
  clearInterval(interval);
  timeP.textContent = "00:00";
}

function calculateTime(time) {
  let totalSeconds = Math.floor(time / 1000);
  let totalMinutes = Math.floor(totalSeconds / 60);

  let displaySeconds = (totalSeconds % 60).toString().padStart(2, "0");
  let displayMinutes = totalMinutes.toString().padStart(2, "0");

  return `${displayMinutes}:${displaySeconds}`;
}

// ----------------------------------------------

// localStorage.setItem("chave", "valor")
// let chave = localStorage.getItem("chave")
// localStorage.removeItem("chave")

function verificarLocalStorage() {
  if (localStorage.length) {
    let timeStorage = localStorage.getItem("time");
    let recorde = document.getElementById("recorde");
    recorde.textContent = timeStorage;
  } else {
    // let zeroTime = localStorage.setItem("time", "00:00");
    let recorde = document.getElementById("recorde");
    recorde.textContent = "00:00";
    // console.log(zeroTime);
  }
}

function compararTime(time) {
  let recorde = document.getElementById("recorde");
  let timeStorage = localStorage.getItem("time");
  let timeA = calculateTime(time);

  let time1 = new Date("2022-01-01 " + timeStorage);
  let time2 = new Date("2022-01-01 " + timeA);

  console.log(time1);
  console.log(time2);

  if (time1 < time2) {
    localStorage.setItem("time", timeStorage);
    recorde.textContent = timeStorage;
  } else {
    localStorage.setItem("time", timeA);
    recorde.textContent = timeA;
  }
  console.log(timeA);
  console.log(timeStorage);
}

// ----------------------------------------------

// function shuffleCards(cards) {
//   let currentIndex = cards.length; // inicializa com o total
//   let randomIndex = 0;

//   // Lógica
//   // Seleciona o ultimo elemento do Array
//   // Sorteia outro elemento do Array mult pelo index corrente
//   // O passo acima descarta possibilidade de selecionar o mesmo índice
//   // Decrementa para continuar o while
//   // Inverte as posições

//   // Não precisa retornar pois o array cards é global

//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;
//     [cards[randomIndex], cards[currentIndex]] = [
//       cards[currentIndex],
//       cards[randomIndex],
//     ];
//   }
// }

// ----------------------------------------------

// function createCardsFromTechs(techs) {
//   let cards = [];

//   // forEach ou for..of

//   techs.forEach((tech) => {
//     cards.push(createPairFromTech(tech));
//   });

//   // for (let tech of techs) {
//   //   cards.push(createPairFromTech(tech));
//   // }

//   // 10 array com 2 objetos cada
//   // console.log(cards);

//   // 1 array com 10 objetos
//   // console.log(cards.map((array) => array[0].icon));

//   // 10 array com 2 objetos cada
//   // console.log(cards.map((array) => array));

//   // 20 objetos em um único array (separa)
//   // console.log(cards.flatMap((array) => array));

//   return cards.flatMap((pair) => pair);
// }

// // retorna 1 array com 2 objetos para outro array (cards)
// function createPairFromTech(tech) {
//   return [
//     {
//       id: createIdWithTech(tech),
//       icon: tech,
//       flipped: false,
//     },
//     {
//       id: createIdWithTech(tech),
//       icon: tech,
//       flipped: false,
//     },
//   ];
// }

// function createIdWithTech(tech) {
//   return tech + parseInt(Math.random() * 1000);
// }
