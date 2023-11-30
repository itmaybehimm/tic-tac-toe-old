let xTurn=true;
let xMoves=[];
let oMoves=[];
let usedMoves=[];
const winningMoves=[
            [0, 1, 2], [3, 4, 5], [6, 7, 8],[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];
let gameOver=false;
let totalMoves=0;
let result=null;
let score=null;
let scoreUpdated=false;

function updateTopTurn(){
  const topMidElement = document.querySelector(".top-mid")

  if(xTurn){
    topMidElement.innerHTML=`<span class="player-turn">Player</span><img src="images/cross.png" class="turn-icon"><span class="player-turn">Turn</span>`;
  }
  else{
    topMidElement.innerHTML=`<span class="player-turn">Player</span><img src="images/circle.png" class="turn-icon"><span class="player-turn">Turn</span>`
  }
}

function startGame(){
  updateScore();
  updateTopTurn();
  addListeners();
}

function playGame(move){
  const audio =  (xTurn)?new Audio('audio/cross.mp3'):new Audio('audio/circle.m4a');
  if (usedMoves.includes(move)){
    return;
  }
  totalMoves++;
  usedMoves.push(move);
  if(xTurn){
    audio.play();
    xMoves.push(move);
    xMoves.sort();
  }
  else{
    audio.play();
    oMoves.push(move);
    oMoves.sort();
  }
  drawIcon(move);
  checkResult();
  if (gameOver) endGame();
  xTurn = !xTurn;
  if(!gameOver) updateTopTurn();
}

function addListeners(){
  for(let i=0;i<=8;i++){
    document.querySelector(`.button${i}`).addEventListener('click',clickHandler(i))
  }

  document.querySelector('body').addEventListener('keydown',handleKeyDown) ;

  document.querySelector('body').addEventListener('keydown',(event)=>{if(event.key==='r') location.reload();})

  document.querySelector('.reset-button').addEventListener('click',()=>{location.reload()})

  document.querySelector('.reset-score-button').addEventListener('click',resetScore)


}

function clickHandler(i){
  return ()=>playGame(i);
}

function handleKeyDown(event){
  const num = Number(event.key);
  if(num>0 && num<10){
    playGame(num-1);
  }
  if(event.key==='r'){
    location.reload();
  }
}

function resetScore(){
  score.xWins=0
  score.oWins=0
  localStorage.setItem('score',JSON.stringify(score));
  updateScore();
}

function drawIcon(move){
  selectedButtonElement=document.querySelector(`.button${move}`)
  if(xTurn){
    selectedButtonElement.innerHTML=`<img src= "images/cross.png" class="play-icon">`
  }
  else{
    selectedButtonElement.innerHTML=`<img src= "images/circle.png" class="play-icon">`
  }
}


function checkResult(){
  if (checkWin(xMoves)){
    gameOver = true;
    result='X Wins';
    return;
  }
  if (checkWin(oMoves)){
    gameOver = true;
    result='O Wins';
    return;
  }
  if (totalMoves === 9 && gameOver===false){
    gameOver = true;
    result='Tie';
    return;
  }
}  

function checkWin(arr){
  let flag =false;
  if (arr.length>=3){
    for(let i=0;i<winningMoves.length;i++){
      temp=winningMoves[i]
      flag = temp.every((elem)=>{return arr.includes(elem)})
      if(flag) break
    }
  }
  return flag
}


function endGame(){
  const topMidElement = document.querySelector(".top-mid");
  if(result!=='Tie'){
    let val=(result==='X Wins')?'cross':'circle';
    topMidElement.innerHTML=`<img src="images/${val}.png" class="turn-icon"><span class="player-turn">Wins</span>`;
  }
  else{
    topMidElement.innerHTML=`<span class="player-turn">It's a Tie</span>`;
  }

  updateScore();

  for(let i=0;i<=8;i++){
    const oldElement = document.querySelector(`.button${i}`);
    const newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);
  }  
  document.querySelector('body').removeEventListener('keydown', handleKeyDown);
}

function updateScore(){

  getScore();

  if(gameOver && !scoreUpdated){
    if(result==='X Wins') score.xWins++;
    if(result==='O Wins') score.oWins++;
    scoreUpdated=true;
  }

  document.querySelector('.X-score').innerHTML=`${score.xWins}`;
  document.querySelector('.O-score').innerHTML=`${score.oWins}`;

  localStorage.setItem('score',JSON.stringify(score))
}

function getScore(){
  scoreStr = localStorage.getItem('score')
  if(scoreStr === null){
    score = {
      xWins:0,
      oWins:0
    }
  }
  else{
    score=JSON.parse(scoreStr)
  }
}

getScore();
startGame();

