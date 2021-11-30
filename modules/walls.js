class Wall {
  constructor(x, y, x2, y2) {
    this.x = x;
    this.y = y;
    this.width = abs(x2-x);
    this.height = abs(y2-y);
    this.stroke = 8;
    this.color = "#424242";

    this.xOffset = 0;
    this.yOffset = 0;
    
    if(this.width>this.height){
        this.yOffset = this.stroke/2;
    } else {
        this.xOffset = this.stroke/2;
    }

  }
  render() {
    fill(this.color);

    //rect(this.x-this.xOffset, this.y-this.yOffset, this.width+(this.xOffset*2), this.height+(this.yOffset*2));

    rect(this.x, this.y, this.width+(this.xOffset*2), this.height+(this.yOffset*2));
  }
}