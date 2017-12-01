$(function(){
    let hei={};
    let bai={};
    let kb={};
    for(let i=0;i<15;i++){
        $('<div>').addClass('hang').appendTo('.qipan');
        $('<span>').addClass('lie').appendTo('.qipan');
        for(let j=0;j<15;j++){
            kb[i+'_'+j]={x:i,y:j};
            $('<li>').appendTo('.qipan').addClass('qizi').data('pos',{x:i,y:j}).attr('id',i+'_'+j);
        }
    }
    for(let i=0;i<5;i++){
        $('<i>').appendTo('.qipan').addClass('dian');
    }
    let flag=true;///函数内部flag是变化着的
    $('.qipan>.qizi').on('click',function(){
        if($(this).hasClass('hei')||$(this).hasClass('bai')){
            return;
        }
        let data=$(this).data('pos');
        if(flag){
            $(this).addClass('hei');
            hei[$(this).data('pos').x+'_'+$(this).data('pos')['y']]=true;
            console.log($(this).data('pos'))//对象
            delete kb[data.x+'_'+data.y];
            if(panduan(hei,data)>=4){
                alert('黑棋胜出！');
                $('.qipan>.qizi').off();
            }


        }else{
            $(this).addClass('bai');
            bai[$(this).data('pos')['x']+'_'+$(this).data('pos')['y']]=true;
            if(panduan(bai,data)>=4){
                alert('白棋胜出！');
                $('.qipan>.qizi').off();
            }
        }
        flag=!flag;///注意
    })
    function panduan(obj,pos){
        let rows=0,cols=0,zs=0,yx=0;//表示结果
        let i=pos.x,j=pos.y;
        while(obj[i+'_'+j]){
            rows++;///向右走，如果还为真则rows加1
            j++;
        }
        j=pos.y-1;//j要从当前位置减一开始走
        while(obj[i+'_'+j]){
            rows++;///向左走，如果还为真则rows加1
            j--;
        }
        i=pos.x+1;j=pos.y;
        while(obj[i+'_'+j]){
            cols++;///向下走，如果还为真则cols加1
            i++;
        }
        i=pos.x-1;
        while(obj[i+'_'+j]){
            cols++;///向左走，如果还为真则cols加1
            i--;
        }
        i=pos.x+1;
        j=pos.y+1;
        while(obj[i+'_'+j]){
            yx++;///向右下走，如果还为真则yx(右下)加1
            i++;
            j++;
        }
        i=pos.x-1;
        j=pos.y-1;
        while(obj[i+'_'+j]){
            yx++;///向左走，如果还为真则yx(右下)加1
            i--;
            j--;
        }
        i=pos.x+1;
        j=pos.y-1;
        while(obj[i+'_'+j]){
            zs++;///向左走，如果还为真则yx(右下)加1
            i++;
            j--;
        }
        i=pos.x-1;
        j=pos.y+1;
        while(obj[i+'_'+j]){
            zs++;///向左走，如果还为真则yx(右下)加1
            i--;
            j++;
        }
        return Math.max(rows,cols,zs,yx)
    }

})