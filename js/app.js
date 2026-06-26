function loadGame(name){
  const screen = document.getElementById("screen");

  const games = {
    clicker: clickerGame,
    reaction: reactionGame,
    guess: guessGame,
    tictactoe: tttGame
  };

  screen.innerHTML = games[name]();
}
