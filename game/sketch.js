let socket = io();
//var socket = io('http://localhost:3000',{origins:"*"});

let tank;

//Data recieved from server
let tankData = []

let bullets = [];
let walls = [];

let debug = false;
let isReady = false;

let maze;
let mainCamera;

// <-- SAT

SAT.Polygon.prototype.draw = function () {
    var i = this.points.length;
    push()
    noFill()
    stroke('#f00030')
    beginShape()
    translate(this.pos.x, this.pos.y);
    while (i--) vertex(this.points[i].x, this.points[i].y)
    endShape(CLOSE)
    pop()
}

// SAT -->

function preload() {
    redTank = loadImage("/sprites/tankRed.png");
    blueTank = loadImage("/sprites/tankBlue.png");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    pixelDensity(3);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    smooth(8)

    socket.emit('getSeed', (seed) => {
        console.log(seed)
        randomSeed(seed)
        maze = new Maze(10, 10);
        maze.init();
        maze.generateMaze(() => {
            walls = maze.mazeToWalls(0.15);
        })

        //Generate new seed so everyone won't have the seed for the rest of the game
        randomSeed(Date.now())

        let spawnpoint = maze.getRandomTile()
        tank = new Tank(spawnpoint.x, spawnpoint.y)

        mainCamera = new Camera(0, 0);
        mainCamera.attachTo(tank);

        socket.emit('playerJoin', {
            x: tank.pos.x,
            y: tank.pos.y,
            angle: tank.angle,
            bulletX: tank.pos.bulletX,
            bulletY: tank.pos.bulletY,
            alive: tank.alive
        });

        socket.on('serverUpdate', (data) => {
            tankData = data;
        })

        isReady = true;
    })

}

function draw() {
    Time.Update()

    if (isReady) {
        background(220);

        mainCamera.update()

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
            if (socket.id != tankData[i].id && tankData[i].alive) {
                drawTank(tankData[i].x, tankData[i].y, tankData[i].angle)

                //console.log(tankData[i].bulletX)
                if (tankData[i].bulletX && tankData[i].bulletY) {
                    for (var j = 0; j < tankData[i].bulletX.length; j++) {
                        drawBullet(tankData[i].bulletX[j], tankData[i].bulletY[j])
                        testServerBulletTankCollision(tankData[i].bulletX[j], tankData[i].bulletY[j]);
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

        if (tank.alive) {
            socket.emit('playerUpdate', {
                x: tank.pos.x,
                y: tank.pos.y,
                angle: tank.angle,
                bulletX: bulletX,
                bulletY: bulletY
            });
        }
    }

}

function mousePressed() {
    if (tank && tank.alive) {
        tank.shoot()
    }
}

function AABBcollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return (x1 < x2 + w2 && x1 + w1 > x2) && (y1 < y2 + h2 && y1 + h1 > y2)
}

function getCornersOfRect(angle, width, height) {
    //Input: float angle, float width, float height
    //Output: Array of vectors corrosponding to the corners of the tank

    let v1 = createVector(cos(angle), sin(angle))
    let v2 = createVector(-v1.y, v1.x)

    v1.mult(width / 2)
    v2.mult(height / 2)

    return [
        new SAT.Vector(v1.x - v2.x, v1.y - v2.y),
        new SAT.Vector(v1.x + v2.x, v1.y + v2.y),
        new SAT.Vector(-v1.x + v2.x, -v1.y + v2.y),
        new SAT.Vector(-v1.x - v2.x, -v1.y - v2.y),
    ]

}

function drawTank(xpos, ypos, angle) {
    push()
    translate(xpos, ypos)
    rotate(angle)

    // Color, x, y, width, height
    image(redTank, -52 / 2 * 2, -32 / 2 * 2, 52 * 2, 32 * 2);
    pop()
}

function drawBullet(xpos, ypos) {
    push()
    fill(0)
    ellipse(xpos, ypos, 10)
    pop()
}

function testServerBulletTankCollision(xpos, ypos) {
    if (tank.alive) {
        var boundingBox = new SAT.Circle(new SAT.Vector(xpos, ypos), 5);

        var collided = SAT.testCirclePolygon(boundingBox, tank.boundingBox);
        if (collided) {
            console.log("Collided with server-side bullet")
            tank.alive = false;
            socket.emit('playerHit', {
                alive: tank.alive
            })
        }
    }
}
