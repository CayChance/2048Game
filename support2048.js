/**
 * Created by Administrator on 2016/8/8.
 */

//获得(i,j)位置的top值
function getPosTop(i,j){
    return 20+i*120;
}

//获得(i,j)位置的left值
function getPosLeft(i,j){
    return 20+j*120;
}

//产生一个数字的背景颜色
function getNumberBackgroundColor(number){
    switch (number){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }

    return "black";
}

//产生一个数组的颜色
function getNumberColor(number){
    if(number<=4){
        return "#776e65";
    }

    return "white";
}

//判断棋盘格是否没有空间
//没有空间，返回true
//有空间，返回false
function nospace(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0){
                return false;
            }
        }
    }

    return true;
}

//判断棋盘是否可以向左移动
function canMoveLeft(board){
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){//循环棋盘格的右三列
            if(board[i][j]!=0){//当前格子不等于0，即当前格子有数字
                //当前格子的左边紧挨的一个格子为0(是否有位置)，或者当前格子和它左边的紧挨的格子数字相等的情况下，可以向左移动
                if(board[i][j-1]==0 || board[i][j-1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board){
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                if(board[i][j+1]==0 || board[i][j+1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board){
    for(var j=0;j<4;j++){//列
        for(var i=1;i<4;i++){//行
            if(board[i][j]!=0){
                if(board[i-1][j]==0 || board[i-1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board){
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0){
                if(board[i+1][j]==0 || board[i+1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockHorizontal(row, col1, col2, board){
    for(var i=col1+1;i<col2;i++){
        if(board[row][i]!=0){
            return false;
        }
    }
    return true;
}

function noBlockVertical(col,row1,row2,board){
    for(var i=row1+1;i<row2;i++){
        if(board[i][col]!=0){
            return false;
        }
    }
    return true;
}

//棋盘格无法移动
function nomove(board){
    if(canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)||canMoveDown(board)){
        return false;
    }
    return true;
}