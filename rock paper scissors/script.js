const choiceBtns = document.querySelectorAll(".choice")
const choiceBtnsContainer = document.querySelector(".choice-container")

const player_choice =document.querySelector(".player-choice")
const comp_choice= document.querySelector(".comp-choice")

const messageContainer =document.querySelector(".message-container")
const moveMsg = document.querySelector(".move-message")
const board = document.querySelector(".board")

const continueBtn =document.querySelector(".continue-btn")
const restartBtn =document.querySelector(".restart-btn")

const playerScore = document.querySelector(".player-score")
const compScore = document.querySelector(".comp-score")


choiceBtns.forEach(choice => choice.addEventListener("click",(e)=>{
    let type = e.target.closest(".choice").dataset.type

    moveMsg.style.opacity = 0;
    choiceBtnsContainer.classList.add("blocked")
    draw(type,player_choice)
    IAmove();
    updateScreen();

}))

var STRONGER_THAN={
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
}

var PLAYER_SCORE = 0 
var  COMP_SCORE = 0
function draw(type,parent){
    const elt = document.createElement("div")
    // elt.classList.add(type)
    parent.dataset.type = type
    parent.dataset.StrongerThan = STRONGER_THAN[type]

    const elt_img = document.createElement("img")
    elt_img.setAttribute("src","imgs/"+type+".png")
    elt.append(elt_img)

    parent.append(elt)
}
function updateScreen(){
    const message_elt = document.createElement("div")
    message_elt.classList.add("message")

    setTimeout(()=>{
    if(checkForWin() == true){
        message_elt.innerText = "you win !"
        PLAYER_SCORE++
        playerScore.innerText = PLAYER_SCORE
        // board.style.backgroundColor = "yellowgreen"
    }
    else if(checkForWin() == false){
        message_elt.innerText = "you lose :("
        COMP_SCORE++
        compScore.innerText = COMP_SCORE
        // board.style.backgroundColor = "crimson"
    }
    else {
        message_elt.innerText = "draw"
        // board.style.backgroundColor = "brown"
    }

    messageContainer.append(message_elt)
    continueBtn.classList.replace("unclickable", "clickable")


    },800)
}

function clearBoard(){
    [...board.children].forEach(child=> child.children[0].remove())
}

restartBtn.addEventListener("click",()=>{
    location.reload();
})

continueBtn.addEventListener("click",()=>{
    continueBtn.classList.replace("clickable","unclickable")
    choiceBtnsContainer.classList.remove("blocked")
    clearBoard();
    moveMsg.style.opacity = 1;
})

var options = ["rock","paper","scissors"]
function randomNumber(num1,num2){
    return Math.floor(Math.random()*(num2-num1)+num1);
}

function IAmove(){
    let randomIndex = randomNumber(0,options.length)
    draw(options[randomIndex],comp_choice)

}


function checkForWin(){
    if(player_choice.dataset.StrongerThan == comp_choice.dataset.type) return true;
    if(player_choice.dataset.type ==  comp_choice.dataset.type) return "draw"
    return false
}
