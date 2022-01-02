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

function draw(){
    
}

function mouseClicked(){
    clicked = {x: Math.floor(mouseX / 50), y: Math.floor(mouseY / 50)};
    if(pieceSelected){
        if(board.boardColor[clicked.y][clicked.x] == '.'){
            board.updateBoard(selectedPiece, [clicked.x, clicked.y]);
            selectedPiece.move([clicked.x, clicked.y]);
            pieceSelected = false;   
            background(50,100,100);
            board.drawBoard();
            board.drawPieces();
            if(turn == Player.BLACK) turn = Player.WHITE;
            else turn = Player.BLACK;
            alert(board.boardColor);
        } else if(board.boardColor[clicked.y][clicked.x] == turn){
            pieceSelected = false;
        }
    }

    if(!pieceSelected){
        if(board.boardState[clicked.y][clicked.x] != '.' && board.boardColor[clicked.y][clicked.x] == turn){
            selectedPiece = board.pieceMap[[clicked.x, clicked.y]];
            selectedPiece.findMoves(board);
            background(50,100,100);
            board.drawBoard();
            board.drawPieces();
            selectedPiece.drawMoves();
            pieceSelected = true;
        }
    }
}