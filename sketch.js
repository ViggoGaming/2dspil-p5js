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

    for(var i=0; i<3; i++){
        let randX = random(width)
        let randY = random(height)
        let r = random(0,2);

        if(r < 1) {
            walls.push(new Wall(randX,randY,randX+random(50,200),randY))
        } else {
            walls.push(new Wall(randX,randY,randX,randY+random(50,200)))
        }
    }
}

function draw (){
    
    background(220);

    tank.move()
    tank.update()
    tank.render()

    for(var bullet of bullets){
        bullet.update()
        bullet.render()
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