// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game objects
const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 50,
    height: 30,
    speed: 5,
    color: '#00ff00'
};

const enemies = [];
const bullets = [];
let score = 0;

// Create enemies
function createEnemies() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 8; j++) {
            enemies.push({
                x: j * 70 + 50,
                y: i * 50 + 30,
                width: 40,
                height: 30,
                speed: 2,
                color: '#ff0000'
            });
        }
    }
}

// Draw functions
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - player.width/2, player.y, player.width, player.height);
}

function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x - enemy.width/2, enemy.y, enemy.width, enemy.height);
    });
}

function drawBullets() {
    ctx.fillStyle = '#ffffff';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x - 2, bullet.y, 4, 10);
    });
}

function drawScore() {
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText(\`Score: \${score}\`, 10, 30);
}

// Game loop
function update() {
    // Move player
    if (keys.ArrowLeft && player.x > player.width/2) {
        player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < canvas.width - player.width/2) {
        player.x += player.speed;
    }

    // Move bullets
    bullets.forEach((bullet, index) => {
        bullet.y -= 7;
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });

    // Check collisions
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (bullet.x > enemy.x - enemy.width/2 &&
                bullet.x < enemy.x + enemy.width/2 &&
                bullet.y > enemy.y &&
                bullet.y < enemy.y + enemy.height) {
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
                score += 100;
            }
        });
    });
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawEnemies();
    drawBullets();
    drawScore();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Keyboard controls
const keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);
document.addEventListener('keypress', e => {
    if (e.key === ' ') {
        bullets.push({
            x: player.x,
            y: player.y
        });
    }
});

// Start game
createEnemies();
gameLoop();