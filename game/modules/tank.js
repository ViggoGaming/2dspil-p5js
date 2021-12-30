class Tank {
    constructor(x, y, color, keys) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.width = 52;
        this.height = 32;
        this.tankColor = color
        this.keys = keys

        this.scale = 2;
        // acc?
        this.angle = 0;

        this.speed = 2;
        this.turningSpeed = 0.03;

        this.cooldown = 800 // I millisekunder
        this.shootTime = 0 // Sætter seneste skud tidspunkt

        this.inputs = {
            forward: this.keys[0],
            left: this.keys[1],
            right: this.keys[2],
            backwards: this.keys[3],
            shoot: this.keys[4]
        }
    }

    move() {

        if (keyIsDown(this.inputs.left)) this.angle -= this.turningSpeed;
        if (keyIsDown(this.inputs.right)) this.angle += this.turningSpeed;

        if (keyIsDown(this.inputs.forward)) {
            this.vel.add(cos(this.angle), sin(this.angle))
        } else if (keyIsDown(this.inputs.backwards)) {
            this.vel.add(-cos(this.angle), -sin(this.angle))
        }

        if (keyIsDown(this.inputs.shoot)) {
            this.shoot()
        }

    }

    shoot() {
        // Hvis "this.cooldown" sekunder er passeret siden sidste skud, fjern cooldown
        if (millis() - this.shootTime >= this.cooldown) {
            this.shootTime = millis()

            let dir = createVector(cos(this.angle), sin(this.angle))
            bullets.push(new Bullet(this.pos.x + (dir.x * this.width / 2) * this.scale, this.pos.y + (dir.y * this.width / 2) * this.scale, dir))
        }
    }
    
    update(dt) {
        if (!dt) dt = 1 / 60;

        // tilføj dt her
        this.vel.normalize().mult(this.speed)
        this.pos.add(this.vel)
        this.vel.set(0, 0);
    }

    render() {
        push()
        translate(this.pos.x, this.pos.y)
        //fill('blue')
        rotate(this.angle)
        // rect(-this.width/2*this.scale,-this.height/2*this.scale,this.width*this.scale,this.height*this.scale);
        //rect(0,-this.height/6,35,this.height/3)

        image(this.tankColor, -this.width / 2 * this.scale, -this.height / 2 * this.scale, this.width * this.scale, this.height * this.scale);
        pop()
    }

    /*wallCollision(){

        for(let wall of walls){

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
    }*/

}
