let board = ["","","","","","","","",""];
let turn = "X";

function tttGame(){

  window.move = function(i){
    if(board[i]) return;
    board[i] = turn;
    turn = turn === "X" ? "O" : "X";
    render();
  };

  function render(){
    let html = "";

    for(let i=0;i<9;i++){
      html += `<button onclick="move(${i})">${board[i]}</button>`;
      if((i+1)%3===0) html += "<br>";
    }

    document.getElementById("board").innerHTML = html;
  }

  setTimeout(render,0);

  return `
    <div class="card">
      <h2>Tic Tac Toe</h2>
      <div id="board"></div>
    </div>
  `;
}
