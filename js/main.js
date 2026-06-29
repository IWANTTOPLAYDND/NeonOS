const wallpapers = [
  "wallpapers/purple-neon.jpg",
  "wallpapers/cyber-blue.jpg",
  "wallpapers/galaxy.jpg",
  "wallpapers/stars.jpg",
  "wallpapers/sunset.jpg"
];

function setWallpaper(path) {
  const desktop = document.getElementById("desktop");
  if (!desktop) return;

  desktop.style.backgroundImage = `url('${path}')`;
  localStorage.setItem("wallpaper", path);
}

function loadWallpaper() {
  const saved = localStorage.getItem("wallpaper");
  if (saved) {
    setWallpaper(saved);
  } else {
    setWallpaper(wallpapers[0]);
  }
}

document.addEventListener("DOMContentLoaded", loadWallpaper);

const Wallpapers = {

current:0,

list:[

"wallpapers/purple.jpg",

"wallpapers/blue.jpg",

"wallpapers/pink.jpg",

"wallpapers/galaxy.jpg",

"wallpapers/forest.jpg"

],

load(){

const saved = localStorage.getItem("wallpaper");

if(saved){

this.set(saved);

}

else{

this.set(this.list[0]);

}

},

set(path){

const desktop=document.getElementById("desktop");

desktop.style.opacity=0;

setTimeout(()=>{

desktop.style.backgroundImage=`url(${path})`;

desktop.style.opacity=1;

},250);

localStorage.setItem("wallpaper",path);

},

next(){

this.current++;

if(this.current>=this.list.length){

this.current=0;

}

this.set(this.list[this.current]);

}

};

window.addEventListener("DOMContentLoaded",()=>{

Wallpapers.load();

});
