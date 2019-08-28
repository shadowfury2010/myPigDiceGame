/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, activePlayer, roundScore, contPlay;

init();
//Roll the dice
document.querySelector('.btn-roll').addEventListener('click',function () {
  //Dice generates a random number between 1-6
  if (contPlay){
    var dice;
    dice = Math.floor(Math.random() * 6) + 1;

    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display='block';
    diceDOM.src='dice-'+ dice +'.png';
    document.querySelector('#current-' + activePlayer).textContent = dice;

    //update the round score if the rolled dice wasn't 1
    if(dice !== 1){
    //Add score
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
    //Next PLAYERS
    nextPlayer();
    }
  }

});

//Hold button event listener
document.querySelector('.btn-hold').addEventListener('click', function (){
  if (contPlay){
    //Add current Score to Global score
    score[activePlayer] += roundScore;

    // Change the UI to display the Global score
      document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

    // Check if the player is a winner
      if (score[activePlayer] >= 50) {
      document.querySelector('#name-'+ activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display='none';
      document.querySelector('.player-' + activePlayer +'-panel').classList.add ('winner');
      document.querySelector('.player-' + activePlayer +'-panel').classList.remove ('active');
      contPlay = false;
      } else
    // Next Player
      nextPlayer();
  }
});

document.querySelector('.btn-new').addEventListener('click',init);

function init(){
  score=[0,0];
  activePlayer= 0;
  roundScore=0;
  contPlay = true;

  document.querySelector('.dice').style.display='none';
  document.querySelector('#current-0').textContent='0';
  document.querySelector('#current-1').textContent='0';
  document.querySelector('#score-0').textContent='0';
  document.querySelector('#score-1').textContent='0';
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove ('winner');
  document.querySelector('.player-1-panel').classList.remove ('winner');
  document.querySelector('.player-0-panel').classList.remove ('active');
  document.querySelector('.player-1-panel').classList.remove ('active');
  document.querySelector('.player-0-panel').classList.add ('active');

}

function nextPlayer () {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore=0;
  document.querySelector('.dice').style.display='none';
  document.querySelector('#current-0').textContent='0';
  document.querySelector('#current-1').textContent='0';
  document.querySelector('.player-0-panel').classList.toggle ('active');
  document.querySelector('.player-1-panel').classList.toggle ('active');
}


// A player looses his entire score if he rolls 2 sixes in a row.
