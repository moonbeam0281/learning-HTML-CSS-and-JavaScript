const names = ["Test", "something", "White guy"];
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");

const radius = canvas.width / 2;
const center = { x: radius, y: radius };
let startAngle = 0;
let arc = (2 * Math.PI) / names.length;

function drawWheel() {
  for (let i = 0; i < names.length; i++) {
    const angle = startAngle + i * arc;
    ctx.beginPath();
    ctx.fillStyle = `hsl(${(i * 360) / names.length}, 80%, 70%)`;
    ctx.moveTo(center.x, center.y);
    ctx.arc(center.x, center.y, radius, angle, angle + arc);
    ctx.fill();

    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(names[i], radius - 10, 10);
    ctx.restore();
  }
}

function spinWheel() {
  let spins = Math.floor(Math.random() * 10 + 10);
  let rotation = spins * arc + Math.random() * arc;
  canvas.style.transition = "transform 6s cubic-bezier(0.33, 1, 0.68, 1)";
  canvas.style.transform = `rotate(${rotation}rad)`;
}

spinBtn.addEventListener("click", () => {
  canvas.style.transition = "none";
  canvas.style.transform = "rotate(0rad)";
  setTimeout(() => {
    spinWheel();
  }, 10);
});

drawWheel();