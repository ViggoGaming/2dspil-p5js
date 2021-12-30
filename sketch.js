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

    // Generer de to spillere
    player1 = new Tank(width/2,height/2, redTank, [87, 65, 68, 83, 32])
    player2 = new Tank(width/3,height/3, blueTank, [38, 37, 39, 40, 77])

    // Lodret 
    walls.push(new Wall(100,100,100,500));
    walls.push(new Wall(100,100,900,100));
    walls.push(new Wall(900,100,900,500));
    walls.push(new Wall(100,500,900,500));
}

function draw (){
    
    background(220);

    player1.move()
    player1.update()
    player1.render()

    player2.move()
    player2.update()
    player2.render()

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
    player1.shoot()
    player2.shoot()
}

function AABBcollision (x1,y1,w1,h1,x2,y2,w2,h2){
    return (x1<x2+w2&&x1+w1>x2) && (y1<y2+h2&&y1+h1>y2)
}