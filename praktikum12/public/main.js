import { render } from "./lib/suiweb.js";

window.onload = () => {
  initBoard();
  addEventHandler();
  document.getElementById("button").addEventListener("click", () => {
    clearField();
    currentPlayer = players[0];
    saveState();
    running = true;
  });
  document.getElementById("load").addEventListener("click", () => {
    loadState();
  });
  document.getElementById("save").addEventListener("click", () => {
    saveState();
  });
};

const SERVICE = "http://localhost:3000/api/data/state?api-key=c4game";

let players = ["blue", "red"];
let currentPlayer = players[0];
let running = true;

let state = [
  [ '', '', '', '', '', '', '' ],
  [ '', '', '', '', '', '', '' ],
  [ '', '', '', '', '', '', '' ],
  [ '', '', '', '', '', '', '' ],
  [ '', '', '', '', '', '', '' ],
  [ '', '', '', '', '', '', '' ]];

const App = () => [Board, { board: state }];

const Board = () => {
  let rows = Array.from(Array(6).keys()).map((n) => getRow(n));
  return ["div", { className: "board" }, ...rows];
};

const Field = ({ type }) => {
  let color = { r: "red", b: "blue" }[type];
  let piece = color ? ["div", { className: "piece " + color }] : "";
  return ["div", { className: "field" }, piece];
};

function getRow(i) {
  let fields = [].concat(...state[i]).map((type) => [Field, { type }]);
  return ["div", { className: "row" }, ...fields];
}

function makeTurn(fieldID) {
  let col = fieldID[2];
  let found = false;
  for (let i = 5; i >= 0; i--) {
    if (state[i][col] === "" && !found) {
      state[i][col] = currentPlayer.charAt(0);
      found = true;
    }
  }
}

function clearField() {
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
      state[i][j] = "";
    }
  }
  initBoard();
}

function changeCurrentPlayer() {
  if (currentPlayer == players[0]) {
    currentPlayer = players[1];
  } else {
    currentPlayer = players[0];
  }
}

function renderSJDON(sjdon, node) {
  let struct;
  if (Array.isArray(sjdon)) {
    struct = document.createElement(sjdon[0]);
    let attrs = Object.assign({}, ...sjdon.filter(a => {
      return typeof a === "object" && !Array.isArray(a);
    }));
    for (const a in attrs) {
      struct.setAttribute(a, attrs[a]);
    }
    let children = sjdon.slice(1).filter(a => {
      return typeof a === "string" || Array.isArray(a);
    });
    for (let child of children) {
      renderSJDON(child, struct)
    }
  } else if (typeof sjdon === "string") {
    struct = document.createTextNode(sjdon)
  }
  node.appendChild(struct)
}

function updateBoard() {
  initBoard();
  console.log(state);
}

function initBoard() {
  const app = document.querySelector(".app");
  render([App], app);
  numerateFields();
  addEventHandler();
  return app;
}

function numerateFields(){
  let rows = document.querySelectorAll(".row");
  let rowCounter = 0;
  for (let row of rows) {
    let fields = row.getElementsByClassName("field");
    let fieldCounter = 0;
    for(let field of fields){
        field.setAttribute("id", "F"+ rowCounter + fieldCounter);
        fieldCounter++;
    }
    rowCounter++;
  }
}

function loadState () {
  fetch(SERVICE, { 
    method: 'GET', 
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    state = data;
    updateBoard();
  })
}

function saveState () {
  fetch(SERVICE, { 
    method: 'PUT', 
    headers: { 'Content-type': 'application/json' }, 
    body: JSON.stringify(state) 
  })
}

function addEventHandler(){
  document.querySelectorAll(".field").forEach((element) => {
    element.addEventListener("click", function (event) {
      if (running) {
        let fieldID = event.currentTarget.id;
        makeTurn(fieldID);
        initBoard();
        let winner = checkForWinner();
        if (winner !== "") {
          document.getElementById("info").innerHTML = "Der Gewinner ist";
          running = false;
        } else {
          changeCurrentPlayer();
          document.getElementById("currentPlayer").innerHTML = currentPlayer;
        }
      }
    });
  });
}

function checkLine(a,b,c,d) {
  return ((a != 0) && (a ==b) && (a == c) && (a == d));
}

function checkForWinner() {
  let winner = '';
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 7; j++){
      if (checkLine(state[i][j], state[i+1][j], state[i+2][j], state[i+3][j])){
        winner = state[i][j];
      }
    }
  }
         
  for (let i = 0; i < 6; i++){
    for (let j = 0; j < 4; j++){
      if (checkLine(state[i][j], state[i][j+1], state[i][j+2], state[i][j+3])){
        winner = state[i][j];
      }         
    }     
  }
      
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 4; j++){
      if (checkLine(state[i][j], state[i+1][j+1], state[i+2][j+2], state[i+3][j+3])){
        winner = state[i][j];
      }            
    }       
  }
      
  for (let i = 3; i < 6; i++){
    for (let j = 0; j < 4; j++){
      if (checkLine(state[i][j], state[i-1][j+1], state[i-2][j+2], state[i-3][j+3])){
        winner = state[i][j];
      }  
    }
  }
  return winner;

}

