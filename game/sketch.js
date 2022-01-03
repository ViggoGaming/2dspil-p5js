let socket = io();
//var socket = io('http://localhost:3000',{origins:"*"});
//let startGame=false
let tank;

//Data recieved from server
let tankData = []

let bullets = [];
let walls = [];

let debug = false;

// <-- SAT
//var P = SAT.Polygon;
//var V = SAT.Vector;
//var B = SAT.Box;
//var C = SAT.Circle;

SAT.Polygon.prototype.draw = function(){  
    var i = this.points.length;
    push()
    noFill()
    stroke('#f00030')
    beginShape()
    translate(this.pos.x,this.pos.y);
    while(i--) vertex(this.points[i].x,this.points[i].y)
    endShape(CLOSE)
    pop()
}

function preload() {
    redTank = loadImage("/sprites/tankRed.png");
    blueTank = loadImage("/sprites/tankBlue.png");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
/*
function keyPressed() {
    if (keyCode === ENTER) {
        startGame = true
    }
}
*/
function setup() {
    createCanvas(windowWidth, windowHeight);
    smooth(8)

    tank = new Tank(width / 2, height/2, redTank, [87, 65, 68, 83, 32])

    socket.emit('playerJoin', {x: tank.pos.x, y: tank.pos.y, angle: tank.angle, bulletX: tank.pos.bulletX, bulletY: tank.pos.bulletY});

    socket.on('serverUpdate', (data) => {
        tankData = data;
    })

    // Lodret 
    walls.push(new Wall(100, 100, 100, 500));
    walls.push(new Wall(100, 100, 900, 100));
    walls.push(new Wall(900, 100, 900, 500));
    walls.push(new Wall(100, 500, 900, 500));
}

function draw() {
//    push()
//        fill(110)
//        textSize(30)
//        textAlign(CENTER, CENTER);
 //       text('Tryk Enter for at Starte Spillet', width / 2, height / 2)
//    pop()

    //if (startGame == true) {
        // Time.update();

        background(220);

        if (tank.alive) {
            tank.move()
            tank.update();
            tank.wallCollision()
            tank.render();
        }
        for (var i = 0; i < bullets.length; i++) {
            bullets[i].update()
            bullets[i].wallCollision()
            bullets[i].tankCollision()
            bullets[i].render()
            bullets[i].checkLives(i)
        }
        

        for (var i = 0; i < tankData.length; i++) {
            // Tjekker om server-side tank og client-side tanks ligger oven på hinanden
            if(socket.id != tankData[i].id){
                drawTank(tankData[i].x,tankData[i].y,tankData[i].angle)
                
             //   console.log(tankData[i].bulletX)
                if(tankData[i].bulletX && tankData[i].bulletY){
                    for(var j=0; j<tankData[i].bulletX.length; j++){
                        drawBullet(tankData[i].bulletX[j], tankData[i].bulletY[j])
                    }
                }
            }      
    }

        for (var wall of walls) {
            wall.render()
        }


        var bulletX = [];
        var bulletY = [];

        for (var i = 0; i < bullets.length; i++) {
            bulletX.push(bullets[i].pos.x)
            bulletY.push(bullets[i].pos.y)
        }
        
        socket.emit('playerUpdate', {x: tank.pos.x, y: tank.pos.y, angle: tank.angle, bulletX: bulletX, bulletY: bulletY}); 
}

function mousePressed() {
    tank.shoot()
    // tank2.shoot()
}

function AABBcollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return (x1 < x2 + w2 && x1 + w1 > x2) && (y1 < y2 + h2 && y1 + h1 > y2)
}

function getCornersOfRect(angle,width,height){
    //Input: float angle, float width, float height
    //Output: Array of vectors corrosponding to the corners of the tank
    
    let v1 = createVector(cos(angle),sin(angle))
    let v2 = createVector(-v1.y,v1.x)

    v1.mult(width/2)
    v2.mult(height/2)
    
    return [
        new SAT.Vector(v1.x-v2.x,v1.y-v2.y),
        new SAT.Vector(v1.x+v2.x,v1.y+v2.y),
        new SAT.Vector(-v1.x+v2.x,-v1.y+v2.y),
        new SAT.Vector(-v1.x-v2.x,-v1.y-v2.y),
    ]

}

//Converts array of p5.Vector to SAT.Vector
//Returns array of SAT.Vector
function p5VecToSATVec(vec){
    var SATvectors = [];
    for(var i=0; i<vec.length;i++){
        SATvectors[i] = new SAT.Vector(vec[i].x,vec[i].y)
    }
    return SATvectors;
}

function drawTank(xpos,ypos,angle){
    push()
    translate(xpos, ypos)
    rotate(angle)

    // Color, x, y, width, height
    image(redTank, -52 / 2 * 2, -32 / 2 * 2, 52 * 2, 32 * 2);
    pop()
}

function drawBullet(xpos,ypos){
    push()
    fill(0)
    ellipse(xpos,ypos,10)
    pop()
}