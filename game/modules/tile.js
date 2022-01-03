class Tile {

    constructor(row,col){
        this.row = row;
        this.col = col;
        this.visited = false;
        this.walls = [true,true,true,true]
        this.neighbours = []
    }

    checkNeighbours(){
        for(var n of this.neighbours){
            if(!n.visited)
                return true
        }
        return false
    }

    pickNeighbour(){
        let r = floor(random(0,this.neighbours.length))
        let neighbour = this.neighbours[r]
        while(neighbour.visited){
            this.neighbours.splice(r,1)
            r = floor(random(0,this.neighbours.length))
            neighbour = this.neighbours[r]
        }

        neighbour.visited = true;
        this.neighbours.splice(r,1)
        return neighbour;

    }

}

module.exports = Tile