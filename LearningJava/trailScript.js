const canvas = document.getElementById("drawCanvas");
const canvasContext = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lastX = null;
let lastY = null;
let scale = 1;
const particles = [];

document.addEventListener("mousemove", (e) => {
  if (lastX !== null && lastY !== null) {
    canvasContext.save();
    canvasContext.scale(scale, scale);
    canvasContext.strokeStyle = "#4763ff";
    canvasContext.lineWidth = 4;
    canvasContext.beginPath();
    canvasContext.moveTo(lastX / scale, lastY / scale);
    canvasContext.lineTo(e.pageX / scale, e.pageY / scale);
    canvasContext.stroke();
    canvasContext.restore();
  }

  lastX = e.pageX;
  lastY = e.pageY;
});

document.addEventListener("click", (e) =>{
    createExplosion(lastX, lastY);
})

function createExplosion(x, y) {
  const count = 30;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 5 + 1;
    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed;
    particles.push({
      x,
      y,
      dx,
      dy,
      alpha: 1,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
    });
  }
}



function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.dx;
    p.y += p.dy;
    p.alpha -= 0.02;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  for (const p of particles) {
    canvasContext.save();
    canvasContext.globalAlpha = p.alpha;
    canvasContext.fillStyle = p.color;
    canvasContext.beginPath();
    canvasContext.arc(p.x, p.y, 3, 0, Math.PI * 2);
    canvasContext.fill();
    canvasContext.restore();
  }
}

function animate() {
  canvasContext.fillStyle = "rgba(17, 17, 17, 0.08)";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  updateParticles();
  drawParticles();

  scale *= 0.9995;
  requestAnimationFrame(animate);
}

animate();
/*
setInterval(() => {
  if (lastX !== null && lastY !== null) {
    createExplosion(lastX, lastY);
  }
}, 3000);*/

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});