const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}

class Agent {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = getRandomRange(1, 3) * 0.85;
        this.radius = Math.random() * getRandomRange(4, 7);
        this.hue = Math.random() * 360;
        this.color = `hsl(${this.hue}, 100%, 60%)`;
        this.isDead = false;

        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
    }

    update(agents, mouse) {
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
                align.x += other.vx;
                align.y += other.vy;

                cohesion.x += other.x;
                cohesion.y += other.y;

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

            cohesion.x = ((cohesion.x / total) - this.x) * Math.random() * 0.01;
            cohesion.y = ((cohesion.y / total) - this.y) * Math.random() * 0.01;

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

        this.vx += (align.x + cohesion.x + separation.x) * 0.05;
        this.vy += (align.y + cohesion.y + separation.y) * 0.05;

        const mag = Math.hypot(this.vx, this.vy);
        this.vx = (this.vx / mag) * this.speed;
        this.vy = (this.vy / mag) * this.speed;

        this.x += this.vx;
        this.y += this.vy;

        // Teleport at edges
        if (this.x < 0) this.x += canvas.width;
        if (this.x > canvas.width) this.x -= canvas.width;
        if (this.y < 0) this.y += canvas.height;
        if (this.y > canvas.height) this.y -= canvas.height;

        this.hue = (this.hue + 1) % 360;
        this.color = `hsl(${this.hue}, 100%, 60%)`;
    }

    draw(ctx) {
        ctx.save();
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = this.color;

        const edgeDist = 50;
        const positions = [
            { x: this.x, y: this.y },
            { x: this.x - canvas.width, y: this.y },
            { x: this.x + canvas.width, y: this.y },
            { x: this.x, y: this.y - canvas.height },
            { x: this.x, y: this.y + canvas.height },
            { x: this.x - canvas.width, y: this.y - canvas.height },
            { x: this.x + canvas.width, y: this.y - canvas.height },
            { x: this.x - canvas.width, y: this.y + canvas.height },
            { x: this.x + canvas.width, y: this.y + canvas.height }
        ];

        for (const pos of positions) {
            ctx.save();

            let scaleX = 1;
            let scaleY = 1;

            if (pos.x < edgeDist) {
                scaleX = 1 + (edgeDist - pos.x) / edgeDist;
            } else if (pos.x > canvas.width - edgeDist) {
                scaleX = 1 + (pos.x - (canvas.width - edgeDist)) / edgeDist;
            }

            if (pos.y < edgeDist) {
                scaleY = 1 + (edgeDist - pos.y) / edgeDist;
            } else if (pos.y > canvas.height - edgeDist) {
                scaleY = 1 + (pos.y - (canvas.height - edgeDist)) / edgeDist;
            }

            ctx.translate(pos.x, pos.y);
            ctx.scale(scaleX, scaleY);

            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        ctx.restore();
    }
}

class BlackHole {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 30;
        this.maxRadius = 100;
        this.growthRate = 0.5;
        this.lifespan = 1000; // frames
        this.pullStrength = 0.2;
    }

    update() {
        if (this.radius < this.maxRadius) {
            this.radius += this.growthRate;
        }
        this.lifespan--;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, "rgba(0,0,0,0.8)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    isDead() {
        return this.lifespan <= 0;
    }

    attract(agent) {
        const dx = this.x - agent.x;
        const dy = this.y - agent.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.radius) {
            const strength = (1 - dist / this.radius) * this.pullStrength;
            agent.vx += (dx / dist) * strength;
            agent.vy += (dy / dist) * strength;
        }
    }
}

const agents = [];
const blackHoles = [];
let mouse = null;

let warpPulse = 0;
let warpDirection = 1;

function generateAgents(num = 100, spread = 1) {
    for (let i = 0; i < num; i++) {
        const x = canvas.width / 2 + (Math.random() - 0.5) * spread;
        const y = canvas.height / 2 + (Math.random() - 0.5) * spread;
        agents.push(new Agent(x, y));
    }
}

function updateCanvas() {
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let hole of blackHoles) {
        hole.update();
        hole.draw(ctx);
    }

    for (let i = agents.length - 1; i >= 0; i--) {
        const agent = agents[i];

        for (let hole of blackHoles) {
            hole.attract(agent);
        }

        agent.update(agents, mouse);
        agent.draw(ctx);

        if (agent.isDead) {
            agents.splice(i, 1);
        }
    }

    for (let i = blackHoles.length - 1; i >= 0; i--) {
        if (blackHoles[i].isDead()) {
            blackHoles.splice(i, 1);
        }
    }

    requestAnimationFrame(updateCanvas);
}

generateAgents(100, 50);
updateCanvas();

// Event listeners
canvas.addEventListener("mousemove", (e) => {
    mouse = { x: e.clientX, y: e.clientY };
});

canvas.addEventListener("mouseleave", () => {
    mouse = null;
});

canvas.addEventListener("click", (e) => {
    // Spawn new agents
    /*for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 20;
        const x = e.clientX + Math.cos(angle) * dist;
        const y = e.clientY + Math.sin(angle) * dist;
        agents.push(new Agent(x, y));
    }*/
    // Create a black hole
    blackHoles.push(new BlackHole(e.clientX, e.clientY));
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
