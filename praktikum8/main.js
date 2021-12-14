setInterval(updateState, 1000);

function updateState(){
  row = Math.floor(Math.random() * (6 - 1));
  field = Math.floor(Math.random() * (7 - 1));
  randomField = state[row][field];
  if (randomField=='') {
    randomField = (Math.random()<0.5 ? "b" : "r");
  } else {
    randomField = '';
  }
  state[row][field] = randomField;
  document.querySelector(".board").innerHTML='';
  showBoard();
}

let state = [
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', 'b', '', '', '', '', '' ],
    [ '', 'r', '', 'b', '', '', '' ]];


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

function showBoard(){
  let board = document.querySelector(".board");
  for (let i = 0; i < 6; i++) {
    board.appendChild(elt("div", {"class": "row"}));
  }
  let rows = document.querySelectorAll(".row");
  let rowCounter = 0;
  for (row of rows) {
    for(let i = 0; i < 7; i++){
      let field = elt("div", {"class": "field"});
      row.appendChild(field);
      if(state[rowCounter][i]=='b') {
        field.appendChild(elt("div", {"class": "piece blue"}));
      }
      if(state[rowCounter][i]=='r') {
        field.appendChild(elt("div", {"class": "piece red"}));
      }
    }
    rowCounter++;
  }
}
