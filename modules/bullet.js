class Bullet {
    constructor(x,y,dir){
        this.pos = createVector(x,y);

        // Type p5.Vector
        this.dir = dir;

        this.speed = 4;

        this.radius = 5;
        this.diameter = this.radius*2;
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

    wallCollision(wall){

        let newX = this.pos+(this.dir.x*this.speed);
        let newY = this.y+(this.dir.y*this.speed);

        let wallX = wall.x;
        let wallY = wall.y;
        

        if(AABBcollision(newX-this.radius,newY-this.radius,this.diameter,this.diameter,)){
            
        }

    }

}