const gamepiece = document.querySelectorAll('.gameboard_piece');
const startBtn = document.querySelector('#start');
const modal = document.querySelector('.modal');
const form = document.querySelector('form');
const inputA = document.querySelector('#a');
const inputB = document.querySelector('#b');

const hoverEffect = (e) => {
    let piece = e.target;
    piece.style.backgroundImage = `url(images/${bgImage}.png)`;
}
const hoverRemove = (e) =>{
    let piece = e.target;
    piece.style.backgroundImage = "";
}
let bgImage = "o";
let current, next;

// gamepiece.forEach(piece => piece.addEventListener('click'));
gamepiece.forEach(piece => piece.addEventListener('mouseover', hoverEffect))
gamepiece.forEach(piece => piece.addEventListener('mouseout', hoverRemove))
startBtn.addEventListener('click', startGame);
form.addEventListener('submit', handleForm);
const gameBoard = (function(){
    let _game = ["x","x","x","o","o","x","o","x","o"];

    const populateGame = (place, value) => {
        _game[place] = value;
    }

    return (populateGame);
})();

const displayController = (function(){
    const printImg = (place, value) => {
        const img = gamepiece[place].querySelector('img');
        img.src = `images/${value}.png`;
    }
    return (printImg);
})()

const Player = (name, symbol) => {
    const getName = () => {
        return name;
    }
    return {getName};
};
function startGame() {
    const playerA = Player(inputA.value, "o");
    const playerB = Player(inputB.value, "x");
    modal.classList.add('remove');   
}

function handleForm(event) { 
    event.preventDefault(); 
}


