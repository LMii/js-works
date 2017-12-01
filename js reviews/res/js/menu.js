/*
* @Author: acer
* @Date:   2017-10-19 14:59:16
* @Last Modified by:   acer
* @Last Modified time: 2017-10-24 22:57:29
*/
$(function(){
	///////////餐厅文化效果
	/*$('.jianjie-huan>li').on('mouseover',function(){
		$('div',this).css({opaity:'1'})
	})
	$('.jianjie-huan>li').on('mouseover',function(){
		$('div',this).animate({height:'100%'})
	})*/
	///////////新品推荐效果
	$('.new-bottom>li>a').on('mouseover',function(){
		$('.newb-zhe',this).css({transform:'scale(0.8,0.8)'});
	})
    $('.new-bottom>li>a').on('mouseover',function(){
        $('.newb-zhe',this).css({opacity:'1'});
    })
	$('.new-bottom>li>a').on('mouseover',function(){
		$('.newb-xian',this).stop();
		$('.newb-xian',this).animate({width:'100%'});
	})
	$('.new-bottom>li>a').on('mouseout',function(){
		$('.newb-zhe',this).css('opacity','0');
	})
    $('.new-bottom>li>a').on('mouseout',function(){
        $('.newb-zhe',this).css({transform:'scale(1,1)'});
    })
	$('.new-bottom>li>a').on('mouseout',function(){
		$('.newb-xian',this).stop();
		$('.newb-xian',this).animate({width:0});
	})

	let dian=$('.dian11');
	let imgs=$('.main-bottom>li>a>img');
	$.each(dian,function(index,element){
		$(element).on('mouseover',function(){
           $(imgs[index]).css({transform:'scale(1.2,1.2)'})
		})
		$(element).on('mouseout',function(){
           $(imgs[index]).css({transform:'scale(1,1)'})
		})
	})
    /////////////关于我们效果
    let about=$('.about-center>a');
    let a_imgs=$('.about-zhe>img');
    console.log(a_imgs)
    about.on('click',function(){
        for(let i=0;i<about.length;i++){
            about.eq(i).css({background:'none'})
        }
        $(this).css({background:'#108e64'});
        let j=$(this).index();
        console.log(j)
        $('.about-zhe').css({opacity:'1'});
        $('.about-zhe>img').eq(`${j-1}`).css({transform:'scale(1,1)'});
    })
    ////////////关闭按钮
    let a_close=$('.about-zhe>div');
    a_close.on('click',function(){
        $('.about-zhe').css({opacity:'0'});
        $('.about-zhe>img').css({transform:'scale(0,0)'});
    })

	////////新品推荐点击效果
	let new_dian=$('.circle>li');
    new_dian.on('click',function(){
        for(let i=0;i<new_dian.length;i++){
            $('.new-bottom').eq(i).css({display:'none'});
            new_dian.eq(i).css({background:'#4e535e'});
        }
    	let j=$(this).index();
    	$(`.new-bottom:nth-of-type(${j})`).css({display:'block'});
    	$(this).css({background:'#202328'});
	})
})