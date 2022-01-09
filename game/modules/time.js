class Time {
    
    static previousFrame = 0.0;
    static currentFrame = performance.now();

    static dt = 0.0;
    static timeScale = 1;

    static Update () {
        this.currentFrame = performance.now(); 
        this.dt = (this.currentFrame - this.previousFrame)/1000;
        this.previousFrame = this.currentFrame;
    }

    static get deltaTime () {
        return this.dt * this.timeScale;
    }

}