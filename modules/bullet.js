class Bullet {
    constructor(x,y,dir){
        this.pos = createVector(x,y);
        this.dir = dir;
        this.speed = 2.25;
    }

    update(){
        this.dir.normalize().mult(this.speed)
        this.pos.add(this.dir)
    }

    render(){
        push()
        fill(0)
        ellipse(this.pos.x,this.pos.y,10)
        pop()
    }

}