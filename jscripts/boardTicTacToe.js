
/* Factorial function to define the players */
const playerFactory = (typePlayer, mark) => {
    
    function getTypePlayer() {
        return this.typePlayer;
    }

    function getMark() {
        return this.mark;
    }

    function getIsAMachine() {
        return this.isAMachine;
    }

    return {typePlayer, mark, getTypePlayer, getMark};
}

/* module to control the game flow */
const gameFlow = (() => {
    let board       = [];
    let currentTurn = 0;
    let oddPlayer;
    let evenPlayer;
    let gameState;

    function setPlayers(player1, player2) {
        oddPlayer  = player1;
        evenPlayer = player2;
    }

    function controlFlow() {      

        /* definimos el jugador que está actuando según el turno */
        if (currentTurn > 0 & gameState == 'playing') {   
            
            const currentPlayer = (currentTurn%2==0)?evenPlayer:oddPlayer;
           // const nextPlayer    = (currentTurn%2!=0)?oddPlayer:evenPlayer;

            if (isCellEmpty(this.id)) {
                gameFlow.addMark(this.id, currentPlayer.getMark());
                
                board[gameFlow.getBoardIndex(this.id)] = currentPlayer.getMark();
                
                if (gameFlow.checkWin(currentPlayer))
                {
                    gameState = 'ended';
                    gameFlow.setMessage('win',currentPlayer);
                }
                else {
                    if (gameFlow.checkTie()) {
                        gameState = 'ended';
                        gameFlow.setMessage('tie');
                    }
                }
                currentTurn++;
            
            }
      
        }
    }

    function startGame() {

        /* we clean the game */
        board.fill(' ',0,8);  
        currentTurn = 1; /* first turn */
        gameState = 'playing';
        gameFlow.setMessage('new');
       
        cleanseBoard(); 
    }

    function cleanseBoard () {
        /* first we recover each cell from the board */
        cell1 = document.querySelector("#cell-1 > span");
        cell2 = document.querySelector("#cell-2 > span");
        cell3 = document.querySelector("#cell-3 > span");
        cell4 = document.querySelector("#cell-4 > span");
        cell5 = document.querySelector("#cell-5 > span");
        cell6 = document.querySelector("#cell-6 > span");
        cell7 = document.querySelector("#cell-7 > span");
        cell8 = document.querySelector("#cell-8 > span");
        cell9 = document.querySelector("#cell-9 > span");
        
        cell1.innerText = ' ';
        cell2.innerText = ' ';
        cell3.innerText = ' ';
        cell4.innerText = ' ';
        cell5.innerText = ' ';
        cell6.innerText = ' ';
        cell7.innerText = ' ';
        cell8.innerText = ' ';
        cell9.innerText = ' ';
    }    


    function isCellEmpty(cellId) {

        const insideCell = document.querySelector(`#${cellId} > span`).innerText; 
        

        if (insideCell == ' '  | insideCell == '' |
            insideCell == null | insideCell == undefined) {
            
            return true;
        }       
        else {
            return false;
        }
        
        console.log('<isCellEmpty>');
        console.log('insideCell ->' +insideCell);
        console.log('insideCell.innerText ->' +insideCell.innerText);
    }

    function addMark(cellId, mark) {
        
        const cell = document.querySelector(`#${cellId} > span`); 
        cell.innerText = mark;

        
    }

    function checkWin(player) {
      
        
        const mark = player.getMark();

        if (checkRows(mark)) {
        /* we check for any row with three marks */
            return true;
        }
        else if (checkColumns(mark)) {
        /* we check for any column with three marks */
            return true;
        }
        else if (checkDiagonals(mark)) {
        /* we check for any diagonal with three marks */
            return true;
        }
        else {
        /* win condition not met */
            return false;
        }
    }

    function checkTie() {
        /* this is gonna be easy, if no empty cells from 0-8 in board[]. we call it a Tie */
        for (let i = 0; i<=8; i++) {
            if (board[i] != 'X' & board[i] != 'O')
                return false;
        }
        /* if we reached here, there's a board cell with value different to X and O */
        return true;


    }

    function checkRows(mark) {

            /* first row */
        if ((board[0] == mark) &
            (board[1] == mark) &
            (board[2] == mark)) {
                return true;
        }
        else /* second row */
        if ((board[3] == mark) &
            (board[4] == mark) &
            (board[5] == mark)) {
                return true;

        }
        else /* third row */
        if ((board[6] == mark) &
            (board[7] == mark) &
            (board[8] == mark)) {
                return true;

        }
        else {
            return false;
        }

    }

    function checkColumns(mark) {

            /* first column */
        if ((board[0] == mark) &
            (board[3] == mark) &
            (board[6] == mark)) {
                return true;
        }
        else /* second column */
        if ((board[1] == mark) &
            (board[4] == mark) &
            (board[7] == mark)) {
                return true;

        }
        else /* third column */
        if ((board[2] == mark) &
            (board[5] == mark) &
            (board[8] == mark)) {
                return true;

        }
        else {
            return false;
        }
    }

    function checkDiagonals(mark) {

        /* left-right diagonal */
    if ((board[0] == mark) &
        (board[4] == mark) &
        (board[8] == mark)) {
            return true;
    }
    else /* right-left diagonal */
    if ((board[2] == mark) &
        (board[4] == mark) &
        (board[6] == mark)) {
            return true;
    }
    else {
        return false;
    }
}

    function getBoardIndex(cellId) {
        

        switch(cellId) {
            case "cell-1": return 0; break;
            case "cell-2": return 1; break;
            case "cell-3": return 2; break;
            case "cell-4": return 3; break;
            case "cell-5": return 4; break;
            case "cell-6": return 5; break;
            case "cell-7": return 6; break;
            case "cell-8": return 7; break;
            case "cell-9": return 8; break;
            default: 
            window.alert('BOARD INDEX ERROR ' + id)
            return 'error';
            break;
        }
    }

    function setMessage(typeM, player) {
        const htmlMessage = document.getElementById('messages');

        switch(typeM) {
            case 'new':
                htmlMessage.innerText = 
                'Here\'s a real high class bout!\nPlayer X vs Player O!';
                break;
            case 'win':
                htmlMessage.innerText = `Player ${player.getTypePlayer()} has won!`;
                break;
            case 'tie':
                htmlMessage.innerText = 'The game ended in a tie!';
                break;
            default: break;
        }

    }

   return {setPlayers,controlFlow,startGame,cleanseBoard,addMark,checkWin,getBoardIndex,setMessage, checkTie};
})();


