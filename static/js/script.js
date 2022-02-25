//Challenge 1: Your Age in Days
const ageInDays = () => {
  let birthYear = prompt('What year were you born?')
  let days = (2022 - birthYear) * 365
  let h1 = document.createElement('h1')
  let textAnswer = document.createTextNode('You are ' + days + ' days old.')
  h1.setAttribute('id', 'ageInDays')
  h1.appendChild(textAnswer)
  document.getElementById('flex-box-result').appendChild(h1)
}

const reset = () => {
  document.getElementById('ageInDays').remove()
}

//Challenge 2: Cat Generator
const generateCat = () => {
  let image = document.createElement('img')
  let div = document.getElementById('flex-cat-gen')
  image.src =
    'http://thecatapi.com/api/images/get?format=src&type=gif&size=small'
  div.appendChild(image)
}

//Challenge 3: Rock, Paper, Scissors
const rpsGame = (yourChoice) => {
  let humanChoice, botChoice
  humanChoice = yourChoice.id
  botChoice = numberToChoice(randToRpsInt())
  results = decideWinner(humanChoice, botChoice)
  let message = finalMessage(results)
  rpsFrontEnd(humanChoice, botChoice, message)
}

const randToRpsInt = () => {
  return Math.floor(Math.random() * 3)
}

const numberToChoice = (number) => {
  return ['rock', 'paper', 'scissors'][number]
}

const decideWinner = (yourChoice, computerChoice) => {
  let rpsDataBase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  }

  let yourScore = rpsDataBase[yourChoice][computerChoice]
  let computerScore = rpsDataBase[computerChoice][yourChoice]

  return [yourScore, computerScore]
}

const finalMessage = ([yourScore, computerScore]) => {
  if (yourScore === 0) {
    return { message: 'You Lost!', color: 'red' }
  } else if (yourScore === 0.5) {
    return { message: 'You Tied!', color: 'yellow' }
  } else {
    return { message: 'You Won!', color: 'green' }
  }
}

const rpsFrontEnd = (humanImageChoice, botImageChoice, finalMessage) => {
  let imagesDatabase = {
    rock: document.getElementById('rock').src,
    paper: document.getElementById('paper').src,
    scissors: document.getElementById('scissors').src,
  }

  document.getElementById('rock').remove()
  document.getElementById('paper').remove()
  document.getElementById('scissors').remove()

  let humanDiv = document.createElement('div')
  let messageDiv = document.createElement('div')
  let botDiv = document.createElement('div')

  humanDiv.innerHTML =
    "<img src='" +
    imagesDatabase[humanImageChoice] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)' />"

  messageDiv.innerHTML =
    "<h1 style='color:" +
    finalMessage['color'] +
    "; font-size: 60px; padding: 30px;' >" +
    finalMessage['message'] +
    '</h1>'

  botDiv.innerHTML =
    "<img src='" +
    imagesDatabase[botImageChoice] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)' />"

  document.getElementById('flex-box-rps-div').appendChild(humanDiv)
  document.getElementById('flex-box-rps-div').appendChild(messageDiv)
  document.getElementById('flex-box-rps-div').appendChild(botDiv)
}

//Challenge 4: Change the Color of All Buttons
let all_buttons = document.getElementsByTagName('button')

let copyAllButtons = []
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1])
}

const buttonColorChange = (buttonThing) => {
  if (buttonThing.value === 'red') {
    buttonsRed()
  } else if (buttonThing.value === 'green') {
    buttonsGreen()
  } else if (buttonThing.value === 'reset') {
    buttonsReset()
  } else if (buttonThing.value === 'random') {
    buttonsRandom()
  }
}

const buttonsRed = () => {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1])
    all_buttons[i].classList.add('btn-danger')
  }
}

const buttonsGreen = () => {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1])
    all_buttons[i].classList.add('btn-success')
  }
}

const buttonsReset = () => {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1])
    all_buttons[i].classList.add(copyAllButtons[i])
  }
}

const buttonsRandom = () => {
  let choices = ['btn-primary', 'btn-success', 'btn-warning', 'btn-danger']
  for (let i = 0; i < all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4)
    all_buttons[i].classList.remove(all_buttons[i].classList[1])
    all_buttons[i].classList.add(choices[randomNumber])
  }
}

