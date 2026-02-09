// ========= Selected elements =========
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

// =============== Utilities =================
function isCollision(box1, box2) {
  return !(
    box2.y + box2.height < box1.y ||
    box1.x + box1.width < box2.x ||
    box1.y + box1.height < box2.y ||
    box2.x + box2.width < box1.x
  );
}

function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

// ========= Application state =========
const arrow = {
  fx: 10,
  fy: 290,
  tx: 30,
  ty: 350,
};
const ball = {
  x: 10,
  y: 290,
  width: 20,
  height: 20,
  vx: 0,    // px/s
  vy: 0,    // px/s
  ay: 0,  // px/s2
  img: new Image(),
};
const windows = [
  { x: 479, y: 122, width: 15, height: 30 },
  { x: 494, y: 240, width: 18, height: 42 },
  { x: 562, y: 240, width: 18, height: 42 },
];
const bush = {
  x: 250,
  y: 200,
  width: 100,
  height: 200,
  img: new Image(),
};
let lovedWindow = 0;
let gameState = 0; // 0-start, 1-moving, 2-hit, 3-missed

let kivalasztott_ablak=random(0,2)

// ========= Time-based animation (from the lecture slide) =========
let lastFrameTime = performance.now();

function next(currentTime = performance.now()) {
  const dt = (currentTime - lastFrameTime) / 1000; // seconds
  lastFrameTime = currentTime;

  update(dt); // Update current state
  render(); // Rerender the frame

  requestAnimationFrame(next);
}

function update(dt) {
  if (gameState === 1) {
    // Sebesség frissítése gyorsulással
    ball.vy += ball.ay * dt;
    
    // Pozíció frissítése sebességgel
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    // játék vége logikák
    if(isCollision(ball,bush)){
      gameState=3
    }else if(isCollision(ball, windows[kivalasztott_ablak])){
      gameState=2
    }else{
        for (let i = 0; i<windows.length; i++){
          kivalasztott_ablak!=i&&isCollision(ball,windows[i])? gameState=3 : ""
        }
    }
    if (ball.x>canvas.width||ball.y>canvas.height|| ball.x<=0|| ball.y<=0){
      gameState=3
    }
  }
}

function render() {
  // Background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //1. Téglalapokkal jelenítsd meg a követ (ball), a bokrot (bush) és az ablakokat (windows)!
  // ctx.fillRect(bush.x,bush.y,bush.width,bush.height)
  //ablakok
  //windows.forEach(ablak => {
  //  ctx.fillStyle="yellow"
  //  ctx.fillRect(ablak.x,ablak.y,ablak.width,ablak.height)
  //});
  //ball
  //ctx.fillRect(ball.x,ball.y,ball.width,ball.height)
  
  //2. A téglalapok helyett használd a megfelelő képeket (ball, bush)!
  ctx.drawImage(ball.img, ball.x,ball.y,ball.width,ball.height)
  ctx.drawImage(bush.img, bush.x,bush.y,bush.width,bush.height)

  //3. Válassz egy véletlen ablakot (véletlen egész 0 és 2 között), és azt sárgával jelenítsd meg!
  for (let i = 0; i<windows.length; i++){
    kivalasztott_ablak===i ? ctx.fillStyle="yellow": ctx.fillStyle="blue"
    ablak=windows[i]
    ctx.fillRect(ablak.x,ablak.y,ablak.width,ablak.height)
  }

  //arrow vonal rajzolas
  ctx.beginPath() // szakasz kezd
  ctx.strokeStyle="red"
  ctx.lineWidth = 3; //vastagság
  ctx.moveTo(arrow.fx, arrow.fy) //kezdo poziciora mozgat
  ctx.lineTo(arrow.tx,arrow.ty)  //vonal veget allitja be
  ctx.stroke() // kirajzol

  ctx.fillStyle="white"
  ctx.font="48px serif"
  if(gameState===3){
    ctx.fillText("Oooops!",canvas.width/3, canvas.height/2)
  }else if(gameState===2){
      ctx.fillText("Come, my lover!",canvas.width/5, canvas.height/2)
  }


}

//4. Az egeret mozgatva a Canvas fölött, olvasd ki az egérpozíciót (offsetX, offsetY), és húzz egy 3px vastag piros vonalat az arrow objektum fx, fy pontjától az egérpozícióig. (Ezt akár el is tárolhatjuk az arrow objektum tx, ty tulajdonságaiban.)
canvas.addEventListener("mousemove",(e)=>{
  //console.log(e)
  arrow.tx=e.offsetX
  arrow.ty=e.offsetY
})

//5. Kattintásra kezdjük el mozgatni a követ! A piros szakasz iránya lesz a lövés iránya, a szakasz hossza a lövés erőssége. Ehhez adjunk a kőnek vízszintes sebességet és függőleges sebességet és gyorsulást! A sebességeket a piros szakasz x irányú és y irányú kiterjedése adja (azaz az egérpozíciónak x és y koordinátájának és az arrow objektum fx, fy pontjának különbsége), ezt az értéket érdemes pl. 3-mal felszorozni, hogy megfelelő sebességgel induljon el a kő. A függőleges gyorsulás legyen fix, pl. 300 px/s2!
canvas.addEventListener("click", (e)=>{
  if (gameState === 0) {
    gameState = 1;
    // Sebességek beállítása a piros szakasz alapján
    ball.vx = (arrow.tx - arrow.fx) * 3;
    ball.vy = (arrow.ty - arrow.fy) * 3;
    // Függőleges gyorsulás beállítása (gravitáció)
    ball.ay = 300;
  }
  console.log(gameState)
})


// ========= Start the loop =========
bush.img.src = "bush.png";
ball.img.src = "ball.png";
next(); 
