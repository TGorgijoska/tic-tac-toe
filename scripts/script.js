const gamepiece = document.querySelectorAll('.gameboard_piece');
const startBtn = document.querySelector('#start');
const restartBtn = document.getElementById('restart');
const form = document.querySelector('form');
const winnerDisplay = document.getElementById('winner');
const turnDisplay = document.getElementById('player');

let currSymbol, current;

const gameBoard = (function(){
    
    const Player = (name, symbol) => {
        return {name, symbol};
    };
    let playerA, playerB;
    let _game = [];
    let _name, _gameWon=false, _round=0;
    
    const modal = document.querySelector('.modal');
    const inputA = document.querySelector('#a');
    const inputB = document.querySelector('#b');

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

          
    function startGame() {
        _name = inputA.value == "" ? "PlayerA" : inputA.value;
        playerA = Player(_name, "o");
        _name = inputB.value == "" ? "PlayerB" : inputB.value;
        playerB = Player(_name, "x");
        _setTurn();
        modal.classList.add('remove');   
    }
    function play() {
        _round++;
        let piece = this.dataset.position;
        displayController.displaySelectedSpot(piece, currSymbol);
        _populateGame(piece, currSymbol);
        _checkForWinner();      
    }
    const resetGame = () => {
        _game = [];
        _gameWon = false;
        _round = 0;
        displayController.displayNextPlayer();
    }

    const _populateGame = (place, value) => {
        _game[place] = value;
    }
    function _setTurn() {
        if(current == undefined) {
            current = playerA;
            currSymbol = current.symbol;
            displayController.displayNextPlayer();
            return;
        } 
        current == playerA ? current = playerB : current = playerA
        currSymbol = current.symbol;
        displayController.displayNextPlayer();
    }
    function _checkForWinner() {
        for (let i = 0; i <= 7; i++) {
            let a = _game[winningCombos[i][0]];
            let b = _game[winningCombos[i][1]];
            let c = _game[winningCombos[i][2]];
            
            if (!a || !b || !c) {
              continue;
            }
            if (a === b && b === c) {
              _gameWon = true;
              break;
            }
        }
        if(_gameWon){
            gamepiece.forEach(piece => piece.classList.add('disable'));
            winnerDisplay.textContent = `${current.name} won!`;
            turnDisplay.textContent = "";
            return;
        }
        if(_round == 9){
            gamepiece.forEach(piece => piece.classList.add('disable'));
            winnerDisplay.textContent = "its a tie";
            turnDisplay.textContent = "";
            return;
        }
        
        _setTurn();
    }

    return {
        startGame,
        play,
        resetGame,
    };
})();

const displayController = (function(){
        
    const hoverEffectAdd = (e) => {
        let piece = e.target;
        piece.style.backgroundImage = `url(images/${currSymbol}.png)`;
    }
    const hoverEffectRemove = (e) =>{
        let piece = e.target;
        piece.style.backgroundImage = "";
    }
    gamepiece.forEach(piece => piece.addEventListener('mouseover', hoverEffectAdd))
    gamepiece.forEach(piece => piece.addEventListener('mouseout', hoverEffectRemove))

    function _disableSpot(place) {
        gamepiece[place].classList.add('disable');
    }
    function _enableSpot(place) {
        gamepiece[place].classList.remove('disable');
    }
    function displayNextPlayer() {
        turnDisplay.textContent = `${current.name}'s turn'`;
    }
    function displaySelectedSpot (place, value) {
        const img = gamepiece[place].querySelector('img');
        img.src = `images/${value}.png`;
        _disableSpot(place);
    }
    function resetGame() {
        gamepiece.forEach((piece)=>{
            place = piece.dataset.position;
            let img = gamepiece[place].querySelector('img');
            img.src = "";
            _enableSpot(place);
        })
        winnerDisplay.textContent = "";
    }
    return {
        displaySelectedSpot,
        displayNextPlayer,
        resetGame,
    };
})()

gamepiece.forEach(piece => piece.addEventListener('click', gameBoard.play.bind(piece)));
startBtn.addEventListener('click', gameBoard.startGame);
restartBtn.addEventListener('click', restartGame);
form.addEventListener('submit', handleForm);


function restartGame(){
    gameBoard.resetGame();
    displayController.resetGame();
}

function handleForm(event) { 
    event.preventDefault(); 
}


