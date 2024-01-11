"use strict"
//For x, O figure
const secMenu = document.querySelector(".sec-menu");
const secStart = document.querySelector(".sect-start");

const Menu = document.querySelector(".sec-menu_figure");
const RectXBackground = document.querySelector("#sec-menu_figure-x-background");
const RectOBackground = document.querySelector("#sec-menu_figure-o-background");
const FigureX = document.querySelector("#sec-menu_figure-x");
const FigureO = document.querySelector("#sec-menu_figure-o");
//For yellow button
const yellowButton = document.querySelector(".sec-menu_yellow-button");
const blueButton = document.querySelector(".sec-menu_blue-button");
const turnX = document.querySelector("#turnX");
const turnO = document.querySelector("#turnO");
const startBody = document.querySelector(".sect-start_body");
// const xyCont = document.querySelector(".xy-container");

let XO = "o";
let hoverXO = "o";
let X = "x";
let O = "o";

// When we choose X
const hoverX = () =>{
    RectXBackground.children[0].style.fill = "#1A2A33";
};
RectXBackground.addEventListener("mouseover", () =>{
    if(hoverXO == O){
        //Hover 
        RectXBackground.children[0].style.fill = "rgba(168, 191, 201, 0.05)";
        RectXBackground.addEventListener("mouseout", hoverX);
        //Click
        RectXBackground.addEventListener("click", () => {
            RectXBackground.removeEventListener("mouseout", hoverX);
            RectXBackground.children[0].style.fill = "#A8BFC9";
            FigureX.style.fill = "#1A2A33";
            hoverXO = X;
            XO = X;
            RectOBackground.children[0].style.fill = "#1A2A33";
            FigureO.style.fill = "#A8BFC9";
        });
    }
});

// When we choose O
const hoverO = () =>{
    RectOBackground.children[0].style.fill = "#1A2A33";
};
RectOBackground.addEventListener("mouseover", () =>{
    if(hoverXO == X){
        //Hover 
        RectOBackground.children[0].style.fill = "rgba(168, 191, 201, 0.05)";
        RectOBackground.addEventListener("mouseout", hoverO);
        //Click
        RectOBackground.addEventListener("click", () => {
            RectOBackground.removeEventListener("mouseout",hoverO);
            RectOBackground.children[0].style.fill = "#A8BFC9";
            FigureO.style.fill = "#1A2A33";
            hoverXO = O;
            XO = O;
            RectXBackground.children[0].style.fill = "#1A2A33";
            FigureX.style.fill = "#A8BFC9";
        });
    }
});

const turnXorO = (XorO) => {
    if(XorO == X){
        turnX.style.display = "inline-block";   
        turnO.style.display = "none";   
    }else if(XorO == O){
        turnX.style.display = "none";   
        turnO.style.display = "inline-block";
    }
}

// X, O Hover logic
let outlineX = "<img class='outline' src='./assets/icon-x-outline.svg'>";
let outlineO = "<img class='outline' src='./assets/icon-o-outline.svg'>";

let iconX = "<img class='icon x' src='./assets//icon-x.svg'>";
let iconO = "<img class='icon o' src='./assets//icon-o.svg'>";

const secCover = document.querySelector(".sec-cover");
const wonOrLostTxt = document.querySelector(".won-or-lost-txt");
const takesTheRound = document.querySelector(".takes-the-round");
const imgXO = document.querySelector(".img-x-o");

const quitButton = document.querySelector(".sec-cover_quit-button");
const nextButton = document.querySelector(".sec-cover_next-button");
const imgCont = document.querySelector(".sec-cover_img-cont");

const restart = document.querySelector(".sect-start_head-restart");
const noCancel = document.querySelector(".sec-cover_cancel-button");
const yesRestart = document.querySelector(".sec-cover_restart-button");

const pX = document.querySelector("#p-X");
const pO = document.querySelector("#p-O");
const ties = document.querySelector("#number-ties");
const numberX = document.querySelector("#number-X");
const numberO = document.querySelector("#number-O");

