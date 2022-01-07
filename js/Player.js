class Player{

    static BLACK = 'b';
    static WHITE = 'w';

    constructor(color){
        this.color = color;
        this.pieces = [];
        this.attackZone =  [[false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false]];
        
        for(var i = 0; i < 2; i++){
            for(var j = 0; j < 8; j++){
                if(color == 'b') var piece = new Piece(Board.defaultBoardState[i][j], this.color, j, i);
                else var piece = new Piece(Board.defaultBoardState[7-i][j], this.color, j, 7-i);
                this.pieces.push(piece);
            }
        }
    }

    getAttackZone(board){
        var newBoard = Object.assign(Object.create(Object.getPrototypeOf(board)),JSON.parse(JSON.stringify(board)));
        var attackZone = [[false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false]];
                     
        for(var i = 0; i < 8; i++){
            for(var j = 0; j < 8; j++){
                if(this.color != newBoard.boardColor[i][j]) continue;
                if(newBoard.boardState[i][j].toLowerCase() == 'p'){
                    if(this.color == 'b') var direction = 1;
                    else var direction = -1;
                    if(j + 1 < 8) attackZone[i + direction][j + 1] = true;
                    if(j - 1 >= 0) attackZone[i + direction][j - 1] = true;
                    continue;
                }
                switch(newBoard.boardState[i][j].toLowerCase()){
                    case 'k':
                        var direction = [1,-1,0,0,1,-1,1,-1,-1,1,-1,1,0,0];
                        for(var k = 0; k < 8; k++){
                            var x = j + direction[k];
                            var y = i + direction[13 - k];
                            if(x < 0 || x > 7 || y < 0 || y > 7) continue;
                            attackZone[y][x] = true;
                        }
                        break;
                    case 'n':
                        var direction = [2,1,2,-1,-2,1,-2,-1];
                        for(var k = 0; k < 8; k++){
                            var x = j + direction[k];
                            var y = i + direction[7 - k];
                            if(x < 0 || x > 7 || y < 0 || y > 7) continue;
                            attackZone[y][x] = true;
                        }
                        break;
                    case 'b':
                        var direction = [1,-1,1,-1,1,-1,-1,1];
                        for(var k = 0; k < 8; k++){
                            for(var l = 0; l < 4; l++){
                                var x = j + direction[l] * k;
                                var y = i + direction[7-l] * k;
                                if(x < 0 || x > 7 || y < 0 || y > 7 || j == x) continue;
                                if(newBoard.boardColor[y][x] == this.color) {
                                    direction[l] = 0;
                                    direction[7-l] = 0;
                                    attackZone[y][x] = true;
                                    continue;
                                }
                                attackZone[y][x] = true;
                                if(newBoard.boardColor[y][x] != this.color && newBoard.boardColor[y][x] != '.') {
                                    direction[l] = 0;
                                    direction[7-l] = 0;
                                }
                            }
                        }
                        break;
                    case 'r':
                        var direction = [1,-1,0,0,-1,1,0,0];
                        for(var k = 0; k < 8; k++){
                            for(var l = 0; l < 4; l++){
                                var x = j + direction[l] * k;
                                var y = i + direction[7-l] * k;
                                if(x < 0 || x > 7 || y < 0 || y > 7 || j == x && i == y) continue;
                                if(newBoard.boardColor[y][x] == this.color) {
                                    direction[l] = 0;
                                    direction[7-l] = 0;
                                    attackZone[y][x] = true;
                                    continue;
                                }
                                attackZone[y][x] = true;
                                if(newBoard.boardColor[y][x] != this.color && newBoard.boardColor[y][x] != '.') {
                                    direction[l] = 0;
                                    direction[7-l] = 0;
                                }
                            }
                        }
                        break;    
                    case 'q':
                        var direction = [1,-1,0,0,1,-1,1,-1,1,-1,-1,1,-1,1,0,0];
                        for(var k = 0; k < 8; k++){
                            for(var l = 0; l < 8; l++){
                                var x = j + direction[l] * k;
                                var y = i + direction[15-l] * k;
                                if(x < 0 || x > 7 || y < 0 || y > 7 || j == x && i == y) continue;
                                if(newBoard.boardColor[y][x] == this.color) {
                                    direction[l] = 0;
                                    direction[15-l] = 0;
                                    attackZone[y][x] = true;
                                    continue;
                                }
                                attackZone[y][x] = true;
                                if(newBoard.boardColor[y][x] != this.color && newBoard.boardColor[y][x] != '.') {
                                    direction[l] = 0;
                                    direction[15-l] = 0;
                                }
                            }
                        }
                        break;
                }
            }
        }
        return attackZone;
    }

    updateAttackZone(board){
        this.attackZone = this.getAttackZone(board);
    }

    showAttackZone(){
        if(this.color == 'w') var c = color(155,0,0);
        else var c = color(0,0,155);
        noStroke();
        fill(c);
        for(var i = 0; i < 8; i++){
            for(var j = 0; j < 8; j++){
                if(this.attackZone[i][j]){
                   if(this.color == 'w') rect(j * 50, i * 50, 50, 50);
                   else rect(j * 50 + 5, i * 50 + 5, 40, 40);
                }
            }
        }
    }
    findMoves(board){
        for(var i = 0; i < 16; i++){
            this.pieces[i].findMoves(board);
        }
    }
}