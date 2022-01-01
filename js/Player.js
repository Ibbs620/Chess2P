class Player{

    static BLACK = 'b';
    static WHITE = 'w';

    constructor(color){
        this.color = color;
        this.pieces = [];
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
}