let XOcount = 0;
let pXCount = 0;
let pOCount = 0;
let tiesCount = 0;
let winnerIndex = [];
// winner indexes
let checkWinnerIndex = [
    [0, 1, 2],// 1 row
    [3, 4, 5],// 2 row
    [6, 7, 8],// 2 row
    [0, 4, 8],//right diagonal
    [2, 4, 6],//left diagonal
    [0, 3, 6],// 1 column
    [1, 4, 7],// 2 column
    [2, 5, 8],// 3 column
];
const reset = () => {
    // reset boxes value
    Array.from(startBody.children).forEach((xoContainer) => {
        xoContainer.innerHTML = "";
        xoContainer.style.backgroundColor = "#1F3641";
    });
};
//restart button
restart.addEventListener("click", () => {
    noCancel.style.display = "flex";
    yesRestart.style.display = "flex";
    quitButton.style.display = "none";
    nextButton.style.display = "none";
    secCover.style.display = "flex";
    imgCont.innerHTML = "";
    wonOrLostTxt.innerHTML = "";
    takesTheRound.style.color = "#A8BFC9";
    document.querySelector(".sec-cover_won-and-lost-content").style.justifyContent = "center";
    takesTheRound.innerHTML = "RESTART GAME?";
})
noCancel.addEventListener("click", () => {
    secCover.style.display = "none";

    quitButton.style.display = "flex";
    nextButton.style.display = "flex";
    noCancel.style.display = "none";
    yesRestart.style.display = "none";
})
yesRestart.addEventListener("click", () => {
    secCover.style.display = "none";
    reset();
    numberX.innerHTML = 0;
    numberO.innerHTML = 0;
    ties.innerHTML = 0;

    pOCount = 0;
    pXCount = 0;
    tiesCount = 0;
    XOcount = 0;
    quitButton.style.display = "flex";
    nextButton.style.display = "flex";
    noCancel.style.display = "none";
    yesRestart.style.display = "none";

    if(nextBlueFlag && XO == O){
        blueButtonFlag = true;
    }else if(nextYellowFlag && XO == O){
        mouseupFlag = true;
        cpuMouseUp();
    }
    //X and O icon changer
    if(nextYellowFlag && XO == O){
        turnXorO(O)
    }else{
        turnXorO(X)
    }
})

quitButton.addEventListener("click", () => {
    secCover.style.display = "none";
    secStart.style.display = "none";
    secMenu.style.display = "flex";
    // reset winner and lost number
    numberX.innerHTML = 0;
    numberO.innerHTML = 0;
    ties.innerHTML = 0;

    pOCount = 0;
    pXCount = 0;
    tiesCount = 0;
    reset();
    
});
nextButton.addEventListener("click", () => {
    secCover.style.display = "none";
    XOcount = 0;
    reset();
    if(nextBlueFlag && XO == O){
        blueButtonFlag = true;
    }else if(nextYellowFlag && XO == O){
        mouseupFlag = true;
        cpuMouseUp();
    }
    //X and O icon changer
    if(nextYellowFlag && XO == O){
        turnXorO(O)
    }else{
        turnXorO(X)
    }
});

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
// Change winner's box background color and figures color 
const winnerStyle = (color, img) => {
    for(let c = 0; c < winnerIndex.length; c++){
        Array.from(startBody.children)[winnerIndex[c]].style.backgroundColor = color;
        Array.from(startBody.children)[winnerIndex[c]].innerHTML = img;
    }
}
const cover = (text, color, img) => {
    secCover.style.display = "flex";
    wonOrLostTxt.innerHTML = text;
    takesTheRound.style.color = color;
    imgCont.innerHTML = img;
    // Change winner's box background color and figures color for O
    winnerStyle("#F2B137","<img class='o' src='./assets//icon-o-gray.svg'>");
}
//  winner checker
const winnerChecker = (XorO) => {
    for(let i = 0; i < checkWinnerIndex.length; i++){
        for(let a = 0; a < 3; a++){
            let xyContainer = Array.from(startBody.children)[checkWinnerIndex[i][a]];
            
            if(Array.from(startBody.children)[checkWinnerIndex[i][a]].children[0] != undefined){
                if(xyContainer.children[0].classList[1] == XorO){
                    winnerIndex.push(checkWinnerIndex[i][a]);
                }
            }else{
                console.log("break");
                break;
            }
        }
        if(winnerIndex.length === 3){
            noCancel.style.display = "none";
            yesRestart.style.display = "none";
            takesTheRound.innerHTML = "TAKES THE ROUND";
            //  if you choose yellow button, O and won && if you choose blue button, O and won 
            if(nextYellowFlag && XO == O && XorO == O || nextBlueFlag && playerYou == O && XorO == O){ 
                console.log('winner is OOO: ', XorO, winnerIndex);
                cover("YOU WON!", "#F2B137", "<img class='img-x-o' src='./assets/icon-o.svg' alt='X icon'>");
                winnerStyle("#F2B137","<img class='o' src='./assets//icon-o-gray.svg'>");
                pOCount++;
                numberO.innerHTML = pOCount;
            // if you choose yellow button, O and lost && if you choose blue button, O and lost 
            }else if(nextYellowFlag && XO == O && XorO == X || nextBlueFlag && playerYou == O && XorO == X){ 
                console.log("you ara wagebull");
                cover("OH NO, YOU LOST…", "#F2B137", "<img class='img-x-o' src='./assets/icon-o.svg' alt='X icon'>");
                winnerStyle("#31C3BD","<img class='o' src='./assets//icon-x-gray.svg'>");
                pXCount++;
                numberX.innerHTML = pXCount;
            }
            // if you choose yellow button, X and won && if you choose blue button, X and won 
            if(nextYellowFlag && XO == X && XorO == X || nextBlueFlag && playerYou == X && XorO == X){
                console.log('winner is XXXX: ', XorO, winnerIndex);
                cover("YOU WON!", "#31C3BD", "<img class='img-x-o' src='./assets/icon-x.svg' alt='X icon'>");
                winnerStyle("#31C3BD","<img class='o' src='./assets//icon-x-gray.svg'>");
                pXCount++;
                numberX.innerHTML = pXCount;
            // if you choose yellow button, X and lost && if you choose blue button, X and lost 
            }else if(nextYellowFlag && XO == X && XorO == O || nextBlueFlag && playerYou == X && XorO == O){ 
                cover("OH NO, YOU LOST…", "#31C3BD", "<img class='img-x-o' src='./assets/icon-x.svg' alt='X icon'>");
                winnerStyle("#F2B137","<img class='o' src='./assets//icon-o-gray.svg'>");
                pOCount++;
                numberO.innerHTML = pOCount;
            }
            winnerIndex = [];
            return;
        }else{
            winnerIndex = [];
        }
    }
    // ties
    if(XOcount == 9 && winnerIndex.length != 3){
        console.log('XOcount aqac mevidaa: ', XOcount);
        secCover.style.display = "flex";
        noCancel.style.display = "none";
        yesRestart.style.display = "none";
        imgCont.innerHTML = "";
        wonOrLostTxt.innerHTML = "";
        takesTheRound.style.color = "#A8BFC9";
        document.querySelector(".sec-cover_won-and-lost-content").style.justifyContent = "center";
        takesTheRound.innerHTML = "ROUND TIED";
        XOcount = 0;
        tiesCount++;
        ties.innerHTML = tiesCount;
        return; 
    }
    if(XOcount == 9) XOcount = 0;
}

