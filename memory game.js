// Generate an array of unique letters (A-H) for card pairs
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Duplicate the letters to create pairs
const cardPairs = [...letters, ...letters];

// Shuffle the card pairs randomly
cardPairs.sort(() => Math.random() - 0.5);

// Create the game board with cards
const gameBoard = document.querySelector('.game-board');

cardPairs.forEach((letter, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.letter = letter; 
    card.dataset.index = index;
    
    const front = document.createElement('div');
    front.classList.add('front');
    
    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = letter;
    
    card.appendChild(front);
    card.appendChild(back);
    
    gameBoard.appendChild(card);
});

let flippedCards = [];
let lockBoard = false;

function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return;

    this.classList.add('flip');

    if (flippedCards.length === 0) {
        flippedCards.push(this);
    } else {
        flippedCards.push(this);

        const [firstCard, secondCard] = flippedCards;

        if (firstCard.dataset.letter === secondCard.dataset.letter) {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            flippedCards = [];
            checkWin(); // Checking for win after each successful match
        } else {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                flippedCards = [];
                lockBoard = false;
            }, 1000);
        }
    }
}

const cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', flipCard));

function checkWin() {
    if (document.querySelectorAll('.card.flip').length === cardPairs.length) {
        alert('All pairs matched. You won!');
    }
}
