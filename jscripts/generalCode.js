

/* So it begins, the tictactoe of our time */
/* 1) We gonna define two human players, for starters */
const player1 = playerFactory('1', 'X', false);
const player2 = playerFactory('2', 'O', true);
gameFlow.setPlayers(player1,player2);

/* First we gonna put listeners for click in every cell of the board */
for (let i=1;i<=9;i++) {

    let htmlCell = document.getElementById(`cell-${i}`);
    htmlCell.addEventListener('click', gameFlow.controlFlow);
}

/* then we gonna put a listener for the button that starts a new game */
let btnStartGame = document.getElementById('new-game');
btnStartGame.addEventListener('click', gameFlow.startGame);

