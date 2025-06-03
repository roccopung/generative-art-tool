/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const colorPicker = document.getElementById("slider");
const ctx = canvas.getContext("2d");
const scale = 2;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
canvas.width = window.innerWidth * scale;
canvas.height = window.innerHeight * scale;

let drawing = false;

ctx.fillStyle = "#fff";
ctx.globalCompositeOperation = "destination-over";

class Root {
  constructor(x, y) {
    this.x = x * scale;
    this.y = y * scale;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.maxSize = Math.random() * 10 + 10;
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
    this.x += this.speedX + Math.sin(this.angleX);
    this.y += this.speedY + Math.sin(this.angleY);
    this.size += this.vs;
    this.angleX += this.vax;
    this.angleY += this.vay;
    this.angle += this.va;
    if (this.size < this.maxSize) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.beginPath();
      ctx.ellipse(
        0 - this.size / 2,
        0 - this.size / 2 + 10, // slight vertical offset
        this.size * 2.2,
        this.size * 2.2,
        0,
        0,
        360
      );
      ctx.fill();

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
      
      let double = this.size;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(244,244,244,1)";
      ctx.strokeRect(0 - double / 2, 0 - double / 2, double, double);
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
  for (let i = 0; i < 2; i++) {
    const root = new Root(e.x, e.y);
    root.update();
  }
});
window.addEventListener("mouseup", function () {
  drawing = false;
});
