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
        this.moves = 20;
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
                    if(i < 7 && i > 0){ 
                        if(j + 1 < 8) attackZone[i + direction][j + 1] = true;
                        if(j - 1 >= 0) attackZone[i + direction][j - 1] = true;
                    }
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
                                    var x2 = j + direction[l] * (k + 1);
                                    var y2 = i + direction[7-l] * (k + 1);
                                    if(x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8){
                                        if(newBoard.boardState[y][x].toLowerCase() == 'k') attackZone[y2][x2] = true;
                                    }
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
                                    var x2 = j + direction[l] * (k + 1);
                                    var y2 = i + direction[7-l] * (k + 1);
                                    if(x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8){    
                                        if(newBoard.boardState[y][x].toLowerCase() == 'k') attackZone[y2][x2] = true;
                                    }
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
                                    var x2 = j + direction[l] * (k + 1);
                                    var y2 = i + direction[15-l] * (k + 1);
                                    if(x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8){
                                        if(newBoard.boardState[y][x].toLowerCase() == 'k') attackZone[y2][x2] = true;
                                    }
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
        this.moves = 0;
        for(var i = 0; i < 16; i++){
            if(this.pieces[i].alive){
                this.pieces[i].findMoves(board);
                this.moves += this.pieces[i].moves.length;
            }
        }
    }
    
    canCastle(direction, board){
        var king = this.pieces[4];
        var nBoard = Object.assign(Object.create(Object.getPrototypeOf(board)),JSON.parse(JSON.stringify(board)));
        if(king.moved || nBoard.inCheck(this.color)) return false;
        if(this.color == 'b') {
            var row = 0;
        } else {
            var row = 7;
        }
        if(direction == 'r') {
            var rook = this.pieces[0];
            if(rook.moved) return false;
            if(board.boardState[row][5] == '.' && board.boardState[row][6] == '.'){
                var nBoard = Object.assign(Object.create(Object.getPrototypeOf(board)),JSON.parse(JSON.stringify(board)));
                var dangerZone = board.playerWhite.getAttackZone(nBoard);
                return !(dangerZone[row][5] || dangerZone[row][6]);
            }
        }
        else {
            var rook = this.pieces[7];
            if(rook.moved) return false;
            if(board.boardState[row][1] == '.' && board.boardState[row][2] == '.' && board.boardState[row][3] == '.'){
                var nBoard = Object.assign(Object.create(Object.getPrototypeOf(board)),JSON.parse(JSON.stringify(board)));
                var dangerZone = board.playerWhite.getAttackZone(nBoard);
                return !(dangerZone[row][2] || dangerZone[row][3]);
            }
        }
        return false;
    }
}