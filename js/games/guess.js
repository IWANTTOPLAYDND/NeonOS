let secret = Math.floor(Math.random()*30)+1;

function guessGame(){

  window.checkGuess = function(){
    let g = +document.getElementById("g").value;
    document.getElementById("gout").innerText =
      g === secret ? "Correct 🎉" : "Nope";
  };

  return `
    <div class="card">
      <h2>Guess Game</h2>
      <input id="g">
      <button onclick="checkGuess()">Check</button>
      <p id="gout"></p>
    </div>
  `;
}
