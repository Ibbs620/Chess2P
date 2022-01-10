var board;
var playerBlack;
var playerWhite; 
var turn = Player.WHITE;
var pieceSelected = false;
var selectedPiece;

function setup(){
    createCanvas(600,400);
    playerBlack = new Player(Player.BLACK);
    playerWhite = new Player(Player.WHITE);
    board = new Board(playerWhite, playerBlack);
    background(50,100,100);
    board.drawBoard();
    board.drawPieces();
    drawMenu('white to move');
    reset = createButton('Reset Board');
    reset.mousePressed(resetBoard);
}

function draw(){
    drawMenu('white to move');
    reset.position(460, 260);
    checkMate();
}

function resetBoard(){
    playerBlack = new Player(Player.BLACK);
    playerWhite = new Player(Player.WHITE);
    board = new Board(playerWhite, playerBlack); 
    turn = Player.WHITE;
    pieceSelected = false;
    selectedPiece = undefined;
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
                board.updateBoard(selectedPiece, [selectedPiece.x, selectedPiece.y]);
                background(50,100,100);
                board.drawBoard();
                board.drawPieces();
                playerWhite.findMoves(board);
                playerBlack.findMoves(board);
                playerBlack.updateAttackZone(board);
                playerWhite.updateAttackZone(board);
            }
        } else {
            var choices = ['q','r','b','n'];
            if(clicked.x == selectedPiece.x && clicked.y >= 1 && clicked.y <= 4) {
                selectedPiece.id = choices[clicked.y - 1];
                pp = false;
                board.updateBoard(selectedPiece, [selectedPiece.x, selectedPiece.y]);
                background(50,100,100);
                board.drawBoard();
                board.drawPieces();
                playerWhite.findMoves(board);
                playerBlack.findMoves(board);
                playerBlack.updateAttackZone(board);
                playerWhite.updateAttackZone(board);
            }
        }
    } else {
        if(pieceSelected){
            if(selectedPiece.validMove([clicked.x, clicked.y])){
                if(selectedPiece.id.toLowerCase() == 'k'){
                    if(turn == Player.WHITE){
                        if(playerWhite.canCastle('l', board) && clicked.x == 2 && clicked.y == 7){
                            playerWhite.castleLeft(board)
                        }
                        if(playerWhite.canCastle('r', board) && clicked.x == 6 && clicked.y == 7){
                            playerWhite.castleRight(board)
                        }
                    } else {
                        if(playerBlack.canCastle('l', board) && clicked.x == 2 && clicked.y == 0){
                            playerBlack.castleLeft(board)
                        }
                        if(playerBlack.canCastle('r', board) && clicked.x == 6 && clicked.y == 0){
                            playerBlack.castleRight(board);
                        }
                    }
                }
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
                if(selectedPiece.id.toLowerCase() == 'k'){
                    if(turn == Player.WHITE){
                        if(playerWhite.canCastle('l', board)){
                            playerWhite.pieces[4].moves.push([2, 7]);
                        }
                        if(playerWhite.canCastle('r', board)){
                            playerWhite.pieces[4].moves.push([6, 7]);
                        }
                    } else {
                        if(playerBlack.canCastle('l', board)){
                            playerBlack.pieces[4].moves.push([2, 0]);
                        }
                        if(playerBlack.canCastle('r', board)){
                            playerBlack.pieces[4].moves.push([6, 0]);
                        }
                    }
                }
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
        playerBlack.updateAttackZone(board);
        playerWhite.updateAttackZone(board);
    }
}

function checkMate(){
    fill(0)
    if(turn == Player.BLACK){
        if(playerBlack.moves == 0){
            if(board.inCheck(turn)){
                rect(400, 300, 200, 100);
                fill(255);
                stroke(0);
                strokeWeight(1);
                textSize(30);
                text("Checkmate", 420, 340);
                
                textSize(15);
                text("White wins", 460, 370);
            } else {
                rect(400, 300, 200, 100);
                fill(255);
                stroke(0);
                strokeWeight(1);
                textSize(30);
                text("Draw", 440, 340);
                
                textSize(15);
                text("By Stalemate", 455, 370);
            }
        }
    } else {
        if(playerWhite.moves == 0){
            if(board.inCheck(turn)){
                rect(400, 300, 200, 100);
                fill(255);
                stroke(0);
                strokeWeight(1);
                textSize(30);
                text("Checkmate", 420, 340);
                
                textSize(15);
                text("Black wins", 460, 370);
            } else {
                rect(400, 300, 200, 100);
                fill(255);
                stroke(0);
                strokeWeight(1);
                textSize(30);
                text("Draw", 440, 340);
                
                textSize(15);
                text("By Stalemate", 455, 370);
            }
        }
    }
}

function drawMenu(status){
    fill(50,75,100);
    stroke(0);
    strokeWeight(5);
    rect(400,0,200,400);
    
    fill(0)
    rect(400,0,200,60);
    
    fill(255);
    stroke(0);
    strokeWeight(1);
    textSize(40);
    text("Chess", 440, 40);
    
    textSize(10);
    text("By Ibbs620", 475, 55);

    textSize(15);
    
    if(board.inCheck(turn)) text("Check", 475, 90);
    else if(turn == Player.BLACK) text("Black to move", 450, 90);
    else text("White to move", 450, 90);

    noStroke();
    textSize(24);
    var x1 = 0, x2 = 0, y1 = 120, y2 = 200;
    for(var i = 0; i < 16; i++){
        var piece = this.playerBlack.pieces[i];
        if(!piece.alive){
            fill(0);
            text(Piece.pieceUnicode[piece.id], 410 + 21 * x1, y1);
            x1++;
            if(x1 > 7) {
                y1 = 150;
                x2 = 0;
            }
        }
        piece = this.playerWhite.pieces[i];
        if(!piece.alive){
            fill(255);
            text(Piece.pieceUnicode[piece.id.toUpperCase()], 410 + 21 * x2, y2);            
            x2++;
            if(x2 > 7) {
                y2 = 230;
                x2 = 0;
            }
        }
    }
}
