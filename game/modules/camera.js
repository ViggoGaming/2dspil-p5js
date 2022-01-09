class Camera {
    constructor(xOffset, yOffset){
        this.offset = createVector(xOffset, yOffset);
        this.target = null;
        this.showcasing = false;
        this.shaking = false;
        this.shakeVal = null;
    }

    update(){
        if(this.target && this.target.pos){

            let camX, camY;

            if(width < maze.mazeWidth){
                camX = constrain(-this.target.pos.x + width/2, -maze.mazeWidth+width-8, 0)
            } else {
                camX = -maze.mazeWidth/2 + width/2;
            }
            
            if(height < maze.mazeHeight){
                camY = constrain(-this.target.pos.y + height/2, -maze.mazeHeight+height-8, 0)
            } else {
                camY = -maze.mazeHeight/2 + height/2;
            }

            if(this.shaking){
                this.offset.set(random(-this.shakeVal,this.shakeVal),random(-this.shakeVal,this.shakeVal));
            } else {
                this.offset.set(0,0)
            }

            let translateV = createVector(camX, camY);
            translateV.add(this.offset);
            translate(translateV.x, translateV.y);
        } 
    }

    attachTo (object){
        if(object.pos && this.showcasing == false){
            this.target = object;
        } 
    }

    spectate(target,time){
        if(target.pos && this.showcasing == false){
            this.showcasing = true;
            let self = this;
            let orginalTarget = this.target;
            this.target = target;
            setTimeout(function(){
                self.showcasing = false;
                self.target = orginalTarget;
            }, time);
        } 
    }

    shake(val,time){
        if(this.shaking == false && time){
            this.shaking = true;
            this.shakeVal = val;
            let self = this;
            let lastOffset = this.offset;
            setTimeout(function(){
                self.shaking = false;
                self.offset = lastOffset;
            }, time);
        }
    }
}