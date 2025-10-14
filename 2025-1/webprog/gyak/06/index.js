const canvas = document.getElementById('jatek');
const ctx = canvas.getContext('2d');

// img beallitasok
//-----------------------------
const images = {
    column: new Image(),
    bird: new Image(),
    background: new Image()
};

images.column.src = 'column.png';
images.bird.src = 'bird.png';
images.background.src = 'bg.png';

let imagesLoaded = 0;
const totalImages = 3;

function checkImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        resetGame();
        gameLoop();
    }
}

images.column.onload = checkImagesLoaded;
images.bird.onload = checkImagesLoaded;
images.background.onload = checkImagesLoaded;

// alap jatek adatok
//-----------------------------
const gravity = 0.6;
const jumpStrength = -10;


//-----------------------------
// bird obj
//-----------------------------
const bird = {
    x: 100,
    y: 200,
    width: 20,
    height: 20,
    velocity: 0,
    
    update() {
        this.velocity += gravity;
        this.y += this.velocity;
        
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
            this.velocity = 0;
        }
    },
    
    jump() {
        this.velocity = jumpStrength;
    },
    
    draw() {
        if (images.bird.complete) {
            ctx.drawImage(images.bird, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
};

//-----------------------------
// fal logika
//-----------------------------
const wallWidth = 40;
const wallGap = 120;
const wallSpeed = 2;
const walls = [];

let score = 0;
let gamePause = false;
let gameOver = false;


function createWall() {
    const gapY = Math.floor(Math.random() * (canvas.height - wallGap - 40)) + 20;
    walls.push({
        x: canvas.width,
        gapY: gapY
    });
}

function updateWalls() {
    for (let i = 0; i < walls.length; i++) {
        walls[i].x -= wallSpeed;
    }
    while (walls.length && walls[0].x + wallWidth < 0) {
        walls.shift();
    }
    if (walls.length === 0 || walls[walls.length - 1].x < canvas.width - 200) {
        createWall();
    }
}

function drawWalls() {
    for (const wall of walls) {
        if (images.column.complete) {
            ctx.save();
            ctx.scale(1, -1);
            ctx.drawImage(images.column, wall.x, -wall.gapY, wallWidth, wall.gapY);
            ctx.restore();
            
            ctx.drawImage(images.column, wall.x, wall.gapY + wallGap, wallWidth, canvas.height - wall.gapY - wallGap);
        } else {
            //csak ha valamit megint elrontok xd
            ctx.fillStyle = 'blue';
            ctx.fillRect(wall.x, 0, wallWidth, wall.gapY);
            ctx.fillRect(wall.x, wall.gapY + wallGap, wallWidth, canvas.height - wall.gapY - wallGap);
        }
    }
}

function checkCollision() {
    for (const wall of walls) {
        const bx = bird.x, by = bird.y, bw = bird.width, bh = bird.height;
        if (
            bx + bw > wall.x && bx < wall.x + wallWidth &&
            by < wall.gapY
        ) {
            return true;
        }
        if (
            bx + bw > wall.x && bx < wall.x + wallWidth &&
            by + bh > wall.gapY + wallGap
        ) {
            return true;
        }
    }
    return false;
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Pont(ok): ' + score, 10, 30);
}

function resetGame() {
    bird.x = 100;
    bird.y = 200;
    bird.velocity = 0;
    walls.length = 0;
    score = 0;
    gameOver = false;
}

function pauseGame(){
    if (gamePause){
        gamePause = false
    }else{
        gamePause = true
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //hatter rajzol
    if (images.background.complete) {
        ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);
    }

    if (!gamePause){
        if (!gameOver) {
            bird.update();
            updateWalls();

            // Pontszám növelése, ha bozo átjutott a falak között
            for (const wall of walls) {
                if (!wall.passed && bird.x > wall.x + wallWidth) {
                    wall.passed = true;
                    score++;
                }
            }

            if (checkCollision()) {
                gameOver = true;
            } 
        }
    }

    bird.draw();   
    drawWalls();
    drawScore();
 
    if (gamePause) {
        ctx.fillStyle = 'red';
        ctx.font = '36px Arial';
        ctx.fillText('Game Paused',canvas.width / 2-50, canvas.height / 2);
    }
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '36px Arial';
        ctx.fillText('Vesztettél!', canvas.width / 2-50, canvas.height / 2);
    }
    
    requestAnimationFrame(gameLoop);
}

// ugrás gombok
addEventListener("keydown", function(e) {
    if (e.code === "Space" || e.code === "ArrowUp") {
        if (gamePause){
        gamePause = false
        }
        e.preventDefault();
        if (gameOver) {
            resetGame();
        } else {
            bird.jump();
        }
    }
});

addEventListener("click", function() {
    if (gameOver) {
        resetGame();
    } else {
        bird.jump();
    }
});

//pause ha esc
addEventListener("keydown", function(e){
    if (e.code==="Escape"){
        pauseGame()
    }
})