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
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = "hsl(140, 100%," + this.lightness + "%)";
      ctx.fill();
      ctx.stroke();
      requestAnimationFrame(this.update.bind(this));
    } else {
     const flower = new Flower(this.x, this.y, this.size);   
     flower.grow();
    }
  }
}

class Flower {
    constructor(x,y,size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.vs = Math.random() * 0.8 + 0.2;
        this.maxFlowerSize = this.size + Math.random() * 160;
        this.image = new Image();
        this.image.src = 'flowers.png';
        this.frameSize = 200;
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.size > 15 ? this.willFlower = true : false;
    };
    grow(){
        if(this.size < this.maxFlowerSize && this.willFlower) {
            this.size += this.vs;
            ctx.drawImage(this.image, this.frameSize * this.frameX, this.frameSize * this.frameY, this.frameSize, this.frameSize, this.x - this.size/2, this.y - this.size/2, this.size, this.size);
            requestAnimationFrame(this.grow.bind(this));
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
window.addEventListener('mousedown', function(){
    drawing = true;
})
window.addEventListener('mouseup', function(){
    drawing = false;
})
