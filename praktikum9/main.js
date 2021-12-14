window.onload = () => {
  initBoard();
  document.querySelectorAll('.field').forEach(element => {
    element.addEventListener('click', function(event){
      let fieldID = event.currentTarget.id;
      makeTurn(fieldID);
      updateBoard();
      document.getElementById("currentPlayer").innerHTML = currentPlayer;
    })
  });
  document.getElementById("button").addEventListener('click', ()=>{
    clearField();
    currentPlayer = players[0];
  })
}

let players = ["blue", "red"];
let currentPlayer = players[0];

let state = [
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ]];

function makeTurn(fieldID){
  let col = (fieldID)[2];
  let found = false;
  for (let i = 5; i >= 0; i--){
    if(state[i][col]===''&&!found){
      state[i][col]=currentPlayer.charAt(0);
      found = true;
      changeCurrentPlayer();
    }
  }
}

function clearField(){
  for(let i = 0; i < state.length; i++){
    for(let j = 0; j < state[i].length; j++){
      state[i][j]='';
    }
  }
  updateBoard();
}

function changeCurrentPlayer(){
  if(currentPlayer == players[0]) {
    currentPlayer = players[1];
  } else {
    currentPlayer = players[0];
  }
}


function elt (type, attrs, ...children) {
  let node = document.createElement(type);
  for (a in attrs) {
    node.setAttribute(a, attrs[a]);
  }
  for (let child of children) {
    if (typeof child != "string") node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }
  return node
}


function updateBoard(){
  let fields = document.querySelectorAll(".field");
  for (field of fields){
    let row = (field.id)[1];
    let col = (field.id)[2];

    field.innerHTML = '';

    if(state[row][col]=='b') {
      field.appendChild(elt("div", {"class": "piece blue"}));
    }
    if(state[row][col]=='r') {
      field.appendChild(elt("div", {"class": "piece red"}));
    }

  }
}

function initBoard(){
  let board = document.querySelector(".board");
  for (let i = 0; i < 6; i++) {
    board.appendChild(elt("div", {"class": "row"}));
  }
  let rows = document.querySelectorAll(".row");
  let rowCounter = 0;
  for (row of rows) {
    for(let i = 0; i < 7; i++){
      let field = elt("div", {"id":"F"+ rowCounter + i,"class": "field"});
      row.appendChild(field);
    }
    rowCounter++;
  }
}
