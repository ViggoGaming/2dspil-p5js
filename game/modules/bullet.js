class Bullet {
    constructor(x,y,dir){
        this.pos = createVector(x,y);

        // Type p5.Vector
        this.dir = dir;

        this.speed = 340;

        this.radius = 5;
        this.diameter = this.radius*2;

        this.lives = 5;

        this.inTank = true;
        this.boundingBox = null;
        this.SATresponse = new SAT.Response();
    }

    update(){

        this.dir.normalize().mult(this.speed).mult(Time.deltaTime)
        this.pos.add(this.dir)
        this.updateBoundingBox()
    }

    render(){
        push()
        fill(0)
        ellipse(this.pos.x,this.pos.y,this.diameter)
        pop()
    }

    updateBoundingBox(){
        if(!this.boundingBox){
            this.boundingBox = new SAT.Circle(new SAT.Vector(this.pos.x,this.pos.y), this.radius);
        } else if(this.boundingBox){
            this.boundingBox.pos.x = this.pos.x;
            this.boundingBox.pos.y = this.pos.y;
        }
    }  

    wallCollision(){

        for(let wall of walls){
            let newX = this.pos.x+this.dir.x;
            let newY = this.pos.y+this.dir.y;

            //If x-direction intersects with wall, then reverse direction
            if(AABBcollision(newX, this.pos.y, this.diameter, this.diameter, wall.x,wall.y,wall.width+(wall.xOffset*2),wall.height+(wall.yOffset*2))) {
                this.inTank = false
                this.lives--;
                this.dir.x*=-1
            }

            //If y-direction intersects with wall, then reverse direction
            if(AABBcollision(this.pos.x, newY, this.diameter, this.diameter, wall.x,wall.y,wall.width+(wall.xOffset*2),wall.height+(wall.yOffset*2))){
                this.inTank = false
                this.lives--;
                this.dir.y*=-1
            }
        }
    }

    // Check lives
    checkLives(i){
        if(this.lives <= 0){bullets.splice(i,1)}
    }

    tankCollision(){
        if(tank.alive){
            this.SATresponse.clear();
            var collided = SAT.testCirclePolygon(this.boundingBox, tank.boundingBox, this.SATresponse);
            if(collided && !this.inTank) {
                tank.alive = false;
                socket.emit('playerHit', {alive: tank.alive})
            } else if(!collided && this.inTank) {
                this.inTank = false
            }
        }
    }

}