// /* module to control the game flow */
// const gameFlow = (() => {

//     let board       = [];
//     let currentTurn = 0;
//     let oddPlayer;
//     let evenPlayer;

//     console.log('<gameFlow inits>');
//     function setPlayers(player1, player2) {
//         this.oddPlayer  = player1;
//         this.evenPlayer = player2;
//     }

//     function startGame() {

//         /* we clean the game */
//         board.fill(' ',0,8);  
//         currentTurn = 1; /* first turn */
       
//         cleanseBoard(); 
//     }

//     function controlFlow() {

//         console.log('<controlFlow');
//         console.log(this.id)
//     }

//     function addMark(player, cell) {

//         const index = getBoardIndex(cell);
//         const mark = player.getMark();

//         // if ((cell.innerText == undefined)   |
//         //     (cell.innerText == null)        |
//         //     (cell.innerText == ' ')         |
//         //     (cell.innerText == '')) {
//         //         cell.innerText ='<span>'+player.getMark()+'</span>';
//         //         /* we pass the turn for the next player */
//         //         currentTurn++; 
                
//         //     }
//         if ((board[index] == undefined)   |
//             (board[index] == null)        |
//             (board[index] == ' ')         |
//             (board[index] == '')) 
//         {    
//             board[index]  =  mark; 
//             cell.innerText ='<span>'+player.getMark()+'</span>';
//             /* we pass the turn for the next player */
//             currentTurn++;      
//         }


