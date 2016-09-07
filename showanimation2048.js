/**
 * Created by Administrator on 2016/8/8.
 */
//��λ��(i,j)������ʾrandNumber
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

//��(x,y)��ʼ�㶯̬�ƶ���(x,y)��ֹ��
function showMoveAnimation(fromX,fromY,toX,toY){
    var numberCell=$("#number-cell-"+fromX+"-"+fromY);
    numberCell.animate({
        top:getPosTop(toX,toY),
        left:getPosLeft(toX,toY)
    },200);
}

//���³ɼ�
function updateScore(score){
    $("#score").text(score);
}