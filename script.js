const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0
};

const bullets = [];
const enemies = [];
const enemySpeed = 2;

// Key Event Listeners
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") player.dx = -player.speed;
    if (e.key === "ArrowRight") player.dx = player.speed;
    if (e.key === " ") bullets.push({ x: player.x + 22, y: player.y, width: 6, height: 10 });
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") player.dx = 0;
});

// Create Enemies
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 10; j++) {
        enemies.push({
            x: j * 60 + 50,
            y: i * 50 + 30,
            width: 40,
            height: 40
        });
    }
}

// Update Function
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move Player
    player.x += player.dx;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    // Draw Player
    ctx.fillStyle = "lime";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Move and Draw Bullets
    bullets.forEach((bullet, index) => {
        bullet.y -= 5;
        if (bullet.y < 0) bullets.splice(index, 1);
        ctx.fillStyle = "red";
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // Move and Draw Enemies
    enemies.forEach((enemy, index) => {
        enemy.y += enemySpeed * 0.1;
        ctx.fillStyle = "white";
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

        // Check for Collision with Bullets
        bullets.forEach((bullet, bulletIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                enemies.splice(index, 1);
                bullets.splice(bulletIndex, 1);
            }
        });
    });

    requestAnimationFrame(update);
}

// Start Game Loop
update();