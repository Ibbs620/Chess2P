class Player{

    static BLACK = 'b';
    static WHITE = 'w';

    constructor(color){
        this.color = color;
        this.pieces = [];
        this.attackZone =  [[false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false],
                            [true ,true ,true ,true ,true ,true ,true ,true ],
                            [false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false],
                            [true ,true ,true ,true ,true ,true ,true ,true ],
                            [false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false]];
        let start;
        if(color == 'b'){
            start = 0;
        } else {
            start = 6;
        }
        for(var i = start; i < start + 2; i++){
            for(var j = 0; j < 8; j++){
                var piece = new Piece(Board.defaultBoardState[i][j], this.color, j, i);
                this.pieces.push(piece);
            }
        }
    }

    updateAttackZone(board){
        for(var i = 0; i < 8; i++){
            for(var j = 0; j < 8; j++){
                this.attackZone[i][j] = false;
            }
        }
        for(var i = 0; i < 16; i++){
            var piece = this.pieces[i];
            if(!piece.alive) continue;
            piece.findMoves(board);
            if(piece.id.toLowerCase() == 'p' && piece.y < 7 && piece.y > 0){
                if(this.color == 'b') var direction = 1;
                else var direction = -1;
                if(piece.x + 1 < 8) this.attackZone[piece.y + direction][piece.x + 1] = true;
                if(piece.x - 1 >= 0) this.attackZone[piece.y + direction][piece.x - 1] = true;
                continue;
            }
            for(var j = 0; j < piece.moves.length; j++){
                this.attackZone[piece.moves[j][1]][piece.moves[j][0]] = true;
            }
        }
    }

    showAttackZone(){
        if(this.color == 'w')var c = color(155,0,0);
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
}