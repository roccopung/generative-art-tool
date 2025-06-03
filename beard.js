/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const colorPicker = document.getElementById("slider");
const topEl = document.getElementById("top");
const infinite = document.getElementById("infinite");

const ctx = canvas.getContext("2d");
const scale = 2;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
canvas.width = window.innerWidth * scale;
canvas.height = window.innerHeight * scale;

let drawing = false;

ctx.fillStyle = "#fff";

if (!topEl.checked) {
  ctx.globalCompositeOperation = "destination-over";
} 

class Root {
  constructor(x, y) {
    this.x = x * scale;
    this.y = y * scale;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.maxSize = Math.random() * 2 + 10;
    this.size = Math.random() * 0.4 + 2;
    this.vs = Math.random() * 0.2 + 0.5;
    this.angleX = Math.random() * 6.2;
    this.vax = Math.random() * 0.6 - 0.4;
    this.angleY = Math.random() * 6.2;
    this.vay = Math.random() * 0.6 - 0.4;
    this.angle = 0;
    this.va = Math.random() * 0.02 + 0.05;
  }
  update() {
    this.x += this.speedX + Math.cos(this.angleX);
    this.y -= this.speedY + Math.sin(this.angleY);
    if (!infinite.checked) {
      this.size += this.vs;
    }
    this.angleX += this.vax;
    this.angleY += this.vay;
    this.angle += this.va;
    if (this.size < this.maxSize) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.beginPath();
      ctx.ellipse(
        0 - this.size / 2,
        0 - this.size / 2 + 5, // slight vertical offset
        this.size * 4,
        this.size * 4,
        0,
        0,
        360
      );
      ctx.fill();
      //   ctx.fillRect(0 - this.size / 2, 0 - this.size / 2, this.size, this.size);
      ctx.fillStyle = colorPicker.value;
      ctx.beginPath();
      ctx.ellipse(
        0 - this.size / 2,
        0 - this.size / 2,
        this.size * 2,
        this.size * 2,
        0,
        0,
        360
      );
      ctx.fill();
      // let double = this.size * 2;
      // ctx.lineWidth = 1;
      // ctx.strokeStyle = "rgba(244,244,244,1)";
      // ctx.strokeRect(0 - double / 2, 0 - double / 2, double, double);
      // let triple = this.size * 3;
      // ctx.lineWidth = 0.2;
      // ctx.strokeStyle = "white";
      // ctx.strokeRect(0 - triple / 2, 0 - triple / 2, triple, triple);

      requestAnimationFrame(this.update.bind(this));
      ctx.restore();
    }
  }
}

window.addEventListener("mousemove", function (e) {
  if (drawing) {
    for (let i = 0; i < 3; i++) {
      const root = new Root(e.x, e.y);
      root.update();
    }
  }
});
window.addEventListener("mousedown", function (e) {
  drawing = true;
  for (let i = 0; i < 30; i++) {
    const root = new Root(e.x, e.y);
    root.update();
  }
});
window.addEventListener("mouseup", function () {
  drawing = false;
});