//Challenge 5: Blackjack
let blackjackGame = {
  you: { scoreSpan: '#your-blackjack-result', div: '#your-box', score: 0 },
  dealer: {
    scoreSpan: '#dealer-blackjack-result',
    div: '#dealer-box',
    score: 0,
  },
  cards: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.wav')
const winSound = new Audio('static/sounds/win.wav')
const lossSound = new Audio('static/sounds/loss.wav')

const blackjackHit = () => {
  if (blackjackGame['isStand'] === false) {
    let card = randomCard()
    showCard(YOU, card)
    updateScore(YOU, card)
    showScore(YOU)
  }
}

const randomCard = () => {
  let randomIndex = Math.floor(Math.random() * 13)
  return blackjackGame['cards'][randomIndex]
}

const showCard = (activePlayer, card) => {
  if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img')
    cardImage.src = `static/images/${card}.png`
    document.querySelector(activePlayer['div']).appendChild(cardImage)
    hitSound.play()
  }
}

const blackjackDeal = () => {
  if (blackjackGame['turnsOver'] === true) {
    blackjackGame['isStand'] = false

    let yourImages = document.querySelector('#your-box').querySelectorAll('img')
    let dealerImages = document
      .querySelector('#dealer-box')
      .querySelectorAll('img')

    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove()
    }

    for (let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove()
    }

    YOU['score'] = 0
    DEALER['score'] = 0

    document.querySelector('#your-blackjack-result').textContent = 0
    document.querySelector('#your-blackjack-result').style.color = 'white'

    document.querySelector('#dealer-blackjack-result').textContent = 0
    document.querySelector('#dealer-blackjack-result').style.color = 'white'

    document.querySelector('#blackjack-result').textContent = "Let's Play"
    document.querySelector('#blackjack-result').style.color = 'black'

    blackjackGame['turnsOver'] = true
  }
}

const updateScore = (activePlayer, card) => {
  if (card === 'A') {
    // If adding 11 keeps the score below 21, add 11. Otherwise add 1.
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1]
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0]
    }
  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card]
  }
}

const showScore = (activePlayer) => {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!'
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent =
      activePlayer['score']
  }
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const dealerLogic = async () => {
  blackjackGame['isStand'] = true

  while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
    let card = randomCard()
    showCard(DEALER, card)
    updateScore(DEALER, card)
    showScore(DEALER)
    await sleep(1000)
  }

  blackjackGame['turnsOver'] = true
  let winner = computeWinner()
  showResult(winner)
}

const computeWinner = () => {
  let winner

  if (YOU['score'] <= 21) {
    if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
      blackjackGame['wins']++
      winner = YOU
    } else if (YOU['score'] < DEALER['score']) {
      blackjackGame['losses']++
      winner = DEALER
    } else if (YOU['score'] === DEALER['score']) {
      blackjackGame['draws']++
    }
  } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
    blackjackGame['losses']++
    winner = DEALER
  } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
    blackjackGame['draws']++
  }

  console.log(blackjackGame)
  return winner
}

const showResult = (winner) => {
  let message, messageColor

  if (blackjackGame['turnsOver'] === true) {
    if (winner === YOU) {
      document.querySelector('#wins').textContent = blackjackGame['wins']
      message = 'You Won!'
      messageColor = 'green'
      winSound.play()
    } else if (winner === DEALER) {
      document.querySelector('#losses').textContent = blackjackGame['losses']
      message = 'You Lost!'
      messageColor = 'red'
      lossSound.play()
    } else {
      document.querySelector('#draws').textContent = blackjackGame['draws']
      message = 'You Drew!'
      messageColor = 'black'
    }

    document.querySelector('#blackjack-result').textContent = message
    document.querySelector('#blackjack-result').style.color = messageColor
  }
}

document
  .querySelector('#blackjack-hit-button')
  .addEventListener('click', blackjackHit)
document
  .querySelector('#blackjack-deal-button')
  .addEventListener('click', blackjackDeal)
document
  .querySelector('#blackjack-stand-button')
  .addEventListener('click', dealerLogic)
