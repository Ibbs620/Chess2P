class Piece{
    
    static pieceUnicode = {'k': '\u2654', 'q': '\u2655','r': '\u2656','b': '\u2657','n': '\u2658','p': '\u2659','K': '\u265A','Q': '\u265B','R': '\u265C','B': '\u265D','N': '\u265E','P': '\u265F'};
    
    constructor(id, color, x, y){
        this.id = id;
        this.color = color;
        this.x = x;
        this.y = y;
        this.moves = [];
        this.alive = true;
        this.moved = false;
    }

    findMoves(b){
        this.moves = [];
        switch(this.id.toLowerCase()){
            case 'k':
                var direction = [1,-1,0,0,1,-1,1,-1,-1,1,-1,1,0,0];
                var newBoard = Object.assign(Object.create(Object.getPrototypeOf(b)),JSON.parse(JSON.stringify(b)));
                if(this.color == 'b') var dangerZone = board.playerWhite.getAttackZone(newBoard);
                else var dangerZone = board.playerBlack.getAttackZone(newBoard);
                for(var i = 0; i < 8; i++){
                    var x = this.x + direction[i];
                    var y = this.y + direction[13 - i];
                    if(x < 0 || x > 7 || y < 0 || y > 7) continue;
                    if(b.boardColor[y][x] == this.color) continue;
                    if(!dangerZone[y][x]) this.moves.push([x,y]);
                }
                break;
            case 'p':
                var direction = 1;
                if(this.color == Player.WHITE) direction *= -1;
                var y = this.y + 2 * direction;
                if(!this.moved && b.boardColor[y][this.x] == '.') this.moves.push([this.x, y]);
                y = this.y + 1 * direction;
                if(y >= 0 && y <= 7){
                    if(b.boardColor[y][this.x] == '.') this.moves.push([this.x, y]);
                    if(this.x + 1  < 8){
                        if(b.boardColor[y][this.x + 1] != this.color && b.boardColor[y][this.x + 1] != '.') this.moves.push([this.x + 1,y]);
                    }
                    if(this.x - 1  >= 0){
                        if(b.boardColor[y][this.x - 1] != this.color && b.boardColor[y][this.x - 1] != '.') this.moves.push([this.x - 1,y]);
                    }
                }
                break;
            case 'n':
                var direction = [2,1,2,-1,-2,1,-2,-1];
                for(var i = 0; i < 8; i++){
                    var x = this.x + direction[i];
                    var y = this.y + direction[7 - i];
                    if(x < 0 || x > 7 || y < 0 || y > 7) continue;
                    if(b.boardColor[y][x] == this.color) continue;
                    this.moves.push([x,y]);
                }
                break;
            case 'b':
                var direction = [1,-1,1,-1,1,-1,-1,1];
                for(var i = 0; i < 8; i++){
                    for(var j = 0; j < 4; j++){
                        var x = this.x + direction[j] * i;
                        var y = this.y + direction[7-j] * i;
                        if(x < 0 || x > 7 || y < 0 || y > 7 || this.x == x) continue;
                        if(b.boardColor[y][x] == this.color) {
                            direction[j] = 0;
                            direction[7-j] = 0;
                            continue;
                        }
                        this.moves.push([x,y]);
                        if(b.boardColor[y][x] != this.color && b.boardColor[y][x] != '.') {
                            direction[j] = 0;
                            direction[7-j] = 0;
                        }
                    }
                }
                break;
            case 'r':
                var direction = [1,-1,0,0,-1,1,0,0];
                for(var i = 0; i < 8; i++){
                    for(var j = 0; j < 4; j++){
                        var x = this.x + direction[j] * i;
                        var y = this.y + direction[7-j] * i;
                        if(x < 0 || x > 7 || y < 0 || y > 7 || this.x == x && this.y == y) continue;
                        if(b.boardColor[y][x] == this.color) {
                            direction[j] = 0;
                            direction[7-j] = 0;
                            continue;
                        }
                        this.moves.push([x,y]);
                        if(b.boardColor[y][x] != this.color && b.boardColor[y][x] != '.') {
                            direction[j] = 0;
                            direction[7-j] = 0;
                        }
                    }
                }
                break;    
            case 'q':
                var direction = [1,-1,0,0,1,-1,1,-1,1,-1,-1,1,-1,1,0,0];
                for(var i = 0; i < 8; i++){
                    for(var j = 0; j < 8; j++){
                        var x = this.x + direction[j] * i;
                        var y = this.y + direction[15-j] * i;
                        if(x < 0 || x > 7 || y < 0 || y > 7 || this.x == x && this.y == y) continue;
                        if(b.boardColor[y][x] == this.color) {
                            direction[j] = 0;
                            direction[15-j] = 0;
                            continue;
                        }
                        this.moves.push([x,y]);
                        if(b.boardColor[y][x] != this.color && b.boardColor[y][x] != '.') {
                            direction[j] = 0;
                            direction[15-j] = 0;
                        }
                    }
                }
                break;
        }
        this.removeIllegal(b);
    }

    removeIllegal(b){
        var i = 0;
        var king = this.id.toLowerCase() == 'k';
        while(i < this.moves.length){
            if(!this.checkLegal(b, this.moves[i]) * !king){
                this.moves.splice(i,1);
                i--;
            }
            i++;
        }
    }

    drawMoves(b){
        for(var i = 0; i < this.moves.length; i++){
            if(b.boardColor[this.moves[i][1]][this.moves[i][0]] != '.'){
                noFill();
                strokeWeight(3);
                stroke(255,0,0);
                rect(this.moves[i][0] * 50 + 1, this.moves[i][1] * 50 + 1, 48, 48);
            } else {
                strokeWeight(1);
                stroke(255);
                fill(0);
                ellipse(this.moves[i][0] * 50 + 25, this.moves[i][1] * 50 + 25, 10, 10);
            }
        }
    }

    move(position){
        this.x = position[0];
        this.y = position[1];
        this.moved = true;
    }

    checkLegal(board, position){
        var newBoard = Object.assign(Object.create(Object.getPrototypeOf(board)),JSON.parse(JSON.stringify(board)));
        newBoard.updateBoard(this, position);
        if(this.color == 'b') {
            var dangerZone = board.playerWhite.getAttackZone(newBoard);
            var king = newBoard.playerBlack.pieces[4];
        } else {
            var dangerZone = board.playerBlack.getAttackZone(newBoard);
            var king = newBoard.playerWhite.pieces[4];
        }
        return !dangerZone[king.y][king.x];
    }

    validMove(position){
        for(var i = 0; i < this.moves.length; i++){
            if(position[0] == this.moves[i][0] && position[1] == this.moves[i][1]) return true;
        }
        return false;
    }
}