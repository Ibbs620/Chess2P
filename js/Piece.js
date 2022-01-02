class Piece{
    
    static pieceUnicode = {'k': '\u2654', 'q': '\u2655','r': '\u2656','b': '\u2657','n': '\u2658','p': '\u2659','K': '\u265A','Q': '\u265B','R': '\u265C','B': '\u265D','N': '\u265E','P': '\u265F'};
    
    constructor(id, color, x, y){
        this.id = id;
        this.color = color;
        this.x = x;
        this.y = y;
        this.moves = []
        this.alive = true;
    }

    findMoves(b){
        switch(this.id.toLowerCase()){
            case 'k':
                var direction = [1,-1,0,0];
                for(var i = 0; i < 4; i++){
                    var x = this.x + direction[i];
                    var y = this.y + direction[4 - i];
                    if(x < 0 || x > 7 || y < 0 || y > 7 || b.boardColor[y][x] == this.color) continue;
                    this.moves.push([x,y]);
                }
                break;
            case 'p':
                var direction = 1;
                if(this.color == Player.WHITE) direction *= -1;
                var y = this.y + 2 * direction;
                if(this.y == 3.5 - 2.5 * direction && b.boardColor[y][this.x] == '.') this.moves.push([this.x, y]);
                y = this.y + 1 * direction;
                if(b.boardColor[y][this.x] == '.') this.moves.push([this.x, y]);
                if(this.x + 1  < 8){
                    if(b.boardColor[y][this.x + 1] != this.color && b.boardColor[y][this.x - 1] != '.') this.moves.push([this.x + 1,y]);
                }
                if(this.x - 1  >= 0){
                    if(b.boardColor[y][this.x - 1] != this.color && b.boardColor[y][this.x - 1] != '.') this.moves.push([this.x - 1,y]);
                }
                break;
        }
    }

    drawMoves(){
        strokeWeight(1);
        stroke(255);
        fill(0);
        for(var i = 0; i < this.moves.length; i++){
            ellipse(this.moves[i][0] * 50 + 25, this.moves[i][1] * 50 + 25, 10, 10);
        }
    }

    move(position){
        this.x = position[0];
        this.y = position[1];
    }
}