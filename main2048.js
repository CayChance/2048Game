/**
 * Created by liuyubobobo on 14-4-11.
 * my site: http://www.liuyubobobo.com
 */

var board = new Array();
var score = 0;
var hasConflicted=new Array();//解决每个格子每次只能碰撞一次

$(document).ready(function(){
    newgame();
});

function newgame(){
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

//初始化棋盘格
function init(){
    //给每个小格子设置位置
    for( var i = 0 ; i < 4 ; i ++ )//行
        for( var j = 0 ; j < 4 ; j ++ ){//列
            var gridCell = $('#grid-cell-'+i+"-"+j);
            gridCell.css('top', getPosTop( i , j ) );//设置(i,j)位置的top值
            gridCell.css('left', getPosLeft( i , j ) );//设置(i,j)位置的left值
        }

    for( var i = 0 ; i < 4 ; i ++ ){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for( var j = 0 ; j < 4 ; j ++ ){
            board[i][j] = 0;//初始化每个格子上的数字都为0
            hasConflicted[i][j]=false;//初始化每个格子都没有发生碰撞过
        }
    }

    updateBoardView();//更新棋盘格数字

    score=0;
}

//每次更新棋盘格数字
function updateBoardView(){

    $(".number-cell").remove();//先把每个格子上对应的数字移除
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){
            //给每个格子重新设置数字
            $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            //如果该格子上的数字为0，则设置宽高为零，并且把数字放在每个格子的中间位置
            if( board[i][j] == 0 ){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + 50 );
                theNumberCell.css('left',getPosLeft(i,j) + 50 );
            }
            //如果该格子上的数字不为0，则设置宽高等于100像素，数字位置设置为格子的位置，覆盖在格子之上。
            //设置数字的背景颜色，颜色以及显示该数字
            else{
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j] ) );
                theNumberCell.css('color',getNumberColor( board[i][j] ) );
                theNumberCell.text( board[i][j] );
            }

            hasConflicted[i][j]=false;//每个格子都没有发生过碰撞
        }
}

//产生一个数字
function generateOneNumber(){

    //判断棋盘格上是否没有空间
    if( nospace( board ) )
        return false;

    //随机一个位置
    var randx = parseInt( Math.floor( Math.random()  * 4 ) );
    var randy = parseInt( Math.floor( Math.random()  * 4 ) );

    var times=0;
    while( times<50 ){
        if( board[randx][randy] == 0 )
            break;

        randx = parseInt( Math.floor( Math.random()  * 4 ) );
        randy = parseInt( Math.floor( Math.random()  * 4 ) );

        times++;
    }

    if(times==50){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]==0){
                    randx=i;
                    randy=j;
                }
            }
        }
    }

    //随机一个数字
    var randNumber = Math.random() < 0.6 ? 2 : 4;

    //在随机位置动态的显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation( randx , randy , randNumber );

    return true;
}

//键盘操作
$(document).keydown(function(event){
    switch (event.keyCode){
        case 37://left
            event.preventDefault();//阻止键盘的默认操作
            if(moveLeft()){//如果是向左移动
                setTimeout("generateOneNumber()",210);//产生一个数字
                setTimeout("isgameover()",300);//判断游戏是否结束
            }
            break;
        case 38://up
            event.preventDefault();
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39://right
            event.preventDefault();
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40://down
            event.preventDefault();
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default :
            break;
    }
});

//判断游戏是否结束
function isgameover(){
    if(nospace(board)&&nomove(board)){//如果棋盘格上没有空间并且棋盘格不能移动时
        gameover();
    }
}

function gameover(){
    alert("gameover!");
}

//向左移动
function moveLeft(){
    //先判断棋盘格是否能够向左移动
    if(!canMoveLeft(board)){
        return false;
    }
    //moveLeft
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){//棋盘格最左边的第一列不需判断，因为最左边的第一列无法向左移动
            if(board[i][j]!=0){//如果格子里的数字不等于0
                for(var k=0;k<j;k++){//依次循环2，3，4列的前一列
                    //判断终止位置的数字是否为0，并且当前位置到终止位置之间没有障碍
                    if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
                        //move
                        //这种情况可以移动，200毫秒从(i,j)点移动到(i,k)点
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    //判断终止位置的值和起始位置的值是否相等，并且两个位置之间没有障碍，并且终止位置没有发生碰撞
                    else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                        //move
                        //这种情况可以移动，从(i,j)点移动到(i,k)点
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        //add score
                        score+=board[i][k];
                        updateScore(score);//更新成绩

                        //终止位置已经发生了一次碰撞
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }
    }

    //200毫秒后更新棋盘格数字
    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    //moveRight
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k]*=2;
                        board[i][j]=0;

                        //add score
                        score+=board[i][k];
                        updateScore(score);

                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    //moveUp
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0 && noBlockVertical(j,k,i,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j]==board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        //add
                        board[k][j]*=2;
                        board[i][j]=0;
                        //add score
                        score+=board[k][j];
                        updateScore(score);

                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    //moveDown
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0 && noBlockVertical(j,i,k,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j]==board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        //add
                        board[k][j]*=2;
                        board[i][j]=0;
                        //add score
                        score+=board[k][j];
                        updateScore(score);

                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200);
    return true;
}
