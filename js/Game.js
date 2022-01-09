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

var pp = false;
function mouseClicked(){
    clicked = {x: Math.floor(mouseX / 50), y: Math.floor(mouseY / 50)};
    if(pp){
        if(selectedPiece.color == 'b'){
            var choices = ['Q','R','B','N'];
            if(clicked.x == selectedPiece.x && clicked.y >= 3 && clicked.y <= 6) {
                selectedPiece.id = choices[6 - clicked.y];
                pp = false;
                board.boardState[clicked.y][clicked.x] = selectedPiece.id;
                background(50,100,100);
                board.drawBoard();
                board.drawPieces();
            }
        } else {
            var choices = ['q','r','b','n'];
            if(clicked.x == selectedPiece.x && clicked.y >= 1 && clicked.y <= 4) {
                selectedPiece.id = choices[clicked.y - 1];
                pp = false;
                board.boardState[clicked.y][clicked.x] = selectedPiece.id;
                background(50,100,100);
                board.drawBoard();
                board.drawPieces();
            }
        }
        playerWhite.findMoves(board);
        playerBlack.findMoves(board);
        playerBlack.updateAttackZone(board);
        playerWhite.updateAttackZone(board);
    } else {
        playerBlack.updateAttackZone(board);
        playerWhite.updateAttackZone(board);
        
        if(pieceSelected){
            if(selectedPiece.validMove([clicked.x, clicked.y])){
                board.updateBoard(selectedPiece, [clicked.x, clicked.y]);
                selectedPiece.move([clicked.x, clicked.y]);  
                background(50,100,100);
                board.drawBoard();
                board.drawPieces();
                if(selectedPiece.id.toLowerCase() == 'p' && (selectedPiece.y == 7 || selectedPiece.y == 0)) {
                    pp = true;
                    fill(150);
                    if(selectedPiece.color == 'b'){
                        var choices = ['Q','R','B','N'];
                        rect(selectedPiece.x * 50 + 1, 151, 48, 198);
                        stroke(255);
                        fill(0);
                        for(var i = 0; i < 4; i++){
                            text(Piece.pieceUnicode[choices[i]], selectedPiece.x * 50 + 5, selectedPiece.y * 50 - 10 - i * 50);
                        }
                    } else {
                        var choices = ['q','r','b','n'];
                        rect(selectedPiece.x * 50 + 1, 51, 48, 198); 
                        stroke(0);
                        fill(255);
                        for(var i = 0; i < 4; i++){
                            text(Piece.pieceUnicode[choices[i].toUpperCase()], selectedPiece.x * 50 + 5, selectedPiece.y * 50 + 90 + i * 50);
                        }
                    }
                }
                if(turn == Player.BLACK) turn = Player.WHITE;
                else turn = Player.BLACK;
            } else {
                background(50,100,100);
                board.drawBoard();
                board.drawPieces();
            }
            pieceSelected = false;
        }

        if(!pieceSelected && !pp){
            playerWhite.findMoves(board);
            playerBlack.findMoves(board);
            if(board.boardState[clicked.y][clicked.x] != '.' && board.boardColor[clicked.y][clicked.x] == turn){
                selectedPiece = board.pieceMap[[clicked.x, clicked.y]];
                playerBlack.updateAttackZone(board);
                playerWhite.updateAttackZone(board);
                background(50,100,100);
                board.drawBoard();
                //playerWhite.showAttackZone();
                //playerBlack.showAttackZone();
                board.drawPieces();
                selectedPiece.drawMoves(board);
                pieceSelected = true; 
            }
        }
        playerWhite.findMoves(board);
        playerBlack.findMoves(board);
        playerBlack.updateAttackZone(board);
        playerWhite.updateAttackZone(board);
        if(turn == Player.BLACK){
            if(playerBlack.moves == 0){
                if(board.inCheck(turn)){
                    alert('White Wins!');
                } else {
                    alert('Stalemate :neutral:');
                }
            }
        } else {
            if(playerWhite.moves == 0){
                if(board.inCheck(turn)){
                    alert('Black Wins!');
                } else {
                    alert('Stalemate :neutral:');
                }
            }
        }
        /*
        if(playerWhite.canCastle('l', board)){
            alert('white castle left');
        } else if(playerWhite.canCastle('r', board)){
            alert('white castle right');
        } else if(playerBlack.canCastle('l', board)){
            alert('white castle left');
        } else if(playerBlack.canCastle('r', board)){
            alert('black castle right');
        }*/
    }
}
