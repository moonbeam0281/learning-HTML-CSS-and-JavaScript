const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Agent {
    constructor(x, y, angle, speed, color) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.color = color;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // If outside canvas, redirect with new angle
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.angle = Math.random() * Math.PI * 2;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

const agents = [];

function generateAgents(num = 100) {
    for (let i = 0; i < num; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1 + 0.5; // slower looks smoother
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = `hsl(${Math.random() * 360}, 100%, 60%)`;

        agents.push(new Agent(x, y, angle, speed, color));
    }
}

generateAgents();

function updateCanvas() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const a of agents) {
        a.update();
        a.draw(ctx);
    }

    requestAnimationFrame(updateCanvas);
}

updateCanvas();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});