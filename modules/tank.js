class Tank {
    constructor(x,y){
        this.pos = createVector(x,y);
        this.vel = createVector(0,0); 
        // acc?
        this.angle = 0;

        this.speed = 2;
        this.turningSpeed = 0.03;

        this.cooldown = 1000 // I millisekunder
        this.shootTime = 0 // Sætter seneste skud tidspunkt

        this.inputs = {
            forward: 87,
            left: 65,
            right: 68,
            backwards: 83,
            shoot: 32
        }

    }

    move(){

        if(keyIsDown(this.inputs.left)) this.angle -= this.turningSpeed;
        if(keyIsDown(this.inputs.right)) this.angle += this.turningSpeed;

        if(keyIsDown(this.inputs.forward)){
            this.vel.add( cos(this.angle), sin(this.angle))
        } else if(keyIsDown(this.inputs.backwards)){
            this.vel.add( -cos(this.angle), -sin(this.angle))
        }

        if(keyIsDown(this.inputs.shoot)){
            this.shoot()
        }

    }

    shoot(){
        // Hvis "this.cooldown" sekunder er passeret siden sidste skud, fjern cooldown
        if (millis() - this.shootTime >= this.cooldown) {
            this.shootTime = millis()

            let dir = createVector(cos(this.angle),sin(this.angle))
            bullets.push(new Bullet(this.pos.x+dir.x*38,this.pos.y+dir.y*38,dir))
        }
    }

    update(){
        this.vel.normalize().mult(this.speed)
        this.pos.add(this.vel)
        this.vel.set(0,0);
    }

    render(){
        push()
        translate(this.pos.x,this.pos.y)
        fill('blue')
        rotate(this.angle)
        rect(-52/2,-32/2,52,32);
        rect(0,-32/6,35,32/3)
        pop()
    }
}