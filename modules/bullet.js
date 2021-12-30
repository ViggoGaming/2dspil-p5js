class Bullet {
    constructor(x,y,dir){
        this.pos = createVector(x,y);

        // Type p5.Vector
        this.dir = dir;

        this.speed = 4;

        this.radius = 5;
        this.diameter = this.radius*2;

        this.lives = 3;
    }

    update(){

        this.dir.normalize().mult(this.speed)
        this.pos.add(this.dir)
    }

    render(){
        push()
        fill(0)
        ellipse(this.pos.x,this.pos.y,this.diameter)
        pop()
    }

    wallCollision(){

        for(let wall of walls){
            let newX = this.pos.x+this.dir.x;
            let newY = this.pos.y+this.dir.y;

            //If x-direction intersects with wall, then reverse direction
            if(AABBcollision(newX, this.pos.y, this.diameter, this.diameter, wall.x,wall.y,wall.width+(wall.xOffset*2),wall.height+(wall.yOffset*2))) {
                this.lives--;
                this.dir.x*=-1
            }

            //If y-direction intersects with wall, then reverse direction
            if(AABBcollision(this.pos.x, newY, this.diameter, this.diameter, wall.x,wall.y,wall.width+(wall.xOffset*2),wall.height+(wall.yOffset*2))){
                this.lives--;
                this.dir.y*=-1
            }
        }
    }

    // 
    checkLives(i){
        if(this.lives <= 0){bullets.splice(i,1)}
    }

    

}