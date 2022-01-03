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

        this.alive = true

        this.boundingBox = null;
        this.SATresponse = new SAT.Response();

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
            bullets.push(new Bullet(this.pos.x + (dir.x * (this.width+2) / 2) * this.scale, this.pos.y + (dir.y * (this.width+2) / 2) * this.scale, dir))
        }
    }
    
    update() {
        // tilføj dt her
        this.vel.normalize().mult(this.speed)
        this.pos.add(this.vel)
        this.vel.set(0, 0);
        this.updateBoundingBox()
    }

    render() {
        push()
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)
        image(this.tankColor, -this.width / 2 * this.scale, -this.height / 2 * this.scale, this.width * this.scale, this.height * this.scale);
        pop()

        if(debug){
            this.boundingBox.draw()
        }
    }

    updateBoundingBox(){
       
        let vertices = getCornersOfRect(this.angle,this.width*this.scale,this.height*this.scale)
        if(!this.boundingBox){
            this.boundingBox = new SAT.Polygon(new SAT.Vector(this.pos.x,this.pos.y), vertices);
        } else if(this.boundingBox){
            this.boundingBox.pos.x = this.pos.x;
            this.boundingBox.pos.y = this.pos.y;
            this.boundingBox.setPoints(vertices)
        }
        
    }

    wallCollision(){

        for(let wall of walls){
            this.SATresponse.clear();
            var collided = SAT.testPolygonPolygon(this.boundingBox, wall.boundingBox, this.SATresponse);
            if(collided){
                this.pos.x -= this.SATresponse.overlapV.x;
                this.pos.y -= this.SATresponse.overlapV.y;
            }
        }  
        
    }   
}
