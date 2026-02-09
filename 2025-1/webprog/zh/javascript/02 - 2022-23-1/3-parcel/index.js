const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

// Application state
const plane = {
  x: 0,
  y: 20,
  width: 60,
  height: 30,
  vx: 0,
  img: new Image(),
};
const parcel = {
  x: 0,
  y: plane.y + plane.height,
  width: 30,
  height: 30,
  vx: 0,
  vy: 0,
  ay: 0,
  img: new Image(),
};
const house = {
  x: 400,
  y: canvas.height - 120,
  width: 100,
  height: 100,
  img: new Image(),
};
let gameState = 0; // 0-start, 1-moving, 2-dropping, 3-hit, 4-missed

// ================= Game loop =====================

// Time-based animation (from the lecture slide)
let lastFrameTime = performance.now();

function next(currentTime = performance.now()) {
  const dt = (currentTime - lastFrameTime) / 1000; // seconds
  lastFrameTime = currentTime;

  update(dt); // Update current state
  render(); // Rerender the frame

  requestAnimationFrame(next);
}

function update(dt) {
  //3. Kattintásra induljon el a repülő! Ehhez a repülő vízszintes sebességét (vx, pl. 200px/s) kell beállítani, és természetesen ennek megfelelően változtatni a pozícióját!
  if (gameState>=1){
    //repulo
    plane.vx=200
    plane.x += plane.vx * dt

    //4. A repülővel együtt mozogjon a csomag is!
    if (gameState===1){
      parcel.x = plane.x    //koveti a gepet a csomag
      //parcel.y = parcel.y
      parcel.vx = plane.vx
    }else if(gameState===2){
      //5. Újabb kattintásra ejtsd le a csomagot! Ehhez a csomagnak kell egy függőleges irányú gyorsulást adni (ay, pl. 300 px/s^2). Használhatod a gameState változót a megfelelő állapot nyomon követésére.
      parcel.ay = 300
      parcel.vy += parcel.ay * dt
      parcel.y += parcel.vy * dt
      parcel.x += parcel.vx * dt
    }
    // Minden elmozduláskor ellenőrizd, hogy a csomag találkozik-e a házzal! Ha igen, akkor jeleníts meg egy szöveget a rajzvásznon ennek megfelelően ("Delivered"), és állítsd meg a csomag zuhanását!
    if (isCollision(parcel,house)){
      parcel.vy=0
      parcel.vx=0
      gameState=3
    }
    //Ha a csomag eléri a vászon alját és nem találkozott a házzal, akkor ezt is jelenítsd meg egy szöveggel a rajzvásznon ("Missed"), és állítsd meg a csomag zuhanását!
    if (parcel.y>= canvas.height){
      parcel.vy=0
      parcel.vx=0
      gameState=4
    }
}

}

function render() {
  //1. A render függvényen belül töröld le a vásznat, majd rajzolj ki 3 téglalapot a repülő, csomag és ház helyére!
  ctx.clearRect(0,0,canvas.width, canvas.height)
  // ctx.fillRect(plane.x,plane.y,plane.width,plane.height)
  // ctx.fillRect(parcel.x,parcel.y,parcel.width,parcel.height)
  // ctx.fillRect(house.x,house.y,house.width,house.height)

  //2. A téglalapok helyett az előre betöltött képeket jelenítsd meg!
  ctx.drawImage(plane.img,plane.x,plane.y,plane.width,plane.height)
  ctx.drawImage(parcel.img,parcel.x,parcel.y,parcel.width,parcel.height)
  ctx.drawImage(house.img,house.x,house.y,house.width,house.height)

  // szoveg kiirasok a vegere
  if (gameState===3){
  ctx.font = "48px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign="right"
  ctx.fillText("Delivered!", canvas.width/2, canvas.height/2);
  }

  if (gameState===4){
  ctx.font = "48px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign="right"
  ctx.fillText("Missed!", canvas.width/2, canvas.height/2);
  }

}

// eventlistener kattintásokra
document.addEventListener("click",(e)=>{
  gameState === 0 ? gameState=1 : (gameState>2 ? gameState=gameState : gameState=2)
  //console.log(gameState)
  //update(next)
})
// Start the loop
plane.img.src = "plane.png";
house.img.src = "house.png";
parcel.img.src = "parcel.png";
next(); 

// =============== Utility functions =================

function isCollision(box1, box2) {
  return !(
    box2.y + box2.height < box1.y ||
    box1.x + box1.width < box2.x ||
    box1.y + box1.height < box2.y ||
    box2.x + box2.width < box1.x
  );
}


