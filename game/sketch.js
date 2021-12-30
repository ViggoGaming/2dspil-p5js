let socket = io();
//let startGame=false
let tank;

//Data recieved from server
let tankData = []

let bullets = [];
let walls = [];

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

    socket.emit('playerJoin', {x: tank.pos.x, y: tank.pos.y, angle: tank.angle});

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

        tank.move()
        tank.update();
        tank.render();

        for (var i = 0; i < bullets.length; i++) {
            bullets[i].wallCollision()
            bullets[i].update()
            bullets[i].render()
            bullets[i].checkLives(i)
        }

        for (var i = 0; i < tankData.length; i++) {
            // Tjekker om server-side tank og client-side tanks ligger oven på hinanden
            if(socket.id != tankData[i].id){
                drawTank(tankData[i].x,tankData[i].y,tankData[i].angle)

                if(gameData.bulletX && gameData.bulletY){

                    for(var i=0; i<gameData.bulletX.length; i++){
                        drawBullet(tankData[i].gameData.bulletX[i], tankData[i].gameData.bulletY[i])
                    }
                    
                }
                
            }
        }

        for (var wall of walls) {
            wall.render()
        }



        let gameData = {
            bulletX: [],
            bulletY: []
        }

        for (var i = 0; i < bullets.length; i++) {
            gameData.bulletX.push(bullets[i].pos.x)
            gameData.bulletY.push(bullets[i].pos.y)
        }

        socket.emit('playerUpdate', {x: tank.pos.x, y: tank.pos.y, angle: tank.angle, gameData: gameData}); 
    //}
}

function mousePressed() {
    tank.shoot()
    // tank2.shoot()
}

function AABBcollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return (x1 < x2 + w2 && x1 + w1 > x2) && (y1 < y2 + h2 && y1 + h1 > y2)
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