// hover, mousedown, mouseup, mouseleave logic.
let XorO, outlineXorO, iconXorO, reverseIconXorO;
let unmarkedIndex = [];
let mouseupFlag = false;
let mousedownFlag = false;

const random = () => {
    // we collect unmarked boxes in unmarkedIndex
    Array.from(startBody.children).forEach((xyContainer, index) =>{
        if(xyContainer.children[0] == undefined){
            unmarkedIndex.push(index);
        }
    });
    // We choose the index of unmarked boxes randomly and write the opposite letter X or O
    let unmarkedRandomIndex = randomNum(0, unmarkedIndex.length);
    Array.from(startBody.children).forEach((xyContainer, index) =>{
        if(index == unmarkedIndex[unmarkedRandomIndex]){
            xyContainer.innerHTML = reverseIconXorO;
        }
    });
}
//cpu mouse up
const cpuMouseUp = () => {
    if(mouseupFlag){
        //random  mark  in box X or O
        random();
        XOcount++;
        if(XO == X){
            turnXorO(X);
        }
        if(XO == O){
            console.log("apshic modiss?");
            turnXorO(O);
        }
        // winner checker start when marked at least five boxes.
        if(XOcount > 4){
            if(XO == X){
                winnerChecker(O);
            }else{
                winnerChecker(X);
            }
        }
        console.log('cpu klik out: ', XOcount);
        unmarkedIndex = [];
        mouseupFlag = false;
    }
}
//player mouse up
const playerMouseUp = () => {
    if(mouseupFlag){
        if(XO == X){
            XO = O;
        }else{
            XO = X;
        }
        // winner checker start when marked at least five boxes.
        if(XOcount > 4){
            if(XO == X){
                winnerChecker(O);
            }else{
                winnerChecker(X);
            }
        }
        mouseupFlag = false;
        console.log('player klik out: ', XOcount);
    }
}

