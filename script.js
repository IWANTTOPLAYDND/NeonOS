function unlock(){
  console.log("UNLOCK TRIGGERED");

  lockscreen.style.display = "none";
  desktop.style.display = "block";

  console.log("LOCKSCREEN:", lockscreen);
  console.log("DESKTOP:", desktop);
}

lockscreen.addEventListener("click", unlock);
window.addEventListener("keydown", unlock);
