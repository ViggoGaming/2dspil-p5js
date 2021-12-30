class Time {

    static previousFrame = 0.0;
    static currentFrame = performance.now();

    static dt = 0.0;
    static timeScale = 1;

    static start = 0.0;
    static end = 0.0;

    static update() {
        this.previousFrame = this.currentFrame;
        this.currentFrame = performance.now();
        this.dt = (this.currentFrame - this.previousFrame) / 1000;
        console.log("time update funktion")
    }

    static get deltaTime() {
        return this.dt * this.timeScale;
    }

}
