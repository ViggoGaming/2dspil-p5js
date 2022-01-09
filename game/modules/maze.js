class Maze {

    constructor(rows,cols){
        this.rows = rows;
        this.cols = cols;
        this.tileSize = 250;

        this.tiles = []
        this.mazeStack = []

        this.currentTile;
        this.nextTile;

        this.visitSum = 1;

    }

    init(){

        //Used for Camera
        this.mazeWidth = this.rows*this.tileSize;
        this.mazeHeight = this.cols*this.tileSize;

        //Creates 2D-array with tiles
        for(var x=0; x<this.rows; x++){
            this.tiles[x] = [];
            for(var y=0; y<this.cols; y++){
                this.tiles[x][y] = new Tile(x,y);
            }
        }

        //Instanciate neighbors
        for(var x=0; x<this.rows; x++){
            for(var y=0; y<this.cols; y++){
                this.addNeighbours(this.tiles[x][y])
            }
        }

        //Set start
        this.currentTile = this.tiles[0][0];
        this.currentTile.visited = true;

    }

    generateMaze(callback){
        while(this.visitSum < this.rows*this.cols){
            if(this.currentTile.checkNeighbours()){

                this.nextTile = this.currentTile.pickNeighbour();

                this.visitSum++;

                this.mazeStack.push(this.currentTile);

                this.removeWalls(this.currentTile,this.nextTile);

                this.currentTile = this.nextTile;
        
            } else {
                this.currentTile = this.mazeStack.pop()
            }
        }
        callback();
    }

    render(){
        for(var x = 0; x<this.rows;x++){
            for(var y = 0; y<this.cols;y++){
                
                let tileX = x*this.tileSize;
                let tileY = y*this.tileSize;
                
                if(this.tiles[x][y].walls[0])
                    line(tileX,tileY,tileX+this.tileSize,tileY);
                if(this.tiles[x][y].walls[1])
                    line(tileX,tileY,tileX,tileY+this.tileSize);
                if(this.tiles[x][y].walls[2])
                    line(tileX+this.tileSize,tileY,tileX+this.tileSize,tileY+this.tileSize);
                if(this.tiles[x][y].walls[3])
                    line(tileX,tileY+this.tileSize,tileX+this.tileSize,tileY+this.tileSize);

            }
        }
    }

    removeWalls(current,next){

        let dX = current.row - next.row; 
        let dY = current.col - next.col;
    
        if(dX == 1){
            current.walls[1] = false
            next.walls[2] = false
        } else if (dX == -1){
            current.walls[2] = false
            next.walls[1] = false
        }
    
        if(dY == 1){
            current.walls[0] = false
            next.walls[3] = false
        } else if (dY == -1){
            current.walls[3] = false
            next.walls[0] = false
        }
    
    }

    addNeighbours(tile){
        if(tile.row > 0){
            tile.neighbours.push(this.tiles[tile.row-1][tile.col])
        }
        if(tile.row < this.rows-1){
            tile.neighbours.push(this.tiles[tile.row+1][tile.col])
        }
        if(tile.col > 0){
            tile.neighbours.push(this.tiles[tile.row][tile.col-1])
        }
        if(tile.col < this.cols-1){
            tile.neighbours.push(this.tiles[tile.row][tile.col+1])
        }
    }

    mazeToWalls(deletionProbability){
        //Converts maze "walls" to actual walls usuable in game
        //Output: array consisting of wall objects
        var wallsArr = [];

        for(var x=0; x<this.rows;x++){
            for(var y=0; y<this.cols;y++){

                let tile = this.tiles[x][y];
                let tileX = x*this.tileSize;
                let tileY = y*this.tileSize;

                if(tile.row > 0 && tile.walls[1] && random(1) > deletionProbability){
                    wallsArr.push(new Wall(tileX,tileY,tileX,tileY+this.tileSize))
                }

                if(tile.col > 0 && tile.walls[0] && random(1) > deletionProbability){
                    wallsArr.push(new Wall(tileX,tileY,tileX+this.tileSize,tileY))
                }
            }
        }

        //Borders of the maze, very spaghetti but must be done
        var mazeWidth = this.rows*this.tileSize;
        var mazeHeight = this.cols*this.tileSize;

        wallsArr.push(new Wall(0,0,mazeWidth,0))
        wallsArr.push(new Wall(0,0,0,mazeHeight))
        wallsArr.push(new Wall(0,mazeHeight,mazeWidth,mazeHeight))
        wallsArr.push(new Wall(mazeWidth,0,mazeWidth,mazeHeight))

        return wallsArr;
    }

    getRandomTile(){
        let tile = this.tiles[round(random(0,this.rows-1))][round(random(0,this.cols-1))]
        let tileX = tile.row*this.tileSize;
        let tileY = tile.col*this.tileSize;
        let center = createVector(tileX+this.tileSize/2,tileY+this.tileSize/2)
        return center;
    }

}