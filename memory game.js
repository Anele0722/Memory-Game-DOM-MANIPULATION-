// Generate an array of unique letters (A-H) for card pairs
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Duplicate the letters to create pairs
const cardPairs = [...letters, ...letters];

// Shuffle the card pairs randomly
cardPairs.sort(() => Math.random() - 0.5);

// Create the game board with cards
const gameBoard = document.querySelector('.game-board');
//creating each card and adding it to the game board
cardPairs.forEach((letter, index) => {
    const card = document.createElement('div'); //card element creation
    card.classList.add('card');
    card.dataset.letter = letter; //data attribute for letter
    card.dataset.index = index;   //data attribute for index
    
    const front = document.createElement('div'); //creating front and back elements for the card
    front.classList.add('front');
    
    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = letter;
    
    card.appendChild(front); //appending fornt and back elements to the card
    card.appendChild(back);
    
    gameBoard.appendChild(card); //card appended to the gameboard
});
// inititializing an array to track fliiped cards and a lock to prevent flipping 
let flippedCards = [];
let lockBoard = false;
//flip logic. if the board is locked or same card is clicked again, do nothing 
function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return;

    this.classList.add('flip'); //shows the back of the card

    if (flippedCards.length === 0) { //add card if no cards are flipped 
        flippedCards.push(this);
    } else {
        flippedCards.push(this);

        const [firstCard, secondCard] = flippedCards;

        if (firstCard.dataset.letter === secondCard.dataset.letter) { //
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
//Selecting all cards and adding event listeners
const cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', flipCard));

function checkWin() { //check if all pairs have been matched 
    if (document.querySelectorAll('.card.flip').length === cardPairs.length) {
        alert('All pairs matched. You won!');
    }
}
