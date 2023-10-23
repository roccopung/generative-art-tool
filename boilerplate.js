/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
console.log(canvas);
const scale = 2;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
canvas.width = window.innerWidth * scale;
canvas.height = window.innerHeight * scale;

let drawing = false;
ctx.lineWidth = 0.65;
// ctx.globalCompositeOperation = "destination-over";

class Root {
  constructor(x, y) {
    this.x = x * 2;
    this.y = y * 2;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.maxSize = Math.random() * 8 + 10;
    this.size = Math.random() * 1 + 6;
    this.vs = Math.random() * 0.2 + 0.05;
    this.angleX = Math.random() * 6.2;
    this.vax = Math.random() * 0.6 - 0.4;
    this.angleY = Math.random() * 6.2;
    this.vay = Math.random() * 0.6 - 0.4;
    this.lightness = 10;
  }
  update() {
    this.x += this.speedX + Math.sin(this.angleX);
    this.y += this.speedY + Math.sin(this.angleY);
    this.size += this.vs;
    this.angleX += this.vax;
    this.angleY += this.vay;
    if (this.lightness < 70) this.lightness += 0.25;
    if (this.size < this.maxSize) {
      
      requestAnimationFrame(this.update.bind(this));
    }
  }
}

window.addEventListener("mousemove", function (e) {
  if (drawing){
    for (let i = 0; i < 3; i++) {
      const root = new Root(e.x, e.y);
      root.update();
    }
  }
});
window.addEventListener('mousedown', function(e){
    drawing = true;
    for (let i = 0; i < 30; i++) {
      const root = new Root(e.x, e.y);
      root.update();
    }
})
window.addEventListener('mouseup', function(){
    drawing = false;
})
