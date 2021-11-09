class Wall {
  constructor(x, y, x2, y2) {
    this.x = x;
    this.y = y;
    this.width = abs(x2-x);
    this.height = abs(y2-y);
    this.stroke = 10;
    this.color = "#424242";

    this.xOffset = 0;
    this.yOffset = 0;
    
    if(this.width<this.height){
        this.xOffset = this.stroke;
    } else {
        this.yOffset = this.stroke;
    }

  }
  render() {
    fill(this.color);
    /*strokeCap(SQUARE); // Sørger for at enderne er firkantet
    strokeWeight(this.width);*/
    rect(this.x+this.xOffset, this.y+this.yOffset, this.width+this.xOffset, this.height+this.yOffset);
  }
}