//     }

//     function getBoardIndex(cell) {
//         const id = cell.id;

//         switch(id) {
//             case "cell-1": return 0;
//             case "cell-2": return 1;
//             case "cell-3": return 2;
//             case "cell-4": return 3;
//             case "cell-5": return 4;
//             case "cell-6": return 5;
//             case "cell-7": return 6;
//             case "cell-8": return 7;
//             case "cell-9": return 8;
//             default: 
//             window.alert('BOARD INDEX ERROR ' + id)
//             return 'error';
//         }
//     }

//     function cleanseBoard () {
//         /* first we recover each cell from the board */
//         cell1 = document.querySelector("#cell-1");
//         cell2 = document.querySelector("#cell-2");
//         cell3 = document.querySelector("#cell-3");
//         cell4 = document.querySelector("#cell-4");
//         cell5 = document.querySelector("#cell-5");
//         cell6 = document.querySelector("#cell-6");
//         cell7 = document.querySelector("#cell-7");
//         cell8 = document.querySelector("#cell-8");
//         cell9 = document.querySelector("#cell-9");

//         const auxString = '<span> </span>';

//         cell1.innerText = auxString;
//         cell2.innerText = auxString;
//         cell3.innerText = auxString;
//         cell4.innerText = auxString;
//         cell5.innerText = auxString;
//         cell6.innerText = auxString;
//         cell7.innerText = auxString;
//         cell8.innerText = auxString;
//         cell9.innerText = auxString;
//     }

//     function checkWin(player) {
      
//         const mark = player.getMark();

//         if (checkRows(mark)) {
//         /* we check for any row with three marks */
//             return true;
//         }
//         else if (checkColumns(mark)) {
//         /* we check for any column with three marks */
//             return true;
//         }
//         else if (checkDiagonals(mark)) {
//         /* we check for any diagonal with three marks */
//             return true;
//         }
//         else {
//         /* win condition not met */
//             return false;
//         }
//     }

//     function checkRows(mark) {

//             /* first row */
//         if ((board[0] = mark) &
//             (board[1] = mark) &
//             (board[2] = mark)) {
//                 return true;
//         }
//         else /* second row */
//         if ((board[3] = mark) &
//             (board[4] = mark) &
//             (board[5] = mark)) {
//                 return true;

//         }
//         else /* third row */
//         if ((board[6] = mark) &
//             (board[7] = mark) &
//             (board[8] = mark)) {
//                 return true;

//         }
//         else {
//             return false;
//         }

//     }

//     function checkColumns(mark) {

//             /* first column */
//         if ((board[0] = mark) &
//             (board[3] = mark) &
//             (board[6] = mark)) {
//                 return true;
//         }
//         else /* second column */
//         if ((board[1] = mark) &
//             (board[4] = mark) &
//             (board[7] = mark)) {
//                 return true;

//         }
//         else /* third column */
//         if ((board[2] = mark) &
//             (board[5] = mark) &
//             (board[8] = mark)) {
//                 return true;

//         }
//         else {
//             return false;
//         }
//     }

//     function checkDiagonals(mark) {

//         /* left-right diagonal */
//     if ((board[0] = mark) &
//         (board[4] = mark) &
//         (board[8] = mark)) {
//             return true;
//     }
//     else /* right-left diagonal */
//     if ((board[2] = mark) &
//         (board[4] = mark) &
//         (board[6] = mark)) {
//             return true;
//     }
//     else {
//         return false;
//     }
// }
// return {board,currentTurn,oddPlayer,evenPlayer,setPlayers,controlFlow,startGame,addMark,checkWin};

// })();