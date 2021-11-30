class Tank {
    constructor(x,y){
        this.pos = createVector(x,y);
        this.vel = createVector(0,0); 
        this.width = 52;
        this.height = 32;

        this.scale = 2;
        // acc?
        this.angle = 0;

        this.speed = 2;
        this.turningSpeed = 0.03;

        this.cooldown = 800 // I millisekunder
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
            bullets.push(new Bullet(this.pos.x+(dir.x*this.width/2)*this.scale,this.pos.y+(dir.y*this.width/2)*this.scale,dir))
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
        //fill('blue')
        rotate(this.angle)
       // rect(-this.width/2*this.scale,-this.height/2*this.scale,this.width*this.scale,this.height*this.scale);
        //rect(0,-this.height/6,35,this.height/3)
        image(redTank, -this.width/2*this.scale, -this.height/2*this.scale, this.width*this.scale, this.height*this.scale);
        pop()
    }
}