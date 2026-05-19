index.html

<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tiến Lên 13 Lá</title>

  <link rel="stylesheet" href="style.css">
</head>

<body>

<div id="game">

  <div id="topPlayer" class="enemy top">
    <div class="enemy-name">Player 2</div>
    <div class="enemy-cards" id="topCards"></div>
  </div>

  <div id="leftPlayer" class="enemy left">
    <div class="enemy-name">Player 3</div>
    <div class="enemy-cards vertical" id="leftCards"></div>
  </div>

  <div id="rightPlayer" class="enemy right">
    <div class="enemy-name">Player 4</div>
    <div class="enemy-cards vertical" id="rightCards"></div>
  </div>

  <div id="centerArea">

    <div id="playedCards"></div>

    <div id="buttons">
      <button id="playBtn">Đánh</button>
      <button id="passBtn">Bỏ lượt</button>
    </div>

  </div>

  <div id="myCards"></div>

</div>

<script src="game.js"></script>

</body>
</html>


---

style.css

body{
    margin:0;
    overflow:hidden;
    font-family:Arial;
    background:#3b240b;
}

#game{
    width:100vw;
    height:100vh;
    position:relative;
    background:url("https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200") center/cover;
}

.enemy{
    position:absolute;
    color:white;
    text-align:center;
}

.top{
    top:10px;
    left:50%;
    transform:translateX(-50%);
}

.left{
    left:10px;
    top:50%;
    transform:translateY(-50%);
}

.right{
    right:10px;
    top:50%;
    transform:translateY(-50%);
}

.enemy-name{
    margin-bottom:10px;
    font-size:22px;
    font-weight:bold;
}

.enemy-cards{
    display:flex;
}

.vertical{
    flex-direction:column;
}

.back-card{
    width:50px;
    height:70px;
    background:#eee;
    border:2px solid white;
    border-radius:8px;
    margin-left:-30px;
}

.vertical .back-card{
    margin-top:-45px;
    margin-left:0;
}

#myCards{
    position:absolute;
    bottom:20px;
    left:50%;
    transform:translateX(-50%);
    height:160px;
    width:100%;
}

.card{
    width:80px;
    height:120px;
    background:white;
    border-radius:10px;
    border:2px solid black;
    position:absolute;
    bottom:0;
    text-align:center;
    line-height:120px;
    font-size:32px;
    font-weight:bold;
    transition:0.2s;
    user-select:none;
}

.red{
    color:red;
}

.selected{
    transform:translateY(-30px);
}

#centerArea{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    text-align:center;
}

#playedCards{
    min-height:140px;
    min-width:300px;
}

.center-card{
    width:80px;
    height:120px;
    background:white;
    border-radius:10px;
    border:2px solid black;
    display:inline-block;
    margin:5px;
    line-height:120px;
    font-size:32px;
    font-weight:bold;
}

button{
    margin:10px;
    padding:15px 30px;
    font-size:22px;
    border:none;
    border-radius:15px;
}

#playBtn{
    background:#4caf50;
    color:white;
}

#passBtn{
    background:#f44336;
    color:white;
}


---

game.js

const myCardsDiv = document.getElementById("myCards");
const playedCardsDiv = document.getElementById("playedCards");

const topCards = document.getElementById("topCards");
const leftCards = document.getElementById("leftCards");
const rightCards = document.getElementById("rightCards");

const playBtn = document.getElementById("playBtn");
const passBtn = document.getElementById("passBtn");

const suits = ["♠","♣","♦","♥"];

const values = [
    "3","4","5","6","7","8","9",
    "10","J","Q","K","A","2"
];

let deck = [];
let myCards = [];

function createDeck(){

    deck = [];

    for(let suit of suits){

        for(let value of values){

            deck.push(value + suit);

        }

    }

}

function shuffleDeck(){

    for(let i = deck.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

}

function dealCards(){

    myCards = deck.slice(0,13);

    renderMyCards();

    renderEnemy(topCards,13,false);

    renderEnemy(leftCards,13,true);

    renderEnemy(rightCards,13,true);

}

function renderEnemy(container,count,vertical){

    container.innerHTML = "";

    for(let i=0;i<count;i++){

        const card = document.createElement("div");

        card.className = "back-card";

        container.appendChild(card);

    }

}

function renderMyCards(){

    myCardsDiv.innerHTML = "";

    myCards.forEach((card,index)=>{

        const div = document.createElement("div");

        div.className = "card";

        if(card.includes("♥") || card.includes("♦")){

            div.classList.add("red");

        }

        div.innerText = card;

        div.style.left = (index * 45 + 20) + "px";

        div.onclick = ()=>{

            div.classList.toggle("selected");

        };

        myCardsDiv.appendChild(div);

    });

}

playBtn.onclick = ()=>{

    const selected = document.querySelectorAll(".selected");

    if(selected.length === 0){

        return;

    }

    playedCardsDiv.innerHTML = "";

    let removeCards = [];

    selected.forEach(card=>{

        const value = card.innerText;

        removeCards.push(value);

        const center = document.createElement("div");

        center.className = "center-card";

        if(value.includes("♥") || value.includes("♦")){

            center.classList.add("red");

        }

        center.innerText = value;

        playedCardsDiv.appendChild(center);

    });

    myCards = myCards.filter(card => !removeCards.includes(card));

    renderMyCards();

};

passBtn.onclick = ()=>{

    alert("Bỏ lượt");

};

createDeck();

shuffleDeck();

dealCards();
