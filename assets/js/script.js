const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

startGame();

function startGame() {
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
    }, 500);
    setTimeout(() => {
      cardElement.classList.remove("flip");
    }, 2500);

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
    iconElement.src = "./assets/img/card.png";
    cardElementFace.appendChild(iconElement);
  }
  element.appendChild(cardElementFace);
}

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add("flip");

    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards();
        if (game.checkGameOver()) {
          let gameOverLayer = document.getElementById("gameOver");
          gameOverLayer.style.display = "flex";
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
  startGame();
  let gameOverLayer = document.getElementById("gameOver");
  gameOverLayer.style.display = "none";
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
