/**
 * 画面タッチでカラフルな線を描く
 * ------------------------------
 */
let drawing = false;
let lastX = null;
let lastY = null;
const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
function resize() {
  canvas.setAttribute("width", window.innerWidth * 2);
  canvas.setAttribute("height", window.innerHeight * 2);
  ctx.font = "30px serif";
  ctx.fillText("PWA test", 20, 40);
  ctx.font = "25px serif";
  ctx.fillText("マウスや指タッチで線が描けるよ！", 15, 80);
  ctx.lineWidth = 5;
  ctx.scale(2, 2);
}
resize();
self.addEventListener("resize", resize);
self.addEventListener("orientationchange", resize);
canvas.addEventListener("mousedown", drawStart, false);
canvas.addEventListener("touchstart", drawStart, false);
function drawStart(event) {
  event.preventDefault();
  drawing = true;
  lastX = event.pageX;
  lastY = event.pageY;
}
canvas.addEventListener("mousemove", drawLine, false);
canvas.addEventListener("touchmove", drawLine, false);
function drawLine(event) {
  if (!drawing) return;
  if (event.type === "touchmove") event = event.changedTouches[0];
  ctx.strokeStyle =
    "rgb(" +
    Math.floor(Math.random() * 255) +
    "," +
    Math.floor(Math.random() * 255) +
    "," +
    Math.floor(Math.random() * 255) +
    ")";
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(event.pageX, event.pageY);
  ctx.stroke();
  ctx.closePath();
  lastX = event.pageX;
  lastY = event.pageY;
}
canvas.addEventListener("mouseup", drawFinish, false);
canvas.addEventListener("touchend", drawFinish, false);
function drawFinish() {
  drawing = false;
}
