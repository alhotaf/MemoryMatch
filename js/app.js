var openedCard = [];
var numberOfMatchedCards = 0;
var numberOfClicks = 0;
var isFirstTime = true;
var interval;
var cards = document.getElementsByClassName("card");
var timer = document.querySelector(".timer");
timer.innerHTML = "0  minutes : 0  seconds";

//startTimer function uses second and minute variables to calculate the timing
var second = 0;
var minute = 0;
let transformedCards = [...document.querySelectorAll(".card")];

document.body.onload = startGame();

//Add event listener on all cards
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", function() {
    flipCard(this)
  });
}

//shffule and empty deck from previous cards and append new ones
function startGame() {
  var cardsArray = shuffle(transformedCards);

  var cards = document.getElementsByClassName("deck");
  var gameCard = document.querySelector(".deck");
  while (gameCard.firstChild) {
    gameCard.removeChild(gameCard.firstChild);
  }
  cardsArray.forEach(card => gameCard.append(card));
}

function flipCard(card) {
  // check if the card is not matched or already opened to prevent double clicks
  if (card.className !== 'card match' && card.className !== 'card show open') {
    if (isFirstTime) {
      isFirstTime = false;
      startTimer();
    }
    //flip card by adding show and open
    card.className += " " + "show open";
    checkMatch(card);
  }
}

//increase timer after each second useing set interval method
function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + "minutes " + ":" + second + "seconds ";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
  }, 1000);
}

function checkMatch(card) {
  //check number of opened card to compare them
  if (openedCard.length == 0) {
    openedCard.push(card);
    numberOfClicks++;
    starRating(numberOfClicks);
    document.getElementsByClassName("moves")[0].innerHTML = numberOfClicks;
  } else {
    openedCard.push(card);
    //compare opened cards classes
    if (openedCard[0].children[0].getAttribute('class') == openedCard[1].children[0].getAttribute('class')) {
      matched(openedCard);
      openedCard = [];
    } else {
      notMatched(openedCard);
      openedCard = [];
    }
  }
}


function matched(openedCard) {
  setTimeout(function() {
    for (var i = 0; i < openedCard.length; i++) {
      openedCard[i].classList.remove("show", "open");
      openedCard[i].classList.add("match");
      numberOfMatchedCards += 1;
    }
    checkWins();

  }, 1000);
}

function notMatched(openedCard) {
  setTimeout(function() {
    for (var z = 0; z < openedCard.length; z++) {
      openedCard[z].classList.remove("show", "open");
    }

  }, 1000);
}


function starRating(numberOfClicks) {
  let score = 3;
  var star = document.getElementsByClassName("stars")[0];
  console.log(star)

  if (numberOfClicks <= 18) {
    score = 3;
  } else if (numberOfClicks ==19) {
     var element=star.getElementsByTagName("li");
     star.removeChild(element[0]);
    score = 2;
  } else if (numberOfClicks ==30){
    var element=star.getElementsByTagName("li");
    star.removeChild(element[0]);
    score = 1;
  }
  return score;
}

//Check if user wins by seeing if all cards are matched
function checkWins() {
  if (numberOfMatchedCards == 16) {
    clearInterval(interval);
    var grade = starRating(numberOfClicks);
    showInfo(grade);
  }
}

function showInfo(grade) {
  swal({
    title: 'Congratulation',
    text: "You win with  " + numberOfClicks + " moves " + " in time " +
      timer.innerHTML + ", score is :" + grade,
    type: 'success',
    showCancelButton: true,
    confirmButtonText: 'PLAY AGAIN !?!',
    cancelButtonText: 'No.'
  }).then(result => {
    if (result.value) {
      window.location.reload();

    } else {
      // handle dismissals
      // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
    }
  });
}

//TO start the game again, flip and shuffle cards, and reset timer
function restartBtn() {
  window.location.reload();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