const outlineXO = () => {
    startBody.addEventListener("mouseover", event => {
        if(blueButtonFlag){
            XO = X;
            blueButtonFlag = false;
        }
        if(XO == X ){
            XorO = X;
            outlineXorO = outlineX;
            iconXorO = iconX;
            reverseIconXorO = iconO;
            // blueButtonFlag == false;
        }else{
            XorO = O;
            outlineXorO = outlineO;
            iconXorO = iconO;
            reverseIconXorO = iconX;
        }
        if(event.target.classList[0] != "sect-start_body"){
            if(!event.target.children[0] && event.target.classList[0] != "outline" && event.target.nodeName != "IMG"){
                event.target.classList.add("delete")
                event.target.innerHTML = outlineXorO;
                mousedownFlag = true;
                // When we hover X or O
                event.target.addEventListener("mouseleave", () =>{
                    if(event.target.classList[1] == "delete" && event.target.children[0].classList[0] == "outline"){
                        event.target.classList.remove("delete");
                        event.target.children[0].remove();
                    }
                });   
            }
        }else{
            mousedownFlag = false;
        }
    });
// When we write X or O
    startBody.addEventListener("mousedown", event => {
        if(mousedownFlag){
            mouseupFlag = true;
            if(event.target.classList[0] == "outline" || event.target.children[0].classList[0] == "outline"){
                if(event.target.classList[0] == "outline"){
                        event.target.parentNode.innerHTML = iconXorO;
        
                }else if(event.target.children[0].classList[0] == "outline"){
                    event.target.innerHTML = iconXorO;
                }
                XOcount++;
                console.log('kliki: ', XOcount);
                // winner checker start when marked at least two boxes.
                if(XOcount > 3){
                    if(XO == X){
                        winnerChecker(X);
                    }else{
                        winnerChecker(O);
                    }
                }
                //"turn" icon changer for yellow button
                if(XO == O && nextYellowFlag){
                    console.log("rato ar modis");
                    turnXorO(X);
                }else if(XO == X && nextYellowFlag){
                    turnXorO(O);
                }
                //"turn" icon changer for blued button
                if(playerYou == X && nextBlueFlag){
                    turnXorO(O);
                }else if (playerYou == O && nextBlueFlag){
                    turnXorO(O);
                } 
                if(XO == O && nextBlueFlag){
                    turnXorO(X);
                }else if(XO == X && nextBlueFlag){
                    turnXorO(O);
                }
            }
            mousedownFlag = false;
        }
    }); 
}
// When we press Yellow button
let runFlag = true; 
let nextYellowFlag = false;
yellowButton.addEventListener("click", () => {
    nextYellowFlag = true;
    nextBlueFlag = false;
    secMenu.style.display = "none";
    secStart.style.display = "flex";
    pX.innerHTML = "X (YOU)";
    pO.innerHTML = "O (CPU)";
    XOcount = 0;
    
    if(XO == X){
        pX.innerHTML = "X (YOU)";
        pO.innerHTML = "O (CPU)";
        turnXorO(X);
        startBody.addEventListener("mouseup", cpuMouseUp);
        startBody.removeEventListener("mouseup", playerMouseUp);
    }else{
        pX.innerHTML = "X (CPU)";
        pO.innerHTML = "O (YOU)";
        turnXorO(O);
        mouseupFlag = true;
        outlineXorO = outlineO;
        iconXorO = iconO;
        reverseIconXorO = iconX;
        cpuMouseUp();
        startBody.addEventListener("mouseup", cpuMouseUp);
        startBody.removeEventListener("mouseup", playerMouseUp);
    }

    if(runFlag == true){
        outlineXO();
        runFlag = false;
    }
})
// When we press Blue button
let playerYou = "";
let blueButtonFlag = false;
let nextBlueFlag = false;
blueButton.addEventListener("click", () => {
    nextBlueFlag = true;
    nextYellowFlag = false;
    blueButtonFlag = true;
    secMenu.style.display = "none";
    secStart.style.display = "flex";
    pX.innerHTML = "X (YOU)";
    pO.innerHTML = "O (CPU)";
    XOcount = 0;
    playerYou = XO;
    if(XO == X){
        pX.innerHTML = "X (P1)";
        pO.innerHTML = "O (P2)";
    }else{
        pO.innerHTML = "O (P1)";
        pX.innerHTML = "X (P2)";
    }
    turnXorO(X);
    startBody.removeEventListener("mouseup",cpuMouseUp);
    startBody.addEventListener("mouseup", playerMouseUp);
    
    if(runFlag == true){
        outlineXO();
        runFlag = false;
    }
})