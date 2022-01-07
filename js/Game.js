var board;
var playerBlack;
var playerWhite; 
var turn = Player.WHITE;
var pieceSelected = false;
var selectedPiece;

function setup(){
    createCanvas(400,400);
    playerBlack = new Player(Player.BLACK);
    playerWhite = new Player(Player.WHITE);
    board = new Board(playerWhite, playerBlack);
    background(50,100,100);
    board.drawBoard();
    board.drawPieces();
}

function mouseClicked(){
    clicked = {x: Math.floor(mouseX / 50), y: Math.floor(mouseY / 50)};
    if(pieceSelected){
        if(selectedPiece.validMove([clicked.x, clicked.y])){
            board.updateBoard(selectedPiece, [clicked.x, clicked.y]);
            selectedPiece.move([clicked.x, clicked.y]);  
            background(50,100,100);
            board.drawBoard();
            board.drawPieces();
            if(turn == Player.BLACK) turn = Player.WHITE;
            else turn = Player.BLACK;
        }
        background(50,100,100);
        board.drawBoard();
        board.drawPieces();
        pieceSelected = false;
    }

    if(!pieceSelected){
        playerWhite.findMoves(board);
        playerBlack.findMoves(board);
        if(board.boardState[clicked.y][clicked.x] != '.' && board.boardColor[clicked.y][clicked.x] == turn){
            selectedPiece = board.pieceMap[[clicked.x, clicked.y]];
            playerBlack.updateAttackZone(board);
            playerWhite.updateAttackZone(board);
            background(50,100,100);
            board.drawBoard();
            playerWhite.showAttackZone();
            playerBlack.showAttackZone();
            board.drawPieces();
            selectedPiece.removeIllegal(board);
            selectedPiece.drawMoves(board);
            pieceSelected = true; 
        }
    }

}
