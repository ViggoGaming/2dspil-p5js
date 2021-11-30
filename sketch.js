let tank;
let bullets = [];
let walls = [];

function preload() {
    redTank = loadImage("/sprites/tankRed.png");
    blueTank = loadImage("/sprites/tankBlue.png");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup () {
    createCanvas(windowWidth, windowHeight);
    smooth(8)
    tank = new Tank(width/2,height/2)
    // Lodret 
    walls.push(new Wall(100,100,100,500));
    walls.push(new Wall(100,100,900,100));
    walls.push(new Wall(900,100,900,500));
    walls.push(new Wall(100,500,900,500));
}

function draw (){
    
    background(220);

    tank.move()
    tank.update()
    tank.render()

    for(var i=0; i<bullets.length; i++){
        bullets[i].wallCollision()
        bullets[i].update()
        bullets[i].render()
        bullets[i].checkLives(i)
    }

    for(var wall of walls){
        wall.render()
    }
    
}

function mousePressed(){
    tank.shoot()
}

function AABBcollision (x1,y1,w1,h1,x2,y2,w2,h2){
    return (x1<x2+w2&&x1+w1>x2) && (y1<y2+h2&&y1+h1>y2)
}