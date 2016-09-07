/**
 * Created by Administrator on 2016/8/8.
 */
//在位置(i,j)动画显示randNumber
function showNumberWithAnimation(i,j,randNumber){
    var numberCell=$("#number-cell-"+i+"-"+j);
    numberCell.css("background-color",getNumberBackgroundColor(randNumber));
    numberCell.css("color",getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50);
}

//从(x,y)起始点动态移动到(x,y)终止点
function showMoveAnimation(fromX,fromY,toX,toY){
    var numberCell=$("#number-cell-"+fromX+"-"+fromY);
    numberCell.animate({
        top:getPosTop(toX,toY),
        left:getPosLeft(toX,toY)
    },200);
}

//更新成绩
function updateScore(score){
    $("#score").text(score);
}