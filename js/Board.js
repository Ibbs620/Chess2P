class Board {

    static defaultBoardState = ['RNBQKBNR','PPPPPPPP','........','........','........','........','pppppppp','rnbqkbnr'];
    static defaultBoardColor = ['bbbbbbbb','bbbbbbbb','........','........','........','........','wwwwwwww','wwwwwwww'];

    constructor(playerWhite, playerBlack, boardState = ['RNBQKBNR','PPPPPPPP','........','........','........','........','pppppppp','rnbqkbnr'], boardColor = ['bbbbbbbb','bbbbbbbb','........','........','........','........','wwwwwwww','wwwwwwww']){
        this.boardState = boardState;
        this.playerWhite = playerWhite;
        this.playerBlack = playerBlack;
        this.boardColor = boardColor;
        this.pieceMap = {};
        for(var i = 0; i < this.playerBlack.pieces.length; i++){
            this.pieceMap[[this.playerBlack.pieces[i].x, this.playerBlack.pieces[i].y]] = this.playerBlack.pieces[i];
        }
        for(var i = 0; i < this.playerWhite.pieces.length; i++){
            this.pieceMap[[this.playerWhite.pieces[i].x, this.playerWhite.pieces[i].y]] = this.playerWhite.pieces[i];
        }
    }

    drawBoard(){
        var y = true;
        noStroke();
        fill(230);
        for(var i = 0; i < 8; i++){
            for(var j = 0; j < 8; j++){
                if(y == true) {
                    rect(i*50, j*50, 50, 50);
                }
                y = !y;
            }
            y = !y; 
        }
        noFill();
        stroke(0);
        strokeWeight(5);
        rect(0,0,400,400);
    }

    drawPieces(){
        strokeWeight(2);
        textSize(40);
        for(var i = 0; i < 16; i++){
            var piece = this.playerBlack.pieces[i];
            if(piece.alive){
                stroke(255);
                fill(0);
                text(Piece.pieceUnicode[piece.id], piece.x * 50 + 5, piece.y * 50 + 40);
            }
            piece = this.playerWhite.pieces[i];
            if(piece.alive){
                fill(255);
                stroke(0);
                text(Piece.pieceUnicode[piece.id.toUpperCase()], piece.x * 50 + 5, piece.y * 50 + 40);            
            }
        }
    }

    updateBoard(piece, newPosition){
        this.boardState[piece.y][piece.x] = '.';
        this.boardColor[piece.y][piece.x] = '.';
        this.boardState[newPosition[1]][newPosition[0]] = piece.id;
        this.boardColor[newPosition[1]][newPosition[0]] = piece.color;
        if(pieceMap[newPosition] != undefined){
            pieceMap[newPosition].alive = false;
        }
    }
}