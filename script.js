"use strict"
//For x, O figure
const Menu = document.querySelector(".sec-menu_figure");
const RectXBackground = document.querySelector("#sec-menu_figure-x-background");
const RectOBackground = document.querySelector("#sec-menu_figure-o-background");
const FigureX = document.querySelector("#sec-menu_figure-x");
const FigureO = document.querySelector("#sec-menu_figure-o");
//For yellow button
const YellowButton = document.querySelector(".sec-menu_yellow-button");
// const inlineBlock = document.querySelector(".dis-in-block");
// const displayNone = document.querySelector(".dis-in-block");
const turnX = document.querySelector("#turnX");
const turnO = document.querySelector("#turnO");
const startBody = document.querySelector(".sect-start_body");
// const xyCont = document.querySelector(".xy-container");

let XO = "o";
let X = "x";
let O = "o";


// When we choose X
const hoverX = () =>{
    RectXBackground.children[0].style.fill = "#1A2A33";
};
RectXBackground.addEventListener("mouseover", () =>{
    if(XO == "o"){
        //Hover 
        RectXBackground.children[0].style.fill = "rgba(168, 191, 201, 0.05)";
        RectXBackground.addEventListener("mouseout", hoverX);
        //Click
        RectXBackground.addEventListener("click", () => {
            RectXBackground.removeEventListener("mouseout", hoverX);
            RectXBackground.children[0].style.fill = "#A8BFC9";
            FigureX.style.fill = "#1A2A33";
            XO = "x";
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
    if(XO == "x"){
        //Hover 
        RectOBackground.children[0].style.fill = "rgba(168, 191, 201, 0.05)";
        RectOBackground.addEventListener("mouseout", hoverO);
        //Click
        RectOBackground.addEventListener("click", () => {
            RectOBackground.removeEventListener("mouseout",hoverO);
            RectOBackground.children[0].style.fill = "#A8BFC9";
            FigureO.style.fill = "#1A2A33";
            XO = "o";
            RectXBackground.children[0].style.fill = "#1A2A33";
            FigureX.style.fill = "#A8BFC9";
        });
    }
});

const turnXorO = (x) => {
    if(XO == x){
        turnX.style.display = "inline-block";   
        turnO.style.display = "none";   
    }else{
        turnX.style.display = "none";   
        turnO.style.display = "inline-block";
    }
}

// X, O Hover logic
let outlineX = "<img class='outline' src='./assets/icon-x-outline.svg'>"
let outlineO = "<img class='outline' src='./assets/icon-o-outline.svg'>"

let iconX = "<img class='x' src='./assets//icon-x.svg'>"
let iconO = "<img class='o' src='./assets//icon-o.svg'>"
// winner indexes
let checkWinner = [
    [0, 1, 2],// 1 row
    [3, 4, 5],// 2 row
    [6, 7, 8],// 2 row
    [0, 4, 8],//right diagonal
    [2, 4, 6],//left diagonal
    [0, 3, 6],// 1 column
    [1, 4, 7],// 2 column
    [2, 5, 8],// 3 column
];
let winnerIndex = [];

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
//  winner checker
const winner = (XorO) => {
    for(let i = 0; i < checkWinner.length; i++){
        for(let a = 0; a < 3; a++){
            let xyContainer = Array.from(startBody.children)[checkWinner[i][a]];
            
            if(Array.from(startBody.children)[checkWinner[i][a]].children[0] != undefined){
                    if(xyContainer.children[0].className == XorO){
                        winnerIndex.push(checkWinner[i][a]);
                    }
            }else{
                console.log("break");
                // winnerIndex = [];
                break;
            }
        }
        
        if(winnerIndex.length === 3){
            console.log('winner is: ', XorO, winnerIndex);
            winnerIndex = [];
            return;
        }else{
            winnerIndex = [];
        }
    }
    if(XorO == X) return;
    else winner(X);
}

// winner(O);
const outlineXorO = (XorO, outlineXorO, iconXorO, reverseIconXorO) => {
    startBody.addEventListener("mouseover", event =>{
        if(XO == XorO && event.target.classList[0] != "sect-start_body"){
            if(!event.target.children[0] && event.target.classList[0] != "outline" && event.target.nodeName != "IMG"){
                event.target.classList.add("delete")
                event.target.innerHTML = outlineXorO;
            
                // When we write X or O
                event.target.addEventListener("mousedown", () => {
                    if(event.target.classList[0] == "outline" || event.target.children[0].classList[0] == "outline"){
                        if(event.target.classList[0] == "outline"){
                            event.target.parentNode.innerHTML = iconXorO;
                        }else if(event.target.children[0].classList[0] == "outline"){
                            event.target.innerHTML = iconXorO;
                        }
                        
                        //we collect unmarked boxes in unmarkedIndex
                        let unmarkedIndex = [];
                        Array.from(startBody.children).forEach((xyContainer, index) =>{
                            if(xyContainer.children[0] == undefined){
                                unmarkedIndex.push(index);
                            }
                        });
                        
                        //We choose the index of unmarked boxes randomly and write the opposite letter X or O
                        let unmarkedRandomIndex = randomNum(0, unmarkedIndex.length)
                        Array.from(startBody.children).forEach((xyContainer, index) =>{
                            if(index == unmarkedIndex[unmarkedRandomIndex]){
                                xyContainer.innerHTML = reverseIconXorO;
                                //"turn" icon changer
                                turnXorO(XorO);
                            }
                        });
                        unmarkedIndex = [];
                        //"turn" icon changer timer
                        setTimeout(turnXorO, 200);
                    }
                }); 
                // turnXorO("x");
                // When we hover X or O
                event.target.addEventListener("mouseleave", () =>{
                    if(event.target.classList[1] == "delete" && event.target.children[0].classList[0] == "outline"){
                        event.target.classList.remove("delete");
                        event.target.children[0].remove();
                    }
                });   
            }
        }
    });
    startBody.addEventListener("mouseup", event => {
        if(event.target.classList[0] != "sect-start_body"){
            console.log("test run");
            winner("o");
        }
    });
}

// When we press Yellow button
YellowButton.addEventListener("click", () => {
    document.querySelector(".sec-menu").style.display = "none";
    document.querySelector(".sect-start").style.display = "flex";
    // choose Turn X or O
    turnXorO(O);
    if(XO == X){
        outlineXorO(X, outlineX, iconX, iconO);
    }else{
        outlineXorO(O, outlineO, iconO, iconX);
    }
 });
// X, O Hovers logic end