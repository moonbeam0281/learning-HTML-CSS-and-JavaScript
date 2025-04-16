const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Agent {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 1 + 1.5;
        this.radius = 5;
        this.hue = Math.random() * 360;
        this.color = `hsl(${this.hue}, 100%, 60%)`;

        this.isDead = false;

        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
    }

    update(agents, mouse) {
        // Flocking behaviors
        let align = { x: 0, y: 0 };
        let cohesion = { x: 0, y: 0 };
        let separation = { x: 0, y: 0 };
        let total = 0;
        const perception = 50;

        for (let other of agents) {
            const dx = other.x - this.x;
            const dy = other.y - this.y;
            const dist = Math.hypot(dx, dy);

            if (other !== this && dist < perception) {
                // Alignment
                align.x += other.vx;
                align.y += other.vy;

                // Cohesion
                cohesion.x += other.x;
                cohesion.y += other.y;

                // Separation
                separation.x += (this.x - other.x) / dist;
                separation.y += (this.y - other.y) / dist;

                total++;
            }
        }

        if (total > 0) {
            align.x /= total;
            align.y /= total;
            const alignMag = Math.hypot(align.x, align.y);
            if (alignMag > 0) {
                align.x = (align.x / alignMag) * this.speed;
                align.y = (align.y / alignMag) * this.speed;
            }

            cohesion.x = ((cohesion.x / total) - this.x) * 0.01;
            cohesion.y = ((cohesion.y / total) - this.y) * 0.01;

            separation.x /= total;
            separation.y /= total;
        }

        if (mouse) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 100) {
                separation.x += dx / dist * 2;
                separation.y += dy / dist * 2;
            }
        }

        // Final velocity update
        this.vx += (align.x + cohesion.x + separation.x) * 0.05;
        this.vy += (align.y + cohesion.y + separation.y) * 0.05;

        // Normalize velocity
        const mag = Math.hypot(this.vx, this.vy);
        this.vx = (this.vx / mag) * this.speed;
        this.vy = (this.vy / mag) * this.speed;

        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.angle = Math.random() * Math.PI * 2;
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = Math.sin(this.angle) * this.speed;
        }
        this.hue = (this.hue + 1) % 360;
        this.color = `hsl(${this.hue}, 100%, 60%)`;
    }

    draw(ctx) {
        ctx.save();
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 30;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

const agents = [];
let mouse = null;

function generateAgents(num = 100, spread = 1) {
    for (let i = 0; i < num; i++) {
        const x = canvas.width / 2 + (Math.random() - 0.5) * spread;
        const y = canvas.height / 2 + (Math.random() - 0.5) * spread;
        agents.push(new Agent(x, y));
    }
}

generateAgents(100, 50);

function updateCanvas() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let agent of agents) {
        agent.update(agents, mouse);
        agent.draw(ctx);
    }

    requestAnimationFrame(updateCanvas);
}

updateCanvas();

canvas.addEventListener("mousemove", (e) => {
    mouse = { x: e.clientX, y: e.clientY };
});

canvas.addEventListener("mouseleave", () => {
    mouse = null;
});

canvas.addEventListener("click", (e) => {
    for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 20;
        const x = e.clientX + Math.cos(angle) * dist;
        const y = e.clientY + Math.sin(angle) * dist;
        agents.push(new Agent(x, y));
    }
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});