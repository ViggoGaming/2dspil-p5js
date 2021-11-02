let tank;
let bullets = []

function setup () {
    createCanvas(500, 500);
    tank = new Tank(width/2,height/2)
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
    
}

function mousePressed(){
    tank.shoot()
}

function AABBcollision (x1,y1,w1,h1,x2,y2,w2,h2){
    return (x1<x2+w2&&x1+w1>x2) && (y1<y2+h2&&y1+h1>y2)
}